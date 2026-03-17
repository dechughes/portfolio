import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# -----------------------------
# 1. PARAMETERS
# -----------------------------

np.random.seed(42)
random.seed(42)

TOTAL_USERS = 100_000
ACTIVATION_RATE = 0.60
ANNUAL_CONVERSION_TARGET = 0.50
MONTHLY_CHURN_RATE = 0.04

PLUS_PRICE = 5.99
PRO_PRICE = 8.99
BUILDER_PRICE = 14.99

CHANNEL_DISTRIBUTION = {
    "Organic": 0.40,
    "Paid Social": 0.30,
    "Referral": 0.20,
    "Influencer": 0.10
}

TIER_DISTRIBUTION = {
    "Plus": 0.60,
    "Pro": 0.30,
    "Builder": 0.10
}

START_DATE = datetime(2024, 1, 1)
END_DATE = datetime(2024, 12, 31)

# -----------------------------
# 2. GENERATE USERS TABLE (VECTORIZED)
# -----------------------------

print("Generating users...")

# Generate random signup dates
days_range = (END_DATE - START_DATE).days
signup_dates = [START_DATE + timedelta(days=int(x)) for x in np.random.uniform(0, days_range, TOTAL_USERS)]

# Generate acquisition channels
channels = np.random.choice(
    list(CHANNEL_DISTRIBUTION.keys()),
    size=TOTAL_USERS,
    p=list(CHANNEL_DISTRIBUTION.values())
)

# Generate experiment groups
experiment_groups = np.random.choice(["A", "B"], size=TOTAL_USERS)

# Generate activation status
activated = np.random.rand(TOTAL_USERS) < ACTIVATION_RATE

# Generate activation dates (0-7 days after signup, only for activated users)
activation_offsets = np.random.randint(0, 8, size=TOTAL_USERS)
activation_dates = [
    signup_dates[i] + timedelta(days=int(activation_offsets[i])) if activated[i] else None
    for i in range(TOTAL_USERS)
]

users_df = pd.DataFrame({
    "user_id": range(1, TOTAL_USERS + 1),
    "signup_date": signup_dates,
    "acquisition_channel": channels,
    "experiment_group": experiment_groups,
    "activated": activated,
    "activation_date": activation_dates
})

print(f"✓ Generated {len(users_df)} users")

# -----------------------------
# 3. GENERATE CONVERSIONS (VECTORIZED)
# -----------------------------

print("Simulating conversions...")

# Filter to activated users only
activated_users = users_df[users_df["activated"] == True].copy()

# Monthly conversion probabilities (sum to ~50%)
monthly_probs = [0.15, 0.10, 0.08, 0.06, 0.04, 0.03, 0.02, 0.01, 0.005, 0.005, 0.005, 0.005]

# Simulate which month each user converts (or doesn't)
conversion_months = []
for _ in range(len(activated_users)):
    converted = False
    conversion_month = None
    for month, prob in enumerate(monthly_probs):
        if not converted and np.random.rand() < prob:
            converted = True
            conversion_month = month
            break
    conversion_months.append(conversion_month)

activated_users["conversion_month"] = conversion_months
activated_users["converted"] = activated_users["conversion_month"].notna()

# Calculate conversion dates
activated_users["conversion_date"] = activated_users.apply(
    lambda row: row["activation_date"] + timedelta(days=30 * row["conversion_month"]) 
    if pd.notna(row["conversion_month"]) else None,
    axis=1
)

# Assign tiers to converted users
converted_users = activated_users[activated_users["converted"] == True].copy()
converted_users["tier"] = np.random.choice(
    list(TIER_DISTRIBUTION.keys()),
    size=len(converted_users),
    p=list(TIER_DISTRIBUTION.values())
)

print(f"✓ {len(converted_users)} users converted ({len(converted_users)/len(activated_users)*100:.1f}% of activated)")

# -----------------------------
# 4. GENERATE EVENTS TABLE
# -----------------------------

print("Generating events...")

events = []

# Signup events (all users)
for _, row in users_df.iterrows():
    events.append([row["user_id"], row["signup_date"], "signup"])

# Activation events
for _, row in activated_users.iterrows():
    if pd.notna(row["activation_date"]):
        events.append([row["user_id"], row["activation_date"], "activated"])

# Conversion events
for _, row in converted_users.iterrows():
    if pd.notna(row["conversion_date"]):
        events.append([row["user_id"], row["conversion_date"], "converted_to_paid"])

events_df = pd.DataFrame(events, columns=["user_id", "event_date", "event_type"])

print(f"✓ Generated {len(events_df)} events")

# -----------------------------
# 5. GENERATE TRANSACTIONS (SIMPLIFIED)
# -----------------------------

print("Generating transactions...")

transactions = []

tier_prices = {"Plus": PLUS_PRICE, "Pro": PRO_PRICE, "Builder": BUILDER_PRICE}

for _, user in converted_users.iterrows():
    user_id = user["user_id"]
    conversion_date = user["conversion_date"]
    tier = user["tier"]
    tier_price = tier_prices[tier]
    
    # Generate up to 12 months of billing (or until they churn)
    billing_date = conversion_date
    active = True
    months = 0
    
    while active and months < 12 and billing_date <= END_DATE:
        # Monthly subscription
        transactions.append([user_id, billing_date, "subscription", tier_price])
        
        # Transaction fees (1-3 per month)
        num_transactions = np.random.randint(1, 4)
        for _ in range(num_transactions):
            trans_date = billing_date + timedelta(days=np.random.randint(1, 28))
            if trans_date <= END_DATE:
                transactions.append([
                    user_id, 
                    trans_date, 
                    "transaction_fee", 
                    round(np.random.uniform(5, 25), 2)
                ])
        
        # Check for churn
        if np.random.rand() < MONTHLY_CHURN_RATE:
            active = False
            events_df = pd.concat([
                events_df,
                pd.DataFrame([[user_id, billing_date, "churned"]], 
                            columns=["user_id", "event_date", "event_type"])
            ])
        
        billing_date += timedelta(days=30)
        months += 1

transactions_df = pd.DataFrame(transactions, columns=[
    "user_id", "transaction_date", "revenue_type", "amount"
])

print(f"✓ Generated {len(transactions_df)} transactions")

# -----------------------------
# 6. PARAMETERS TABLE
# -----------------------------

parameters_df = pd.DataFrame({
    "parameter": [
        "Total Users",
        "Activation Rate",
        "12-Month Conversion Target",
        "Monthly Churn Rate",
        "Plus Tier Price",
        "Pro Tier Price",
        "Builder Tier Price"
    ],
    "value": [
        TOTAL_USERS,
        f"{ACTIVATION_RATE*100}%",
        f"{ANNUAL_CONVERSION_TARGET*100}%",
        f"{MONTHLY_CHURN_RATE*100}%",
        f"${PLUS_PRICE}",
        f"${PRO_PRICE}",
        f"${BUILDER_PRICE}"
    ]
})

# -----------------------------
# 7. EXPORT CSV FILES
# -----------------------------

print("\nExporting CSV files...")

users_df.to_csv("users.csv", index=False)
events_df.to_csv("events.csv", index=False)
transactions_df.to_csv("transactions.csv", index=False)
parameters_df.to_csv("parameters.csv", index=False)

print("\n✓ Successfully generated:")
print(f"  - users.csv ({len(users_df)} rows)")
print(f"  - events.csv ({len(events_df)} rows)")
print(f"  - transactions.csv ({len(transactions_df)} rows)")
print(f"  - parameters.csv ({len(parameters_df)} rows)")

# Print summary stats
print("\n📊 SUMMARY STATS:")
print(f"  Total Users: {len(users_df):,}")
print(f"  Activated Users: {activated.sum():,} ({activated.sum()/len(users_df)*100:.1f}%)")
print(f"  Converted Users: {len(converted_users):,} ({len(converted_users)/activated.sum()*100:.1f}% of activated)")
print(f"  Total Revenue: ${transactions_df['amount'].sum():,.2f}")
print(f"  Avg Revenue per Converted User: ${transactions_df['amount'].sum()/len(converted_users):.2f}")