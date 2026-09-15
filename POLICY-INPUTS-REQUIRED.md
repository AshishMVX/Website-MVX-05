# Policy Inputs Required — internal review document

**Do not publish this file.** It records the business facts, decisions and
proposals that need confirmation before the five customer-facing pages
(Terms & Conditions, Privacy Policy, Cancellation & Refund, Shipping & Exchange,
Contact) can be treated as final, adopted policies rather than a review draft.

- **Prepared for:** Mervix Technology Pvt Ltd
- **Policy set effective/updated date used in code:** September 15, 2026
  (`POLICY_EFFECTIVE_DATE` / `POLICY_UPDATED_DATE` in `src/data/content.js`).
  Change these if the real adoption/publication date differs.
- **Status:** The pages are implemented and internally consistent. They are
  **publishable as a first version once the items in sections 1–3 are confirmed.**
  Nothing customer-facing invents a fact; where a fact was unknown, the copy
  either omits it or defers to "the applicable order/agreement."

---

## 1. Business identity — must confirm before publication

| Item | Used in copy as | Needed |
|---|---|---|
| Contracting entity | "Mervix Technology Pvt Ltd" | Confirm this is the entity that actually contracts with customers for online purchases. |
| GeoLink / SkoutHaus / SkoutsMedia / CoreCyrus | "brands under which Mervix Technology Pvt Ltd operates" | Confirm these are **brands/divisions**, not separately incorporated companies. If any *is* a separate company that contracts directly, name which sells what — copy must not imply one entity binds another. |
| Registered office | Office address shown as an **office** (not registered office) | If the Coimbatore address is the registered office, say so and we can label it accordingly. Otherwise the registered office address is still required for invoices/legal notices. |
| CIN, GSTIN | **Not shown** (not invented) | Provide company registration number (CIN) and GSTIN. These are normally expected on invoices and often on policy/contact pages for Indian businesses and payment-gateway onboarding. |
| Grievance / data-protection officer | **Not shown** (Privacy Policy explicitly says none is separately published yet) | If/when a grievance officer is appointed (increasingly expected under Indian data law), provide name + contact so the Privacy Policy can list them. |

## 2. Contact details — must confirm before publication

| Item | Current state | Needed |
|---|---|---|
| Support/business phone | **Hidden.** `CONTACT_PHONE_HREF = ''` and `PHONE_AVAILABLE = false` in `src/data/content.js`. No fake number is shown anywhere. | Provide the real phone number with country code. Set `CONTACT_PHONE_DISPLAY` and `CONTACT_PHONE_HREF` (e.g. `tel:+91...`). The "Call us" card and header phone appear automatically once set. |
| Email | `hello@mervixtechnology.com` — used everywhere as the single verified inbox | Confirm this inbox monitors sales, support, billing, cancellation/refund, delivery and privacy requests (the contact form routes all categories here). |
| Business hours | Mon–Fri, 6:30 PM–3:30 AM IST, labelled **overnight (ends the following morning)** | Confirm hours are current. |
| Social links | **Hidden.** `SOCIAL_LINKS` entries have empty `url`; the social block only renders when a real URL is added. | Provide real LinkedIn / X / Instagram URLs if these should appear. |

## 3. Commercial terms proposed — need business adoption

These are **proposals**, written as practical defaults, not pre-existing company
promises. Publishing the pages adopts them, so please confirm or amend.

### Cancellation & Refund timelines (`CancellationRefund.jsx`, section 7)
Business days = Mon–Fri excluding Indian public holidays, IST. Proposed:

| Stage | Proposed value | Confirm? |
|---|---|---|
| Acknowledge request | within **3 business days** | ☐ |
| Review & decide | within **10 business days** of receiving needed info (longer if complex, with notice) | ☐ |
| Initiate approved refund | within **5 business days** of approval | ☐ |
| Bank/gateway credit after initiation | typically **5–7 working days** (stated as gateway-dependent) | ☐ |
| Suggested window to report billing errors | within **30 days** (does not remove valid legal claims) | ☐ |

> Recheck the 5–7 working-day figure against Razorpay's current refund docs
> before final sign-off: https://razorpay.com/docs/payments/refunds/

### Refund eligibility (defined, not discretionary)
The policy commits to real refunds for: duplicate payments, incorrect/excess
charges, charges after a valid cancellation, paid-but-undelivered items,
unremediable material defect/scope mismatch, Mervix cancelling before delivery,
and anything applicable law requires. **Confirm the business will honour these** —
they are written as genuine commitments, not gateway-appeasing text.

### Liability cap (Terms, section 10)
No monetary cap is invented. Copy defers any cap to "the applicable order form,
statement of work or signed agreement." **Decision needed:** whether to set a
standard aggregate liability cap for website/self-serve purchases (where there is
no signed SOW), and if so, at what figure — reserved for business & legal review.

### Delivery schedules (Shipping & Exchange, section 2)
No universal "instant" or "24–48h" delivery is promised. Automated activation is
described as "shortly after payment"; manual/onboarding/custom delivery defers to
the order/proposal. **Confirm** there is no fixed SLA you want stated globally; if
there is, provide it per fulfilment type.

## 4. Payments / Razorpay — status

- **There is no payment integration in the codebase.** No Razorpay code, no
  checkout, no card handling. Online payments are described as **planned**.
- Privacy Policy states card number/CVV/PIN are handled by the gateway and **not**
  received or stored by Mervix — this reflects the *intended* Razorpay design and
  standard gateway behaviour. **Re-verify once integration is actually built**,
  and confirm exactly which transaction fields Mervix will store.
- Copy makes **no claim of Razorpay approval or certification**, per requirements.
- **This task did not deploy the site or submit it to Razorpay.**

## 5. Analytics (Google Analytics) — currently not live

- `index.html` loads `gtag.js` with a **placeholder Measurement ID `9345662626`**
  (not a valid `G-XXXXXXX` ID). `gtag('config', ..., { anonymize_ip: true })` is
  set, but no real GA property receives data — analytics is effectively inactive.
- The Privacy Policy describes this **accurately**: GA is present with IP
  anonymisation configured, but **not fully activated / not actively collecting
  into a live account**, and states there is **no cookie-consent banner**.
- **Decision needed:** either (a) create a real GA4 property, insert the real ID
  in both places in `index.html`, and then the Privacy Policy's "where activated"
  wording becomes fully live; or (b) remove the placeholder gtag script until GA
  is ready. If GA is activated for EU/UK visitors, consider whether a cookie
  consent mechanism is needed (not currently implemented).

## 6. Other verified third-party data flows (already reflected in Privacy Policy)

| Service | Where | Purpose | Disclosed |
|---|---|---|---|
| **Formspree** | Contact form (`https://formspree.io/f/xdenejvq`) | Receives & forwards form submissions | ✅ Yes |
| **Google Fonts** | All pages (`index.html`) | Web fonts | ✅ Yes |
| **Google Maps** | Contact page iframe | Office map (loads Google content) | ✅ Yes + on-page note |
| **Google Forms** | Careers "Apply" links (`forms.gle/...`) | Job applications | ✅ Yes (recruitment section) |
| **Google Analytics** | `index.html` gtag | Analytics (see §5) | ✅ Yes, with "not fully activated" caveat |

> The exact fields collected by the Google Forms application form were **not
> inspectable from the codebase** (the form is external). The Privacy Policy
> therefore describes it generally and truthfully rather than listing fields.
> Confirm the form's fields if a precise description is wanted.

## 7. Pricing / product disclosure gaps (no payment flow to attach to)

- There is **no productised pricing, plan or checkout** anywhere in the site, so
  the "surface policy links + price/currency/billing/taxes/renewal before payment"
  requirement has **no existing flow to attach to**. Nothing was fabricated.
- When a payment/checkout or pricing page is built, it must show: product/service
  description, price, currency, billing period, taxes, fulfilment expectation, and
  renewal terms, with the policy links surfaced and **no pre-selected consent**.

---

## Publication readiness summary

| Page | Route | Ready to publish? |
|---|---|---|
| Terms & Conditions | `/terms-and-conditions` | After §1 identity confirmed; §3 liability-cap decision optional (copy is safe without it). |
| Privacy Policy | `/privacy-policy` | After §1 identity confirmed; §5 GA decision recommended. |
| Cancellation & Refund | `/cancellation-and-refund` | After §3 timelines & eligibility adopted. |
| Shipping & Exchange | `/shipping-and-exchange` | After §3 delivery-schedule confirmation. |
| Contact | `/contact` | Publishable now; phone appears when §2 number is added. |

All five are **internally consistent** on identity, dates, contact details,
cancellation rules, delivery promises and refund timelines. No fake contact
details, no "no refunds" vs "refunds available" contradiction, and no
customer-facing drafting notes remain in the pages.
