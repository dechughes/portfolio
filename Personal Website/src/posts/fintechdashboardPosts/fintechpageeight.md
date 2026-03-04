This section seeks to understand which user cohorts retain best, whether churn stabilises over time, and whether signup timing influences long‑term subscription durability.

---

## **Key Questions**

- Do earlier cohorts retain better or worse than later cohorts?  
- Does churn stabilise after an initial drop‑off period?  
- Is monetisation quality consistent across cohorts or does it vary by signup month?  
- Is there a point at which surviving subscribers become significantly more stable?  
- How does observed retention compare to the benchmarks assumed in Page 2?

---

## **Cohort Retention Dashboard**

[Cohort Retention dashboard image]

---

## **Findings**

### **The Retention Curve - explaining the shape**

The first thing the heatmap shows is that retention doesn't behave the way you might expect. Rather than starting high and decaying, every cohort begins at roughly 35–38% at Month 0, rises to around 55% at Month 1, and then rises again to approximately 74–80% by Month 3 before gradually declining. This is actually because of how the measurement is calculated rather than a behavioural change from users.

Month 0 captures users who converted and generated a transaction within the same calendar month. Users who converted late in the month, e.g. the 28th, would have their first full billing cycle fall into Month 1, meaning they are undercounted at Month 0 and only appear in the data from Month 1 onward. The result is an artificially suppressed Month 0 figure that recovers as those users are captured in subsequent months. This is a known limitation of calendar‑month binning in cohort analysis and worth acknowledging rather than treating the Month 0 figures as meaningful retention data.

From Month 1 onward, the curve is interpretable and tells a clear story.

---

### **Retention is stronger than expected and consistent across cohorts**

Once past Month 1, cohort retention stabilises at a level that is meaningfully higher than the 65–75% M1 and 45–55% M3 benchmarks assumed in Page 2. Every cohort with observable data sits in the 74–80% range by Month 3 and holds reasonably close to that through Month 7 and beyond. January's cohort, which has the longest observable window, shows retention of 77.4% at Month 3, declining gradually to 58.5% by Month 11. This shows a slow and relatively controlled decay rather than a sharp drop‑off.

Critically, this pattern is consistent across every signup month. Whether a user signed up in January or August, their cohort reaches approximately the same retention level at the same point in the post‑conversion lifecycle. Signup timing does not appear to influence retention quality. We can take this to mean the product experience and churn dynamics are stable regardless of when a user joined.

This is a genuinely positive finding. It means the business is not dependent on a particularly strong or weak acquisition period. Every cohort behaves the same way, which makes the retention pattern predictable and the business model more legible.

---

### **Churn is front‑loaded and then stabilises**

The churn rate data tells a consistent story across all cohorts. Taking January as the most complete example: churn sits at 47.6% at Month 0, falls to 38.7% at Month 1, and continues declining to stabilise around 30–32% from Month 5 onward.

Two things are worth noting here. First, the front‑loaded nature of churn confirms that the highest‑risk period for subscriber loss is immediately after conversion - the first one to two billing months are where the business loses the most users. Users who survive this window become progressively more stable. Second, the eventual stabilisation around 30–32% still looks elevated compared to the 4% monthly churn assumption built into the model. As discussed in Page 5, this is largely a measurement issue - the formula measures churned users against the remaining active subscriber count rather than the start‑of‑period base, which inflates the apparent rate as the active pool shrinks. The directional finding - front‑loaded churn that stabilises - is real. The absolute figures should be interpreted with this limitation in mind.

---

### **Monetisation quality is stable and consistent**

The Cohort Monthly ARPU data is one of the cleanest findings in the entire project. Virtually every cohort at every month since conversion produces ARPU in the $23–$40 range, with a slight upward drift as months progress - likely because longer‑tenured subscribers accumulate more transaction fee activity over time. There is no cohort that monetises significantly better or worse than another. January cohorts and September cohorts generate effectively the same revenue per active subscriber at equivalent points in their lifecycle.

This matters because it rules out one possible explanation for the declining revenue trend identified in Page 5. The problem is not that later cohorts are lower quality or generating less revenue per user - they aren't. The problem is purely volumetric: early cohorts are churning out and the active subscriber base is shrinking, not that the remaining subscribers are worth less.

---

### **How this compares to the Page 2 benchmarks**

The assumptions in Page 2 estimated M1 retention of 65–75% and M3 retention of 45–55%, drawn from fintech subscription benchmarks. The observed data sits above both ranges - M1 retention is consistently around 54–56% from the heatmap (noting the Month 0 measurement caveat), and M3 retention is consistently in the 74–80% range. This suggests the model was built on conservative assumptions, and the implied product stickiness is stronger than the benchmarks would have predicted. If these figures approximate the real Cleo platform, it would be consistent with their reported 3‑month CAC payback - strong early retention is precisely what makes a short payback period possible.

---

## **Summary**

Cohort retention tells a more optimistic story than the revenue trend in Page 5 might suggest. Once users convert and survive the first billing month, they are meaningfully sticky and more so than the benchmarks assumed. Churn is front‑loaded and then stabilises, monetisation quality is consistent across every cohort, and no signup period produces meaningfully different outcomes. The structural challenge is not that cohorts are poor quality - it is that the active subscriber base erodes over time because early churn is high enough to shrink the pool faster than new conversions replace it. The intervention that would most change this picture is reducing Month 0 and Month 1 churn - keeping more newly converted users through their first two billing cycles would compound meaningfully across every cohort simultaneously.
