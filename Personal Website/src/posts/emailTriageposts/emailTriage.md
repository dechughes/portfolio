# AI-Powered Email Triage
### Prompt engineering for structured email extraction in cross-border payments operations

---

## The Problem

Anyone who has worked in consulting, the corporate world or any desk-based job nowadays knows how much time disappears into email. You get in, make your tea and by the time you’ve sat down to start, you’ve already received 30 emails that hadn’t been there when you left the night before. Immediately you’re triaging - who sent this, what do they need, how urgent is it, does it have any missing information, what do I actually need to do? When you're processing emails across different projects this winds up being time-consuming and a brain-strain before you’ve started any of the real work.

I wanted to see how well a AI model could reliably extract structured information from fabricated emails, classify them accurately, flag risks, and return a consistent JSON output -  without hallucinating, drifting, or missing the things that actually matter in a payments context?

For this project, I created a fictional client - **FrontierAid International** - which sends humanitarian payments into emerging markets including Uganda, Ghana, DRC, and Kenya. They're a stand-in for the kind of client a bank like Crown Agents Bank (CAB) would routinely work with. Their emails arrive from different senders across finance, compliance, and operations. Some are urgent. Some are ambiguous. Some are automated batch notifications with a ZIP attached that may or may not have actually arrived.

This project was completed in under 48 hours as part of an interview preparation sprint. The focus was on demonstrating structured thinking, prompt iteration, and operational awareness rather than building a production‑ready system.

---

## Approach

Before writing a single line of prompt, I mapped out what actually needs to be extracted from an operational email in this context:

- **client_name** - who is contacting the bank
- **sender_name / sender_role** - who specifically, and in what capacity
- **email_type** - payment instruction, delay investigation, compliance request, FX query, batch submission, pre-advice, etc.
- **operational_category** - what workflow does this trigger
- **urgency_level** - low to critical
- **tone** - emotional register, not just urgency
- **requested_action** - every explicit ask, not just the first one
- **dates_mentioned** - including relative dates converted to ISO format
- **amounts_mentioned** - in consistent currency formatting
- **reference_numbers** - transaction IDs, case references
- **attachments_referenced** - anything flagged in the email body
- **risk_flags** - explicit and implicit: corridor risk, missing information, compliance gaps, FX volatility, client sensitivity
- **summary** - 3–4 sentences, grounded in what the email actually says
- **confidence_score** - the model's own self-assessment

I generated a dataset of 20 emails using Claude (better at ambiguity, nuance, and writing emails that sound like real people), saved each as an individual Markdown file (advised by OpenAI for AI parsing due to its consistent structure), and ran them through ChatGPT via a Python script rather than pasting each one manually.

I chose ChatGPT for the extraction engine because it handles structured output and JSON consistency well (fewer hallucinations on extraction tasks compared to other models) and it is the most recognsied AI model and so if it were implemented in an office environment, the chances are that everyone would have at least heard of it. I used Copilot during the prompt design and planning phase because of the no token limit. Different tools, used intentionally for what they're each good at.

---

## Prompt V1 - Baseline

The baseline prompt gave the model a clear role, a list of fields to extract, and a JSON-only output requirement. Triple-quoted email content separates instructions from the actual email, which reduces the risk of the model conflating metadata with body text.

Following OpenAI's best practice, the instructions come before the email content - it anchors the model before it starts reading.

```
You are an AI assistant supporting the Operations team at a bank that processes FX 
and cross-border payments into emerging markets. You will receive a single email in 
Markdown format. Your task is to extract structured information, classify the email, 
summarise it, and flag risks.

Follow the instructions carefully and return only valid JSON.

[Field definitions + JSON schema]

Email to analyse:
"""{{EMAIL_CONTENT}}"""
```

The structure was sensible. The output was often not.

![Folder Structure](/assets/emailTriageimages/folderstructure.png)

The folder structure and a section of the Python script for this project.
---

## Evaluating V1

I manually reviewed the first five emails. For each one, I wrote out what I considered the ideal output across ten fields, basically what any competent operations analyst would extract, then compared that to what the model actually returned.

The gaps grouped into six categories:

**Extraction gaps** were the biggest issue. The model consistently combined multiple requested actions into a single line. Three emails had three or four distinct things being asked; V1 returned one. The tone was flattened to a single word and sender roles were dropped entirely.


**Date handling** was unreliable. Relative dates like "last Friday" or "next month" were left as raw text rather than converted to standard ISO dates using the date received.


**Classification problems** were consistent. Email types came back as generic labels - "Operational", "Request", "Inquiry" - rather than anything domain-specific. These labels are useless for routing decisions.


**Format inconsistency** meant the same field could look different across emails. Urgency sometimes "High", sometimes "high". Tone sometimes a single word, sometimes a phrase. Dates sometimes ISO, sometimes raw. That inconsistency would break any later parsing.


**Risk coverage was incomplete.** The model typically returned one or two risks when there were four or five. It missed corridor-specific risks, compliance delays, client sensitivity, and multi-currency settlement complexity.


**Hallucinations appeared in at least two emails.** In Email 05, the model returned "Process a payment of USD 85,000 to Kinshasa by end of day Thursday" - but no instruction like this existed in the email. In Email 04, it referenced an attachment as if it were present when it wasn't. In Email 02, an encoding artefact appeared in the sender role field.

The table below summarises accuracy across the five emails for key fields:

| Field | Email 01 | Email 02 | Email 03 |
|---|---|---|---|
| client_name | ✅ | ✅ | ✅ |
| sender_name | ⚠️ Role missing | ⚠️ Role missing | ⚠️ Role missing |
| email_type | ❌ Too generic | ❌ Too generic | ❌ Too generic |
| urgency_level | ✅ | ✅ | ❌ Should be low-medium |
| tone | ⚠️ Missing nuance | ⚠️ Missing nuance | ⚠️ Missing nuance |
| requested_action | ❌ Collapsed | ❌ Partial | ❌ Collapsed |
| dates_mentioned | ❌ Relative not converted | ⚠️ Date missing | ❌ Relative not converted |
| risk_flags | ❌ Incomplete | ❌ One of three | ❌ Incomplete |

| Field | Email 04 | Email 05 |
|---|---|---|
| client_name | ✅ | ✅ |
| sender_name | ⚠️ Role missing | ⚠️ Role missing |
| email_type | ⚠️ Too generic | ❌ Misclassified |
| urgency_level | ⚠️ Capitalisation | ✅ |
| tone | ⚠️ Missing nuance | ❌ Collapsed |
| requested_action | ❌ Missed attachment review | ❌ Hallucinated |
| dates_mentioned | ✅ | ✅ |
| risk_flags | ❌ Incomplete | ❌ Incomplete |
---

## From V1 to V2 - What Changed and Why

Rather than rewriting the prompt from scratch, I identified and grouped the specific failures and added targeted rules to address each one. Ten improvements in total:


1. **Controlled vocabulary for email_type** - forcing the model to choose from a defined list of domain-specific labels (payment_instruction, payment_delay_investigation, fx_query, compliance_clarification, batch_submission, etc.) rather than inventing generic ones
2. **Explicit urgency criteria** - defining what "High", "Medium", and "Low" actually mean, with example signal words, and allowing hybrid values like "low-medium" (I found out this was called few-shot prompting)
3. **Multi-label tone** - allowing the model to return multiple tone descriptions rather than a single word
4. **Full requested_action extraction** - requiring every explicit action, not just the first one, and prohibiting collapse
5. **Relative date conversion** - instructing the model to convert dates like "last Friday" or "next month" to ISO format using date_received as the anchor, and return both the original phrase and the converted date
6. **Richer risk_flags** - requiring both explicit and read-between-the-line (implicit) risks, including corridor-specific risks, FX volatility, missing information, and client relationship risks. If no risk exists, return `["no_obvious_risk"]` rather than an empty list
7. **Sender role extraction** - explicitly requiring both name and role whenever present, and instructing the model to clean encoding artefacts
8. **Format standards** - ISO dates throughout, consistent currency formatting, capitalisation rules, arrays always arrays
9. **Hallucination prevention** - a direct instruction not to infer or invent actions, attachments, or instructions not present in the email
10. **Strict JSON schema** - all fields returned even if empty, no extra fields, fixed structure

| Area | V1 Behaviour | V2 Improvement |
|------|--------------|----------------|
| **email_type** | Generic labels (“Operational”, “Request”) | Controlled vocabulary with domain‑specific categories |
| **operational_category** | Often missing or vague | Clear workflow‑based classification |
| **urgency_level** | Inconsistent, no hybrid values | Explicit rules + hybrid values (“low‑medium”) |
| **tone** | Flattened to one word | Multi‑label emotional tone (“concerned, stressed, polite”) |
| **requested_action** | Collapsed into one line | Extract all explicit actions, no inference |
| **dates_mentioned** | Raw text, no conversion | ISO conversion + original phrase retained |
| **risk_flags** | Thin, incomplete | Explicit + implicit risks, corridor‑aware |
| **sender_role** | Frequently missing | Explicit extraction + artefact cleaning |
| **JSON structure** | Drifted across emails | Fully consistent schema, arrays always arrays |
| **hallucinations** | Present in 2 emails | Eliminated through explicit prevention rules |


---

## Prompt V2

```
You are an AI assistant supporting the Operations team at a bank that processes FX 
and cross-border payments into emerging markets. You will receive a single email in 
Markdown format. Your task is to extract structured information, classify the email 
accurately, summarise it, and flag risks. Return only valid JSON following the schema 
below.

Follow these rules carefully:

1. Classification rules
Classify email_type using this controlled vocabulary: payment_instruction, 
payment_delay_investigation, pre_advice, missing_information, fx_query, 
compliance_request, compliance_clarification, batch_submission, 
automated_notification. Do not use generic labels like "Request" or "Operational".
Classify operational_category based on the workflow triggered: payment_processing, 
payment_delay, fx_rate, compliance_review, batch_submission, missing_information.

2. Urgency rules
Determine urgency_level using explicit criteria: High = deadlines today or tomorrow, 
or explicit urgency words like "urgent", "ASAP", "immediately". Medium = 
time-sensitive but no explicit deadline. Low = general queries with no time pressure.
Use hybrid values when appropriate (for example "low-medium").

3. Tone extraction
Extract emotional tone, not urgency.
Tone may contain multiple labels (for example "concerned, stressed, polite").
Avoid collapsing tone into a single word unless the email is genuinely one-dimensional.

4. Requested actions
Extract all explicit requested actions.
Do not infer or invent actions.
Do not collapse multiple actions into one.

5. Dates
Convert relative dates ("yesterday", "last Friday", "next month") into ISO format 
using date_received.
Include both the original phrase and the converted date.

6. Risk flags
Always populate risk_flags.
Include explicit and implicit risks such as corridor risks, missing information, 
compliance risks, client-relationship risks, FX volatility, high-value transfers, 
or missing attachments.
If no risk is present, return ["no_obvious_risk"].

7. Sender details
Extract both sender_name and sender_role whenever present.
Clean encoding artefacts or formatting issues.

8. Formatting consistency
Use ISO dates.
Use consistent currency formatting.
Ensure arrays are always arrays and strings are always strings.
Capitalisation should be consistent across emails.

9. JSON validity
Return only a JSON object.
Include all fields even if empty (use empty strings or empty lists).
Do not add extra fields.

✅ JSON Schema to Follow
{
  "client_name": "",
  "sender_name": "",
  "sender_role": "",
  "email_subject": "",
  "date_received": "",
  "email_type": "",
  "operational_category": "",
  "urgency_level": "",
  "tone": "",
  "requested_action": "",
  "dates_mentioned": [],
  "amounts_mentioned": [],
  "reference_numbers": [],
  "attachments_referenced": [],
  "risk_flags": [],
  "summary": "",
  "confidence_score": 0.0
}

Email to analyse:
Text: """ {{EMAIL_CONTENT}} """
```

---

## V2 Results

The improvements were significant and measurable across all five evaluated emails.

| Field | Email 01 | Email 02 | Email 03 |
|---|---|---|---|
| client_name | ✅ | ✅ | ✅ |
| sender_name | ⚠️ Role still missing | ⚠️ Role still missing | ⚠️ Role still missing |
| email_type | ✅ payment_delay_investigation | ✅ fx_query | ✅ compliance_clarification |
| urgency_level | ✅ | ✅ low-medium | ✅ low-medium |
| tone | ✅ concerned, stressed, polite | ⚠️ Missing "inquisitive" | ⚠️ Missing "confused" |
| requested_action | ⚠️ Still collapsed | ⚠️ Partial | ⚠️ Collapsed |
| dates_mentioned | ⚠️ Missing date received | ⚠️ Missing date received | ⚠️ Partial conversion |
| risk_flags | ⚠️ Missing banking risk | ⚠️ Missing FX amount | ⚠️ Missing detail |

| Field | Email 04 | Email 05 |
|---|---|---|
| client_name | ✅ | ✅ |
| sender_name | ✅ | ⚠️ Role still missing |
| email_type | ✅ batch_submission | ❌ payment_instruction (wrong) |
| urgency_level | ⚠️ Incorrect | ✅ |
| tone | ⚠️ Missing "automated" | ✅ apologetic, concerned, urgent |
| requested_action | ⚠️ Missing attachment review | ⚠️ Missing one action |
| dates_mentioned | ❌ Missing entirely | ✅ |
| risk_flags | ❌ Incomplete | ⚠️ Missing beneficiary/FX |



**Email type classification improved dramatically.** V1 returned pretty generic labels across the board. V2 returned correct domain-specific categories for four of five emails. The one remaining error (Email 05 classified as payment_instruction rather than pre_advice) was closer than V1's equivalent misclassification.


**Urgency became more nuanced.** V2 introduced hybrid values - "low-medium" for Emails 02 and 03 - which is exactly what those emails warranted. V1 didn't attempt this at all.


**Tone was now multi-label.** Where V1 returned "Concerned" or "Urgent" alone, V2 returned things like "concerned, stressed, polite" and "apologetic, concerned, urgent". The emotional tone of an email matters for how and when operations teams should approach the response.


**Relative date conversion now works.** V1 left "last Friday", "last week", and "next month" as raw text. V2 converted them correctly: "last Friday" → 2025-01-10, "last week" → 2024-07-15, "next month" → 2024-08-01.


**Risk coverage became more structured.** V2 consistently returned multiple risks and introduced corridor-specific and domain-aware flags. V1 typically returned one or two. Hallucinations in risk_flags and summary disappeared - V2 summaries stuck closely to what was actually in the email.


**JSON consistency improved across all fields.** Arrays are arrays. Dates are ISO. Capitalisation is consistent. Fields that were empty before now appear as empty strings or empty lists rather than being omitted entirely.


**The remaining gaps** were mostly in multi-action extraction and dates_mentioned completeness. requested_action was still occasionally collapsed, and some emails were missing the date_received as a listed date. Sender roles were extracted into the separate sender_role field correctly, but not always included inline with sender_name - a formatting preference more than a failure.

---

## Example Output - Email 01 (V2)

Email 01 is a good example. Maria Gomez from FrontierAid International is chasing a delayed USD 47,500 payment to Kampala Community Health Trust, sent nine January, expected by the previous Friday. Staff salaries are tied to it.

![Email 01](/assets/emailTriageimages/email01.png)

V2 returned:

- **email_type:** payment_delay_investigation ✅
- **urgency_level:** high ✅
- **tone:** concerned, stressed, polite ✅
- **dates_mentioned:** both "last Friday" converted to 2025-01-10 and "9 January" as 2025-01-09 ✅
- **risk_flags:** payment delay, staff salaries tied to payment, corridor risk ⚠️ (correspondent banking issue missing)
- **confidence_score:** 0.95
- **summary:** grounded in the email content, no invented instructions

The requested_action field still collapsed four distinct asks into one sentence, the main major remaining weakness, but everything else parsed correctly.

---

## Why V2 Is Better


V1 was a decent starting point that produced inconsistent, incomplete output. Classification was too generic to be actually useful. The risk coverage was weak. The JSON structure was varied across emails.


V2 solved the core problems. Classification is now domain-aware. Urgency is structured and defined rather than defaulted. Tone reflects the actual emotional register of the email. Relative dates are converted. Risk flags are more detailed and consistent. The JSON schema is consistent across all five emails without much variance.


The improvement wasn't from a complete rewrite. It was the result of identifying specific failures and adding targeted rules for each one. Classic prompt engineering process in practice: diagnose first, then fix precisely.


---


## Risks & Limitations


**The model still collapses multiple requests.** Even with explicit instructions not to, V2 occasionally merged two or three actions into one sentence. In a payments context, missing a requested action isn't a minor issue.


**Risk coverage has a ceiling.** The model consistently caught the obvious risks but missed some of the more contextual ones - correspondent banking issues specific to a corridor, implicit compliance risks, client relationship sensitivities. Domain knowledge in the risk flags is only as good as what the prompt explicitly tells it to look for.


**Email 05 misclassification shows limits on ambiguous emails.** The email was a heads-up about an incoming instruction, not the instruction itself. The model classified it as payment_instruction. Without more examples or few-shot prompting (already using the lingo), edge cases like this are hard to catch consistently.


**Hallucination risk hasn't disappeared, it's been reduced.** The prevention rule helped significantly. But the risk remains, particularly when an email is ambiguous or contains implicit references. Any output going into a live workflow would need a human review step.


**The dataset is synthetic.** Twenty AI-generated emails don't cover the full range of real-world variation - abbreviations, informal language, forwarded chains, emails with attachment-only instructions, multilingual content. Real-world performance would need a separate evaluation pass.


---


## How This Would Be Used at CAB

The point of producing a structured JSON output was because it could slot into an existing workflow. In practice this could feed directly into Power Automate, Copilot Studio, or any AI-based system. JSON is the standard format for this kind of structured connection between AI and workflow tools.


The triaged output would give an operations analyst an immediate, consistent first-pass view of every inbound email: what type it is, what's being asked, what the urgency level is, what risks are flagged. Rather than reading each email from scratch, they'd review the extracted output and either act on it or query it.


Over time, if all emails for a given client were stored in structured format, you'd also build an audit trail of what was requested, what was agreed, what changed. I know from previously working on multiple projects across multiple clients that this would become genuinely useful for tracking and catching contradictions or scope creep before they become problems or even just to be able to see what was sent without having to scour your whole inbox.


---


## What I Would Do in V3


The two biggest remaining gaps are multi-action extraction and dates_mentioned completeness.


For requested_action, I'd explore few-shot prompting which is basically a fancy term for giving the model one or two worked examples of emails with multiple explicit asks and showing it the expected output format. Describing the rule hasn't fully solved it; showing it might.


For dates_mentioned, the issue is partly that date_received isn't always being included as a listed date, and partly that some emails with complex date references (multiple months, ranges) lose some entries. A better defined  schema with a separate field for the received date would help.


I'd also look at whether Email 05-style edge cases (pre-advice vs. instruction) could be addressed with a clearer definition in the controlled vocabulary, or whether they need few-shot examples to distinguish reliably.


The longer-term extension worth building: a client-level memory layer. Right now the model sees one email at a time. If it could see the thread of prior emails for the same client and corridor, it would be better placed to flag contradictions, escalation patterns, and how the current email relates to what was agreed before.


---
## What I learned

A couple things stood out during this project.

First, it’s actually very easy to link an AI engine to a python script, it was as simple as downloading a few packages and saving the API code into my computer. I will definetly be using this in other projects. 

Second, defining the ideal and failures is the key, writing the prompt is easy, you can actually get other AIs to write it for you. The diagnosis, description and identification has to be human though. The improvements in V2 came from understanding exactly where the model struggled and addressing those points directly.

Third, ambiguity is the real enemy. Without prior context, explicit rules or examples, all models are going to find it hard to define and extract the the information you require.


---

## Conclusion


This project was about more than getting a model to output JSON. It was about understanding where prompt engineering actually makes a difference, where it doesn't and what it takes to implement it in a smaller use-case. 


V1 showed that a clear, well-structured baseline prompt still leaves a lot on the table. The classification is too blunt. The risk coverage is shallow. The output drifts. V2 showed that targeted improvements based on documented failure modes produce measurable, meaningful gains, not because the model got smarter, but because the instructions got more precise.


The process matters as much as the output: observe what breaks, understand why, fix it surgically. That's the discipline this kind of work requires, and it's the same discipline that applies when designing any operational process.


---


*Tools used: Claude (dataset generation - better at nuance and ambiguity in email writing), ChatGPT (JSON extraction - fewer hallucinations on structured tasks), Copilot (prompt design and project planning). Evaluated on five emails, each manually reviewed against an ideal output I defined before running the model.*