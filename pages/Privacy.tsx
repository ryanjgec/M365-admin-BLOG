import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: October 2025</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-xl max-w-4xl mx-auto">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead">
            <strong>microsoftadmin.in</strong> (“the Site”) respects your privacy. This Privacy Policy explains what information we collect and how we use it.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">1. Information We Collect</h3>
          <p>
            We do not collect personal information unless you voluntarily provide it (for example, through a contact form or email).
          </p>
          <p><strong>Automatically collected information may include:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>Referring URLs</li>
            <li>Basic analytics data</li>
          </ul>
          <p className="mt-2">This data is collected to improve website performance and user experience.</p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">2. Cookies</h3>
          <p>The Site may use cookies for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Basic functionality</li>
            <li>Analytics (such as Google Analytics, if enabled)</li>
            <li>Performance optimization</li>
          </ul>
          <p className="mt-2">You may disable cookies in your browser settings at any time.</p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">3. Email or Contact Information</h3>
          <p>
            If you contact us directly (e.g., via email), we will use your information only to respond to your message. We do not sell, rent, or share email addresses with third parties.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">4. Embedded Content</h3>
          <p>
            Articles may include embedded Microsoft content, YouTube videos, GitHub gists, or third-party scripts. These services may collect analytics data according to their own policies.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">5. Third-Party Services</h3>
          <p>
            If we use analytics or advertising tools (such as Google Analytics, Cloudflare, or WordPress plugins), they may collect anonymized usage information. We do not control their data practices.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">6. Data Sharing</h3>
          <p>
            We do not share personal data with any third party unless required by law.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">7. Security</h3>
          <p>
            We use industry-standard security practices to protect the Site. However, no website is 100% secure, and you use the Site at your own risk.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">8. External Links</h3>
          <p>
            This Site contains links to Microsoft documentation and third-party websites. We are not responsible for their content or privacy practices.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">9. Children's Privacy</h3>
          <p>
            This Site is not intended for children under 13 and does not knowingly collect personal information from them.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">10. Updates to the Privacy Policy</h3>
          <p>
            We may revise this Policy periodically. Changes will be posted on this page with an updated date.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">11. Contact</h3>
          <p>
            For questions about this Privacy Policy, email: <a href="mailto:sayan.ghosh@outlook.in" className="text-neon-dark dark:text-neon-green hover:underline">sayan.ghosh@outlook.in</a>
          </p>
        </div>
      </div>
    </div>
  );
};