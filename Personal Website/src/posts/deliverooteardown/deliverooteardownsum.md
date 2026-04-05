## How Product Design Increases AOV Through Bundles, Nudges & Price Psychology

A product analysis showing how Deliveroo uses behavioural design to raise AOV while protecting conversion.

**Link to Notion summary page:**
https://www.notion.so/Deliveroo-Teardown-Summary-Basket-Building-and-Upsell-Mechanics-333eb227d87380cd8582c9995f0c33ec?source=copy_link

---

## Key takeaways

- **Momentum > clarity:** The journey is engineered to keep users moving, not thinking. “Thought is the enemy of flow”
- **Incremental upsells win:** Small, low-friction add-ons drive consistent AOV increases.
- **Subscription amplifies spend:** Deliveroo Plus reduces marginal cost and increases order frequency.
- **Big opportunity:** Early personalisation and contextual modes could meaningfully improve first-order conversion.

---

## Project Overview

- **Goal:** Analyse how Deliveroo increases average order value (AOV) through add-ons, bundles, nudges, and price psychology.
- **Why I’ve choosen this:** It is an interesting mix of pricing psychology and behavioural nudges, central to increasing revenue while keeping users engaged and coming back.

---

## Business Context (Condensed)

- **Company:** Deliveroo: Food delivery marketplace connecting users to restaurants via riders.
- **Users:** Busy urban professionals & students (20–40) prioritising convenience.
- **Revenue:** Restaurant commission, delivery/service fees, Deliveroo Plus, and paid restaurant visibility.

---

## User Journey Analysis

![User Journey](/assets/deliverootd/userjourney.png)

*High-level flow from entry → restaurant → menu → basket → checkout.*

### 1. Entry / First Mile

- Users land, enter postcode, and immediately see a discount or offer (i.e 30-day free delivery) - a deliberate activation nudge.
- The homepage is intentionally dense, displaying 21 categories, offers, and familiar brands
- From clicking onto the Deliveroo website it took me less than 20 seconds to click a restaurant.

**Insight: Fast time-to-first-action** reduces friction and accelerates conversion.

### 2. Browsing & Selection

- The feed resembles a social scroll: infinite options, strong imagery, and high-probability brands (McDonald’s, Nando’s).
- Deliveroo trades clarity for exploration to gather behavioural signals.

**Insight: Exploration is intentional.** More scrolling = more data = better future monetisation.

### 3. Menu & Upsells

Once inside a restaurant, the interface narrows focus. Competing options disappear.

Upsell mechanics include:

- **Bundles** with crossed-out prices (anchoring value)
- **Add-ons** framed conversationally (“Fancy anything else?”)
- **Social proof** (“Popular with other people”)

Deliveroo is not trying to push large, high-value upgrades. Instead, it focuses on incremental increases in basket size.

**Insight: Small, low-risk additions** scale better than big upsells.

### 4. Basket

The basket reinforces the same behaviours:

- “People also added”
- Savings via crossed-out prices
- Deliveroo Plus nudges
- Final “Fancy anything else?” prompt

**Insight: Momentum is protected** - no heavy decisions, just small nudges.

### 5. Checkout

All upsells disappear. The UI becomes minimal: address → payment → confirm.

**Insight: Checkout is conversion-only.** No friction, no distractions.

---

## Key Insight Callouts

**Deliveroo optimises for momentum, not clarity**

- The journey is engineered to keep users moving from discovery → selection → basket → checkout.

**Upsells are incremental, not high-value**

- Small add-ons feel low-risk and compound across millions of orders.

**Goal-gradient framing boosts spend**

- Threshold discounts (“Add £X to unlock 20% off”) convert intent into extra items.

**Subscription amplifies AOV**

- When delivery feels “free”, users justify adding more.

**Personalisation gap at sign-up**

- Early experience is generic - a missed opportunity to reduce choice overload.

---

## Core Feature Breakdown

### 1. Basket Recommendation System

**What it does:** Surfaces low-cost complementary items after adding to basket.

**Why it works:** Appears at peak intent; £1–£2 additions feel effortless.

**Where it falls short:** Often generic; limited relevance for repeat users.

### 2. Deliveroo Plus

**What it does:** Removes delivery fees and adds subscription-only perks.

**Why it works:** Reduces marginal cost → increases frequency → increases AOV.

**Where it falls short:** Prompts appear even for low-frequency users; value feels narrow.

### 3. Threshold Discounts

**What it does:** Shows progress toward unlocking a discount.

**Why it works:** Leverages the goal-gradient effect; reframes spending as saving.

**Where it falls short:** Discounts feel generic rather than personalised.

## Upsell Mechanics

![Upsell Mechanics](/assets/deliverootd/upsellmechanics.png)

---

## Growth & Retention Loops

- **Promotions → Order → Convenience → Habit**
    - Promotions “buy” early repetitions; convenience turns them into habits.
    
    ![Growth Loop](/assets/deliverootd/growthloop1.png)

*Promotions drive first repetitions. Convenience compresses time-to-reward and builds a habit.*

- **Deliveroo Plus → Reduced Marginal Cost → Increased Frequency**
    - Subscription removes delivery friction, increasing order frequency and AOV.

- **Marketplace Loop**
    - More users → more restaurants → better selection → more users - compounding upsell opportunities.
    
    ![Marketplace Loop](/assets/deliverootd/marketplaceloop.png)

*The classic network effect supporting Deliveroo.*

---

## UX / UI Evaluation

### Design principles

- Momentum-driven flow
- Visual abundance for glanceable decisions
- Conversational tone to soften commercial intent

### Strengths

- Fast activation
- Integrated, low-friction upsells
- Checkout optimised for completion

### Trade-offs

- Early choice overload
- Generic recommendations reduce perceived value over time

---

## Opportunities & Improvements

### 1. Expand Deliveroo Plus Value

- **Problem:** Deliveroo Plus feels narrow and often irrelevant.
- **Solution:** Add priority delivery, Plus-only menus, loyalty rewards; trigger prompts based on behavioural signals.
- **Why it works:** Increases perceived value and reduces noise.
- **Success metrics:** Plus conversion, Plus churn, order frequency.

### 2. Lightweight Personalisation at Sign-Up

- **Problem:** Early experience is generic and overwhelming.
- **Solution:** Quick onboarding (cuisine, dietary needs, speed vs. price).
- **Why it works:** Reduces cognitive load and speeds first-order conversion.
- **Success metrics:** Time-to-first-order, first-session conversion, NPS.

![Personalisation mock-up](/assets/deliverootd/lightweightpersonalisation.png)

*Personalisation mock-up: A 10-second onboarding to capture intent constraints (diet, budget, speed) to reduce choice overload on first session.* 

### 3. Contextual Modes for Faster Decisions

- **Problem:** Users who want speed face too much choice.
- **Solution:** Modes like “Hungover”, “Quick & Cheap”, “Healthy”.
- **Why it works:** Matches intent to curated options.
- **Success metrics:** Conversion rate, browse time, abandonment.

![Contextual mock-up](/assets/deliverootd/contextualmode.png)

*Contextual modes mock-up: Intent-based shortcuts that turn browsing into a decision (‘Quick & Cheap’, ‘Healthy’), reducing scroll time.*

---

### Closing Summary

- Deliveroo excels at **sequencing**: abundance → focus → momentum → simplicity.
- It raises AOV through **small, psychologically smart nudges** that never slow the user down.
- The next frontier is **personal relevanc**e - early personalisation, contextual modes, and smarter subscription timing.
