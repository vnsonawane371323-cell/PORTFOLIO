import Seo from '../components/Seo'
import PageNav from '../components/PageNav'
import Footer from '../components/Footer'

export default function BlogPage() {
  return (
    <div className="page-shell">
      <Seo
        title="Blog | Vedant Sonawane"
        description="The Vedant Sonawane blog for software development, AI, and full stack engineering insights, notes, and tutorials."
        path="/blog"
        keywords="Vedant Sonawane blog, software development blog, AI engineering, full stack notes"
      />

      <PageNav />

      <main className="page-main">
        <section className="page-hero">
          <div className="page-hero-text">
            <p className="page-kicker">Insights & Notes</p>
            <h1>Vedant Sonawane Blog</h1>
            <p className="page-hero-sub">
              Upcoming articles on software development, AI, and building production-ready full stack systems.
            </p>
          </div>
        </section>

        <section className="page-section">
          <h2>Coming Soon</h2>
          <p>
            This section will host long-form content to support SEO and share Vedant Sonawane's engineering process.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
