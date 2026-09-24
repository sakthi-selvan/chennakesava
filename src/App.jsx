import { useEffect } from 'react'
import BackgroundFrames from './components/BackgroundFrames'
import ProjectGrid from './components/ProjectGrid'
import {
  capabilities,
  education,
  experience,
  nav,
  profile,
  snapshot,
} from './data/portfolio-content'
import './App.css'

function App() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return undefined
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <BackgroundFrames />

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            {profile.monogram}
          </span>
          <span className="brand-name">{profile.shortName}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-resume" href={profile.resumeHref} download>
          Resume
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-name">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="hero-name">{profile.fullName}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-lead">{profile.lead}</p>
          <div className="hero-actions">
            <a className="button-primary" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a className="button-ghost" href={profile.resumeHref} download>
              Download resume
            </a>
            <a className="button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <section className="snapshot" aria-label="Career snapshot">
          {snapshot.map((item) => (
            <article key={item.label} className="snapshot-card">
              <p className="snapshot-label">{item.label}</p>
              <h2>{item.value}</h2>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section id="experience" className="section">
          <header className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>From automotive ECU training into production R&amp;D.</h2>
            <p className="section-lead">
              The recent path is practical: eight months on CAN-based vehicle communication, then embedded software
              and Linux systems inside an engineering R&amp;D team.
            </p>
          </header>

          <ol className="timeline">
            {experience.map((role) => (
              <li key={role.id} className="timeline-item">
                <div className="timeline-meta">
                  <p className="timeline-dates">{role.dates}</p>
                  {role.location ? <p className="timeline-place">{role.location}</p> : null}
                </div>
                <div className="timeline-body">
                  <p className="timeline-org">{role.organization}</p>
                  <h3>
                    {role.role}
                    <span>{role.context}</span>
                  </h3>
                  <p className="timeline-summary">{role.summary}</p>
                  {role.highlights.length > 0 ? (
                    <ul>
                      {role.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="section">
          <header className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Firmware, Linux software, and the buses in between.</h2>
            <p className="section-lead">
              A concise set of projects a hiring team can scan: microcontroller firmware, automotive sensing,
              Linux IPC, and one academic controls study.
            </p>
          </header>

          <ProjectGrid />
        </section>

        <section id="capabilities" className="section">
          <header className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>What I can sit down and build.</h2>
            <p className="section-lead">
              Skills listed here come from the explicit skills and project work on the resume — languages, buses,
              Linux, and the debug habits used to prove a system.
            </p>
          </header>

          <div className="capability-grid">
            {capabilities.map((group) => (
              <article key={group.number} className="capability-card">
                <p className="capability-number">{group.number}</p>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="chip-row">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education">
          <header className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>{education.degree}</h2>
          </header>
          <div className="education-card">
            <p className="education-field">{education.field}</p>
            <p>{education.institution}</p>
            <p className="education-meta">
              {education.dates} · {education.grade}
            </p>
          </div>
        </section>

        <section id="contact" className="section contact">
          <header className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>If you are hiring for embedded software, Linux, or automotive electronics, write to me.</h2>
            <p className="section-lead">
              I am based in Bangalore and available for roles that need firmware, board bring-up, or Linux-based
              embedded development.
            </p>
          </header>
          <div className="contact-actions">
            <a className="button-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="button-ghost" href={profile.phone.href}>
              {profile.phone.display}
            </a>
            <a className="button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn profile
            </a>
            <a className="button-ghost" href={profile.resumeHref} download>
              PDF resume
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          {profile.fullName} · {profile.role}
        </p>
        <p>Bangalore · Move the cursor to scrub the board. Scroll does the same on touch.</p>
      </footer>
    </>
  )
}

export default App
