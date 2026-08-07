import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import { Link } from '../lib/router.jsx';
import { posts } from '../data/content.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { useJsonLd } from '../lib/useJsonLd.js';

export default function PostPage({ slug }) {
  const post = posts.find((p) => p.slug === slug);
  usePageMeta(post ? post.title : 'Post not found', post?.excerpt);
  useJsonLd(post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Mervix Group' },
    publisher: { '@type': 'Organization', name: 'Mervix Group' },
  } : null);

  if (!post) {
    return (
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Mesh />
        <Nav />
        <section className="section legal">
          <h1>Post not found</h1>
          <p style={{ marginTop: 16 }}>
            <Link to="/insights">← Back to insights</Link>
          </p>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <ScrollProgress />
      <Mesh />

      <Nav />

      <section className="section legal post-body-section">
        <Reveal as="div" className="page-back">
          <Link to="/insights">← Back to insights</Link>
        </Reveal>
        <div className="legal-head">
          <Reveal className="eyebrow" delay={40}>{post.category.toUpperCase()}</Reveal>
          <Reveal as="h1" delay={80}>{post.title}</Reveal>
          <Reveal as="p" delay={120} className="legal-updated">{post.date} · {post.readTime}</Reveal>
        </div>
        <div className="legal-body">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
