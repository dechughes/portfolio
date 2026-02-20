import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import ReactMarkdown from 'react-markdown'
// import { travelKitPosts } from './posts/travel-kit/travelKitPosts'
import { musicCratePosts } from './posts/music-crate/musicCratePosts'
import { ecommerceAnalysisPosts } from './posts/ecommerceAnalysisPosts/sqlprojectposts'

import everestImage from './assets/everest.jpg'
import komodoImage from './assets/komodo.jpg'
import budvaImage from './assets/budva.jpg'
import cvFile from '/src/assets/DeclanHughesCV.pdf'
const images = [everestImage, komodoImage, budvaImage]

//Music Crate Images
import crateHero from './assets/music-crate/music-crate-main.jpg'
import crateDetail1 from './assets/music-crate/music-crate-1.jpg'
import crateDetail2 from './assets/music-crate/music-crate-2.jpg'
import crateDetail3 from './assets/music-crate/music-crate-3.jpg'

// SQL Hero Image
import sqlHero from './assets/sqlpost1/sql1heroimage.png'

const musicCrateImages = [
  crateHero,
  crateDetail1,
  crateDetail2,
  crateDetail3,
]

// SQL Analysis Images
const sqlImages = [
  '/assets/sqlpost1/monthlyrevenueandordervolume.png',
  '/assets/sqlpost1/orderrevenuedistribution.png',
  '/assets/sqlpost1/revbycustomerdecile.png',
  '/assets/sqlpost1/breakevenanalysis.png',
  '/assets/sqlpost1/contributionpercustomer.png',
  '/assets/sqlpost1/orderfrequencydistribution.png',
  '/assets/sqlpost1/sellerorderdistribution.png',
  '/assets/sqlpost1/uniteconomicsperorder.png',
]

// This is the expandable component used in the About section
function ExpandableItem({ title, meta, children, year, tags, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      onClick={() => setOpen(!open)}
      className="group cursor-pointer py-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
        {year && (
          <span className="text-sm text-gray-500 sm:w-24 flex-shrink-0">
            {year}
          </span>
        )}

        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xl text-gray-900 group-hover:text-[#005b4c] transition-colors">
                {title}
              </p>
              {meta && (
                <p className="text-sm text-gray-500 mt-1">
                  {meta}
                </p>
              )}
            </div>

            <span className="text-gray-400 group-hover:text-[#005b4c] transition">
              {open ? '−' : '+'}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 text-gray-700 max-w-2xl leading-relaxed sm:ml-24"
          >
            {children}

            {tags && (
              <p className="mt-3 text-sm text-gray-500">
                {tags.join(' · ')}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const [timeString, setTimeString] = useState('')
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [musicCrateImageIndex, setMusicCrateImageIndex] = useState(0)
const [sqlImageIndex, setSqlImageIndex] = useState(0)
  

// This is the date and time at the top right of the screen

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      const day = now.toLocaleDateString([], { weekday: 'long' })
      setTimeString(`It is ${time} on a ${day} in London.`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // This is the image slideshow on the home page
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(i => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

// This is the effect to rotate the images
useEffect(() => {
  if (selectedProject !== 'music-crate') return

  setMusicCrateImageIndex(0)

  const interval = setInterval(() => {
    setMusicCrateImageIndex(i => (i + 1) % musicCrateImages.length)
  }, 5000)

  return () => clearInterval(interval)
}, [selectedProject])

useEffect(() => {
  if (selectedProject !== 'sql-analysis') return

  setSqlImageIndex(0)

  const interval = setInterval(() => {
    setSqlImageIndex(i => (i + 1) % sqlImages.length)
  }, 5000)

  return () => clearInterval(interval)
}, [selectedProject])


  const navItem = (key, label) => (
    <button
      onClick={() => setView(key)}
      className={`block text-sm transition flex items-center gap-2
        ${view === key ? 'text-gray-900' : 'text-gray-500 hover:text-[#005b4c]'}`}
    >
      {view === key && <span className="text-[#005b4c]">•</span>}
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Navigation - Mobile: top bar, Desktop: fixed sidebar */}
      <nav className="sm:hidden bg-[#fafafa] border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {navItem('home', 'home')}
            {navItem('about', 'about')}
            {navItem('projects', 'projects')}
            {navItem('contact', 'contact')}
          </div>
        </div>
      </nav>

      {/* Navigation - Desktop only */}
      <div className="hidden sm:block fixed top-6 left-6 z-10 space-y-2">
        {navItem('home', 'home')}
        {navItem('about', 'about')}
        {navItem('projects', 'projects')}
        {navItem('contact', 'contact')}
      </div>

      {/* Time */}
      <div className="hidden sm:block fixed top-6 right-6 text-sm text-gray-500">
        {timeString}
      </div>
      
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 text-[11px] sm:text-xs text-gray-400">
      Last updated · June 2025
      </div>


      <main className="max-w-5xl mx-auto px-6 pt-4 sm:pt-32 pb-24">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {view === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100vh-11rem)] sm:h-[calc(100vh-8rem)] flex flex-col overflow-hidden"
            >
            <h1 className="text-4xl sm:text-5xl font-medium mb-4 sm:mb-6">
              Declan Hughes
            </h1>


              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
              A personal portfolio covering projects, experience, and ongoing work.
              </p>

              <div className="mt-8 sm:mt-12 relative flex-1 min-h-[240px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageIndex}
                    src={images[imageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full object-cover rounded-sm"
                  />
                </AnimatePresence>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Photos taken while travelling.
              </p>
            </motion.section>
          )}

          {/* ABOUT */}
          {view === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-8">About</h2>
              
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-6">
                Selected experience & education
              </p>


              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mb-10 sm:mb-14 leading-relaxed">
                I’m interested in work that compounds: skills that transfer across domains, projects that teach me something new, and habits that make each iteration sharper than the last. This site is a record of my work, experience and other projects.
              <br /> <br />
                By training, I’m an operations‑focused analyst with experience across consulting, technology, and engineering. I tend to do my best work in ambiguous environments where the problem isn’t fully defined, the system is a bit messy, and progress depends on understanding how work actually gets done, not how it’s meant to.
              </p>

              <ExpandableItem
                title="Rio AI"
                meta="Sustainability Analyst"
                year="2025 – present"
                tags={['Work', 'Climate', 'Delivery', 'Data', 'AI']}
                defaultOpen
              >
                <p>
                 I work in a sustainability SaaS startup, supporting clients from onboarding through to business-as-usual operations. My role sits between data, product, and delivery: understanding how the platform works in practice, diagnosing edge cases, and improving workflows so outcomes are accurate, repeatable, and visible.
                <br /> <br />
                 This involves a mix of data analysis, stakeholder management, and process design - all with the goal of making sustainable data more accessible and usable for businesses to take action.                  
                </p>
              </ExpandableItem>

              <ExpandableItem
                title="PA Consulting"
                meta="Business Transformation Analyst"
                year="2022 – 2024"
                tags={['Work', 'Strategy', 'Systems', 'Delivery', 'Data', 'Operations']}
                defaultOpen
              >
                <p>
                 I worked on large-scale transformation programmes across public sector, defence, and energy clients, with a focus on operational delivery. This included redesigning operating models, preparing organisations for go-lives, and coordinating across complex stakeholder environments under real time pressure.
                  <br /> <br />
                 Alongside analysis and facilitation, I owned a lot of the unglamorous but essential mechanics - implementation plans, governance packs, assurance frameworks, and reporting cycles - that keep programmes moving. It’s where I learned how large organisations actually behave when incentives, constraints, and deadlines collide.
                </p>
              </ExpandableItem>

              <ExpandableItem
                title="Mechanical Engineering"
                meta="University of Warwick"
                year="2018 – 2021"
                tags={['Education', 'Engineering']}
                defaultOpen
              >
                <p>
                  A grounding in systems thinking, modelling, and structured problem
                  solving. Engineering trained me to break complexity into things
                  that can be built, tested and improved - an approach that still underpins how I work today.
                </p>
              </ExpandableItem>

              <div className="mt-14">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-gray-700 hover:text-gray-900 transition">
                  <span className="underline underline-offset-4">
                    See my CV
                  </span>
                  <span className="text-gray-400">↗</span>
                </a>
              </div>
            </motion.section>
          )}

{/* PROJECTS */}
{view === 'projects' && !selectedProject && !selectedPost && (
  <motion.section
    key="projects"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl sm:text-3xl font-medium mb-8">Projects</h2>

    <p className="text-xs uppercase tracking-wide text-gray-400 mb-6">
      Active work
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">

    <button
  onClick={() => setSelectedProject('sql-analysis')}
  className="group text-left border border-gray-200 hover:border-[#005b4c] transition-all p-6 rounded-sm"
>
  <div className="aspect-[4/3] bg-gray-100 mb-4 rounded-sm overflow-hidden">
    <div className="w-full h-full flex items-center justify-center text-gray-400">
      <img src={sqlHero} alt="SQL Marketplace Analysis" className="w-full h-full object-cover" />
    </div>
  </div>
  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#005b4c] transition-colors mb-2">
    SQL Marketplace Analysis
  </h3>
  <p className="text-sm text-gray-600">
    End-to-end analysis of an e-commerce marketplace dataset
  </p>
  <p className="text-xs text-gray-400 mt-3">
    2026 · Complete
  </p>
    </button>

      <button
        onClick={() => setSelectedProject('music-crate')}
        className="group text-left border border-gray-200 hover:border-[#005b4c] transition-all p-6 rounded-sm"
      >
        <div className="aspect-[4/3] bg-gray-100 mb-4 rounded-sm overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
          <img src={crateHero} alt="Music Crate Hero Image" className="w-full h-full object-cover" />
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#005b4c] transition-colors mb-2">
          Interactive Music Crate
        </h3>

        <p className="text-sm text-gray-600">
          Translating record-digging into a digital object
        </p>

        <p className="text-xs text-gray-400 mt-3">
          2026 · Ongoing
        </p>
      </button>
    

    </div>
  </motion.section>
)}


{/* Music Crate Project Overview */}
{view === 'projects' && selectedProject === 'music-crate' && !selectedPost && (
  <motion.section
    key="music-crate-overview"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <button
      onClick={() => setSelectedProject(null)}
      className="text-sm text-gray-500 hover:text-[#005b4c] transition mb-8 flex items-center gap-2"
    >
      <span>←</span>
      <span>Back to projects</span>
    </button>

    <h1 className="text-3xl sm:text-4xl font-medium mb-4">
      Internet Record Store
    </h1>

    <p className="text-lg text-gray-600 max-w-2xl mb-2">
      An experiment in making the process of finding a record on the internet more human - built around the albums from the Soulquarians.
    </p>
{/* Image carousel */}
<div className="mb-14 max-w-3xl">
  <div className="relative aspect-[16/10] sm:aspect-[3/2] rounded-sm overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.img
        key={musicCrateImageIndex}
        src={musicCrateImages[musicCrateImageIndex]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-contain"
        alt="Music crate project image"
      />
    </AnimatePresence>
  </div>

  <p className="mt-3 text-xs text-gray-500">
    Ongoing documentation of the Music Crate project.
  </p>
</div>

    {/* Posts */}
    <div className="space-y-8 max-w-2xl">
      {musicCratePosts.map((post) => (
        <article key={post.id} className="border-b border-gray-100 pb-8">
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>

          <button
            onClick={() => setSelectedPost(post.id)}
            className="text-left group w-full"
          >
            <h2 className="text-xl font-medium text-gray-900 group-hover:text-[#005b4c] transition-colors mb-3">
              {post.title}
            </h2>

            {post.snippet ? (
              <p className="text-gray-600 leading-relaxed">
                {post.snippet}
                <span className="text-[#005b4c] ml-2 group-hover:ml-3 transition-all">
                  Read more →
                </span>
              </p>
            ) : (
              <p className="text-gray-500 italic">Notes in progress…</p>
            )}
          </button>
        </article>
      ))}
    </div>

    <p className="text-sm text-gray-500 mt-12 max-w-xl">
      Writing as a way of thinking. Posts evolve as the project evolves.
    </p>
  </motion.section>
)}

{/* SQL Analysis Project Overview */}
{view === 'projects' && selectedProject === 'sql-analysis' && !selectedPost && (
  <motion.section
    key="sql-analysis-overview"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <button
      onClick={() => setSelectedProject(null)}
      className="text-sm text-gray-500 hover:text-[#005b4c] transition mb-8 flex items-center gap-2"
    >
      <span>←</span>
      <span>Back to projects</span>
    </button>

    <h1 className="text-3xl sm:text-4xl font-medium mb-4">
      Brazil E‑Commerce Marketplace Analysis: SQL‑Driven Commercial & Unit Economics Modelling
    </h1>

<p className="text-lg text-gray-600 max-w-2xl mb-14">
  An end-to-end SQL project analysing an e-commerce marketplace dataset - covering database design, data cleaning, and business insights across revenue, customers, sellers, and unit economics.
</p>

{/* Image carousel */}
<div className="mb-14 max-w-3xl">
  <div className="relative aspect-[16/10] sm:aspect-[3/2] rounded-sm overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.img
        key={sqlImageIndex}
        src={sqlImages[sqlImageIndex]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-contain"
        alt="SQL analysis chart"
      />
    </AnimatePresence>
  </div>
  <p className="mt-3 text-xs text-gray-500">
    Charts and outputs from the SQL analysis.
  </p>
</div>

    <div className="space-y-8 max-w-2xl">
      {ecommerceAnalysisPosts.map((post) => (
        <article key={post.id} className="border-b border-gray-100 pb-8">
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>

          <button
            onClick={() => setSelectedPost(post.id)}
            className="text-left group w-full"
          >
            <h2 className="text-xl font-medium text-gray-900 group-hover:text-[#005b4c] transition-colors mb-3">
              {post.title}
            </h2>

            {post.snippet ? (
              <p className="text-gray-600 leading-relaxed">
                {post.snippet}
                <span className="text-[#005b4c] ml-2 group-hover:ml-3 transition-all">
                  Read more →
                </span>
              </p>
            ) : (
              <p className="text-gray-500 italic">Notes in progress…</p>
            )}
          </button>
        </article>
      ))}
    </div>
  </motion.section>
)}


{/* Individual Music Crate Post */}
{view === 'projects' && selectedProject === 'music-crate' && selectedPost && (
  <motion.section
    key="music-crate-post"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {(() => {
      const post = musicCratePosts.find(p => p.id === selectedPost)
      const postIndex = musicCratePosts.findIndex(p => p.id === selectedPost)
      const prevPost = postIndex > 0 ? musicCratePosts[postIndex - 1] : null
      const nextPost = postIndex < musicCratePosts.length - 1 ? musicCratePosts[postIndex + 1] : null

      return (
        <>
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
            <button
              onClick={() => setSelectedProject(null)}
              className="hover:text-[#005b4c] transition"
            >
              Projects
            </button>
            <span>→</span>
            <button
              onClick={() => setSelectedPost(null)}
              className="hover:text-[#005b4c] transition"
            >
              Interactive Music Crate
            </button>
            <span>→</span>
            <span className="text-gray-900">{post.title}</span>
          </div>

          {/* Header */}
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-3xl sm:text-4xl font-medium mb-12">
            {post.title}
          </h1>

          {/* Content */}
          <div className="max-w-2xl">
            <div className="text-gray-700 space-y-6 leading-relaxed text-base markdown-content">
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]}
  components={{
    img: ({ node, ...props }) => (
      <img {...props} className="w-full rounded-sm my-6" />
    )
  }}
>
  {post.markdown}
</ReactMarkdown>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center max-w-2xl">
            {prevPost ? (
              <button
                onClick={() => setSelectedPost(prevPost.id)}
                className="text-sm text-gray-600 hover:text-[#005b4c] transition flex items-center gap-2"
              >
                <span>←</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Previous</div>
                  <div>{prevPost.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextPost && (
              <button
                onClick={() => setSelectedPost(nextPost.id)}
                className="text-sm text-gray-600 hover:text-[#005b4c] transition flex items-center gap-2"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-400">Next</div>
                  <div>{nextPost.title}</div>
                </div>
                <span>→</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="mt-8 text-sm text-gray-500 hover:text-[#005b4c] transition"
          >
            ← Back to all posts
          </button>
        </>
      )
    })()}
  </motion.section>
)}
{/* Individual SQL Analysis Post */}
{view === 'projects' && selectedProject === 'sql-analysis' && selectedPost && (
  <motion.section
    key="sql-analysis-post"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {(() => {
      const post = ecommerceAnalysisPosts.find(p => p.id === selectedPost)
      const postIndex = ecommerceAnalysisPosts.findIndex(p => p.id === selectedPost)
      const prevPost = postIndex > 0 ? ecommerceAnalysisPosts[postIndex - 1] : null
      const nextPost = postIndex < ecommerceAnalysisPosts.length - 1 ? ecommerceAnalysisPosts[postIndex + 1] : null

      return (
        <>
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
            <button
              onClick={() => setSelectedProject(null)}
              className="hover:text-[#005b4c] transition"
            >
              Projects
            </button>
            <span>→</span>
            <button
              onClick={() => setSelectedPost(null)}
              className="hover:text-[#005b4c] transition"
            >
              SQL Marketplace Analysis
            </button>
            <span>→</span>
            <span className="text-gray-900">{post.title}</span>
          </div>

          {/* Header */}
          <p className="text-xs text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-3xl sm:text-4xl font-medium mb-12">
            {post.title}
          </h1>

          {/* Content */}
          <div className="max-w-2xl">
            <div className="text-gray-700 space-y-6 leading-relaxed text-base markdown-content">
              
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]}
  components={{
    img: ({ node, ...props }) => (
      <img {...props} className="w-full rounded-sm my-6" />
    )
  }}
>
  {post.markdown}
</ReactMarkdown>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center max-w-2xl">
            {prevPost ? (
              <button
                onClick={() => setSelectedPost(prevPost.id)}
                className="text-sm text-gray-600 hover:text-[#005b4c] transition flex items-center gap-2"
              >
                <span>←</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Previous</div>
                  <div>{prevPost.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextPost && (
              <button
                onClick={() => setSelectedPost(nextPost.id)}
                className="text-sm text-gray-600 hover:text-[#005b4c] transition flex items-center gap-2"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-400">Next</div>
                  <div>{nextPost.title}</div>
                </div>
                <span>→</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="mt-8 text-sm text-gray-500 hover:text-[#005b4c] transition"
          >
            ← Back to all posts
          </button>
        </>
      )
    })()}
  </motion.section>
)}

{/* CONTACT */}
{view === 'contact' && (
  <motion.section
    key="contact"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-[calc(100vh-11rem)] sm:h-[calc(100vh-8rem)] flex flex-col overflow-hidden"
  >
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <h2 className="text-2xl sm:text-3xl font-medium mb-6">Contact</h2>

        {/* Lead statement */}
        <p className="text-base sm:text-lg text-gray-800 max-w-xl mb-4 leading-relaxed">
          Open to conversations around work, projects, and systems.
        </p>

        {/* Context / availability */}
        <ul className="text-sm text-gray-500 space-y-1 mb-8">
          <li>Based in London, UK</li>
          <li>Interested in product, delivery, and systems-focused roles</li>
        </ul>

        {/* Primary contact actions */}
        <div className="space-y-3 mb-8 sm:mb-12">
          <a
            href="mailto:declanhughes@live.com"
            className="block text-base text-gray-700 hover:text-[#005b4c] transition-colors"
          >
            declanhughes@live.com
          </a>

          <a
            href="https://www.linkedin.com/in/declan-hughes0/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base text-gray-700 hover:text-[#005b4c] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Image – personal, notebook-like - hiding for now*/}
       {/* <div className="relative flex-1 min-h-0 overflow-hidden"> 
        <motion.img
          src={images[1]}
          alt="Personal photograph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Caption - hiding for now */}
      {/* <p className="mt-3 text-sm text-gray-500 flex-shrink-0">
        On the Komodo Tour.
      </p>  */}
      
    </div>
  </motion.section>
)}



        </AnimatePresence>
      </main>
    </div>
  )
}