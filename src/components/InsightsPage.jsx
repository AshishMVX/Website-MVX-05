import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import { posts } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { spotlight } from '../lib/spotlight.js';

const categories = [...new Set(posts.map((p) => p.category))];

export default function InsightsPage() {
  usePageMeta('Insights', "Notes on building SaaS, applying AI, running infrastructure, and growing brands — from across the Mervix Group.");
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      <div className="page-hero">
        <div className="page-hero-copy">
          <Reveal className="eyebrow">INSIGHTS</Reveal>
          <Reveal as="h1" delay={60}>Notes from the field.</Reveal>
          <Reveal as="p" delay={120}>
            What we're learning building software, applying AI, running
            infrastructure, and putting products in front of people.
          </Reveal>
        </div>

        <Reveal className="page-hero-aside" delay={140}>
          <div className="page-hero-stat-row">
            <div className="page-hero-stat">
              <span className="page-hero-stat-num text-grad">{posts.length}</span>
              <span className="page-hero-stat-label">Articles</span>
            </div>
            <div className="page-hero-stat">
              <span className="page-hero-stat-num text-grad">{categories.length}</span>
              <span className="page-hero-stat-label">Topics</span>
            </div>
          </div>
          <div className="page-hero-aside-divider" />
          <div className="page-hero-aside-tags">
            {categories.map((cat) => (
              <span key={cat} className="page-hero-aside-tag">{cat}</span>
            ))}
          </div>
        </Reveal>
      </div>

      <section className="section">
        <div className="posts-grid">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                to={`/insights/${post.slug}`}
                className="post-card lift"
                onClick={() => track('select_content', { content_type: 'post', item_id: post.slug })}
                onMouseMove={spotlight}
              >
                <span className="eyebrow post-card-cat">{post.category.toUpperCase()}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-card-meta">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
