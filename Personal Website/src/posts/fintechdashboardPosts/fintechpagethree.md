# **Page 3 — Dataset**

Following the creation of the model parameters based on Cleo’s real‑world metrics, the next step was to generate synthetic user‑level data. To simulate realistic behaviour, four interconnected tables were created using a Python script (generated with Anthropics Claude). These tables form the foundation for downstream analysis and dashboarding.

The four datasets are:

- **Parameters** - Model assumptions  
- **Users** - Main user table  
- **Events** - User lifecycle events  
- **Transactions** - Revenue data  

Each table is described below, including how it was generated and what it simulates.

---

## **Users Table**

### **Headers**
- user_id  
- signup_date  
- acquisition_channel  
- experiment_group  
- activated  
- activation_date  

### **How It Was Generated**
- 100,000 users created with unique sequential IDs.  
- Signup dates randomly distributed across 1 January – 31 December 2024.  
- Acquisition channel assigned using weighted probabilities:  
  - Organic (40%)  
  - Paid Social (30%)  
  - Referral (20%)  
  - Influencer (10%)  
- Experiment group randomly assigned (50% A / 50% B).  
- Activation determined using a Bernoulli trial¹ (60% probability).  
- Activation date generated 0–7 days after signup for activated users only.

### **This Simulates**
- Realistic acquisition mix  
- Controlled A/B test assignment  
- Activation funnel drop‑off  
- Time‑to‑activation behaviour  

---

## **Events Table**

### **Headers**
- user_id  
- event_date  
- event_type  

### **Event Types Generated**
- signup  
- activated  
- converted_to_paid  
- churned  

### **How It Was Generated**
- Every user receives a signup event.  
- Only activated users receive an activated event.  
- Only converted users receive a converted_to_paid event.  
- Churn events generated dynamically during transaction simulation when a user stops subscribing.

### **What This Means**
This table functions as a behavioural event log. Instead of storing only final states, it captures *when* behaviour occurs, enabling:

- Funnel analysis  
- Lifecycle tracking  
- Retention analysis  
- Time‑to‑conversion analytics  
- Churn analysis  

### **What This Simulates**
- Real product interaction tracking  
- Sequential user journeys  
- Lifecycle milestones  
- Post‑conversion subscription cancellation  

---

## **Transactions Table**

### **Headers**
- user_id  
- transaction_date  
- revenue_type  
- amount  

### **Revenue Types**
- Subscription  
- Transaction_fee  

### **How It Was Generated**
For each converted user:

- Monthly subscription billing added from conversion date.  
- For each billing month:  
  - 1–3 transaction fees generated randomly  
  - Each fee between $5–$25  
- Each month includes a 4% probability of churn.  
- If churn occurs:  
  - Billing stops immediately  
  - A churn event is recorded  
- Billing continues for a maximum of 12 months or until churn.

### **What This Simulates**
- Recurring SaaS revenue  
- Variable transactional revenue  
- Probabilistic churn  
- Revenue variability at the user level  

---

## **Parameters Table**

### **Headers**
- parameter  
- value  

### **Parameters Included**
- Total Users  
- Activation Rate  
- 12‑Month Conversion Target  
- Monthly Churn Rate  
- Plus Tier Price  
- Pro Tier Price  
- Builder Tier Price  

This table documents the model assumptions so the dataset can be understood, audited, and reproduced.

---

After running the Python script in VSCode, the four tables were generated as `.csv` files and imported into Power BI.

The **Users** table was linked via `user_id` to both the **Transactions** and **Events** tables.

A **Date** table was then created to serve as a continuous calendar for 2024. This is required because the Users, Events, and Transactions tables only contain dates where activity occurred. The Date table was linked via:

- Date → users.signup_date  
- Date → events.event_date  
- Date → transactions.transaction_date  

This enables the creation of dynamic calculation formulas (also known as DAX measures) for commercial metrics, time‑series analysis, and dashboard visualisation.

---

**Footnotes:**  
¹ **Bernoulli trial** -  A Bernoulli trial means each user was randomly marked as activated or not using a fixed 60% probability, creating a realistic activation funnel drop‑off.
