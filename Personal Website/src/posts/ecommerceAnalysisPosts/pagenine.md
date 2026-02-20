## **A: Executive Summary of the Business**

### **Marketplace Profile**

Olist operates as a high‑volume marketplace with strong transactional economics but significant structural vulnerabilities.  
Across 2016–2018, the platform scaled rapidly - growing monthly revenue from **~£138k** to **over £1.1m**, before stabilising into a steady‑state operating phase.

| **Dimension** | **Finding** |
|---------------|-------------|
| Revenue | £16.0m total; strong growth trajectory through 2017 |
| Order‑level margins | 93.9% contribution margin per order |
| Customer retention | 3.12% repeat rate; near‑zero repeat behaviour |
| Seller concentration | Top 10% of sellers generate 85% of revenue |
| Geographic concentration | São Paulo contributes 37% of total revenue |

### **Overall Assessment**

This is a **profitable but structurally vulnerable** marketplace.

The business generates strong margins on every transaction, but those results sit on a fragile foundation:

- almost **no customers return**, and  
- almost **all revenue flows through a very small group of sellers**  

The financial position is healthy today, but the underlying structure carries meaningful long‑term risk.

---

## **B: Strategic Recommendations**

### **1. Improve Repeat Purchase Behaviour**

The single largest commercial opportunity is **retention**.  
Increasing the repeat rate from **3.12% → 6%** would **roughly double customer lifetime value** without increasing acquisition spend.

**Practical steps:**

- Post‑purchase email sequences with personalised category‑based offers  
- Loyalty incentives tied to second purchase  
- Cross‑category recommendations at checkout  
- Time‑based win‑back campaigns for lapsed customers  

The economics are compelling:

- Repeat customer contribution: **£280.54**  
- One‑time customer contribution: **£136.97**  

Even a small uplift in repeat behaviour would materially improve platform‑level profitability.

---

### **2. Diversify the Seller Base**

With **85% of revenue** flowing through **10% of sellers**, concentration risk is significant.  
If a handful of top sellers reduce activity, revenue would fall sharply.

**Steps to reduce dependency:**

- Improve visibility and discovery tools for mid‑tier sellers  
- Provide structured onboarding support for new sellers  
- Identify category gaps and recruit sellers strategically  
- Monitor top‑seller dependency as an ongoing risk metric  

Activating the long tail of sellers would reduce fragility and create a more resilient supply base.

---

### **3. Build a Regional Growth Strategy**

São Paulo accounts for **37%** of total revenue - the dominant market.  
However, states like Rio de Janeiro and Minas Gerais already show meaningful traction, and large regions remain underpenetrated.

**Phased approach:**

1. Deepen engagement and seller coverage in high‑performing states  
2. Use operational learnings to expand into lower‑volume regions  
3. Test logistics feasibility, demand signals, and category preferences before scaling  

Geographic diversification reduces reliance on a single regional market and opens new growth channels.

---

## **C: My Learnings**

### **Defining Revenue Before Modelling It**

Choosing between item price, freight, or payment value forced an early strategic decision.  
This reinforced that **revenue definition is a business question first**, and a technical question second.  
Understanding what you are measuring - and why - is essential before writing any SQL.

---

### **How Much Retention Changes the Numbers**

The difference between:

- **£136.97** contribution (one‑time customer)  
- **£280.54** contribution (repeat customer)  

…was more dramatic than expected.

A 3% retention rate sounds small until you model what even **6%** would mean for platform contribution.  
Viewing retention through a **financial lens**, not just a customer satisfaction lens, was a valuable shift.

---

### **Concentration Risk Can Hide Behind Strong Margins**

The unit economics look healthy - strong margins, profitable orders.  
But seller concentration shows **85% of revenue sits with 10% of sellers**.

Without structural analysis, you might conclude the business is robust when it is actually exposed.  
This highlighted the difference between **financial health** and **structural health** - both must be examined.

---

### **Structuring Analysis Around Business Questions, Not Tables**

Earlier in my learning, I would explore each table individually.  
In this project, I defined the **commercial questions first**, then worked backwards to the SQL needed to answer them.

This produced clearer insights and a more coherent narrative.

---

### **The Value of the Pre‑SQL Stage**

Validating the data in a spreadsheet before touching SQL gave me:

- a clear expectation of what I would find  
- a map of anomalies to investigate  
- confidence in the dataset before modelling  

It made the cleaning stage faster, more deliberate, and more reliable.

---

This project was completed using **MySQL**, with data sourced from the **Brazilian E‑Commerce Public Dataset by Olist**, available via Kaggle.
