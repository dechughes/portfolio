## **Revenue Definition**

For this analysis, revenue is defined using **`payment_value`**, which represents the amount actually paid by the customer. This approach:

- avoids double‑counting across multi‑item orders  
- correctly incorporates voucher adjustments  
- aligns with the treatment of payment anomalies identified during data validation  

Item price and freight values from the `order_items` table are used for order composition and logistics analysis but are **not** used as the primary measure of realised revenue.

---

## **Revenue Reconciliation**

To confirm financial accuracy before modelling, order‑level payment totals were reconciled against aggregated item‑level totals using an inner join between the two tables.

| **Metric**                     | **Value**        |
|--------------------------------|------------------|
| Matched transactional orders   | 98,665           |
| Realised payment revenue       | £15.85 m      |
| Item‑level totals              | £15,84 m      |
| **Variance**                   | £2,870 (0.018% of total revenue)  |

The variance was deemed immaterial and likely attributable to rounding differences or minor payment sequencing effects. No systemic financial inconsistencies were found.

Revenue modelling proceeds using **`payment_value`** as the definitive measure of realised revenue.

---

## **Total Revenue**

Total realised revenue across the dataset period is:

# **£16,008,872.12**

This represents the full financially realised value of all completed transactions within the 2016–2018 timeframe.

---

## **Monthly Revenue & Order Volume**

The month‑to‑month trend shows a clear growth trajectory throughout 2017 and into 2018.

- After a limited launch period in late 2016, revenue grows significantly from January 2017 onwards.  
- Revenue rises from approximately **£138k** in January 2017 to over **£1.1m** by November 2017.  
- Order volume follows the same pattern, increasing from **~800 orders** in January 2017 to **7,544 orders** in November 2017.  
- Through 2018, revenue stabilises between **£1.0m and £1.16m** per month, with order volumes between **6,100 and 7,200**.  
- The sharp decline in September–October 2018 reflects **dataset truncation**, not operational decline.  

The close correlation between revenue and order volume indicates that growth was driven primarily by **increasing transaction count**, not basket size expansion.

### **Monthly Revenue & Order Volume - Chart**

![Monthly Revenue & Order Volume](/assets/sqlpost1/monthlyrevenueandordervolume.png)


---

## **Order Value Distribution**

| **Metric** | **Value**     |
|------------|---------------|
| Average order value (mean) | £160.99 |
| Median order value         | £105.29 |

The mean significantly exceeds the median, indicating a **right‑skewed distribution**. This is typical of e‑commerce marketplaces:

- most orders cluster around lower basket values  
- a smaller number of high‑value transactions pull the average upward  

A revenue distribution histogram confirms a **long tail** of higher‑value purchases contributing disproportionately to total revenue.

### **Order Value Distribution - Chart**

![Order Revenue Distribution](/assets/sqlpost1/orderrevenuedistribution.png)


---

## **Customer Revenue Distribution**

A distribution analysis of customer‑level revenue shows that a small subset of customers contributes disproportionately to total revenue, consistent with typical marketplace dynamics.

### **Customer Revenue Distribution - Chart**

![Revenue By Customer Decile](/assets/sqlpost1/revbycustomerdecile.png)


---

## **Revenue by State**

Revenue distribution across Brazilian states shows strong geographic concentration. The following table illustrates that the top three states account for the majoirty of realised revenue:

| **State** | **Revenue**     | **Orders** |
|-----------|------------------|------------|
| SP (São Paulo)      | £5,998,227 | 41,745 |
| RJ (Rio de Janeiro) | £2,144,380 | 12,852 |
| MG (Minas Gerais)   | £1,872,257 | 11,635 |

São Paulo alone accounts for **~37%** of total revenue, consistent with its dominant order volume. Revenue declines progressively across other states, reflecting concentration in Brazil’s main economic centres.

Lower‑volume states contribute marginally to overall revenue, suggesting **significant headroom for regional expansion**.

---

## **Summary Insight**

Revenue growth was driven primarily by **increasing transaction volume**, not basket expansion. The marketplace shows strong scaling dynamics, with clear geographic concentration and a predictable revenue–volume relationship.
