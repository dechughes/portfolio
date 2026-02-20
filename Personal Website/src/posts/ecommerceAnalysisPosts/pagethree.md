## **Schema Design Logic**

The four tables used in this project have clear dependency relationships. Before loading any data, the tables were created in the correct sequence with foreign key constraints to enforce referential integrity. This required mapping the relationships between entities before writing a single line of SQL.

---

## **Relationship Mapping**

### **Customers → Orders**
- One customer can place many orders  
- `customer_id` is the primary key in `customers` and a foreign key in `orders`

### **Orders → Order Items**
- One order can contain many items  
- `order_id` is the primary key in `orders`  
- `order_id` is part of the composite primary key in `order_items`

### **Orders → Payments**
- One order can have multiple payment records  
- `order_id` is the primary key in `orders`  
- `order_id` is a foreign key in `order_payments`

---

## **Table Creation & Import Order**

### **Step 1 — Customers Table**

```sql
CREATE TABLE customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    customer_unique_id VARCHAR(50),
    customer_zip_code_prefix INT,
    customer_city VARCHAR(100),
    customer_state VARCHAR(5)
);
```

---

### **Step 2 — Orders Table**

```sql
CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50),
    order_status VARCHAR(30),
    order_purchase_timestamp DATETIME,
    order_approved_at DATETIME NULL,
    order_delivered_carrier_date DATETIME NULL,
    order_delivered_customer_date DATETIME NULL,
    order_estimated_delivery_date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

---

### **Step 3 — Order Items Table**

```sql
CREATE TABLE order_items (
    order_id VARCHAR(50),
    order_item_id INT,
    product_id VARCHAR(50),
    seller_id VARCHAR(50),
    shipping_limit_date DATETIME,
    price DECIMAL(12,2),
    freight_value DECIMAL(12,2),
    PRIMARY KEY (order_id, order_item_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

---

### **Step 4 — Order Payments Table**

```sql
CREATE TABLE order_payments (
    order_id VARCHAR(50),
    payment_sequential INT,
    payment_type VARCHAR(30),
    payment_installments INT,
    payment_value DECIMAL(12,2),
    PRIMARY KEY (order_id, payment_sequential),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

---

### **Import Sequence**

Data was imported in the same order:

1. `customers`  
2. `orders`  
3. `order_items`  
4. `order_payments`  

Importing out of sequence would have caused foreign key constraint violations.

---

## **Referential Integrity Testing**

After import, four checks were run to validate relational integrity:

- **Orders without customers:** None  
- **Payments without orders:** None  
- **Orders without payments:** One (likely abandoned or failed transaction)  
- **Order items without orders:** None  

---


## **Summary**

The database structure was successfully implemented with strong referential integrity. All tables imported cleanly, and early reconciliation checks highlighted only minor discrepancies. This provided a solid foundation for the SQL‑based cleaning, validation, and commercial analysis that followed.
