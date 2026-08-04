import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Hero from './Hero.jsx';
import WhatWeDo from './WhatWeDo.jsx';
import TheGroup from './TheGroup.jsx';
import About from './About.jsx';
import Team from './Team.jsx';
import Testimonials from './Testimonials.jsx';
import Careers from './Careers.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />

      <Nav />
      <Hero />
      <WhatWeDo />
      <TheGroup />
      <About />
      <Team />
      <Testimonials />
      <Careers />
      <Contact />
      <Footer />
    </div>
  );
}
