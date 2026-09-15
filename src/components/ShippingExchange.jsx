import LegalLayout from './LegalLayout.jsx';
import { Link } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, LEGAL_ENTITY, POLICY_EFFECTIVE_DATE, POLICY_UPDATED_DATE,
} from '../data/content.js';

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function ShippingExchange() {
  const intro = (
    <>
      <p>
        This policy explains how {LEGAL_ENTITY} (<strong>&ldquo;Mervix&rdquo;</strong>,{' '}
        <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong> or{' '}
        <strong>&ldquo;our&rdquo;</strong>) delivers software access, SaaS subscriptions
        and digital services, and how customers can request corrections or changes
        to eligible orders. Physical shipping and courier tracking do not apply to
        these digital purchases.
      </p>
      <p>
        Our wider work sometimes involves physical equipment or on-site services —
        for example networking hardware or event production. Where physical goods or
        on-site work are purchased, they are not covered by this policy and are
        subject to separate fulfilment terms disclosed to you before purchase in the
        applicable order, proposal or statement of work.
      </p>
    </>
  );

  const sections = [
    {
      id: 'delivery-methods',
      title: 'How we deliver digital products and services',
      body: (
        <>
          <p>
            Depending on what you buy, we deliver digitally by one or more of the
            following methods, as described in your order:
          </p>
          <ul>
            <li>
              <strong>Account provisioning</strong> — setting up your access to a
              hosted (SaaS) service.
            </li>
            <li>
              <strong>Activation emails</strong> — sending confirmation and access
              details to your registered email address.
            </li>
            <li>
              <strong>Secure download links</strong> — where a product is delivered
              as a download.
            </li>
            <li>
              <strong>Licence keys</strong> — where a product is activated with a
              key.
            </li>
            <li>
              <strong>Remote setup or onboarding</strong> — where a service includes
              guided configuration or onboarding.
            </li>
            <li>
              <strong>Project milestone handovers</strong> — where custom work is
              delivered in stages against an agreed plan.
            </li>
          </ul>
          <p>
            Only the methods actually applicable to your purchase will be used; your
            order or proposal states which apply.
          </p>
        </>
      ),
    },
    {
      id: 'delivery-times',
      title: 'Delivery times',
      body: (
        <>
          <p>
            Delivery timing depends on the type of fulfilment, and the clock starts
            once payment is confirmed and any prerequisites we have disclosed (for
            example information or access we need from you) are in place:
          </p>
          <ul>
            <li>
              <strong>Automated activation</strong> (for example an account or key
              issued automatically) is typically available shortly after payment is
              confirmed.
            </li>
            <li>
              <strong>Manual setup and onboarding</strong> is scheduled with you and
              delivered within the timeframe stated in your order or proposal.
            </li>
            <li>
              <strong>Custom projects</strong> are delivered according to the
              schedule and milestones agreed in your proposal or statement of work.
            </li>
          </ul>
          <p>
            We do not promise a single universal delivery time (such as an
            &ldquo;instant&rdquo; or fixed 24–48-hour delivery) for every purchase. Where
            timing matters, the delivery schedule for your order is set out in the
            order, proposal or statement of work before you purchase.
          </p>
        </>
      ),
    },
    {
      id: 'confirmation',
      title: 'Delivery confirmation',
      body: (
        <>
          <p>
            We confirm delivery through the relevant channel — for example an
            activation or onboarding email to your registered address, access
            appearing in your account, a download link, or a milestone handover
            note.
          </p>
          <p>
            A payment receipt on its own confirms that your payment was taken; it is
            not by itself proof that your access is set up and working. If you have
            paid but have not received working access within the expected time,
            please tell us (see section 5) so we can put it right.
          </p>
        </>
      ),
    },
    {
      id: 'customer-responsibilities',
      title: 'Your responsibilities for delivery',
      body: (
        <>
          <p>To help delivery go smoothly, please:</p>
          <ul>
            <li>give us correct contact details, especially the email address where access should be sent;</li>
            <li>check your spam or junk folder if you do not see an activation or onboarding email;</li>
            <li>meet any disclosed technical prerequisites for the product or service; and</li>
            <li>provide any onboarding information we have agreed you will supply.</li>
          </ul>
          <p>
            If access is delayed because details were incorrect or prerequisites
            were not met, we will help you resolve it once the correct information is
            provided.
          </p>
        </>
      ),
    },
    {
      id: 'delays',
      title: 'Delivery delays',
      body: (
        <>
          <p>
            If delivery is delayed, contact us at {email} and we will investigate.
            Where a delay is on our side, we will communicate a revised estimate and
            work to deliver as soon as we reasonably can.
          </p>
          <p>
            If we are unable to deliver paid access, a product or a service for
            reasons attributable to us, you are entitled to a remedy under our{' '}
            <Link to="/cancellation-and-refund">Cancellation and Refund Policy</Link>,
            which may include a refund of the amount paid for what was not delivered.
            We do not treat this as giving us an unlimited right to delay
            fulfilment.
          </p>
        </>
      ),
    },
    {
      id: 'charges',
      title: 'Delivery and shipping charges',
      body: (
        <>
          <p>
            Because these purchases are delivered digitally, there is no physical
            shipping charge for the digital products and services covered by this
            policy.
          </p>
          <p>
            Any set-up, onboarding or implementation fees are separate from the
            product or subscription price and are disclosed to you before payment in
            your order or proposal. They are not hidden delivery charges.
          </p>
        </>
      ),
    },
    {
      id: 'exchanges',
      title: 'Exchanges, corrections and changes',
      body: (
        <>
          <p>
            Because digital access is not a physical item, physical returns and
            courier exchanges do not apply. Instead, we handle corrections and
            changes as follows:
          </p>
          <ul>
            <li>
              <strong>Wrong licence or plan delivered by us.</strong> If we deliver
              the wrong licence, plan or product due to our error, we will correct it
              and provide what you ordered, at no extra cost to you.
            </li>
            <li>
              <strong>Invalid access credentials.</strong> If access credentials or a
              key we issued do not work, we will replace them once verified.
            </li>
            <li>
              <strong>Accidental purchase or requested product change.</strong> If
              you bought the wrong item by mistake, or want to change to a different
              product, contact us promptly. Where the original item has not yet been
              used or fulfilled, we can usually switch it or correct it; where it has
              already been delivered and used, any change is handled under the
              eligibility rules in our{' '}
              <Link to="/cancellation-and-refund">Cancellation and Refund Policy</Link>.
            </li>
            <li>
              <strong>Upgrades and downgrades.</strong> Where a subscription supports
              changing plans, any price difference, credit, migration and effective
              date are applied as described for that product at the time of the
              change.
            </li>
          </ul>
          <p>
            Correcting our error is different from choosing to upgrade or change what
            you bought: the first is always put right by us at no extra charge; the
            second is a new purchase or plan change and is priced accordingly. We do
            not promise unrestricted exchanges, and access or licences are not
            automatically transferable to another person or organisation unless we
            agree to it.
          </p>
        </>
      ),
    },
    {
      id: 'cross-border',
      title: 'Cross-border availability',
      body: (
        <>
          <p>
            We serve customers in multiple countries, but availability of a specific
            product or feature can depend on technical, legal or third-party
            constraints. Where a product has geographic or technical availability
            restrictions, these are noted at the point of sale. We do not promise
            that every product or feature is available, without restriction,
            everywhere in the world.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      title="Shipping and Exchange Policy"
      subtitle="Digital Delivery, Software Access and Service Fulfilment"
      effective={POLICY_EFFECTIVE_DATE}
      updated={POLICY_UPDATED_DATE}
      canonicalPath="/shipping-and-exchange"
      description="Shipping and Exchange Policy for Mervix Technology Pvt Ltd — how software access, SaaS subscriptions and digital services are delivered, confirmed, and corrected."
      intro={intro}
      sections={sections}
    />
  );
}
