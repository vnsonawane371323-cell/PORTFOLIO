import Seo from '../components/Seo'
import PageNav from '../components/PageNav'
import Footer from '../components/Footer'
import Projects from '../components/sections/Projects'

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <Seo
        title="Projects | Vedant Sonawane"
        description="Projects by Vedant Sonawane covering full stack development, AI, and product design. Explore Swasthyam, Yatraveer, Lifelink, and more."
        path="/projects"
        keywords="Vedant Sonawane projects, full stack projects, AI projects, software developer portfolio"
      />

      <PageNav />

      <main className="page-main">
        <section className="page-hero">
          <div className="page-hero-text">
            <p className="page-kicker">Selected Work</p>
            <h1>Projects by Vedant Sonawane</h1>
            <p className="page-hero-sub">
              A focused collection of software engineering, AI, and product design projects built by Vedant Sonawane.
            </p>
          </div>
        </section>

        <Projects />
      </main>

      <Footer />
    </div>
  )
}
