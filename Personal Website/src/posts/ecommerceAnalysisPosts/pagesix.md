## **True Customer Modelling**

Customers were identified using **`customer_unique_id`** rather than `customer_id`.  
This distinction is critical:

- each new order generates a new `customer_id`  
- only `customer_unique_id` allows accurate identification of returning customers  

This ensures retention metrics reflect **true customer behaviour**, not order‑level duplication.

---

## **Retention Metrics**

| **Metric**                | **Value** |
|---------------------------|-----------|
| Total unique customers    | 96,095    |
| One‑time customers        | 93,098    |
| Repeat customers          | 2,997     |
| **Repeat rate**           | **3.12%** |
| Average orders per customer | 1.035   |
| Maximum orders by a single customer | 15 |

Retention is extremely low. Only **3.12%** of customers return for a second purchase, meaning the marketplace operates almost entirely on first‑time transactions. The average orders per customer (1.035) confirms this: purchase frequency is nearly flat at one order per user.

This indicates the business is **acquisition‑driven rather than retention‑driven**. Customer lifetime value is largely limited to first‑order economics, and growth requires continuous marketing spend to replace churned users. For a marketplace model, this level of retention is structurally weak and limits the compounding revenue effects that repeat customers create.

---

## **Order Frequency Distribution**

The distribution of order frequency reinforces this picture. Of **96,095** total customers:

- **93,098 (96.9%)** are one‑time buyers  
- Only **2,745** customers place exactly two orders  
- Very few customers reach **five or more** orders  

This creates a classic **long‑tail pattern**: a very large base of one‑time customers and a small cohort of repeat buyers. It highlights both the scale of customer acquisition and the opportunity that better retention represents.

### **Order Frequency Distribution - Chart**
![Order Frequency Distribution](/assets/sqlpost1/orderfrequencydistribution.png)

---

## **Revenue Split: One‑Time vs Repeat Customers**

| **Customer Type** | **Customers** | **Segment Revenue** | **Avg Revenue per Customer** |
|-------------------|---------------|----------------------|-------------------------------|
| One‑time          | 93,098        | £15.06m              | £161.82                       |
| Repeat            | 2,997         | £994k                | £314.99                       |

The revenue split shows a clear pattern:

- One‑time customers make up **97%** of the customer base and generate the majority of revenue  
- Repeat customers, despite being only **3%**, spend **nearly 2× more** on average  

This is the central retention opportunity in the dataset. Even a modest improvement in repeat rate would significantly increase:

- revenue per acquired customer  
- total platform revenue  
- marketing efficiency  

All without increasing acquisition spend.

---

## **Revenue Concentration**

| **Metric** | **Value** |
|------------|-----------|
| Top 10% of customers — total revenue | £6.17m |
| Top 10% share of total revenue       | 38.5%  |

Revenue is moderately concentrated. The top 10% of customers generate **38.5%** of total revenue, while the remaining 90% contribute **61.5%**. This is common in e‑commerce, but combined with the low repeat rate, it highlights a business reliant on a relatively small group of higher‑spending customers to underpin a significant share of performance.

---

## **Strategic Interpretation**

These retention dynamics directly shape the unit economics and long‑term sustainability of the business.

A marketplace that acquires customers efficiently but loses almost all of them after one purchase is paying **full acquisition cost every time it wants to grow**. Improving retention is therefore not just a customer experience question - it is a **financial efficiency question**.

Retention materially influences:

- contribution per customer  
- CAC payback  
- long‑term revenue compounding  
- platform stability  

The current retention profile limits the marketplace’s ability to scale sustainably without continuous acquisition spend.

