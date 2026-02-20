// --- Imports ---
import pageone from './pageone.md?raw'
import pagetwo from './pagetwo.md?raw'
import pagethree from './pagethree.md?raw'
import pagefour from './pagefour.md?raw'
import pagefive from './pagefive.md?raw'
import pagesix from './pagesix.md?raw'
import pageseven from './pageseven.md?raw'
import pageeight from './pageeight.md?raw'
import pagenine from './pagenine.md?raw'

// --- Exported posts array ---
export const ecommerceAnalysisPosts = [
  {
    id: 'Page 1: Project Overview',
    date: '19 Feb 2026',
    title: '1. Project Overview',
    snippet: "After completing The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert on Udemy, I wanted to apply what I’d learned...",
    markdown: pageone
  },
  {
    id: 'Page 2: Dataset Review & Pre-SQL Validation',
    date: '19 Feb 2026',
    title: '2. Dataset Review & Pre-SQL Validation',
    snippet: "The dataset used for this project is the Brazilian E‑Commerce Public Dataset by Olist, made publicly available via Kaggle. It contains...",
    markdown: pagetwo
  },
  {
    id: 'Page 3: Database Design, Relationships & Data Import',
    date: '19 Feb 2026',
    title: '3. Database Design, Relationships & Data Import',
    snippet: "The four tables used in this project have clear dependency relationships. Before loading any data, the tables were created in the correct sequence...",
    markdown: pagethree
  },
  {
    id: 'Page 4: Data Cleaning & Integrity Validation',
    date: '19 Feb 2026',
    title: '4. Data Cleaning & Integrity Validation',
    snippet: "The approach to data cleaning was deliberate. Rather than removing records that did not fit neatly, the priority was to preserve the dataset's integrity...",
    markdown: pagefour
  },
  {
    id: 'Page 5: Revenue & Transaction Performance',
    date: '19 Feb 2026',
    title: '5. Revenue & Transaction Performance',
    snippet: "For this analysis, revenue is defined using payment_value, which represents the amount actually paid by the customer. This approach...",
    markdown: pagefive
  },
  {
    id: 'Page 6: Customer Behaviour — Retention & Revenue Concentration',
    date: '19 Feb 2026',
    title: '6. Customer Behaviour - Retention & Revenue Concentration',
    snippet: "Customers were identified using customer_unique_id rather than customer_id. This distinction is critical...",
    markdown: pagesix
  },
  {
    id: 'Page 7: Seller Economics & Supply Risk',
    date: '19 Feb 2026',
    title: '7. Seller Economics & Supply Risk',
    snippet: "To evaluate seller economics, revenue was linked to the `order_items` table via `order_id`, allowing each seller to be associated with...",
    markdown: pageseven
  },
  {
    id: 'Page 8: Unit Economics & Financial Sustainability',
    date: '19 Feb 2026',
    title: '8. Unit Economics & Financial Sustainability',
    snippet: "To model unit economics, the following assumptions were applied consistently...",
    markdown: pageeight
  },
  {
    id: 'Page 9: Final Insights, Strategic Recommendations & Personal Learnings',
    date: '19 Feb 2026',
    title: '9. Final Insights, Strategic Recommendations & Personal Learnings',
    snippet: "Olist operates as a high‑volume marketplace with strong transactional economics but significant structural vulnerabilities...",
    markdown: pagenine
  }
]
