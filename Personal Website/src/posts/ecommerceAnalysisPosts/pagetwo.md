## **Dataset Overview**

The dataset used for this project is the **Brazilian E‑Commerce Public Dataset by Olist**, made publicly available via Kaggle. It contains approximately **100,000 orders** placed between 2016 and 2018 across multiple Brazilian marketplaces. The data covers:
- order status  
- payments  
- product sales  
- customer records  
- logistics performance  

The database environment for this project was created locally in MySQL under the schema:
`brazil_ecommerce_analysis`

---

## **Tables Selected and Why**

Although the full dataset contains multiple relational tables, this analysis focuses on **four core transactional tables**:

| **Table**                     | **Purpose**                                           |
|--------------------------------|--------------------------------------------------------|
| `olist_orders_dataset`         |   Order lifecycle, status, and timestamps               |
| `olist_order_items_dataset`    |   Item‑level pricing, freight, and seller linkage       |
| `olist_customers_dataset`      |   Customer identity and geographic data                 |
| `olist_order_payments_dataset` |  Payment type, value, and instalment structure      |

These four tables provide sufficient coverage to analyse revenue, order behaviour, customer activity, and payment structure. Additional tables (e.g., product categories, reviews) were excluded to keep the analysis focused on **commercial and financial performance**.

---

## **Structural Validation Approach**

Before importing the data into MySQL, each CSV file was reviewed in spreadsheet software. This step focused purely on **structural validation** - no manual editing was performed. All formal cleaning was deferred to SQL to ensure full reproducibility.

Validation checks included:

- Row counts vs expected totals  
- Column headers and data types  
- Presence of null or missing values  
- Zero‑value anomalies in financial fields  
- Logical consistency of timestamp sequences  
- Out‑of‑range dates  

---

## **Summary of Data and Flagged Anomalies**

### **Orders Dataset (99,442 records)**

The dataset reflects a clear transactional lifecycle: purchase → approval → carrier dispatch → customer delivery. Most records follow a logical timestamp sequence. A small number of anomalies were identified:

- 14 records marked *delivered* with a null approval timestamp  
- 6 cancelled orders with a populated customer delivery date  
- 7 orders delivered to carrier but not to customer  
- 1 order marked delivered with no carrier or customer timestamp  

These represent **<0.05%** of all records.

---

### **Order Items Dataset (112,651 records)**

- 383 records contain **zero freight value** (likely free shipping or seller‑absorbed cost)  
- 4 records contain **shipping limit dates in 2020**, outside the dataset range  
- No zero‑price items were found  

---

### **Customers Dataset (99,442 records)**

- No structural anomalies identified  
- `customer_id` maps each order to a customer  
- `customer_unique_id` enables repeat‑purchase analysis across orders  

---

### **Order Payments Dataset (103,887 records)**

- 9 records with **zero payment value**  
- 3 records with **"not defined"** payment type and zero value  
- 6 voucher payments with zero value  

---

## **Initial Assessment**

Structural integrity across all four tables was strong. Null presence was limited, and anomalies were minimal relative to dataset size. No critical structural failures were found. All flagged inconsistencies were carried forward for formal validation and quantification within SQL.

Overall, the dataset demonstrated **high structural integrity**, with only minor anomalies requiring deeper investigation during SQL‑based cleaning and analysis.
