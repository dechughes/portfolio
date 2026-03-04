## **Strategic Recommendations**

This project set out to model a fintech platform anchored to Cleo's real published metrics and use that model to answer questions a growth or product analyst would genuinely face. Having built the dataset, created the measures, and worked through four dashboards, three clear commercial priorities emerge from the data and one broader observation about what the model reveals about the real Cleo business.

---

## **1. The conversion stage is the primary revenue bottleneck and speed matters as much as rate**

Only 41.5% of activated users convert to paid, and the average time to conversion is 56 days. These two numbers together are the single biggest constraint on revenue growth. A user who takes 56 days to convert generates no revenue during that window, and because transaction fees scale with active billing months, a slow converter contributes materially less lifetime revenue than a fast one even if they ultimately churn at the same rate.

The commercial implication is that interventions targeting conversion speed such as personalised prompts around day 30, feature-gating that creates urgency earlier in the free experience, or a time-limited trial offer, would likely generate more revenue uplift than equivalent investment in top-of-funnel acquisition. The funnel isn't leaking because of poor acquisition quality. Every channel activates and converts at essentially identical rates. The bottleneck is in the middle, not the top.

---

## **2. Month 0 and Month 1 post-conversion are the highest-risk window and the highest-leverage intervention point**

The cohort analysis is unambiguous on this: churn is heavily front-loaded. The biggest subscriber losses happen in the first one to two billing months after conversion. Users who survive beyond Month 2 become significantly more stable, with retention holding in the 74–80% range from Month 3 onward - well above the fintech benchmarks used to build the model.

This means that onboarding quality in the first 30–60 days post-conversion is the most commercially valuable area to invest in. A user who converts but churns in Month 1 generates one month of subscription revenue and minimal transaction fees. A user who stays to Month 6 generates six months of subscription revenue and accumulating transaction fees. The difference between those two users is significant at scale, and the cohort data shows that the difference is largely determined in the first two billing cycles. Feature adoption nudges, milestone celebrations, and early value demonstration - anything that makes the product feel indispensable before the second billing date - are the highest-leverage retention tools available.

---

## **3. The active subscriber base is eroding and the business needs to either grow faster or churn less**

The revenue decline identified in Page 5 is not a sign of poor acquisition or weak monetisation quality. ARPU is consistent across every cohort at every stage of the lifecycle. The problem is purely volumetric: the active subscriber base fell from roughly 2,043 in January to 652 in December as early cohorts churned out faster than late-year conversions could replace them.

In a real business context this would be a critical signal. A declining active base means the business is running to a stand still - spending on acquisition to replace churned subscribers rather than growing net. The current model suggests that to stabilise and then grow the active base, the business would need some combination of lower early churn, faster conversion from sign-up, or higher acquisition volume. Of these, reducing early churn is the most capital-efficient because it requires no additional acquisition spend - it improves the return on spend already made.

---

## **4. On the A/B test**

Variant A and Variant B produced effectively identical results across every metric. This is not a failure of the experiment - it is the correct finding when two variants are too similar to produce measurable behavioural differences. The recommendation is not to roll out either variant but to design a more structurally different test: a meaningfully different onboarding flow, a different conversion trigger, or a pricing structure change. Marginal UI variations will not move the needle on a conversion or retention problem of this nature.

---

## **What This Model Suggests About the Real Cleo**

One of the more interesting outcomes of anchoring this model to real published data is that it produces a view on what Cleo's business might actually look like beneath the headline numbers. The 3-month CAC payback and 50% 12-month conversion rate that Cleo publishes are only possible if early retention is strong and the cohort data in this model, which sits above the fintech benchmarks, is consistent with that. A business recovering $11 CAC in 3 months at a $6.69 monthly ARPU needs subscribers to stay subscribed, and the model suggests they do. The real Cleo is likely a business with stronger retention than its consumer fintech peers, an efficient acquisition engine, and a revenue mix that is increasingly shifting toward transaction fees as the subscriber base matures - exactly what the ARPU progression in the cohort analysis shows.

---

# **Personal Learnings**

## **Technical - DAX, Power BI, and data modelling**

The biggest technical takeaway from this project is that the data model is everything. It is not something you tidy up later. It determines whether the rest of the work is stable or fragile.

Before I could build any meaningful measures, I needed a proper continuous Date table connected correctly to each fact table. Without that structure, time comparisons either fail quietly or return results that look plausible but are wrong. That is far more dangerous than a visible error. Taking the time to get the model right upfront saved a lot of frustration later.

Working with DAX also forced me to properly understand filter context rather than relying on trial and error. The Cohort Retention Rate measure needed an explicit ALL() to remove the date filter from the denominator - without it, the starting cohort size would filter to the current month rather than the cohort's origin month, producing retention rates above 100%. Understanding why that happened, rather than just patching it, made debugging much faster and more deliberate.

---

## **Analytical - Interpreting data and measurement limitations**

The most valuable analytical lessons came from the metrics that looked wrong.

The first issue was the measure used to calculate churn rate. The calculation seems intuitive: dividing churned users by active subscribers. However, when the subscriber base is shrinking it inflates the churn rate over time. The result is a number that looks worse each month even if behaviour is stable. The formula was simple, but the logic behind it was flawed for a declining base.

The second issue was the Month 0 retention distortion. Because retention was grouped by calendar month, users who converted late in the month had their first billing cycle recorded in Month 1. That made Month 0 retention look artificially low. It only became obvious once I questioned why the first month appeared weaker than expected.

The third issue was the 100 percent churn values appearing in later cohort months. These were caused by division by zero in months beyond the dataset window. At first glance they looked dramatic. In reality they were just products of the dynamic equations. Without checking the logic underneath, it would have been easy to misinterpret them as real behaviour.

What all three issues reinforced is a habit I value more than any technical trick: if a number surprises me, I stop and ask why. Not every unexpected result is insight. Sometimes it is just the model behaving exactly as written. That instinct to interrogate the output before interpreting it feels like the difference between analysis and reporting.

---

## **Commercial - Fintech business model and unit economics**

This project also sharpened my understanding of subscription economics. I understood the terminology before starting. Working through it made the relationships much clearer.

CAC, ARPU, churn, gross margin, and payback period do not move independently. They operate as a system. If churn increases, payback lengthens. If ARPU rises, LTV changes. When I back calculated implied churn from published CAC and payback figures, and sense checked it against gross margin assumptions, the interdependence became concrete rather than theoretical.

Another key lesson was how to interpret revenue trends in a cohort-based subscription model. A declining revenue line looks alarming in isolation. When broken down by cohort and active subscriber base, the explanation becomes clearer. In this case, revenue declined because the active base was shrinking, not because monetisation per user was deteriorating. This ability to see a trend, deconstruct it and then pull from different areas to explain what the real cause really helped me gain a greater appreciation for understanding what the story is beyond the surface numbers.

Modelling a real company with real published numbers as constraints helped force a level of constraint that an invented dataset wouldn't have required. Every assumption had to reconcile with something Cleo had actually said publicly, which meant I couldn't paper over inconsistencies. That constraint made the project harder and more interesting in equal measure.
