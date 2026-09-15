import LegalLayout from './LegalLayout.jsx';
import { Link } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, LEGAL_ENTITY, POLICY_EFFECTIVE_DATE, POLICY_UPDATED_DATE, OFFICE,
} from '../data/content.js';

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function TermsAndConditions() {
  const intro = (
    <>
      <p>
        These Terms &amp; Conditions (the <strong>&ldquo;Terms&rdquo;</strong>) govern your
        access to and use of this website and the products and services offered
        through it by {LEGAL_ENTITY}. In these Terms, {LEGAL_ENTITY} is referred
        to as <strong>&ldquo;Mervix&rdquo;</strong>, <strong>&ldquo;we&rdquo;</strong>,{' '}
        <strong>&ldquo;us&rdquo;</strong> or <strong>&ldquo;our&rdquo;</strong>, and the person
        or organisation using the website or purchasing from us is referred to as{' '}
        <strong>&ldquo;you&rdquo;</strong> or the <strong>&ldquo;customer&rdquo;</strong>.
      </p>
      <p>
        Mervix operates a number of brands — including GeoLink, SkoutHaus,
        SkoutsMedia and CoreCyrus — under which it delivers software, applied AI,
        infrastructure, digital marketing, and events and studio services. The
        specific entity that contracts with you for a given purchase or
        engagement is the entity named in the applicable order form, proposal,
        invoice or statement of work. Where that document names a different
        entity, that entity is your counterparty for that engagement; nothing on
        this website should be read as one brand or company undertaking
        obligations on behalf of another.
      </p>
      <p>
        By accessing this website, creating an account, or placing an order, you
        confirm that you have read and agree to these Terms. If you do not agree,
        please do not use the website or purchase our services.
      </p>
    </>
  );

  const sections = [
    {
      id: 'scope',
      title: 'Who we are and what these Terms cover',
      body: (
        <>
          <p>
            These Terms apply to your use of this website and to the marketing,
            enquiry and information services provided through it. They also set
            out the baseline commercial terms on which we offer our products and
            services. They are not a substitute for the specific agreement that
            governs a paid engagement.
          </p>
          <p>Your relationship with us may be governed by several documents together:</p>
          <ul>
            <li>
              <strong>These website Terms</strong> — the general rules for using
              the site and the default commercial terms.
            </li>
            <li>
              <strong>Product or service terms</strong> — additional terms that
              apply to a specific product, subscription or service.
            </li>
            <li>
              <strong>Order forms, proposals and invoices</strong> — the scope,
              price, currency, taxes and billing details of a particular
              purchase.
            </li>
            <li>
              <strong>Statements of work and signed agreements</strong> — the
              detailed terms of a custom development or professional-services
              engagement.
            </li>
          </ul>
          <p>
            If there is a conflict, a signed agreement, statement of work or order
            form that you and we have both accepted takes precedence over these
            Terms for that engagement, followed by any product-specific terms, and
            then these Terms. Nothing in any of these documents removes rights
            that applicable law makes non-waivable.
          </p>
        </>
      ),
    },
    {
      id: 'eligibility',
      title: 'Eligibility, accounts and authority',
      body: (
        <>
          <p>
            To place an order or enter into an agreement with us, you must be able
            to form a legally binding contract. If you are using the website or
            purchasing on behalf of a business or other organisation, you confirm
            that you are authorised to bind that organisation, and &ldquo;you&rdquo; then
            refers to both you and that organisation.
          </p>
          <p>
            You agree to provide accurate, current and complete registration,
            billing and contact information, and to keep it up to date so that we
            can deliver services and send notices, invoices and receipts.
          </p>
          <p>
            Where a product gives you access credentials or an account, you are
            responsible for keeping those credentials secure, for activity that
            takes place under your account, and for ensuring that only authorised
            users access it. Please tell us promptly at {email} if you believe
            your credentials or account have been compromised.
          </p>
        </>
      ),
    },
    {
      id: 'services',
      title: 'Services, licensing and ownership',
      body: (
        <>
          <p>We provide different types of offering, and different rules apply to each:</p>
          <ul>
            <li>
              <strong>SaaS access</strong> — the right to access and use a hosted
              software service for the subscription term, subject to any plan
              limits described at the point of sale.
            </li>
            <li>
              <strong>Software licences</strong> — a licence to use software we
              supply, on the terms of the applicable licence, which may limit the
              number of users, installations, environments or usage volume.
            </li>
            <li>
              <strong>Custom development and professional services</strong> —
              bespoke work delivered to the scope agreed in a proposal or
              statement of work.
            </li>
          </ul>
          <p>
            A subscription or licence generally grants a right to access or use
            the software for the agreed term — it does not transfer ownership of
            the software, its source code, or our underlying tools, frameworks and
            know-how. You may use what we provide only as permitted by these Terms
            and the applicable order, and within any stated usage limits.
          </p>
          <p>
            <strong>Custom deliverables.</strong> Ownership of deliverables we
            create specifically for you under a custom engagement is determined by
            the signed agreement or statement of work for that engagement.
            Typically, ownership of accepted, paid-for deliverables passes to you
            on the terms set out there, while we retain ownership of our
            pre-existing materials, reusable components and general know-how, and
            grant you a licence to use those to the extent needed to use your
            deliverables. Where the agreement is silent, ownership of custom
            deliverables does not pass until they have been paid for in full.
          </p>
          <p>
            <strong>Your data stays yours.</strong> As between you and us, you
            retain ownership of the content and data you provide or generate
            through the services (&ldquo;customer data&rdquo;). You grant us only the
            permissions we need to host, process and deliver the services, provide
            support, keep the services secure, and meet legal obligations. How we
            handle personal data is described in our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </>
      ),
    },
    {
      id: 'orders',
      title: 'Orders, fees and payment',
      body: (
        <>
          <p>
            The scope, price, currency, applicable taxes, billing frequency and
            any additional charges (for example set-up, onboarding or
            implementation fees) are disclosed to you before you purchase, in the
            order form, proposal or checkout. If a charge is not disclosed before
            purchase, it does not apply to that purchase.
          </p>
          <p>
            An order is confirmed once we accept it and, where payment is due, once
            payment has been successfully authorised or received. If a payment
            fails or is reversed, we may pause or withhold delivery of the
            affected service until it is resolved.
          </p>
          <p>
            <strong>Recurring billing and renewals.</strong> Where a subscription
            is offered on a recurring basis, the billing period and renewal
            arrangements are stated at the point of sale, and we will obtain the
            authorisation required for recurring charges before charging you on a
            recurring basis. We do not apply automatic recurring charges that were
            not disclosed and authorised. You can stop future renewals as
            described in our{' '}
            <Link to="/cancellation-and-refund">Cancellation and Refund Policy</Link>.
          </p>
          <p>
            <strong>Price changes.</strong> We may change prices from time to time.
            Changes apply going forward — to new orders and to renewals after the
            change — and, for an ongoing subscription, we will give you reasonable
            advance notice before a changed price takes effect at your next
            renewal. Price changes do not apply retroactively to a period you have
            already paid for.
          </p>
          <p>
            Cancellations and refunds are governed by our{' '}
            <Link to="/cancellation-and-refund">Cancellation and Refund Policy</Link>,
            and delivery of digital products and services is governed by our{' '}
            <Link to="/shipping-and-exchange">Shipping and Exchange Policy</Link>.
          </p>
        </>
      ),
    },
    {
      id: 'customer-responsibilities',
      title: 'Your responsibilities',
      body: (
        <>
          <p>
            Delivering our services often depends on your cooperation. Unless the
            applicable agreement says otherwise, you agree to:
          </p>
          <ul>
            <li>
              provide the materials, content, access, information and approvals we
              reasonably need, in a timely way;
            </li>
            <li>
              meet any technical prerequisites we document for a product or service
              (for example supported browsers, environments, integrations or
              account access);
            </li>
            <li>
              ensure that content and data you supply is lawful and that you have
              the rights and permissions needed for us to use it to deliver the
              services; and
            </li>
            <li>use the services and any deliverables lawfully.</li>
          </ul>
          <p>
            Custom and professional-services timelines assume timely input from
            you. Where a delay is caused by late materials, approvals or access on
            your side, delivery dates and milestones may move accordingly, and any
            resulting third-party costs that were disclosed and agreed remain
            payable.
          </p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: (
        <>
          <p>When using this website or our services, you agree not to:</p>
          <ul>
            <li>use them for any unlawful purpose or in breach of applicable law;</li>
            <li>
              attempt to gain unauthorised access to systems, accounts or data, or
              probe, scan or test the vulnerability of our systems without
              authorisation;
            </li>
            <li>introduce malicious code, or interfere with the integrity, security or performance of the services;</li>
            <li>infringe the intellectual property, privacy or other rights of others;</li>
            <li>harass, abuse or harm others, or send unlawful or deceptive communications; or</li>
            <li>
              resell, sublicense or commercially exploit the services beyond what
              your order or licence permits.
            </li>
          </ul>
          <p>
            Nothing in this section restricts activities that applicable law
            expressly permits, such as steps you are entitled to take to
            interoperate with your own systems.
          </p>
        </>
      ),
    },
    {
      id: 'service-operation',
      title: 'How the services operate',
      body: (
        <>
          <p>
            We work to keep our services available and functioning, but they may
            occasionally be affected by maintenance, updates, or factors outside
            our control, including third-party platforms, networks and
            infrastructure we rely on. Where practicable, we aim to schedule
            planned maintenance to reduce disruption.
          </p>
          <p>
            We may update, improve or modify features over time. The support that
            is included, and any service levels, are those described in the
            applicable plan, order or agreement. We do not promise that the
            services will be uninterrupted or error-free, or guarantee any
            particular commercial result, ranking or return from using them.
          </p>
          <p>
            <strong>AI-assisted features.</strong> Where a product includes
            AI-assisted functionality, its outputs are generated automatically and
            may be incomplete, inaccurate or unsuitable for a particular purpose.
            AI outputs are provided as an aid and should be reviewed by a person
            before being relied upon for important decisions.
          </p>
        </>
      ),
    },
    {
      id: 'suspension-termination',
      title: 'Suspension and termination',
      body: (
        <>
          <p>
            You may stop using the website at any time, and may cancel a
            subscription or engagement as described in our{' '}
            <Link to="/cancellation-and-refund">Cancellation and Refund Policy</Link>{' '}
            and the applicable agreement.
          </p>
          <p>
            We may suspend or terminate access where there are reasonable grounds
            to do so — for example a serious or repeated breach of these Terms, a
            failure to pay amounts that are due, use that poses a security or legal
            risk, or where required by law. Except where the issue is urgent or a
            security or legal risk requires immediate action, or the law provides
            otherwise, we will give you notice and, where the breach can be fixed,
            a reasonable opportunity to fix it before terminating.
          </p>
          <p>
            On termination, your right to access the affected service ends, and any
            fees accrued up to termination remain payable. We will make your
            customer data available for export for a reasonable period where
            practicable, after which it may be deleted in the ordinary course in
            line with our retention practices described in the{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>. We do not promise to
            delete all data immediately on termination, nor to retain it
            indefinitely.
          </p>
        </>
      ),
    },
    {
      id: 'ip-confidentiality',
      title: 'Intellectual property, confidentiality and third-party services',
      body: (
        <>
          <p>
            All content on this website — including text, graphics, logos, the
            Mervix and brand names, and the underlying design and code — is owned
            by or licensed to us and is protected by intellectual property laws.
            You may not copy, reproduce, distribute or create derivative works from
            it without our prior written consent, except as the law allows.
          </p>
          <p>
            Where either party shares non-public information in connection with an
            engagement, the receiving party will use it only to perform or receive
            the services and will protect it with reasonable care. Specific
            confidentiality obligations may be set out in the applicable agreement.
          </p>
          <p>
            Our services may integrate with or rely on third-party products and
            platforms (for example hosting, communication, analytics and payment
            providers). Your use of those third-party services is subject to their
            own terms, and we are not responsible for their content, availability
            or practices.
          </p>
        </>
      ),
    },
    {
      id: 'warranties-liability',
      title: 'Warranties and liability',
      body: (
        <>
          <p>
            We will provide the services with reasonable care and skill. Except as
            expressly stated in these Terms or an applicable agreement, and to the
            extent permitted by law, the website and services are provided &ldquo;as
            is&rdquo; without other warranties.
          </p>
          <p>
            We do not exclude or limit liability where it would be unlawful to do
            so — including for death or personal injury caused by negligence, for
            fraud, or for any other liability that applicable law does not allow to
            be excluded or limited. Your statutory rights as a consumer, where they
            apply, are not affected by these Terms.
          </p>
          <p>
            Subject to the paragraph above, we are not liable for indirect or
            consequential loss, or for loss of profits, revenue, goodwill or data,
            arising from your use of the website or services. Any overall cap on
            our aggregate liability for a paid engagement is the cap set out in the
            applicable order form, statement of work or signed agreement for that
            engagement.
          </p>
          <p>
            Each party remains responsible for its own unlawful acts and for claims
            arising from content or materials it supplies. We do not ask you to
            indemnify us for matters outside your control.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: 'Governing law and how to resolve a dispute',
      body: (
        <>
          <p>
            These Terms are governed by the laws of India. If you have a concern or
            dispute, we would like the chance to resolve it directly first. Please
            contact us at {email} with the details, and we will work with you in
            good faith to reach a fair resolution.
          </p>
          <p>
            Nothing in these Terms removes your right to pursue remedies available
            under applicable law, including approaching the appropriate consumer
            forum or authority. The specific dispute-resolution mechanism, venue or
            jurisdiction for a paid engagement, if any, is as set out in the
            applicable signed agreement.
          </p>
        </>
      ),
    },
    {
      id: 'changes-contact',
      title: 'Changes, severability and contact',
      body: (
        <>
          <p>
            We may update these Terms to reflect changes in our services, the law
            or our business practices. When we do, we will post the updated version
            here with a revised effective date. Changes apply going forward — they
            do not retroactively change the terms of a purchase you have already
            completed, which remain governed by the terms in effect when you made
            it.
          </p>
          <p>
            If any provision of these Terms is found to be unenforceable, the rest
            of the Terms continue to apply.
          </p>
          <p>
            Questions about these Terms can be sent to {email}, or by post to{' '}
            {OFFICE.line1}, {OFFICE.line2}. You can also reach us through our{' '}
            <Link to="/contact">Contact page</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      title="Terms &amp; Conditions"
      subtitle="The terms on which you use this website and purchase our products and services."
      effective={POLICY_EFFECTIVE_DATE}
      updated={POLICY_UPDATED_DATE}
      canonicalPath="/terms-and-conditions"
      description="Terms & Conditions for Mervix Technology Pvt Ltd — website use, orders, licensing, payments, support, liability and dispute resolution."
      intro={intro}
      sections={sections}
    />
  );
}
