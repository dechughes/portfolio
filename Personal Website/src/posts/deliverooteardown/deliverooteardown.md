# Deliveroo Teardown: Basket building and Upsell Mechanics

## Summary

**Focus:** Basket building and AOV optimisation  
**Product area:** Growth/monetisation  
**Key insight:** Deliveroo increases AOV through low-friction, incremental upsells rather than high-value jumps  
**Outcome:** A tightly controlled journey that balances revenue expansion with conversion efficiency


## Goal
Analyse how Deliveroo increases average order value (AOV) through add-ons, bundles, nudges, and price psychology. 

## Why I’ve choosen this
This is an interesting mix of pricing psychology and behavioural nudges, central to increasing revenue while keeping users engaged and coming back.

---

## Business Context

Deliveroo is a British multinational food delivery marketplace that connects consumers with a wide range of restaurants and stores, using delivery riders to provide a fast, convenient, and reliable service.  
Its primary audience is busy, urban professionals and students aged 20–40 who prioritise convenience and speed.  
Deliveroo’s main competitors in the UK market are Just Eat and Uber Eats.

### Revenue is generated through:
- Commission on restaurant orders (~20–45%)  
- Delivery and service fees paid by customers  
- Subscription services (Deliveroo Plus)  
- Restaurant advertising (paid promotion and visibility)

This teardown focuses specifically on the basket-building journey to understand how Deliveroo increases AOV through upselling and behavioural nudges.

---

## The User Journey & Onboarding

**Method:** Tested as a new user on desktop in a single session to replicate a first-time ordering experience.

To understand how Deliveroo increases the AOV in the user journey process I will be constantly asking myself “What is Deliveroo trying to get me to do right now”.

### The parts of the journey I will break this down into will be:
- The first mile (sign-up and entry into the product)  
- The browsing and selection experience  
- The basket-building process  
- Checkout and final conversion  

---

## Entry into the Deliveroo site

After entering a postcode, new users are immediately shown 30 days of free delivery. This is a clear push to convert first-time users into account holders and accelerate the first order.

From clicking onto the Deliveroo website it took me less than 20 seconds to click a restaurant. This aligns with what I’d expect Deliveroo to optimise for: a sub-30-second time-to-first-action. Even small improvements in time-to-first-action can meaningfully increase user conversion and downstream AOV.

The homepage is intentionally dense: 21 categories are immediately visible across the top bar, followed by free-delivery offers, popular brands, and then a long, cornucopic catalogue of restaurants. Each tile displays rating, distance, delivery time, and discounts.

At first glance, this resembles the sweet-shop problem where there are too many options, too little clarity, potentially increasing decision time and reducing satisfaction. This is a classic product trade-off: Deliveroo sacrifices some clarity in the short term to maximise exploration, engagement, and data collection. The risk is increased cognitive load, but the upside is a richer data on user behaviour which could result in higher long-term monetisation.

However, this apparent overload is not a UX flaw but a deliberate strategic choice. Deliveroo appears to be optimising for engagement rather than immediate clarity. The platform could be rewarding time-in-platform so that the longer a user scrolls, the more personalised signals Deliveroo gathers, the more sponsored placements they can surface, and the higher the probability of an eventual order. 

This structure encourages exploration while still surfacing a handful of high-probability options early, reducing cognitive load just enough to keep momentum.

![Entry Point](/assets/deliverootd/entrypoint.png)
---

## Restaurant Pages

The first restaurants surfaced for me included Wingstop, McDonald’s, and Nando’s, all familiar brands with strong ratings, close proximity, and fast delivery times. These are likely prioritised because they maximise the likelihood of conversion.  

Once inside a restaurant page, the experience shifts noticeably. Competing restaurants disappear entirely, and the interface becomes focused on a single outcome: ordering from this merchant.

### The page highlights:
- Menu categories  
- Delivery time and ratings  
- Discounts and offers  
- “Popular with other people” items  

This shift reduces decision fatigue and narrows attention. Instead of continuing to evaluate options, the user is now encouraged to move quickly from the menu to the basket.

---

## Menu-level upsells

This is where Deliveroo actively drives AOV. Three core mechanisms are used.

**Bundles** are the most explicit. Higher-priced combinations are presented with crossed-out original prices, anchoring the perception of value and making larger orders feel like a better deal. The decision becomes less about spending more and more about “getting more for slightly extra”.

**Add-ons and extras** are layered throughout the experience. Drinks, sides, and upgrades are introduced with low-pressure, conversational prompts such as “Fancy anything else?” or “Getting thirsty?”. These additions are small, familiar, and easy to justify.

**Social proof** plays a key role in reducing friction. Sections like “Popular with other people” and “People also added” make additional purchases feel normal rather than optional, removing the need for active decision-making.

These mechanics vary by merchant. For example, McDonald’s prominently pushes “Meals for two” at £12.99 compared to a single meal at £8.99, effectively anchoring users towards a higher basket size.

Across all of these, Deliveroo is not trying to push large, high-value upgrades. Instead, it focuses on incremental increases in basket size, small additions that feel low risk and easy to accept.

One limitation of this approach is that many of these upsells are generic rather than personalised. While effective at increasing AOV, they may not always increase perceived value for the user. Over time, this could create a gap between what users spend and what they feel they’re getting, which has implications for long-term retention. However, some of this is is expected for new-users. The account was created for this tear down and therefore not enough data has been generated to allow Deliveroo to make personalised suggestions. 

![Fancy Anything Else?](/assets/deliverootd/fancyanythingelse.png)
---

## Basket Stage

Once items are added, Deliveroo reinforces the same behaviours rather than introducing new ones.

### The basket highlights:
- “People also added” suggestions (typically low-cost extras)  
- Savings through crossed-out pricing  
- Fee breakdowns with delivery savings emphasised  
- Subscription nudges (“This order would have been free with Plus”)  
- A final “Fancy anything else?” prompt appears before checkout  

At this stage, the focus is on maintaining momentum. Larger upsells are avoided, as they would introduce friction and risk breaking the flow. Instead, Deliveroo leans into small, low-commitment additions that increase basket size without forcing a new decision.

![Savings and Offers](/assets/deliverootd/savingsandoffers.png)

---

## Checkout

At checkout, the strategy shifts entirely.

The interface is stripped back to the essentials: delivery details, address, payment, and basket summary. All upsell mechanics disappear.

This reflects a clear transition from revenue optimisation to conversion optimisation. The goal is no longer to increase order size, but to ensure the user completes the purchase with as little friction as possible.

---

## Journey Level Insight

Across the journey, Deliveroo balances two competing goals: increasing AOV and maximising conversion.

Upsells are introduced early through bundles, add-ons, and social proof, then reinforced in the basket through savings and low-friction prompts. At checkout, these mechanisms are removed entirely to prioritise speed and simplicity.

The result is a system where users are gradually nudged towards higher basket sizes without ever feeling blocked or slowed down at the point of purchase.

---

## Core Features Deconstruction 

In this section, I deconstruct three core features that drive upsell behaviour and increase basket size:

- Basket recommendation system  
- Deliveroo Plus (subscription layer)  
- Threshold discounts & order framing  

---

### Basket recommendation system

Deliveroo’s “People also added” module is a subtle but powerful upsell mechanic. It appears immediately after a user adds an item to their basket, surfacing low-cost complementary items such as dips, drinks, or sides.  

On the surface it looks simple, but its job is very specific: increase basket size without introducing friction. Instead of asking the user to think about what else they might want, Deliveroo removes that decision entirely by presenting socially validated defaults.

This works because it appears at a moment of high intent. The user has already committed to ordering, so the psychological barrier to adding a £1.50 item is almost zero. From a business perspective, it’s a highly effective and scalable way to increase AOV across all merchants without requiring deep personalisation.

Where it falls short is relevance. Recommendations are often generic rather than contextual, which limits effectiveness - particularly for repeat users who expect more tailored suggestions. While this is partly due to a lack of user data early on, there is an opportunity to introduce lightweight personalisation even after a first order.

---

### Deliveroo Plus (Subscription Layer)

Deliveroo Plus is surfaced repeatedly throughout the ordering journey, primarily within the offers section and again in the basket.

At its core, this is a behavioural feature. It reduces the marginal cost of each additional order, making repeat purchases feel cheaper and easier. Over time, this shifts ordering from occasional to habitual behaviour.

From a business perspective, Plus is strategically powerful. It increases order frequency, stabilises revenue, and creates a lock-in effect that competitors struggle to break. It also amplifies other upsell mechanics - when delivery feels “free”, users are more willing to add extras and increase basket size. 

Where this feature falls short is in its context and timing. Plus prompts often appear even when the user is clearly not a high-frequency customer, which can reduce perceived relevance. A more adaptive approach would be showing Plus only when a user’s behaviour suggests they’re approaching subscription-worthy frequency, this would likely increase conversion and reduce noise. 

There is also an opportunity to make the value more immediate. Messaging such as “This order would have been free with Plus” or “You’ve already saved £X” could reframe the subscription as an instant benefit rather than a future commitment.

---

### Threshold discounts & Order Framing 

Deliveroo’s threshold discount mechanic (“Add £7.02 to unlock 20% off”) is one of its most effective order-framing tools. 

The progress bar remains visible as the user builds their basket, creating a sense of momentum and making the reward feel within reach. This taps directly into the goal-gradient effect: users accelerate their behaviour as they get closer to a reward.

The mechanic works because it reframes spending as saving. Instead of thinking “I’m adding more items”, the user thinks “I’m unlocking a discount”. Deliveroo sets the threshold just high enough that adding one or two extra items feels reasonable, which increases basket size without triggering reconsideration of the entire order.

Where it falls short is in perceived relevance. Discounts often feel arbitrary rather than personalised, and frequent users may begin to see them as generic nudges rather than meaningful value.

---

## Growth Loops & Retention Mechanics

Deliveroo’s growth engine is built around habit formation, reduced friction, and marketplace network effects.

---

### Promotions → Order → Convenience → Habit

The first thing users encounter when they enter into the Deliveroo site is a promotion - discounts, free delivery, or limited-time offers. These nudges act as the initial trigger that lowers the barrier to placing an order. 

Once a user completes that first order, the experience of ordering quickly, relaibly and conveniently then becomes the primary retention driver. This creates a simple behavioural loop: a promotion nudges the user into the product, the product delivers a smooth experience, and the user becomes more likely to return even without a discount. 

Deliveroo uses promotions to “buy” the first few repetitions of the habit. Over time, as more behavioural data is collected, these promotions can become more targeted, further reducing friction and increasing both AOV and lifetime value.

---

### Deliveroo Plus → Reduced Marginal Cost → Increased Frequency

Deliveroo plus is one of the platform’s strongest retention mechanics. A common tool in many marketplaces and commerce stores on the Internet today, the subscription model reduces the marginal cost of each order through eliminating delivery costs and promoting further subscription-only offers. 

For users already familiar with the platform, this removes one of the biggest friction points - delivery fees. As a result, ordering becomes easier to justify, shifting behaviour from occasional to habitual.

This effect is further compounded by a lock-in effect. As the customer is paying a monthly subscription for these benefits, they will feel compelled to make use of the benefits more frequently - amplyfying every other growth lever. Promotions feel more valuable, upsells feel cheaper, and basket size tends to increase because delivery no longer feels like a penalty.

---

### Marketplace Loop: More Users → More Restaurants → Better Selection → More Users

Deliveroo’s marketplace leverages a classic network effect to compound growth. 

As more users join the platform, more restaurants want to list on it. As more restaurants join, the selection improves - more variety, wider price points, more availability. Better selection increases the likelihood that users find something relevant, which drives more orders and attracts even more restaurants. 

This loop snowballs over time and is difficult for competitors to break once it reaches scale. This network effect further compounds Deliveroo’s upsell mechanics: more restaurants mean more bundles, more add-ons, and more opportunities to increase AOV. 

![Marketplace Loop](/assets/deliverootd/marketplaceloop.png)
---

## Evaluate the UX/UI and Overall Design

Deliveroo’s design is one of abudance, structure and effectual imagery. The bombardment of results driven by imagery, promotions and ratings allows users to make quick, “glanceable” decisions without having to spend computational energy digesting each option.

From a product perspective, the experience is designed around momentum. The early stages of the journey resemble a social feed: infinite scroll, constant novelty, and continuous micro-nudges. This creates a sense of marketplace depth and encourages exploration.

Once a user commits to a restaurant, the experience becomes sharply focused. Competing options disappear, the interface simplifies, and every interaction nudges the user toward building their basket. This shift from exploration to conversion is deliberate: Deliveroo introduces friction when it’s useful (choice, discovery) and removes it entirely when it isn’t (checkout).

The basket building experience sustains the momentum. Adding items is fast and low-effort. Upsells are integrated into the flow of the experience - on the menu, after item selection, and within the basket itself. Even the fee breakdown is structured to highlight savings before total cost, reinforcing positive perception.

The brand voice is casual, warm, and conversational. The commerical intent of upselling is softened and humanised by language such as  “Fancy anything else?” or “Getting thirsty?” - consistently conveying a cool attitude to whatever actions the user takes. This helps to slowly nudge the user towards a larger basket and higher order size. 

Overall, Deliveroo’s design balances density with clarity, and commercial intent with a friendly, low-pressure tone. It’s not minimalist, but it is purposeful, every element is designed to keep the user moving toward conversion.

---

## Findings & Propose Improvements

Deliveroo’s greatest strength lies in how tightly its commercial model is woven into the product experience. Momentum is controlled with precision: the journey moves from abundance (exploration) to focus (restaurant page) to momentum (basket building) to simplicity (checkout). Each stage reduces cognitive load just enough to keep the user moving. This reflects a simple principle: reducing cognitive load preserves flow. Upsells feel natural, behavioural nudges feel subtle, and the entire experience feels fast, convenient, and low-effort, which is exactly what users want when they’re hungry.

Despite these strengths, there are a few areas where Deliveroo could push further.

---

### 1. Deliveroo Plus: A Missed Opportunity for Deeper Value

Deliveroo Plus is surfaced frequently, but the value proposition remains relatively narrow: free delivery. There is room to expand the perceived benefits such as priority delivery during peak times, exclusive menu items, loyalty rewards, or “Plus-only” promotions. Additionally, Plus prompts could be more behaviour-driven. Surfacing the subscription only when a user’s ordering pattern suggests readiness would make it feel like a natural next step rather than a generic upsell.

**Success metrics:**
- Higher Plus conversion rate  
- Lower churn among new subscribers  
- Increased order frequency for Plus users  

---

### 2. Lightweight Personalisation at Sign-Up

Deliveroo’s personalisation improves significantly over time, but the early experience is largely generic. A lightweight onboarding step such as “What do you usually eat?”, “Any dietary preferences?”, “Are you more of a chicken or pork person?” would allow Deliveroo to personalise the homepage from the first session. This would reduce early-stage choice overload and increase the likelihood of a quick first order.

**Success metrics:**
- Faster time-to-first-order  
- Higher first-session conversion  
- Improved satisfaction for new users  

---

### 3. Contextual Modes to Reduce Choice Overload

Deliveroo’s abundance is a strength, but it can be overwhelming in moments when users want simplicity. A contextual mode i.e “I’m hungover”, “I need something quick”, “Healthy options only”, “Cheap and cheerful” could collapse the catalogue into a smaller, more relevant set of choices. This gives users more control over how much cognitive load they want to engage with, without compromising the breadth of the marketplace.

**Success metrics:**
- Increased conversion for users who typically browse for long periods  
- Reduced abandonment during the browsing phase  
- Higher satisfaction scores for “quick decision” journeys  

---

Deliveroo’s strength is its frictionless journey to monetisation. It increases basket size efficiently and without disruption. By expanding the value of Deliveroo Plus, introducing lightweight personalisation earlier, and offering contextual modes for faster decision-making, Deliveroo could deepen retention, improve first-order conversion, and unlock additional revenue without compromising the flow that makes the product so effective.
