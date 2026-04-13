import crateHero from '../assets/music-crate/music-crate-main.jpg'
import sqlHero from '../assets/sqlpost1/sql1heroimage.png'
import fintechHero from '../assets/fintechpost/fintechheroimage.png'
import deliverooHero from '../assets/deliveroopost/deliveroohero.png'

import { musicCratePosts } from '../posts/music-crate/musicCratePosts'
import { ecommerceAnalysisPosts } from '../posts/ecommerceAnalysisPosts/sqlprojectposts'
import { fintechdashboardPosts } from '../posts/fintechdashboardPosts/fintechprojectposts'
import { deliverootdPosts } from '../posts/deliverooteardown/deliverootd'
import { portfolioRedesignPosts } from '../posts/portfolio-redesign/portfolioResdesignPosts'

export const projectRegistry = [

  {
  id: 'portfolio-redesign',
  refCode: 'PRJ-05',
  title: 'Portfolio Redesign (V2)',
  summary: 'A redesign of my portfolio - typography, layout, motifs, and a tighter editorial structure.',
  year: '2026',
  role: 'Design + Build',
  category: 'Product + Design',
  status: 'Complete',
  heroImage: '/assets/portfolio-v2/after-home.png',
  mobileImage: '/assets/portfolio-v2/after-home.png',
  layout: 'standard',
  galleryImages: [
    '/assets/portfolio-v2/after-home.png',
    '/assets/portfolio-v2/after-project.png',
    '/assets/portfolio-v2/before-home.png',
    '/assets/portfolio-v2/before-project.png',
    ],
  overviewSections: [
    {
      heading: 'Context',
      kind: 'text',
      copy: 'V1 was built in December 2025 as a functional home for projects built outside of work. It did its job - but after the Deliveroo teardown, the gap between the quality of the work and the design of the site became hard to ignore.',
    },
    {
      heading: 'Problem',
      kind: 'text',
      copy: 'V1 was honest but it lacked personality, rhythm, and any cohesive design system. It was functional without the flourish - close to brutalist in hindsight.',
    },
    {
      heading: 'Insight',
      kind: 'text',
      copy: 'Design changes how something is perceived even when the content stays the same. The same way clothes shape how people read you, the design of a portfolio shapes how people read your work.',
    },
    {
      heading: 'Strategy',
      kind: 'text',
      copy: 'Improve typography and spacing, introduce a motif system, add hover states, and replace the long project layout with a tighter editorial structure - without rebuilding everything from scratch.',
    },
    {
      heading: 'Outcome',
      kind: 'text',
      copy: 'A cleaner, more intentional portfolio that feels designed rather than assembled. The projects read better, the visuals have space, and the site has personality without losing the simplicity of V1.',
    },
    {
      heading: 'Reflection',
      kind: 'text',
      copy: 'Redesigning is a compromise. You have to balance what you want with what\'s realistic, what you can build, and what you can maintain.',
    },
  ],
  posts: portfolioRedesignPosts,
},

  {
    id: 'deliveroo-teardown',
    refCode: 'PRJ-04',
    title: 'Deliveroo Teardown',
    summary: 'Basket building and upsell mechanics across menu, checkout, and prompt surfaces.',
    year: '2026',
    role: 'Product Analysis',
    category: 'Teardown',
    status: 'Complete',
    heroImage: deliverooHero,
    mobileImage: '/assets/deliveroopost/deliveroohero.png',
    layout: 'feature',
   galleryImages: [
  '/assets/deliverootd/frontpage.png',
  '/assets/deliverootd/savingsandoffers.png',
  '/assets/deliverootd/upsellmechanics.png',
  '/assets/deliverootd/userjourneycropped.png',
],

    overviewSections: [
      {
        heading: 'Context',
        kind: 'text',
        copy: 'Analyse how Deliveroo increases average order value (AOV) through add-ons, bundles, nudges, and price psychology.',
      },
      {
        heading: 'Problem',
        kind: 'text',
        copy: 'It’s easy to point at bundles or “add a drink” prompts in isolation. The real question is what Deliveroo is actually doing across the whole journey to get you to spend more without feeling it.',
      },
      {
        heading: 'Insight',
        kind: 'text',
        copy: 'The system works because it follows intent. Bigger nudges show up early when you’re still deciding, then taper into smaller, low-risk additions once you’ve mentally committed to ordering.',
      },
      {
        heading: 'Strategy',
        kind: 'text',
        copy: 'Stepped through the product as a new user and constantly asked: “What is Deliveroo trying to get me to do right now?”Broke the journey into stages - browsing, restaurant selection, basket building, checkout - and mapped how each one shifts focus from exploration → commitment → momentum → conversion.',
      },
      {
        heading: 'Outcome',
        kind: 'text',
        copy: 'A clearer view of how AOV works as a flow rather than a feature. Bundles set the baseline early, add‑ons layer in naturally, and the basket reinforces momentum without adding new decisions - right up until everything strips back at checkout. Learnings applicable beyond Deliveroo.',
      },
      {
        heading: 'Reflection',
        kind: 'text',
        copy: 'Deliveroo’s strength is its control of the user journey. Deliveroo knows when to push, when to suggest, and when to get out of the way. The product feels simple, but the sequencing underneath is doing the heavy lifting.',
      },
    ],
    posts: deliverootdPosts,
  },
  {
    id: 'fintech-dashboard',
    refCode: 'PRJ-03',
    title: 'Fintech Platform Dashboard',
    summary: 'A layered analytics system built on synthetic data to support product and growth decisions across a fintech subscription business.',
    year: '2026',
    role: 'Analytics + BI',
    category: 'Dashboard',
    status: 'Complete',
    heroImage: fintechHero,
    mobileImage: '/assets/fintechpost/fintechheroimage.png',
    layout: 'standard',
  galleryImages: [
    '/assets/fintechpost/execoverviewA.png',
  '/assets/fintechpost/execoverviewB.png',
  '/assets/fintechpost/funnelanalysis.png',
  '/assets/fintechpost/experimentanalysis.png',
  '/assets/fintechpost/cohortretentionA.png',
  '/assets/fintechpost/cohortretentionB.png',
],

    overviewSections: [
      {
        heading: 'Context',
        kind: 'text',
        copy: 'A simulated fintech growth model inspired by Cleo, designed to mirror how a real subscription product acquires users, converts them, and makes money over time.',
      },
      {
        heading: 'Problem',
        kind: 'text',
        copy: 'Most dashboards show what is happening. Fewer show why. The challenge here was to build something that reflects real unit economics and exposes where growth actually breaks.',
      },
      {
        heading: 'Insight',
        kind: 'text',
        copy: 'The numbers only make sense when they’re connected. CAC, ARPU, churn, and payback aren’t separate metrics, they’re a system. Once you anchor the model to those constraints, the behaviour of the business becomes predictable.',
      },
      {
        heading: 'Strategy',
        kind: 'text',
        copy: 'Started with Cleo’s published metrics and worked backwards to infer what isn’t stated - churn, retention, and the shape of the subscriber base. Built a synthetic dataset to simulate the full lifecycle from sign‑up through to churn, including revenue and A/B testing. Incorporated everything into Power BI across four views: executive performance, funnel, experiments, and cohort retention.',
      },
      {
        heading: 'Outcome',
        kind: 'text',
        copy: 'A full picture of how the business actually behaves. Acquisition is strong and conversion is above benchmark, but revenue declines because early churn erodes the active subscriber base. The funnel works, but value doesn’t compound. Users convert, then drop off before they generate meaningful lifetime revenue. Retention, not acquisition, is the constraint.',
      },
      {
        heading: 'Reflection',
        kind: 'text',
        copy: "The most useful insight wasn’t a metric, it was understanding where to look. When revenue falls, it’s tempting to blame acquisition or pricing. In reality, the answer was sitting in the first 30 days after conversion. That’s where the business is won or lost.",
      },
    ],
    posts: fintechdashboardPosts,
  },
  {
    id: 'sql-analysis',
    refCode: 'PRJ-02',
    title: 'SQL Marketplace Analysis',
    summary: 'End-to-end relational analysis of marketplace revenue, retention, concentration, and unit economics.',
    year: '2026',
    role: 'Data Analysis',
    category: 'SQL',
    status: 'Complete',
    heroImage: sqlHero,
    mobileImage: '/assets/sqlpost1/sql1heroimage.png',
    layout: 'standard',
    galleryImages: [
  '/assets/sqlpost1/breakevenanalysis.png',
  '/assets/sqlpost1/contributionpercustomer.png',
  '/assets/sqlpost1/monthlyrevenueandordervolume.png',
  '/assets/sqlpost1/orderfrequencydistribution.png',
  '/assets/sqlpost1/orderrevenuedistribution.png',
  '/assets/sqlpost1/revbycustomerdecile.png',
  '/assets/sqlpost1/sellerorderdistribution.png',
  '/assets/sqlpost1/uniteconomicsperorder.png',
],

    overviewSections: [
      {
        heading: 'Context',
        kind: 'text',
        copy: 'A deep dive into a Brazilian e-commerce marketplace dataset, built to move beyond SQL exercises and into how a real business actually performs.',
      },
      {
        heading: 'Problem',
        kind: 'text',
        copy: 'Writing queries is the easy part. The harder part is turning messy, relational data into something that answers real commercial questions around revenue, retention, and the underlying health of the marketplace.',
      },
      {
        heading: 'Insight',
        kind: 'text',
        copy: 'The interesting work isn’t in the queries themselves, it’s in how you frame the problem. Once you define revenue properly and map behaviour across customers and sellers, the shape of the business becomes very clear.',
      },
      {
        heading: 'Strategy',
        kind: 'text',
        copy: 'Started with the business questions, not the tables. Validated the dataset before touching SQL, then built a clean relational model across orders, items, customers, and payments. From there, layered analysis from revenue and order behaviour through to retention, seller concentration, and finally unit economics using realistic cost assumptions.',
      },
      {
        heading: 'Outcome',
        kind: 'text',
        copy: "A full commercial read of the marketplace. Revenue growth is driven by order volume, not basket size. Retention is extremely low, with most customers ordering once and never returning. A small group of sellers drives the majority of revenue, creating supply-side risk. Despite this, unit economics are strong, with high contribution margins and profitable first orders.",
      },
      {
        heading: 'Reflection',
        kind: 'text',
        copy: 'What looks like a healthy business at first glance is structurally fragile underneath. This project reinforced that good analysis isn’t about writing better SQL, it’s about asking better questions and knowing what actually matters.',
      },
    ],
    posts: ecommerceAnalysisPosts,
  },
  {
    id: 'music-crate',
    refCode: 'PRJ-01',
    title: 'Internet Record Store',
    summary: 'An experiment in making the process of finding a record on the internet more human - built around the albums from the Soulquarians.',
    year: '2026',
    role: 'Product + Design',
    category: 'Interactive Build',
    status: 'Ongoing',
    heroImage: crateHero,
    mobileImage: '/assets/music-crate/music-crate-main.jpg',
    layout: 'compact',
    galleryImages: [
      'public/assets/music-crate-public/music-crate-main.jpg',
      'public/assets/music-crate-public/music-crate-3.jpg',
      'public/assets/music-crate-public/music-crate-2.jpg',
      'public/assets/music-crate-public/music-crate-1.jpg',
    ],
    overviewSections: [
      {
        heading: 'Context',
        kind: 'text',
        copy: 'A side project exploring how interaction design can reshape music discovery in a streaming-heavy world.',
      },
      {
        heading: 'Problem',
        kind: 'text',
        copy: 'Most digital music interfaces flatten context and make discovery feel operational rather than emotional.',
      },
      {
        heading: 'Insight',
        kind: 'text',
        copy: 'The value of record shopping is not just finding the record but the process of browsing and serendipity that comes with it.',
      },
      {
        heading: 'Strategy',
        kind: 'text',
        copy: 'Recreated physical record shopping mechanics - browsing, flipping, serendipitous discovery - in a digital format. Testing layering,lighting, depth and motion to feel weighted rather than immediate.',
      },
      {
        heading: 'Outcome',
        kind: 'text',
        copy: 'A working prototype that shifts music browsing from passive scrolling to deliberate interaction. A decent test case that demonstrates how small design and interface decisions can reshape user attention and behaviour.',
      },
      {
        heading: 'Reflection',
        kind: 'text',
        copy: 'The smallest interaction details have a massive impact on how an experience feels - timing, layering, and motion all contribute to whether something feels real, artificial or clunky.',
      },
    ],
    posts: musicCratePosts,
    externalLink: 'https://musiccrate.netlify.app/',
  },
  
]