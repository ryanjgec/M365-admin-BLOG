import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: October 2025</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-xl max-w-4xl mx-auto">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead">
            Welcome to <strong>microsoftadmin.in</strong> (“the Site”). By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">1. Purpose of the Site</h3>
          <p>
            microsoftadmin.in provides educational content, knowledge base articles, scripts, troubleshooting guides, and resources related to Microsoft 365 administration. All content is provided for informational purposes only and should not be treated as professional or legal advice.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">2. Use of Content</h3>
          <p>
            All articles, scripts, diagrams, and resources on this Site are original content created for public educational use.
          </p>
          <p><strong>You may:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Read, share, and link to our content</li>
            <li>Use scripts or examples at your own risk</li>
          </ul>
          <p className="mt-4"><strong>You may not:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Copy entire articles or reproduce content without permission</li>
            <li>Sell, republish, or redistribute content as your own</li>
            <li>Use the Site in a way that harms its availability, security, or performance</li>
          </ul>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">3. Accuracy of Information</h3>
          <p>
            While we aim to provide accurate and up-to-date information, Microsoft 365 evolves quickly and errors may occur. The Site and its owner make no warranties regarding:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Completeness or accuracy of content</li>
            <li>Suitability of scripts or procedures for your environment</li>
          </ul>
          <p className="mt-2">Use all information at your own discretion and risk.</p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">4. External Links</h3>
          <p>
            The Site may include links to Microsoft documentation or third-party resources. We are not responsible for the content, accuracy, or policies of external websites.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">5. Scripts and Automation Code</h3>
          <p>
            Any PowerShell, Graph API, or automation scripts published on the Site are provided “as-is” with no guarantees. By using them, you agree that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are responsible for validating code prior to running it</li>
            <li>The Site and its owner are not liable for any damage, data loss, security incidents, or misconfigurations resulting from script usage</li>
          </ul>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">6. Intellectual Property</h3>
          <p>
            All original content—including articles, text, code examples, and diagrams—is owned by microsoftadmin.in unless otherwise noted. Unauthorized copying, scraping, or automated extraction of content is prohibited.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">7. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, microsoftadmin.in and its owner are not liable for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Direct, indirect, or incidental damages</li>
            <li>Data loss or downtime</li>
            <li>Security issues arising from the use of site content</li>
          </ul>
          <p className="mt-2">Use this Site and its information at your own risk.</p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">8. Changes to Terms</h3>
          <p>
            We may update these Terms from time to time. Continued use of the Site after updates constitutes acceptance of the revised Terms.
          </p>

          <h3 className="text-xl font-bold text-navy-900 dark:text-white mt-8 mb-4">9. Contact</h3>
          <p>
            For questions regarding these Terms, email: <a href="mailto:sayan.ghosh@outlook.in" className="text-neon-dark dark:text-neon-green hover:underline">sayan.ghosh@outlook.in</a>
          </p>
        </div>
      </div>
    </div>
  );
};