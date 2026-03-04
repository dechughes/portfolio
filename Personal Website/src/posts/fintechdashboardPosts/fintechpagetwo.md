# **Page 2 - Problem Definition and Assumptions**

Using Cleo's 2024 annual report and data from their website (last updated December 2025), I consolidated the following information to build a foundation for the model. 

---

## **User and Subscriber Data**

| **Metric**                     | **Value**          | **Source**            |
|-------------------------------|--------------------|-----------------------|
| Total Users (Monthly Average) | >1M                | Annual Report p.4     |
| Paying Subscribers (Dec 2024) | 743k               | Annual Report p.4     |
| 12‑Month Conversion Rate       | 50%                | Website (Feb 2025)    |
| Current Subscribers            | 1.1M               | Website (Feb 2025)    |
| Current Total Users            | 2.8M+              | Website (Feb 2025)    |

---

## **Revenue and Pricing**

| **Metric**             | **Value**        | **Source**          |
|------------------------|------------------|---------------------|
| Annual Revenue 2024    | $135.7M          | Annual Report p.55  |
| Run Rate Revenue       | $186M (Dec 2024) | Annual Report p.3   |
| Subscription Revenue   | $59.7M (44%)     | Annual Report p.55  |
| Transaction Fees       | $76.0M (56%)     | Annual Report p.55  |
| Plus Tier Price        | $5.99/month      | Website             |
| Pro Tier Price         | $8.99/month      | Website             |
| Builder Tier Price     | $14.99/month     | Website             |

---

## **Growth Metrics**

| **Metric**              | **Value** | **Source**          |
|-------------------------|-----------|---------------------|
| Subscriber Growth YoY   | +41.5%    | Annual Report p.7   |
| Revenue Growth YoY      | +106%     | Annual Report p.3   |
| CAC                     | $11       | Annual Report p.4   |
| LTV Payback Period      | 3 months  | Annual Report p.4   |

---

## **Operational Metrics**

| **Metric**             | **Value** | **Source**          |
|------------------------|-----------|---------------------|
| Gross Margin           | 59.5%     | Annual Report p.7   |
| EBITDA Margin          | 8.4%      | Annual Report p.13  |
| Employees (Dec 2024)   | 352       | Annual Report p.13  |

---

# **Deriving Missing Unit Economics**

As Cleo doesn’t publish its retention or churn rate, I need to infer them from the numbers it does share. The goal is to use standard subscription (SaaS/fintech) formulas so that every assumption is grounded in either Cleo’s own data or widely accepted benchmarks.
The figures above give us a couple of key metrics: 
- Customer Acquisition Cost (CAC): $11 per new paying customer
- Payback period: 3 months (time to earn back the CAC)
- Gross margin: 59.5%
- Subscription revenue 2024: $59.7M
- Paying subscribers: 743k

---

## **1. Estimating Monthly ARPU**

To estimate subscription average revenue per user (ARPU) per year we can divide the total subscription revenue by the subscriber count: 
Annual ARPU = 59.7M / 743,000
Monthly ARPU = Annual ARPU / 12
≈ 6.69

**Estimated monthly ARPU ≈ $6.69**

---

## **2. Validating ARPU Using Payback Period**
Before I continue with this figure I need to verify that the ARPU is consistent with the payback month.
In subscription businesses, payback period, CAC, ARPU, and gross margin are linked by a standard formula:
Payback Period = CAC / (ARPU × Gross Margin)
Where:
- CAC = cost to acquire one customer
- ARPU = revenue per user per month
- Gross Margin = percentage of revenue that is profit after direct costs

Substituting Cleo’s metrics:
- CAC = 11
- ARPU = 6.69
- Gross Margin = 0.595

Calculation:
Payback Period ≈ 11 / (6.69 × 0.595)
≈ 3 months

This matches Cleo’s reported 3‑month payback, confirming the ARPU estimate is consistent.

---

## **3. Inferring Monthly Churn From LTV**
Next, I move from payback to lifetime value (LTV). For a subscription product, a common LTV formula is:
LTV = (ARPU × Gross Margin) / Monthly Churn

Where:
- LTV = profit per customer per month ÷ probability they leave each month
- ARPU×Gross Margin = average monthly profit per subscriber
- Monthly Churn = fraction of subscribers who cancel each month

Healthy subscription and fintech businesses typically aim for an LTV:CAC ratio of around 3–5x. To stay conservative, I assume:
LTV ≈ 3 × CAC = 33
Now solve for churn:
Monthly Churn = (ARPU × Gross Margin) / LTV
Monthly Churn ≈ (6.69 × 0.595) / 33
≈ 0.04

**Implied monthly churn ≈ 4%**

This aligns with strong consumer fintech benchmarks (typically 3–5%) and consistent with Cleo's reported CAC and 3-month payback.

---

# **Estimating Cohort Retention (Month‑1 and Month‑3)**

On their website Cleo reports:

- **50% of users convert to paid within 12 months**
- **3‑month CAC payback**

This is unusually high for a consumer app. A conversion rate this strong signals that early-stage retention (Month 1-3) must be reasonably strong. Further 3‑month CAC payback only works if:
- users stay subscribed for at least a few months
- churn is not extremely high
- early retention is strong enough to generate revenue quickly

If Month‑1 or Month‑3 retention were weak, Cleo simply couldn’t recover CAC in 3 months.
So the payback period suggests that early retention must be healthy.

Fintech and subscription apps have well‑documented retention patterns. Broadly:
- Fintech apps (budgeting, credit, banking) → higher stickiness than entertainment apps
- Subscription products → typically 60–70% Month‑1 retention for paying users
- Finance‑specific tools → slightly higher due to switching costs and ongoing utility

These benchmarks give us a realistic range to work within.

Combining Cleo’s conversion, payback, and industry norms yields:

- **Month‑1 retention ≈ 65–75%**  
- **Month‑3 retention ≈ 45–55%**

These values are consistent with Cleo’s economics: lower retention would break the 3‑month payback; higher retention would imply unrealistically low churn.

---

## **Retention Summary**

| **Metric**              | **Implied Value** | **Basis**                                 |
|-------------------------|-------------------|--------------------------------------------|
| Monthly Churn           | ~3–5%             | Derived from CAC + payback + benchmarks    |
| Cohort Retention M1     | ~65–75%           | Fintech subscription benchmark             |
| Cohort Retention M3     | ~45–55%           | Fintech subscription benchmark             |

---

# **Core Parameters for the Synthetic Model**
Following the churn and retention calculations, I can now define the core parameters for the synthetic model. Each parameter is chosen to be:
- Large enough to show realistic behavioural patterns
- Grounded in Cleo’s public metrics
- Internally consistent with the unit economics derived earlier
- Simple enough to model cleanly in Excel

The table below summarises the values I use, why they make sense, and the real‑world anchors they’re tied to.


| **Parameter**           | **Model Value**                    | **Rationale**                                      | **Real‑World Anchor**                                |
|-------------------------|------------------------------------|----------------------------------------------------|------------------------------------------------------|
| Total Users             | 100,000                            | Scaled dataset (~10% of Cleo)                     | Cleo has ~1.1M users                                 |
| Activation Rate         | 60%                                | Bank‑linking friction typical in fintech          | Industry: 50–70%                                     |
| 12‑Month Conversion     | 50%                                | Matches Cleo’s published figure                   | Cleo website                                         |
| Monthly Churn           | 4%                                 | Derived from CAC and payback                      | CAC = $11, payback = 3 months                        |
| ARPU                    | $15/month                          | Blended subscription + transaction revenue        | Cleo ARPU ≈ $15.17/month                             |
| CAC                     | $11                                | Directly from Cleo                                | Annual Report p.4                                    |
| Subscription Tier Mix   | 60% Plus, 30% Pro, 10% Builder     | Typical freemium distribution                     | Industry pattern                                     |




