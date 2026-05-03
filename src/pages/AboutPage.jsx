import Seo from '../components/Seo'
import PageNav from '../components/PageNav'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Seo
        title="About Vedant Sonawane | Vedant Sonawane"
        description="Official Portfolio of Vedant Sonawane. Learn about Vedant Sonawane, a Software Developer, AI Enthusiast, and Full Stack Engineer specializing in React, Node.js, and modern web development."
        path="/about-vedant-sonawane"
        keywords="Vedant Sonawane, about Vedant Sonawane, software developer, AI enthusiast, full stack engineer"
        image="/vedant-sonawane-developer.jpg"
      />

      <PageNav />

      <main className="page-main">
        <section className="page-hero">
          <div className="page-hero-text">
            <p className="page-kicker">Official Portfolio of Vedant Sonawane</p>
            <h1>About Vedant Sonawane</h1>
            <p className="page-hero-sub">
              Vedant Sonawane is a Software Developer, AI Enthusiast, and Full Stack Engineer who builds reliable, high-performance web applications with a design-first mindset.
            </p>
          </div>
          <img
            src="/vedant-sonawane-developer.jpg"
            alt="Vedant Sonawane Software Developer"
            width="520"
            height="640"
            loading="lazy"
            decoding="async"
            className="page-hero-image"
          />
        </section>

        <section className="page-section">
          <h2>Professional Focus</h2>
          <p>
            Vedant specializes in React, Next.js, Node.js, and UI engineering. He combines product thinking with clean, scalable code to deliver end-to-end experiences across web platforms.
          </p>
        </section>

        <section className="page-section">
          <h2>Skills Snapshot</h2>
          <div className="page-grid">
            <div className="page-card">Frontend Engineering · React · Next.js · TypeScript</div>
            <div className="page-card">Full Stack Development · Node.js · REST APIs</div>
            <div className="page-card">AI Tools · Prompt Engineering · Workflow Automation</div>
            <div className="page-card">UI/UX · Design Thinking · Figma</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
