import LegalLayout from './LegalLayout.jsx';
import { Link } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, LEGAL_ENTITY, POLICY_EFFECTIVE_DATE, POLICY_UPDATED_DATE,
} from '../data/content.js';

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function CancellationRefund() {
  const intro = (
    <>
      <p>
        This Cancellation and Refund Policy explains when and how you can cancel a
        purchase from {LEGAL_ENTITY} (<strong>&ldquo;Mervix&rdquo;</strong>,{' '}
        <strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;us&rdquo;</strong> or{' '}
        <strong>&ldquo;our&rdquo;</strong>), and when a refund is available. It applies to
        our subscriptions (SaaS), software licences and digital products, and
        custom development and professional services, alongside any specific terms
        in your order form, proposal or signed agreement.
      </p>
      <p>
        <strong>Our position in short.</strong> Cancellation does not automatically
        entitle you to a refund. Fees for access already provided, services already
        performed, or deliverables already supplied are generally non-refundable
        for change-of-mind requests. However, refunds <em>are</em> available where a
        verified claim meets the eligibility conditions in section 4, or where
        required by applicable law. We define those eligible circumstances clearly
        below rather than leaving refunds entirely to discretion.
      </p>
    </>
  );

  const sections = [
    {
      id: 'saas',
      title: 'Cancelling a SaaS subscription',
      body: (
        <>
          <p>
            To cancel a subscription, send a written cancellation request to {email}{' '}
            from the email address associated with your account, or through any
            cancellation route stated in your order or product documentation. We do
            not currently offer a self-service cancellation dashboard, so please
            use email unless your agreement says otherwise.
          </p>
          <p>
            Cancellation takes effect at the end of your current paid billing
            period, unless we agree otherwise or the law requires a different
            outcome. Cancelling stops future renewals and future charges — it does
            not, by itself, refund the period you are currently in.
          </p>
          <p>
            Your access normally continues until the end of the period you have
            already paid for, after which it ends. Deleting your account or stopping
            use of the service is not the same as cancelling billing; unless the
            system is specifically designed to link the two, please send a
            cancellation request so we can stop future renewals.
          </p>
          <p>
            If a renewal charge is taken <em>after</em> you sent a valid, timely
            cancellation request, that charge is treated as an incorrect charge and
            is refundable under section 4.
          </p>
        </>
      ),
    },
    {
      id: 'licences',
      title: 'Software licences and digital products',
      body: (
        <>
          <p>
            You may cancel an order for a software licence or digital product before
            it has been fulfilled (that is, before the licence, key, download or
            access has been made available to you) for a full refund of that order.
          </p>
          <p>
            Once a licence or digital product has been delivered — for example the
            licence key, download or access has been issued — it is generally
            non-refundable for a change of mind, because it has already been
            supplied. Delivery or activation does not, however, remove your remedies
            where the product was not actually delivered, is materially defective,
            or does not substantially match what was described, or any rights you
            have under applicable law. Those situations are handled under section 4.
          </p>
        </>
      ),
    },
    {
      id: 'custom',
      title: 'Custom development and professional services',
      body: (
        <>
          <p>
            You may cancel a custom development or professional-services engagement
            by sending a written cancellation request to {email} or as set out in
            your statement of work. On cancellation, we reconcile the engagement
            based on what has actually happened:
          </p>
          <ul>
            <li>
              <strong>Completed work</strong> — work already completed and
              delivered (or milestones already met and accepted) is chargeable and
              non-refundable.
            </li>
            <li>
              <strong>Work in progress</strong> — work under way at the point of
              cancellation is charged on a fair basis for the effort and value
              delivered up to that point, in line with the agreed rates or milestone
              structure.
            </li>
            <li>
              <strong>Unstarted work</strong> — work not yet started is not charged,
              and any advance you have paid that relates to it is refundable.
            </li>
            <li>
              <strong>Third-party commitments</strong> — non-cancellable costs we
              have already committed to third parties for your engagement (for
              example licences, media spend, venue or equipment bookings) remain
              payable only where they were disclosed to, and agreed by, you before
              they were incurred.
            </li>
          </ul>
          <p>
            Deductions from an advance are based on the agreed contract and the
            actual, justified amounts above — not on a blanket rule that advances
            are non-refundable. We reconcile the advance against work performed and
            committed costs, and refund any unused balance, or invoice any shortfall,
            with a short written explanation of the calculation.
          </p>
        </>
      ),
    },
    {
      id: 'eligibility',
      title: 'When you are eligible for a refund',
      body: (
        <>
          <p>
            Regardless of the general position above, you are eligible for a refund
            (full or partial, as set out below) in the following verified
            circumstances:
          </p>
          <ul>
            <li>
              <strong>Duplicate payment</strong> — you were charged more than once
              for the same order. We refund the duplicate charge(s) in full.
            </li>
            <li>
              <strong>Incorrect or excess charge</strong> — you were charged the
              wrong amount, or more than the agreed price. We refund the excess in
              full.
            </li>
            <li>
              <strong>Charge after a valid cancellation</strong> — you were charged
              for a renewal after a valid, timely cancellation took effect. We
              refund that charge in full.
            </li>
            <li>
              <strong>Paid access or service not delivered</strong> — you paid for
              access, a product or a service that was not delivered for reasons
              attributable to us. We refund the amount paid for what was not
              delivered.
            </li>
            <li>
              <strong>Material defect or substantial mismatch</strong> — a
              deliverable or service has a material defect, or substantially does
              not match the written scope, and we are unable to remedy it within an
              agreed reasonable period. We refund the affected portion (or, where the
              purchase cannot reasonably be used without the defective part, the
              full amount).
            </li>
            <li>
              <strong>We cancel before delivery</strong> — we cancel your order
              before providing the paid service. We refund the amount paid for the
              undelivered service in full.
            </li>
            <li>
              <strong>Required by law</strong> — a refund is required under
              applicable law. We provide the refund the law requires.
            </li>
          </ul>
          <p>
            A confirmed billing error (such as a duplicate or excess charge) is
            refunded as a matter of course — it does not depend on goodwill or
            discretion.
          </p>
        </>
      ),
    },
    {
      id: 'exclusions',
      title: 'What is not normally refundable',
      body: (
        <>
          <p>
            Subject to your eligible claims under section 4 and to applicable law,
            the following are not normally refundable:
          </p>
          <ul>
            <li>a change of mind after conforming access, a product or work has been delivered;</li>
            <li>simply not using a subscription that was available and working as described;</li>
            <li>expectations or requirements that were outside the documented scope of what you purchased;</li>
            <li>
              issues caused by your environment failing clearly disclosed technical
              prerequisites, where the product or service itself conforms;
            </li>
            <li>work that has been completed and conforms to the agreed scope; and</li>
            <li>
              valid third-party costs that were disclosed to, and agreed by, you
              before they were incurred.
            </li>
          </ul>
          <p>
            We will not use these exclusions to avoid responsibility for a
            misleading description, an unresolved material defect, or a failure to
            deliver. Where one of those applies, section 4 governs.
          </p>
        </>
      ),
    },
    {
      id: 'request',
      title: 'How to request a refund',
      body: (
        <>
          <p>
            Send your request to {email} with the following, so we can verify and
            process it quickly:
          </p>
          <ul>
            <li>the email address or customer identifier associated with the purchase;</li>
            <li>the order, invoice or payment reference;</li>
            <li>the date of purchase;</li>
            <li>the product or service concerned; and</li>
            <li>the reason for the request, with any relevant evidence (for example screenshots or a description of the issue).</li>
          </ul>
          <p>
            For your security, we will never ask you for your password, a one-time
            password (OTP), your card&rsquo;s CVV, or your full card number. Please do
            not include these in your request.
          </p>
        </>
      ),
    },
    {
      id: 'timelines',
      title: 'Timelines and decisions',
      body: (
        <>
          <p>
            The following timelines apply. <strong>Business days</strong> mean Monday
            to Friday, excluding public holidays observed at our office in India,
            measured in India Standard Time (IST).
          </p>
          <ul>
            <li>
              <strong>Submission.</strong> Please raise a refund request as soon as
              you become aware of the issue, and — for billing errors such as a
              duplicate or incorrect charge — ideally within 30 days of the charge,
              so we can resolve it quickly. Raising it later does not remove a valid
              legal entitlement.
            </li>
            <li>
              <strong>Acknowledgement.</strong> We aim to acknowledge your request
              within <strong>3 business days</strong>.
            </li>
            <li>
              <strong>Review and decision.</strong> We aim to review and decide
              within <strong>10 business days</strong> of receiving all the
              information we need. If a claim is complex and needs longer, we will
              tell you and give a revised estimate.
            </li>
            <li>
              <strong>Initiating an approved refund.</strong> For approved refunds,
              we aim to initiate the refund with our payment provider within{' '}
              <strong>5 business days</strong> of approval.
            </li>
            <li>
              <strong>Credit to you.</strong> After we initiate a refund, the time
              for it to appear depends on your bank or payment provider. Based on
              current payment-gateway guidance, this is typically around{' '}
              <strong>5–7 working days</strong> after initiation, though it can vary.
            </li>
          </ul>
          <p>
            If we decline a request, or approve it only in part, we will explain why.
            If you disagree, you can ask us to review the decision by replying to us
            at {email}; a different member of our team will look at it. Nothing here
            limits remedies available to you under applicable law, including
            approaching the appropriate consumer forum.
          </p>
        </>
      ),
    },
    {
      id: 'method',
      title: 'How refunds are paid',
      body: (
        <>
          <p>
            We normally return refunds to the original payment method used for the
            purchase. Where that is not possible, we will agree an alternative
            method with you.
          </p>
          <p>
            For partial refunds, we refund the affected portion and explain the
            calculation. We do not deduct payment-gateway fees from a refund that is
            owed, and we do not force a store credit in place of a refund you are
            entitled to receive. If an approved refund has not reached you within the
            expected time, contact us at {email} with your payment reference and we
            will follow it up with our payment provider.
          </p>
        </>
      ),
    },
    {
      id: 'statutory',
      title: 'Your statutory rights',
      body: (
        <>
          <p>
            This policy operates alongside your rights under applicable law,
            including consumer-protection law. Nothing in this policy limits or
            removes any right or remedy that the law gives you and does not allow us
            to exclude. Cancellations also interact with our{' '}
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link> and, for
            delivery, our{' '}
            <Link to="/shipping-and-exchange">Shipping and Exchange Policy</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      title="Cancellation and Refund Policy"
      subtitle="How to cancel, and when refunds are available for subscriptions, licences and services."
      effective={POLICY_EFFECTIVE_DATE}
      updated={POLICY_UPDATED_DATE}
      canonicalPath="/cancellation-and-refund"
      description="Cancellation and Refund Policy for Mervix Technology Pvt Ltd — cancellation channels, defined refund eligibility, timelines and how refunds are paid."
      intro={intro}
      sections={sections}
    />
  );
}
