"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Eye, Lock, Database, User, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { Header, Footer } from '@/components/Layout';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-blue-800">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Last updated: October 9, 2024</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                1. Introduction
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  At XolveTech ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
                </p>
                <p>
                  By using our Service, you consent to the data practices described in this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our Service.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                2. Information We Collect
              </h2>
              <div className="text-gray-700 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p>We may collect the following types of personal information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Account credentials and authentication information</li>
                    <li>Profile information and preferences</li>
                    <li>Communication preferences and settings</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <p>We automatically collect certain information about your use of our Service:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage patterns and interactions with our Service</li>
                    <li>Log files and analytics data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Content Information</h3>
                  <p>We collect information about the content you create and share:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Posts, comments, and messages you create</li>
                    <li>Files and media you upload</li>
                    <li>Interactions with other users' content</li>
                    <li>Participation in discussions and threads</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                3. How We Use Your Information
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide, maintain, and improve our Service</li>
                  <li>To process transactions and send related information</li>
                  <li>To send you technical notices, updates, and support messages</li>
                  <li>To respond to your comments, questions, and requests</li>
                  <li>To personalize your experience and provide relevant content</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                4. Information Sharing and Disclosure
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Service Providers</h3>
                  <p>We may share your information with trusted third-party service providers who assist us in operating our Service, conducting our business, or serving our users.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                  <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Transfers</h3>
                  <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Consent</h3>
                  <p>We may share your information with your explicit consent or at your direction.</p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                5. Data Security
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>Our security measures include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights and Choices</h2>
              <div className="text-gray-700 space-y-3">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing of your information</li>
                  <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking Technologies</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our Service. Cookies are small data files stored on your device that help us remember your preferences and improve our Service.
                </p>
                <p>We use cookies for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Authentication and security</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Analyzing usage patterns and improving our Service</li>
                  <li>Providing personalized content and recommendations</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences, but disabling cookies may affect the functionality of our Service.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Third-Party Services</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services.
                </p>
                <p>
                  We encourage you to review the privacy policies of any third-party services you access through our Service.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                9. Children's Privacy
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can take appropriate action.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. International Data Transfers</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Changes to This Privacy Policy</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span><strong>Email:</strong> privacy@xolvetech.com</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span><strong>Phone:</strong> +1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span><strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
