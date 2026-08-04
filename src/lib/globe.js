/* ============================================================
   Interactive hero globe (three.js).
   Ported from the vanilla build — graticule sphere, tech nodes,
   India + USA outlines and pins, south-pole icon cap, cursor web.

   initGlobe(canvas, iconUrl) -> cleanup()
   ============================================================ */
import * as THREE from 'three';

/* ---------- colour helpers for the gradient ---------- */
function lerpColor(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function gradAt(t) {
  const green = [0.184, 0.659, 0.310];
  const teal = [0.118, 0.612, 0.549];
  const blue = [0.169, 0.498, 0.831];
  return t < 0.5 ? lerpColor(green, teal, t / 0.5) : lerpColor(teal, blue, (t - 0.5) / 0.5);
}

const INDIA = [[74.72,35.5],[75.5,35.31],[76.28,34.79],[77.08,34.38],[78.01,34.41],[78.99,34.51],[79.77,34.23],[79.9,33.59],[79.56,32.86],[79.47,32.11],[79.45,31.41],[79.32,30.81],[79.73,30.22],[80.59,29.68],[81.02,29.08],[80.97,28.35],[81.21,27.72],[82.03,27.31],[83.02,26.99],[84,26.71],[84.99,26.48],[85.98,26.21],[86.96,26.01],[87.85,26.01],[88.39,26.35],[88.65,27],[89.09,27.44],[89.66,27.21],[90.28,26.72],[91.14,26.57],[91.9,26.72],[92.26,27.08],[92.66,27.61],[93.36,28.25],[94.15,28.82],[95.03,29.18],[95.9,29.22],[96.62,28.85],[97.19,28.25],[97.4,27.66],[97,27.16],[96.36,26.63],[95.96,25.92],[95.79,25.11],[95.6,24.36],[95.22,23.76],[94.88,23.17],[94.65,22.53],[94.21,22.25],[93.7,22.62],[93.41,23],[93.11,22.83],[92.6,22.79],[92.3,23.37],[92.54,24.13],[92.75,24.63],[92.2,24.7],[91.29,24.69],[90.53,24.97],[90.06,25.28],[90,25.11],[89.96,24.6],[89.85,24.1],[90.04,23.51],[90.38,22.75],[90.63,21.94],[90.45,21.29],[89.71,20.96],[88.99,20.65],[88.5,20.06],[87.78,19.38],[86.83,18.69],[86,17.95],[85.25,17.23],[84.48,16.64],[83.74,16.11],[83.03,15.62],[82.31,15.21],[81.73,14.78],[81.48,14.11],[81.52,13.3],[81.48,12.5],[81.27,11.69],[81.17,10.88],[81.02,10.21],[80.64,9.7],[80.15,9.19],[79.49,8.66],[78.73,8.18],[77.89,8.1],[77.15,8.61],[76.72,9.39],[76.34,10.2],[75.8,11],[75.25,11.81],[74.87,12.62],[74.57,13.43],[74.15,14.24],[73.7,15.04],[73.3,15.85],[72.96,16.66],[72.79,17.47],[72.73,18.27],[72.65,19.08],[72.5,19.72],[71.99,19.94],[71.1,19.92],[70.11,20.12],[69.24,20.68],[68.61,21.43],[68.18,22.2],[68.1,22.92],[68.63,23.37],[69.52,23.52],[70.26,23.71],[70.42,24.15],[70.09,24.75],[69.73,25.42],[69.66,26.13],[70.13,26.77],[70.93,27.02],[71.61,27.11],[72.24,27.59],[72.9,28.32],[73.49,29.01],[73.98,29.69],[74.29,30.42],[74.17,31.14],[73.74,31.85],[73.51,32.61],[73.45,33.31],[73.07,33.92],[72.79,34.54],[73.22,35.08],[74,35.39]];
const USA = [[-124,48.3],[-124,44],[-123.2,42],[-122,37],[-120.5,34.5],[-118,34],[-117.2,32.6],[-114.7,32.6],[-111,31.4],[-108,31.4],[-106.5,31.8],[-103,29],[-101,29.6],[-99,27.5],[-97.2,26],[-95,28.7],[-92,29.6],[-90,29],[-88.5,30.3],[-85,29.7],[-83,29],[-82.2,27.5],[-81,25.3],[-80.2,25.2],[-80.5,28],[-81.5,30.7],[-79,33],[-77,34.5],[-75.5,37],[-74,39.5],[-71.5,41.3],[-70,43],[-69,44],[-67,44.8],[-69.2,47.2],[-71,45],[-75,44.6],[-77,43.6],[-79,43.4],[-82.5,41.7],[-83,42.3],[-82.5,45],[-84.7,46.5],[-88,48],[-90,47.5],[-95,49],[-104,49],[-117,49],[-123,49],[-124,48.3]];

const TECHS = ['SaaS Platforms', 'Applied AI', 'Machine Learning', 'Cloud Infrastructure', 'DevOps', 'Cybersecurity', 'Networking', 'Data Engineering', 'Web Apps', 'Mobile Apps', 'API Design', 'Automation', 'UI / UX', 'Digital Marketing', 'Brand Strategy', 'Event Production', 'Studio & Media', 'Server Systems', 'Databases', 'Analytics'];

export function initGlobe(canvas, iconUrl) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parent = canvas.parentElement;
  let w = parent.clientWidth || 600;
  let h = parent.clientHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  renderer.setClearAlpha(0);

  const group = new THREE.Group();
  scene.add(group);
  group.scale.z = -1; // correct east-west handedness so country shapes read right
  const R = 2.0;

  /* ---- graticule (latitude + longitude lines) ---- */
  const colY = (y) => gradAt((y / R) * 0.5 + 0.5);
  const segPos = [], segCol = [];
  const addSeg = (a, b) => {
    segPos.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    const c1 = colY(a[1]), c2 = colY(b[1]);
    segCol.push(c1[0], c1[1], c1[2], c2[0], c2[1], c2[2]);
  };
  const SEG = 72;
  for (let lat = -75; lat <= 75; lat += 15) {
    const rad = (lat * Math.PI) / 180, ry = R * Math.sin(rad), rr = R * Math.cos(rad);
    let prev = null;
    for (let s = 0; s <= SEG; s++) {
      const a = (s / SEG) * Math.PI * 2;
      const p = [rr * Math.cos(a), ry, rr * Math.sin(a)];
      if (prev) addSeg(prev, p);
      prev = p;
    }
  }
  for (let lon = 0; lon < 360; lon += 20) {
    const lonr = (lon * Math.PI) / 180;
    let prevm = null;
    for (let sm = 0; sm <= SEG; sm++) {
      const phi = -Math.PI / 2 + (sm / SEG) * Math.PI;
      const ryv = R * Math.sin(phi), rrv = R * Math.cos(phi);
      const pv = [rrv * Math.cos(lonr), ryv, rrv * Math.sin(lonr)];
      if (prevm) addSeg(prevm, pv);
      prevm = pv;
    }
  }
  const webGeo = new THREE.BufferGeometry();
  webGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(segPos), 3));
  webGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(segCol), 3));
  group.add(new THREE.LineSegments(webGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.3 })));

  /* ---- nodes at graticule intersections (each = a technology) ---- */
  const nodes = [];
  for (let latn = -75; latn <= 75; latn += 15) {
    const radn = (latn * Math.PI) / 180, ryn = R * Math.sin(radn), rrn = R * Math.cos(radn);
    for (let lonn = 0; lonn < 360; lonn += 20) {
      const lonrn = (lonn * Math.PI) / 180;
      nodes.push([rrn * Math.cos(lonrn), ryn, rrn * Math.sin(lonrn)]);
    }
  }
  const nodeCount = nodes.length;
  const npos = new Float32Array(nodeCount * 3), ncol = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount; i++) {
    npos[i * 3] = nodes[i][0]; npos[i * 3 + 1] = nodes[i][1]; npos[i * 3 + 2] = nodes[i][2];
    const cn = colY(nodes[i][1]);
    ncol[i * 3] = cn[0]; ncol[i * 3 + 1] = cn[1]; ncol[i * 3 + 2] = cn[2];
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(npos, 3));
  nodeGeo.setAttribute('color', new THREE.BufferAttribute(ncol, 3));
  group.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({ size: 0.042, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.95 })));

  /* ---- country outlines: India + USA ---- */
  const HI = 0x2b7fd4;
  const ll2v = (lon, lat, rad) => {
    const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
    return [rad * Math.cos(la) * Math.cos(lo), rad * Math.sin(la), rad * Math.cos(la) * Math.sin(lo)];
  };
  const drawCountry = (coords, o) => {
    const col = o.color;
    const pts2 = coords.map((c) => new THREE.Vector2(c[0], c[1]));
    if (pts2.length > 1 && pts2[0].equals(pts2[pts2.length - 1])) pts2.pop();
    if (o.fill) {
      try {
        const tris = THREE.ShapeUtils.triangulateShape(pts2, []);
        const fpos = [];
        pts2.forEach((p) => { const v = ll2v(p.x, p.y, R * 1.005); fpos.push(v[0], v[1], v[2]); });
        const fidx = [];
        tris.forEach((t) => fidx.push(t[0], t[1], t[2]));
        const fg = new THREE.BufferGeometry();
        fg.setAttribute('position', new THREE.Float32BufferAttribute(fpos, 3));
        fg.setIndex(fidx);
        group.add(new THREE.Mesh(fg, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: o.fillOp || 0.3, side: THREE.DoubleSide, depthWrite: false })));
      } catch (e) { /* non-fatal */ }
    }
    const mk = (rad, op) => {
      const pts = [];
      coords.forEach((c) => { const v = ll2v(c[0], c[1], rad); pts.push(v[0], v[1], v[2]); });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      return new THREE.LineLoop(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }));
    };
    if (o.halo) group.add(mk(R * 1.015, 0.25));
    group.add(mk(R * 1.009, o.lineOp || 0.98));
  };
  drawCountry(INDIA, { color: HI, fill: true, halo: true });
  drawCountry(USA, { color: HI, fill: true, halo: true });

  /* ---- ambient particle field ---- */
  const N = 320, ap = new Float32Array(N * 3), ac = new Float32Array(N * 3);
  for (let fi = 0; fi < N; fi++) {
    const r = R * 1.3 + Math.random() * R * 0.9, th = Math.random() * Math.PI * 2, ph2 = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(ph2) * Math.cos(th), y = r * Math.cos(ph2), z = r * Math.sin(ph2) * Math.sin(th);
    ap[fi * 3] = x; ap[fi * 3 + 1] = y; ap[fi * 3 + 2] = z;
    const cf = gradAt((y / (R * 2.2)) * 0.5 + 0.5);
    ac[fi * 3] = cf[0]; ac[fi * 3 + 1] = cf[1]; ac[fi * 3 + 2] = cf[2];
  }
  const fieldGeo = new THREE.BufferGeometry();
  fieldGeo.setAttribute('position', new THREE.BufferAttribute(ap, 3));
  fieldGeo.setAttribute('color', new THREE.BufferAttribute(ac, 3));
  const field = new THREE.Points(fieldGeo, new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.45 }));
  scene.add(field);

  /* ---- hover label (one per technology node) ---- */
  const nodeTech = [];
  for (let ti = 0; ti < nodeCount; ti++) nodeTech.push(TECHS[(ti * 7) % TECHS.length]);
  parent.querySelectorAll('[data-mvx-label],[data-mvx-pin]').forEach((n) => n.remove());
  const label = document.createElement('div');
  label.setAttribute('data-mvx-label', '');
  label.className = 'globe-label';
  label.innerHTML = '<i></i><span data-txt></span>';
  parent.appendChild(label);
  const labelTxt = label.querySelector('[data-txt]');

  /* ---- served-region pins (India + USA at real lat/lon) ---- */
  const toLocal = (lat, lon) => {
    const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
    return [R * Math.cos(la) * Math.cos(lo), R * Math.sin(la), R * Math.cos(la) * Math.sin(lo)];
  };
  const makePin = (name) => {
    const el = document.createElement('div');
    el.setAttribute('data-mvx-pin', '');
    el.className = 'globe-pin';
    el.innerHTML = `<span class="ping"></span><span class="core"></span><span class="tag">${name}</span>`;
    parent.appendChild(el);
    return el;
  };
  const pins = [
    { name: 'India', p: toLocal(11.0, 76.96) },
    { name: 'USA', p: toLocal(40.65, -73.95) },
  ].map((m) => ({ el: makePin(m.name), p: m.p }));

  /* ---- Mervix icon on the south-pole cap ---- */
  const capAngle = (36 * Math.PI) / 180, NRr = 26, NTH = 56, capPos = [], capUV = [], capIdx = [], capRad = R * 1.004;
  for (let ci = 0; ci <= NRr; ci++) {
    const frac = ci / NRr, aa = frac * capAngle;
    for (let cj = 0; cj <= NTH; cj++) {
      const cth = (cj / NTH) * Math.PI * 2;
      capPos.push(capRad * Math.sin(aa) * Math.cos(cth), -capRad * Math.cos(aa), capRad * Math.sin(aa) * Math.sin(cth));
      capUV.push(0.5 + 0.5 * frac * Math.cos(cth), 0.5 + 0.5 * frac * Math.sin(cth));
    }
  }
  const capRow = NTH + 1;
  for (let pi = 0; pi < NRr; pi++)
    for (let pj = 0; pj < NTH; pj++) {
      const pa = pi * capRow + pj;
      capIdx.push(pa, pa + 1, pa + capRow, pa + 1, pa + capRow + 1, pa + capRow);
    }
  const capGeo = new THREE.BufferGeometry();
  capGeo.setAttribute('position', new THREE.Float32BufferAttribute(capPos, 3));
  capGeo.setAttribute('uv', new THREE.Float32BufferAttribute(capUV, 2));
  capGeo.setIndex(capIdx);
  const capMat = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false });
  new THREE.TextureLoader().load(iconUrl, (t) => { t.colorSpace = THREE.SRGBColorSpace; capMat.map = t; capMat.needsUpdate = true; });
  group.add(new THREE.Mesh(capGeo, capMat));

  /* ---- flashing dots on the icon ring ---- */
  const dotCanvas = document.createElement('canvas');
  dotCanvas.width = dotCanvas.height = 64;
  const dctx = dotCanvas.getContext('2d');
  dctx.beginPath(); dctx.arc(32, 32, 28, 0, Math.PI * 2); dctx.fillStyle = '#fff'; dctx.fill();
  const dotTex = new THREE.CanvasTexture(dotCanvas);
  const flashPos = [];
  nodes.forEach((n) => { if (n[1] < -0.78 * R && n[1] > -0.92 * R) flashPos.push(n[0] * 1.006, n[1] * 1.006, n[2] * 1.006); });
  const flashGeo = new THREE.BufferGeometry();
  flashGeo.setAttribute('position', new THREE.Float32BufferAttribute(flashPos, 3));
  const flashMat = new THREE.PointsMaterial({ color: 0x5aa6ee, map: dotTex, size: 0.09, sizeAttenuation: true, transparent: true, opacity: 0.7, depthTest: false });
  const flashPts = new THREE.Points(flashGeo, flashMat);
  flashPts.renderOrder = 5;
  group.add(flashPts);

  /* ---- interactive cursor connection lines ---- */
  const MAXC = 14;
  const cpos = new Float32Array(MAXC * 2 * 3);
  const cursorGeo = new THREE.BufferGeometry();
  cursorGeo.setAttribute('position', new THREE.BufferAttribute(cpos, 3).setUsage(THREE.DynamicDrawUsage));
  const cursorLines = new THREE.LineSegments(cursorGeo, new THREE.LineBasicMaterial({ color: 0x1e9c8c, transparent: true, opacity: 0.0 }));
  cursorLines.frustumCulled = false;
  scene.add(cursorLines);
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3).setUsage(THREE.DynamicDrawUsage));
  const cursorDot = new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x2b7fd4, size: 0.13, sizeAttenuation: true, transparent: true, opacity: 0 }));
  cursorDot.frustumCulled = false;
  scene.add(cursorDot);

  /* ---- interaction state ---- */
  const state = { rotX: 0.72, rotY: 0, velX: 0, velY: 0, dragging: false, lastX: 0, lastY: 0, hover: false, ndcX: 2, ndcY: 2, cw: new THREE.Vector3(99, 99, 99) };
  const setNDC = (cx, cy) => {
    const rect = canvas.getBoundingClientRect();
    state.ndcX = ((cx - rect.left) / rect.width) * 2 - 1;
    state.ndcY = -((cy - rect.top) / rect.height) * 2 + 1;
    state.hover = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  };
  const onDown = (e) => { state.dragging = true; state.lastX = e.clientX; state.lastY = e.clientY; canvas.style.cursor = 'grabbing'; };
  const onMove = (e) => {
    setNDC(e.clientX, e.clientY);
    if (state.dragging) {
      const dx = e.clientX - state.lastX, dy = e.clientY - state.lastY;
      state.rotY += dx * 0.006;
      state.rotX = Math.max(-1.1, Math.min(1.1, state.rotX + dy * 0.006));
      state.velY = dx * 0.006; state.velX = dy * 0.006;
      state.lastX = e.clientX; state.lastY = e.clientY;
    }
  };
  const onUp = () => { if (state.dragging) { state.dragging = false; canvas.style.cursor = 'grab'; } };
  const onLeave = () => { state.hover = false; state.ndcX = 2; };
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.style.cursor = 'grab';

  const fitCamera = () => {
    const halfV = Math.tan((camera.fov * Math.PI) / 180 / 2);
    const half = Math.min(halfV, halfV * camera.aspect);
    camera.position.z = (R * 1.12) / half;
    const halfW = halfV * camera.aspect * camera.position.z;
    const off = camera.aspect > 1.15 ? Math.min(halfW * 0.34, halfW - R * 0.98) : 0;
    camera.position.x = -off;
  };
  const resize = () => {
    w = parent.clientWidth || w; h = parent.clientHeight || h;
    camera.aspect = w / h;
    fitCamera();
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  const ray = new THREE.Vector3(), tmp = new THREE.Vector3(), oc = new THREE.Vector3();
  const worldNodes = [];
  for (let wi = 0; wi < nodeCount; wi++) worldNodes.push(new THREE.Vector3());
  let dotOp = 0, tAccum = 0, raf = 0;

  const animate = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    tAccum += dt;
    const sf = 0.5 + 0.5 * Math.sin(tAccum * 3.2);
    flashMat.opacity = 0.22 + 0.58 * sf;
    flashMat.size = 0.055 + 0.04 * sf;
    if (!state.dragging) {
      state.rotY += state.velY; state.rotX += state.velX;
      state.velY *= 0.93; state.velX *= 0.93;
      if (!reduceMotion) {
        state.rotY += 0.0022;
        state.rotX += (0.72 - state.rotX) * 0.003;
      }
    }
    group.rotation.set(state.rotX, state.rotY, 0);
    if (!reduceMotion) field.rotation.y -= dt * 0.03;
    group.updateMatrixWorld();

    for (let q = 0; q < pins.length; q++) {
      const pin = pins[q];
      tmp.set(pin.p[0], pin.p[1], pin.p[2]).applyMatrix4(group.matrixWorld);
      const wz = tmp.z;
      tmp.project(camera);
      const rc = canvas.getBoundingClientRect();
      pin.el.style.left = `${(tmp.x * 0.5 + 0.5) * rc.width}px`;
      pin.el.style.top = `${(-tmp.y * 0.5 + 0.5) * rc.height}px`;
      pin.el.style.opacity = Math.max(0, Math.min(1, (wz + 0.5) / 0.9)).toFixed(2);
    }

    let active = false, hit = false;
    if (state.hover && state.ndcX <= 1 && state.ndcX >= -1) {
      ray.set(state.ndcX, state.ndcY, 0.5).unproject(camera).sub(camera.position).normalize();
      oc.copy(camera.position);
      const b = oc.dot(ray), cc = oc.lengthSq() - R * R, disc = b * b - cc;
      if (disc >= 0) {
        const tt = -b - Math.sqrt(disc);
        state.cw.copy(camera.position).add(tmp.copy(ray).multiplyScalar(tt));
        hit = true;
      }
      active = true;
    }
    let li = 0, bestIdx = -1;
    if (active) {
      for (let ii = 0; ii < nodeCount; ii++) {
        tmp.set(npos[ii * 3], npos[ii * 3 + 1], npos[ii * 3 + 2]).applyMatrix4(group.matrixWorld);
        worldNodes[ii].copy(tmp);
      }
      const rect2 = canvas.getBoundingClientRect();
      const pw = rect2.width, ph = rect2.height;
      const csx = (state.ndcX * 0.5 + 0.5) * pw, csy = (-state.ndcY * 0.5 + 0.5) * ph;
      let best = 1e12;
      for (let jj = 0; jj < nodeCount; jj++) {
        if (worldNodes[jj].z < -0.1) continue;
        tmp.copy(worldNodes[jj]).project(camera);
        const sx = (tmp.x * 0.5 + 0.5) * pw, sy = (-tmp.y * 0.5 + 0.5) * ph;
        const ds = (sx - csx) * (sx - csx) + (sy - csy) * (sy - csy);
        if (ds < best) { best = ds; bestIdx = jj; }
      }
      if (best > 120 * 120) bestIdx = -1;
      if (bestIdx >= 0) {
        const bn = worldNodes[bestIdx];
        if (!hit) state.cw.copy(bn);
        const cand = [];
        for (let kk = 0; kk < nodeCount; kk++) {
          const d = worldNodes[kk].distanceTo(state.cw);
          if (d < R * 0.72 && worldNodes[kk].z > -0.1) cand.push([d, kk]);
        }
        cand.sort((a2, b2) => a2[0] - b2[0]);
        const k = Math.min(3, cand.length);
        for (let nn = 0; nn < k; nn++) {
          const wn = worldNodes[cand[nn][1]];
          cpos[li++] = state.cw.x; cpos[li++] = state.cw.y; cpos[li++] = state.cw.z;
          cpos[li++] = wn.x; cpos[li++] = wn.y; cpos[li++] = wn.z;
        }
        dotGeo.attributes.position.setXYZ(0, bn.x, bn.y, bn.z);
        dotGeo.attributes.position.needsUpdate = true;
        tmp.copy(bn).project(camera);
        label.style.left = `${(tmp.x * 0.5 + 0.5) * pw}px`;
        label.style.top = `${(-tmp.y * 0.5 + 0.5) * ph}px`;
        if (labelTxt.textContent !== nodeTech[bestIdx]) labelTxt.textContent = nodeTech[bestIdx];
      }
    }
    const show = active && bestIdx >= 0;
    label.style.opacity = show ? '1' : '0';
    cursorGeo.attributes.position.needsUpdate = true;
    cursorGeo.setDrawRange(0, li / 3);
    dotOp += ((show ? 0.95 : 0) - dotOp) * 0.18;
    cursorDot.material.opacity = dotOp;
    cursorLines.material.opacity = 0.12 + dotOp * 0.6;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  raf = requestAnimationFrame(animate);

  /* ---- cleanup (React unmount / StrictMode remount) ---- */
  return () => {
    cancelAnimationFrame(raf);
    canvas.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    canvas.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('resize', resize);
    label.remove();
    pins.forEach((p) => p.el.remove());
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    });
    renderer.dispose();
  };
}
