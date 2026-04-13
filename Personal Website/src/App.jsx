import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import everestImage from './assets/everest.jpg'
import komodoImage from './assets/komodo.jpg'
import budvaImage from './assets/budva.jpg'
import cvFile from '/src/assets/DeclanHughesCV.pdf'
import { projectRegistry } from './content/projectsRegistry'

const heroImages = [everestImage, komodoImage, budvaImage]
const siteNav = ['home', 'about', 'projects', 'contact']
const reveal = { duration: 0.32, ease: 'easeOut' }

function RegistryCard({ project, onOpen }) {
  const statusClass =
    project.status.toUpperCase() === 'COMPLETE'
      ? 'status-complete'
      : project.status.toUpperCase() === 'ONGOING'
        ? 'status-ongoing'
        : 'status-draft'

  return (
    <button
      type="button"
      className={`registry-card registry-${project.layout}`}
      onClick={() => onOpen(project.id)}
    >
      {project.layout !== 'compact' && (
        <div className="registry-media">
          <picture>
            <source srcSet={project.mobileImage || project.heroImage} media="(max-width: 600px)" />
            <img src={project.heroImage} alt={`${project.title} preview`} />
          </picture>
        </div>
      )}
      <div className="registry-body">
        <p className="meta-line">
          <span>{project.refCode}</span>
          <span>{project.year}</span>
        </p>
        <h3>{project.title}</h3>
        <p className="registry-summary">{project.summary}</p>
        <div className="pill-row">
          <span className="attribute-pill">{project.role}</span>
          <span className={`status-pill ${statusClass}`}>{project.status}</span>
        </div>
      </div>
    </button>
  )
}

function AboutPanel() {
  return (
    <section className="page-section section-open motif-surface">
      <div className="motif-layer" aria-hidden />
      <p className="kicker">Archive / Profile</p>
      <div className="section-rule" aria-hidden />
      <div className="about-grid">
        <h2>Working across product, systems, and delivery.</h2>
        <div>
          <p>
            I'm interested in work that compounds: skills that transfer across domains, projects that teach me something new, and habits that make each iteration sharper than the last. By background I'm an operations-focused analyst with experience across consulting, technology, and engineering.
          </p>
          <p>
            I tend to do my best work in ambiguous environments where the problem isn’t fully defined, the system is a bit messy, and progress depends on understanding the reality of the situation rather than assumptions.
          </p>
          <a href={cvFile} target="_blank" rel="noopener noreferrer" className="text-link">
            View CV
          </a>
          {/* <div className="about-image-placeholder" aria-hidden>
            Archive image placeholder
          </div> */}
        </div>
      </div>
      <section className="timeline section-dense motif-surface">
        <div className="motif-layer motif-wash" aria-hidden />
        <article className="timeline-role">
          <p className="meta-line">
            <span>2025 - Present</span>
            <span>Work</span>
          </p>
          <h3>Rio AI</h3>
          <h4 className="timeline-meta">Sustainability Analyst</h4>
          <p> Supporting client delivery from onboarding through business-as-usual operations in a sustainability SaaS startup. My role sits between data, product, and delivery: understanding how the platform behaves in practice, diagnosing edge cases, and improving workflows so outcomes are accurate, repeatable, and visible. </p>
          <p>  This involves a mix of data analysis, stakeholder management, and process design - all aimed at making sustainability data more usable for real‑world decision‑making.</p>
          <div className="pill-row">
            <span className="attribute-pill">Climate</span>
            <span className="attribute-pill">Delivery</span>
            <span className="attribute-pill">Data</span>
            <span className="attribute-pill">AI</span>
          </div>
        </article>
        <div className="section-rule motif-divider" aria-hidden />
        <article className="timeline-role">
          <p className="meta-line">
            <span>2022 - 2024</span>
            <span>Work</span>
          </p>
          <h3>PA Consulting</h3>
          <h4 className="timeline-meta">Business Transformation Analyst</h4>
          <p> I worked on large-scale transformation programmes across public sector, defence, and energy clients, with a focus on operational delivery. This included redesigning operating models, preparing organisations for go-lives, and coordinating across complex stakeholder environments under real time pressure.</p> 
          <p> Alongside analysis and facilitation, I owned the unglamorous but essential mechanics - implementation plans, governance packs, RAID logs, assurance frameworks, and reporting cycles - that keep programmes moving. It’s where I learned how large organisations actually behave when incentives, constraints, and deadlines collide.</p>
          <div className="pill-row">
            <span className="attribute-pill">Strategy</span>
            <span className="attribute-pill">Delivery</span>
            <span className="attribute-pill">Operations</span>
          </div>
        </article>
        <div className="section-rule motif-divider" aria-hidden />
        <article className="timeline-role">
          <p className="meta-line">
            <span>2018 - 2021</span>
            <span>Education</span>
          </p>
          <h3>University of Warwick</h3>
          <h4 className="timeline-meta">Mechanical Engineering</h4>
          <p>
            Built a foundation in systems thinking, modeling, and structured problem solving. Engineering trained me to break complexity into things that can be built, tested, and improved - an approach that still shapes how I work today.
          </p>
          <div className="pill-row">
            <span className="attribute-pill">Engineering</span>
            <span className="attribute-pill">Systems Thinking</span>
          </div>
        </article>
      </section>
    </section>
  )
}

function ProjectGallery({ images, title, projectId }) {
  const [active, setActive] = useState(0)
  if (!images || images.length === 0) return null
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)
  return (
    <div className="prj-gallery">
      <div className={`prj-gallery-main${projectId === 'sql-analysis' || projectId === 'fintech-dashboard' ? ' prj-gallery-main--tall' : ''}`}>
        <img src={images[active]} alt={`${title} — image ${active + 1} of ${images.length}`} className="prj-gallery-img" />
        {images.length > 1 && (
          <>
            <button type="button" className="prj-gallery-arrow prj-gallery-arrow-prev" onClick={prev} aria-label="Previous image">←</button>
            <button type="button" className="prj-gallery-arrow prj-gallery-arrow-next" onClick={next} aria-label="Next image">→</button>
          </>
        )}
        <p className="prj-gallery-counter">{active + 1} / {images.length}</p>
      </div>
      {images.length > 1 && (
        <div className="prj-gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`prj-gallery-thumb${i === active ? ' prj-gallery-thumb-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" aria-hidden />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectOverview({ project, onBack, onOpenPost }) {
  return (
    <section className="page-section section-open motif-surface">
      <div className="motif-layer" aria-hidden />
      <button type="button" className="back-link" onClick={onBack}>
        Back to registry
      </button>

      <header className="project-head">
        <p className="kicker">
          {project.refCode} / {project.category}
        </p>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        {project.externalLink && (
          <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="text-link">
            Visit live project ↗
          </a>
        )}
      </header>

      <ProjectGallery images={project.galleryImages} title={project.title} projectId={project.id} />

      <div className="section-rule" aria-hidden />

      <div className="prj-overview-block">
        {project.overviewSections.map((section) => (
          <div key={section.heading} className="prj-overview-row">
            <p className="kicker prj-overview-label">{section.heading}</p>
            <p className="prj-overview-copy">{section.copy}</p>
          </div>
        ))}
      </div>

      <div className="section-rule" aria-hidden />

      <div className="prj-posts-block">
        <p className="kicker">Journal Entries</p>
        <div className="post-list">
          {project.posts.map((post) => (
            <button key={post.id} type="button" className="post-row" onClick={() => onOpenPost(post.id)}>
              <p className="meta-line">
                <span>{post.date}</span>
                <span>Read</span>
              </p>
              <h3>{post.title}</h3>
              <p>{post.snippet}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function PostDetail({ project, postId, onBackToProject, onNavigatePost }) {
  const posts = project.posts
  const postIndex = posts.findIndex((item) => item.id === postId)
  const post = posts[postIndex]
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null

  if (!post) {
    return null
  }

  return (
    <section className="page-section section-open">
      <button type="button" className="back-link" onClick={onBackToProject}>
        Back to {project.title}
      </button>
      <div className="journal-entry motif-surface">
        <div className="motif-layer" aria-hidden />
        <p className="kicker">{post.date}</p>
        <h2>{post.title}</h2>
        <div className="journal-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ ...props }) => (
                <figure className="journal-image-wrap">
                  <img {...props} className="journal-image" />
                  {props.title ? <figcaption className="journal-caption">{props.title}</figcaption> : null}
                </figure>
              ),
            }}
          >
          {post.markdown}
          </ReactMarkdown>
        </div>
        <div className="post-nav">
          <button type="button" disabled={!prevPost} onClick={() => prevPost && onNavigatePost(prevPost.id)}>
            {prevPost ? `Previous: ${prevPost.title}` : 'Previous'}
          </button>
          <button type="button" disabled={!nextPost} onClick={() => nextPost && onNavigatePost(nextPost.id)}>
            {nextPost ? `Next: ${nextPost.title}` : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      const day = now.toLocaleDateString([], { weekday: 'long' })
      setTimeString(`${time} / ${day} / London`)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const activeProject = useMemo(
    () => projectRegistry.find((project) => project.id === selectedProject),
    [selectedProject],
  )

  const handleSwitchView = (nextView) => {
    setView(nextView)
    setSelectedProject(null)
    setSelectedPost(null)
  }

  const renderProjectsView = () => {
    if (!activeProject) {
      return (
        <section className="page-section section-open motif-surface">
          <div className="motif-surface registry-title-block">
            <p className="kicker">Registry / Catalogue</p>
            <h2>Selected product and analytics work.</h2>
          </div>
          <div className="section-rule" aria-hidden />
          <div className="registry-grid motif-surface">
            {projectRegistry.map((project) => (
              <RegistryCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </div>
        </section>
      )
    }

    if (!selectedPost) {
      return (
        <ProjectOverview
          project={activeProject}
          onBack={() => setSelectedProject(null)}
          onOpenPost={setSelectedPost}
        />
      )
    }

    return (
      <PostDetail
        project={activeProject}
        postId={selectedPost}
        onBackToProject={() => setSelectedPost(null)}
        onNavigatePost={(nextPostId) => setSelectedPost(nextPostId)}
      />
    )
  }

  return (
    <div className={`site-shell ${view === 'home' ? 'home-active' : ''}`}>
      <div className="motif-strip-global" aria-hidden />
      <header className="site-header">
        <nav aria-label="Primary" className="site-nav">
          {siteNav.map((navItem) => (
            <button
              key={navItem}
              type="button"
              className={`nav-item ${view === navItem ? 'active' : ''}`}
              onClick={() => handleSwitchView(navItem)}
            >
              {navItem}
            </button>
          ))}
        </nav>
        <p className="meta-line top-meta">
          <span>Declan Hughes</span>
          <span>{timeString}</span>
        </p>
      </header>

      <main className={`main-frame ${view === 'home' ? 'home-main' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${selectedProject || 'registry'}-${selectedPost || 'overview'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={reveal}
          >
            {view === 'home' && (
              <section className="page-section hero home-cover motif-surface">
                <p className="kicker">Product Archive / Editorial System</p>
                <div className="hero-grid">
                  <div className="motif-surface hero-copy">
                    <div className="motif-layer motif-wash" aria-hidden />
                    <h1 className="cover-name" aria-label="Declan Hughes">
                      <span>Declan</span>
                      <span className="name-offset">Hughes</span>
                    </h1>
                    <p className="hero-line">
                      Product‑minded analyst building systems where strategy, delivery, and design compound into clearer decisions.
                    </p>
                    <p className="hero-philosophy">
                      A place to document the projects I've worked on, the thinking behind them and the learnings from the process. 
                    </p>
                  </div>
                  <div className="hero-media-wrap">
                    <div className="hero-media-future-slot" aria-hidden />
                    <div className="hero-tape hero-tape-secondary" aria-hidden />
                    <img src={heroImages[heroImageIndex]} alt="Travel archive" className="hero-media" />
                    <p className="meta-line">
                      <span>Travel photos</span>
                      <span>Personal archive</span>
                    </p>
                  </div>
                </div>
              </section>
            )}

            {view === 'about' && <AboutPanel />}
            {view === 'projects' && renderProjectsView()}
            {view === 'contact' && (
              <section className="page-section section-dense motif-surface">
                <p className="kicker">Contact</p>
                <h2>Open to conversations on product, analytics, and systems‑focused work.</h2>
                <div className="section-rule" aria-hidden />
                <div className="contact-grid motif-surface">
                  <div className="motif-layer motif-wash" aria-hidden />
                  <p>Based in London, available for roles and projects with strong product thinking and delivery ownership.</p>
                  <div>
                    <p className="meta-line contact-meta">Based in London / Available for product + analytics roles</p>
                    <a href="mailto:declanhughes@live.com" className="text-link">
                      declanhughes@live.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/declan-hughes0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        {view === 'contact' && <div className="motif-layer" aria-hidden />}
        <div className="section-rule" aria-hidden />
        <p className="meta-line">
          <span>V2 | Last updated April 2026 | Built with React + Markdown </span>
        </p>
      </footer>
    </div>
  )
}