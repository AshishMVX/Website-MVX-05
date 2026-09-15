import LegalLayout from './LegalLayout.jsx';
import { Link } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, LEGAL_ENTITY, POLICY_EFFECTIVE_DATE, POLICY_UPDATED_DATE, OFFICE,
} from '../data/content.js';

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPolicy() {
  const intro = (
    <>
      <p>
        This Privacy Policy explains how {LEGAL_ENTITY} (<strong>&ldquo;Mervix&rdquo;</strong>,{' '}
        <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong> or{' '}
        <strong>&ldquo;our&rdquo;</strong>) collects, uses, shares and protects
        personal information when you visit this website, send us an enquiry, apply
        for a role, or become a customer. Mervix operates the brands GeoLink,
        SkoutHaus, SkoutsMedia and CoreCyrus; where one of those brands provides a
        service to you, {LEGAL_ENTITY} is responsible for the personal data
        described here unless a specific agreement names a different entity.
      </p>
      <p>
        We have written this policy to describe what actually happens on this
        website today. Where a capability (such as online payments) is planned but
        not yet live, we say so. If you have any questions, contact us at {email}.
      </p>
    </>
  );

  const sections = [
    {
      id: 'controller',
      title: 'Who is responsible for your information',
      body: (
        <>
          <p>
            {LEGAL_ENTITY} is responsible for the personal information handled
            through this website. You can reach us about privacy at {email}, or by
            post at {OFFICE.line1}, {OFFICE.line2}.
          </p>
          <p>
            We have not appointed a dedicated grievance or data-protection officer
            with separately published contact details at this time; privacy
            requests should be sent to the address above and are handled by our
            team.
          </p>
        </>
      ),
    },
    {
      id: 'scope',
      title: 'What this policy covers',
      body: (
        <>
          <p>This policy covers personal information we handle when you:</p>
          <ul>
            <li>browse this website;</li>
            <li>send an enquiry through our contact form or by email;</li>
            <li>apply for a role through a link on our Careers pages;</li>
            <li>purchase, or discuss purchasing, our products and services; and</li>
            <li>contact us for support or about an order.</li>
          </ul>
          <p>
            It does not cover third-party websites or services that we link to,
            which have their own privacy policies.
          </p>
        </>
      ),
    },
    {
      id: 'info-you-provide',
      title: 'Information you provide directly',
      body: (
        <>
          <p>
            When you complete the contact form on this website, we collect the
            information you enter, which currently includes:
          </p>
          <ul>
            <li>your name;</li>
            <li>your company or organisation (optional);</li>
            <li>your email address;</li>
            <li>your phone number (optional);</li>
            <li>your country (optional);</li>
            <li>the service you are interested in and an indicative budget range (optional);</li>
            <li>an order or payment reference, if you choose to add one (optional); and</li>
            <li>the content of your message.</li>
          </ul>
          <p>
            If you email us directly, or speak with us about an engagement, we
            collect the information you choose to share. When you become a
            customer, we also collect the details needed to set up and deliver the
            service and to invoice you.
          </p>
        </>
      ),
    },
    {
      id: 'automatic-info',
      title: 'Technical information, cookies and analytics',
      body: (
        <>
          <p>
            Like most websites, our hosting and delivery systems automatically
            process limited technical information — such as your IP address, device
            and browser type, and the pages you view — as part of serving the site
            and keeping it secure.
          </p>
          <p>
            <strong>Analytics.</strong> This website includes Google Analytics
            (via Google&rsquo;s gtag.js), configured with IP-address anonymisation
            enabled. At present the analytics property is not fully activated, so
            analytics data is not being actively collected into a live account; if
            and when it is activated, Google Analytics may set cookies and process
            usage data (with IP anonymisation enabled) to help us understand how
            the site is used. You can learn more in the{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </p>
          <p>
            <strong>Embedded third-party services.</strong> Some pages load
            services from third parties, which may receive your IP address and set
            their own cookies when the content loads:
          </p>
          <ul>
            <li>
              <strong>Google Fonts</strong> — web fonts are loaded from Google to
              display the site&rsquo;s typography.
            </li>
            <li>
              <strong>Google Maps</strong> — our{' '}
              <Link to="/contact">Contact page</Link> embeds a Google Map showing
              our office location. When the map loads, Google receives a request
              from your browser and may set cookies, subject to Google&rsquo;s terms.
            </li>
          </ul>
          <p>
            <strong>Cookie controls.</strong> We do not currently operate a
            separate cookie-consent banner or in-site cookie toggle. You can
            control or block cookies through your browser settings, and you can opt
            out of Google Analytics using Google&rsquo;s browser add-on or your
            browser&rsquo;s privacy controls. Blocking some cookies may affect how
            parts of the site work.
          </p>
        </>
      ),
    },
    {
      id: 'billing-info',
      title: 'Billing and payment information',
      body: (
        <>
          <p>
            When you pay for a service, we keep records needed for the transaction
            and for accounting — such as your name and contact details, the
            product or service purchased, the amount, the currency, invoice details
            and a payment reference.
          </p>
          <p>
            Online card and similar payments, where offered, are intended to be
            processed by a third-party payment gateway (we plan to use{' '}
            <strong>Razorpay</strong> for this). Online payment processing is not
            yet live on this website. When it is enabled, sensitive payment details
            — such as your full card number, CVV and any PIN or one-time password —
            are entered with and handled by the payment gateway. We do not receive
            or store your full card number, CVV or PIN; we receive confirmation of
            the payment and limited transaction information (such as a payment
            reference and status) from the gateway. The gateway&rsquo;s handling of
            your information is governed by its own privacy policy.
          </p>
        </>
      ),
    },
    {
      id: 'purposes',
      title: 'Why we use your information',
      body: (
        <>
          <p>We use personal information to:</p>
          <ul>
            <li>respond to your enquiries and communicate with you about them;</li>
            <li>provide, operate, maintain and support our products and services;</li>
            <li>set up accounts, process orders, take payment and issue invoices and receipts;</li>
            <li>consider and process job applications you submit;</li>
            <li>keep the website and our services secure and prevent misuse;</li>
            <li>understand and improve how the website is used (analytics), where activated;</li>
            <li>
              send you marketing communications only where you have separately
              opted in; and
            </li>
            <li>meet our legal, tax and regulatory obligations.</li>
          </ul>
          <p>
            Sending us an enquiry lets us reply to that enquiry; it does not sign
            you up for marketing. We treat marketing consent separately (see below).
          </p>
        </>
      ),
    },
    {
      id: 'legal-basis',
      title: 'Our basis for using your information',
      body: (
        <>
          <p>
            We rely on the grounds available under applicable Indian law, and,
            where relevant to users in other regions, comparable grounds, which
            generally include:
          </p>
          <ul>
            <li>
              <strong>Your consent</strong> — for example when you submit an
              enquiry, apply for a role, or opt in to marketing;
            </li>
            <li>
              <strong>Performance of a contract</strong> — to deliver a service you
              have ordered and to manage billing;
            </li>
            <li>
              <strong>Legitimate and legal interests</strong> — to keep our
              services secure, to run and improve our business, and to meet legal
              obligations.
            </li>
          </ul>
          <p>
            Where we rely on consent, you can withdraw it at any time (see{' '}
            <a href="#your-rights">Your rights</a>), without affecting processing
            already carried out.
          </p>
        </>
      ),
    },
    {
      id: 'sharing',
      title: 'Service providers and who we share information with',
      body: (
        <>
          <p>
            We do not sell your personal information. We share it only as needed to
            run the website and deliver our services, including with:
          </p>
          <ul>
            <li>
              <strong>Formspree</strong> — our contact form is processed through
              Formspree, which receives the details you submit and forwards them to
              us by email.
            </li>
            <li>
              <strong>Google</strong> — for embedded fonts and maps, and, where
              activated, analytics, as described above.
            </li>
            <li>
              <strong>A payment gateway (planned: Razorpay)</strong> — to process
              payments once online payments are enabled.
            </li>
            <li>
              <strong>Hosting and infrastructure providers</strong> — that host
              this website and our services on our behalf.
            </li>
            <li>
              <strong>Professional advisers and authorities</strong> — where
              required by law, or to establish, exercise or defend legal rights.
            </li>
          </ul>
          <p>
            Within Mervix, we share information between our brands and teams only
            for the purposes described in this policy — for example to route your
            enquiry to the right team, deliver a service, or provide support.
          </p>
        </>
      ),
    },
    {
      id: 'recruitment',
      title: 'Recruitment and job applications',
      body: (
        <>
          <p>
            When you apply for a role, the &ldquo;Apply&rdquo; links on our Careers pages
            take you to an external application form hosted by a third party
            (currently Google Forms). The information requested, and how it is
            initially collected, is determined by that external form; the
            information you submit is provided to Google as the form host and to us
            for recruitment purposes.
          </p>
          <p>
            We use application information to assess your suitability for the role
            and to communicate with you about it. If you would like us to delete
            your application data, contact us at {email}.
          </p>
        </>
      ),
    },
    {
      id: 'international',
      title: 'International processing',
      body: (
        <>
          <p>
            We are based in India and serve customers in several countries. Some of
            the service providers described above (for example Google and
            Formspree) may process information on servers located outside your
            country. Where information is transferred across borders, we take
            reasonable steps to ensure it is handled consistently with this policy
            and applicable law.
          </p>
        </>
      ),
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      body: (
        <>
          <p>
            We keep personal information only for as long as needed for the
            purposes described in this policy — for example, to respond to and
            follow up on your enquiry, to provide a service and support it, and to
            meet legal, tax and accounting obligations, after which we delete or
            anonymise it in the ordinary course.
          </p>
          <p>
            We have not fixed a single published retention period for every
            category of data. If you would like to know how long we expect to keep
            a specific type of information, or ask us to delete it, contact us at{' '}
            {email}.
          </p>
        </>
      ),
    },
    {
      id: 'security',
      title: 'How we protect information',
      body: (
        <>
          <p>
            We take reasonable technical and organisational measures to protect
            personal information against unauthorised access, loss, misuse or
            alteration, and we limit access to those who need it. No website or
            method of transmission or storage is completely secure, so while we
            work to protect your information, we cannot guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      body: (
        <>
          <p>
            Depending on where you are and the law that applies, you may have the
            right to:
          </p>
          <ul>
            <li>access the personal information we hold about you;</li>
            <li>ask us to correct information that is inaccurate or incomplete;</li>
            <li>ask us to delete your information, subject to legal exceptions;</li>
            <li>withdraw consent where we rely on it; and</li>
            <li>raise a concern or grievance about how we handle your information.</li>
          </ul>
          <p>
            To exercise any of these, contact us at {email} with enough detail for
            us to identify your records. We will respond within a reasonable period
            and in line with applicable law. When verifying your identity, we will
            never ask you for your password, full card number, CVV or a one-time
            password.
          </p>
        </>
      ),
    },
    {
      id: 'marketing',
      title: 'Marketing communications',
      body: (
        <>
          <p>
            We only send marketing communications to people who have opted in — for
            example by ticking the separate marketing consent option on our contact
            form. This is kept separate from acknowledging or replying to your
            enquiry. You can opt out at any time by using the unsubscribe link in a
            marketing message, or by emailing {email}.
          </p>
        </>
      ),
    },
    {
      id: 'children',
      title: "Children's privacy",
      body: (
        <>
          <p>
            This website and our services are intended for businesses and adults.
            They are not directed at children, and we do not knowingly collect
            personal information from children. If you believe a child has provided
            us information, contact us at {email} and we will take appropriate
            steps to delete it.
          </p>
        </>
      ),
    },
    {
      id: 'updates',
      title: 'Changes to this policy and how to contact us',
      body: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect changes
            in our practices, services or legal requirements. We will post the
            updated version here with a revised effective date.
          </p>
          <p>
            For any question or request about this policy or your personal
            information, contact us at {email}, by post at {OFFICE.line1},{' '}
            {OFFICE.line2}, or through our{' '}
            <Link to="/contact">Contact page</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Mervix collects, uses, shares and protects your personal information."
      effective={POLICY_EFFECTIVE_DATE}
      updated={POLICY_UPDATED_DATE}
      canonicalPath="/privacy-policy"
      description="Privacy Policy for Mervix Technology Pvt Ltd — what we collect through this website and our contact form, how we use it, who we share it with, and your choices."
      intro={intro}
      sections={sections}
    />
  );
}
