import LegalLayout from './LegalLayout.jsx';
import { CONTACT_EMAIL } from '../data/content.js';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 9, 2026">
      <p>
        This Privacy Policy explains how Mervix Technology Pvt Ltd, together with
        its group companies GeoLink, SkoutHaus, SkoutsMedia, and CoreCyrus
        (together, "Mervix", "we", "us", or "our"), collects, uses, and protects
        information when you visit this website or contact us.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        We may collect the following types of information:
      </p>
      <ul>
        <li>
          <strong>Information you provide directly</strong> — such as your name,
          email address, and any details you share when you contact us through
          email or a form on this website.
        </li>
        <li>
          <strong>Usage data</strong> — such as pages visited, time spent on the
          site, referring pages, browser type, and device information, collected
          automatically through analytics tools.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — used to understand
          how visitors use our website and to improve its performance.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Respond to your enquiries and communicate with you;</li>
        <li>Operate, maintain, and improve this website;</li>
        <li>Understand how visitors engage with our content, via analytics;</li>
        <li>Meet legal, regulatory, and security obligations.</li>
      </ul>

      <h2>3. Analytics</h2>
      <p>
        This website uses Google Analytics to help us understand website traffic
        and usage patterns. Google Analytics may use cookies and collect data
        such as your IP address (anonymized), device, and browsing behavior on
        this site. You can learn more about how Google handles this data in the{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>
        , and you can opt out of Google Analytics tracking using browser
        extensions or your browser's privacy settings.
      </p>

      <h2>4. Sharing of information</h2>
      <p>
        We do not sell your personal information. We may share information with:
      </p>
      <ul>
        <li>Group companies within Mervix, for internal business purposes;</li>
        <li>
          Service providers who help us operate this website (such as hosting or
          analytics providers), under obligations to protect your information;
        </li>
        <li>Authorities, where required by law or to protect our legal rights.</li>
      </ul>

      <h2>5. Data retention</h2>
      <p>
        We retain personal information only for as long as necessary to fulfil
        the purposes described in this policy, or as required by applicable law.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct,
        or request deletion of your personal information, or to object to or
        restrict certain processing. To exercise any of these rights, contact us
        using the details below.
      </p>

      <h2>7. Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect the
        information we hold from unauthorized access, loss, or misuse. However,
        no method of transmission or storage over the internet is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Children's privacy</h2>
      <p>
        This website is not directed at children, and we do not knowingly collect
        personal information from children.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with a revised "Last updated" date.
      </p>

      <h2>10. Contact us</h2>
      <p>
        If you have any questions about this Privacy Policy or how we handle your
        information, please contact us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
