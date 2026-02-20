-- One Time Customer Vs Repeat Customer %
-- SELECT 
--     COUNT(*) AS total_customers,
--     SUM(total_orders=1) AS one_time_customers,
--     SUM(total_orders >1) AS repeat_customers,
--     ROUND((SUM(total_orders =1)/COUNT(*))*100,2) AS one_time_percentage,
--     ROUND((SUM(total_orders >1)/COUNT(*))*100,2) AS repeat_percentage
-- FROM customer_unique_revenue;


-- Revenue split for one-time vs repeat customers

-- SELECT 
--     CASE 
--         WHEN total_orders = 1 THEN 'One-Time'
--         ELSE 'Repeat'
--     END AS customer_type,
--     COUNT(*) AS customers,
--     SUM(total_customer_revenue) AS segment_revenue,
--     AVG(total_customer_revenue) AS avg_revenue_per_customer
-- FROM customer_unique_revenue
-- GROUP BY customer_type;

SELECT 
    SUM(total_customer_revenue) AS top_10_revenue
FROM customer_unique_revenue
GROUP BY customer_unique_id
ORDER BY total_customer_revenue DESC
LIMIT 9610;



-- SELECT 
--     total_orders,
--     COUNT(*) AS number_of_customers
-- FROM customer_unique_revenue
-- GROUP BY total_orders
-- ORDER BY total_orders;