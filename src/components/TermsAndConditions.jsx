import LegalLayout from './LegalLayout.jsx';
import { CONTACT_EMAIL } from '../data/content.js';

export default function TermsAndConditions() {
  return (
    <LegalLayout title="Terms &amp; Conditions" updated="July 9, 2026">
      <p>
        These Terms &amp; Conditions ("Terms") govern your access to and use of the
        website and services provided by Mervix Technology Pvt Ltd, on behalf of
        itself and its group companies GeoLink, SkoutHaus, SkoutsMedia, and
        CoreCyrus (together, "Mervix", "we", "us", or "our"). By accessing this
        website or engaging our services, you agree to be bound by these Terms.
      </p>

      <h2>1. Use of this website</h2>
      <p>
        This website is provided to share information about Mervix, our group
        companies, and how to get in touch with us. You agree to use it only for
        lawful purposes and not to interfere with its operation, security, or
        availability, including through unauthorized scraping, reverse engineering,
        or attempts to gain access to systems or data you are not authorized to
        access.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content on this website — including text, graphics, logos, the Mervix
        and group company names, and the underlying design and code — is owned by
        or licensed to Mervix and is protected by applicable intellectual property
        laws. You may not reproduce, distribute, modify, or create derivative works
        from this content without our prior written consent.
      </p>

      <h2>3. Services and engagements</h2>
      <p>
        Any specific project, product, or service engaged through Mervix or one of
        its group companies (SaaS development, applied AI, infrastructure, or
        digital &amp; media services) will be governed by a separate agreement,
        statement of work, or contract entered into between the parties. Where
        there is a conflict between these Terms and a signed agreement, the signed
        agreement will take precedence for that engagement.
      </p>

      <h2>4. No warranties</h2>
      <p>
        This website and its content are provided "as is" without warranties of
        any kind, express or implied, including as to accuracy, completeness, or
        fitness for a particular purpose. We do not guarantee that the website will
        be uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Mervix and its group companies
        will not be liable for any indirect, incidental, special, or consequential
        damages arising out of or in connection with your use of this website,
        even if we have been advised of the possibility of such damages.
      </p>

      <h2>6. Third-party links</h2>
      <p>
        This website may contain links to third-party websites or services that
        are not owned or controlled by Mervix. We are not responsible for the
        content, policies, or practices of any third-party sites.
      </p>

      <h2>7. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time to reflect changes in our
        services, legal requirements, or business practices. The updated version
        will be posted on this page with a revised "Last updated" date. Continued
        use of the website after changes are posted constitutes acceptance of the
        revised Terms.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, without regard to its
        conflict of law principles. Any disputes arising from these Terms or your
        use of this website will be subject to the exclusive jurisdiction of the
        competent courts.
      </p>

      <h2>9. Contact us</h2>
      <p>
        If you have any questions about these Terms, please reach out to us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
