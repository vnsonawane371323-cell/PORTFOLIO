import Seo from '../components/Seo'
import PageNav from '../components/PageNav'

export default function NotFoundPage() {
  return (
    <div className="page-shell">
      <Seo
        title="Page Not Found | Vedant Sonawane"
        description="The page you are looking for does not exist on Vedant Sonawane's portfolio."
        path="/404"
      />

      <PageNav />

      <main className="page-main">
        <section className="page-hero">
          <div className="page-hero-text">
            <p className="page-kicker">404</p>
            <h1>Page Not Found</h1>
            <p className="page-hero-sub">
              Head back to the official portfolio to explore projects, skills, and contact details.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
