
## **Treatment Philosophy**

The approach to data cleaning was deliberate. Rather than removing records that did not fit neatly, the priority was to preserve the dataset's integrity and handle anomalies at the metric level where necessary. This means:

- No records were deleted unless they were confirmed structural duplicates  
- Anomalous records were retained for transparency  
- Where a record could distort a specific metric, it was excluded from that calculation only  

This approach ensures the dataset remains a complete and honest reflection of the source data.

---

## **Anomaly Review & Treatment**

Each anomaly identified during the pre‑SQL review was recreated within SQL, quantified, and assessed against its likely cause and potential impact.

| **Table**       | **Anomaly**                                      | **Records Affected** | **Judgement**                               | **Treatment**                                      |
|-----------------|--------------------------------------------------|-----------------------|----------------------------------------------|----------------------------------------------------|
| orders          | Delivered status with null approval timestamp     | 14                    | Likely logging delay                         | Retained; recorded for transparency                |
| orders          | Cancelled status with delivery date populated     | 6                     | Possible late cancellation or misclassification | Retained; flagged                                 |
| orders          | Delivered to carrier but not to customer          | 7                     | Possible incomplete update                    | Retained; excluded from delivery time calculations |
| orders          | Delivered with no carrier or customer timestamp   | 1                     | Lifecycle inconsistency                       | Retained; excluded from delivery time metrics      |
| orders          | Order with no associated payment                  | 1                     | Failed or abandoned payment                   | Retained; excluded from revenue calculations       |
| order_items     | Zero freight value                                | 383                   | Free shipping or seller‑absorbed cost         | Retained as valid commercial behaviour             |
| order_items     | Shipping dates in 2020 (outside dataset range)    | 4                     | Likely data entry error                       | Retained; excluded from time‑based calculations    |
| order_payments  | Zero payment value                                | 9                     | Likely voucher coverage                       | Retained; excluded from revenue if full order value equals zero |
| order_payments  | Not defined payment type with zero value          | 3                     | Incomplete classification                     | Retained; classified as "unknown" in breakdowns    |
| order_payments  | Voucher payments with zero value                  | 6                     | Voucher edge case                             | Retained unless full order value equals zero       |

---

## **Structural Validation**

Before beginning revenue modelling, a second round of data quality checks was run across all core tables.

### **Duplicate Record Checks**

- Duplicate `order_id` values in the orders table: **none found**  
- Duplicate (`order_id`, `order_item_id`) combinations in order items: **none found**  
- Duplicate (`order_id`, `payment_sequential`) combinations in payments: **none found**  

Primary key consistency was confirmed across all tables.

---

## **Financial Integrity Checks**

All monetary fields (`price`, `freight_value`, `payment_value`) were checked for negative or invalid values.

- No negative financial values were found  
- Maximum and minimum values were reviewed for outliers  
- No extreme or implausible values were identified  

---

## **Timestamp Consistency Checks**

Lifecycle timestamps were validated to confirm logical ordering across the order journey. Two inconsistencies were identified:

- **1,359 records** where the carrier dispatch date precedes the order approval date (~1.4%)  
- **23 records** where the customer delivery date precedes the carrier dispatch date (~0.02%)  

These records were retained and selectively excluded from delivery duration calculations to prevent metric distortion.

---

## **Final Dataset Assessment**

Across all four core tables, structural integrity was confirmed. Identified anomalies were minimal relative to dataset size and did not affect transactional validity. Where inconsistencies existed, they were documented and managed through **metric‑specific filtering** rather than record deletion.

The dataset was deemed **analytically reliable** for commercial modelling.
