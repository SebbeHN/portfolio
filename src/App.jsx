import { useState } from 'react'
import './App.css'

const projects = [
  { title: 'Öl-priser', type: 'Webbapp', year: 'Projekt', description: 'En tjänst för att hitta billigast öl runt om i Malmö och sortera alternativ efter exempelvis pris eller avstånd.', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1200&q=85', href: 'https://github.com/SebbeHN/olpriser', tone: 'project--coral' },
  { title: 'BeUniq', type: 'Webbplats', year: 'Projekt', description: 'En webbplats för ett resebolag där besökare kan anmäla sig, önska resor och få personliga offerter från BeUniq.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', href: 'https://www.beuniq.se', tone: 'project--blue' },
  { title: 'AI Football Scout', type: 'AI & analys', year: 'Projekt', description: 'Ett projekt som utforskar hur AI kan användas för fotbollsscouting och spelaranalys.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85', href: 'https://github.com/SebbeHN/ai-football-scout', tone: 'project--green' },
]

function App() {
  const [filter, setFilter] = useState('Alla')
  const filters = ['Alla', 'Webbapp', 'Webbplats', 'AI & analys']
  const visibleProjects = filter === 'Alla' ? projects : projects.filter((project) => project.type === filter)

  return (
    <main>
      <nav className="nav shell" aria-label="Huvudnavigation">
        <a className="wordmark" href="#top" aria-label="Sebastian Holmberg, startsida">SH<span>.</span></a>
        <div className="nav__links"><a href="#work">Projekt</a><a href="#about">Om mig</a><a href="/Sebastian_holmberg_nilsson_cv.pdf" target="_blank" rel="noreferrer">CV <span>↗</span></a><a className="nav__contact" href="#contact">Hör av dig <span>↗</span></a></div>
      </nav>
      <header className="hero shell" id="top">
        <div className="hero__eyebrow"><span className="status-dot" /> Tillgänglig för nya möjligheter</div>
        <h1>Junior system-<br /><em>utvecklare</em></h1>
        <div className="hero__bottom"><p>Driven och nyfiken utvecklare med stort intresse för teknik, fotboll och att fortsätta växa genom riktiga problem.</p><a className="circle-link" href="#work" aria-label="Se projekt">↓</a></div>
        <div className="hero__scribble" aria-hidden="true">open to learn <span>↘</span></div>
      </header>
      <section className="work shell" id="work">
        <div className="section-heading"><p className="kicker">Utvalda projekt <span>(03)</span></p><p className="section-heading__note">Ett urval av saker jag har<br />tänkt, ritat och byggt.</p></div>
        <div className="filters" role="group" aria-label="Filtrera projekt">{filters.map((item) => <button className={filter === item ? 'filter filter--active' : 'filter'} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project, index) => <article className={`project ${project.tone} ${index === 0 ? 'project--featured' : ''}`} key={project.title}><a href={project.href} target="_blank" rel="noreferrer" className="project__image-wrap" aria-label={`Öppna ${project.title}`}><img src={project.image} alt={`${project.title} projektbild`} className="project__image" /><span className="project__arrow">↗</span></a><div className="project__meta"><div><h2>{project.title}</h2><p>{project.description}</p></div><div className="project__details"><span>{project.type}</span><span>{project.year}</span></div></div></article>)}</div>
      </section>
      <section className="about shell" id="about"><p className="kicker">Om Sebastian</p><div className="about__content"><h2>Nyfiken på hur<br /><em>saker fungerar.</em></h2><div className="about__copy"><p>Jag är 29 år och bor i Skåne. Jag söker en junior eller nyexaminerad roll inom systemutveckling, helst i Malmö eller Lund. På fritiden hittar du mig gärna framför en fotbollsmatch eller ute på planen.</p><a className="text-link" href="https://www.linkedin.com/in/sebastian-holmberg-nilsson-02a4161a1/" target="_blank" rel="noreferrer">Besök LinkedIn <span>↗</span></a></div></div><div className="skills"><span>Java</span><span>C#</span><span>React</span><span>Kotlin</span><span>Python</span><span>Spring Boot</span><span>TypeScript</span></div></section>
      <footer className="footer shell" id="contact"><div className="footer__intro"><p className="kicker">Malmö / Lund / Skåne</p><h2>Vi borde<br /><em>prata.</em></h2></div><div className="footer__links"><a className="email-link" href="mailto:Sebbe_97@outlook.com">Sebbe_97@outlook.com <span>↗</span></a><div><a href="/Sebastian_holmberg_nilsson_cv.pdf" target="_blank" rel="noreferrer">Ladda ner CV</a><a href="https://github.com/SebbeHN" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/sebastian-holmberg-nilsson-02a4161a1/" target="_blank" rel="noreferrer">LinkedIn</a></div></div><div className="footer__bottom"><span>© 2026 Sebastian Holmberg Nilsson</span><span>Skåne / Sverige</span><a href="#top">Till toppen ↑</a></div></footer>
    </main>
  )
}

export default App
