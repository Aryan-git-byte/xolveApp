"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Calendar, User, Shield, AlertTriangle } from 'lucide-react';
import { Header, Footer } from '@/components/Layout';

export default function TermsConditionsPage() {
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
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions</h1>
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
                <User className="w-5 h-5 text-blue-600" />
                1. Introduction
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Welcome to XolveTech ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our platform, services, and applications (collectively, the "Service").
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                2. Acceptance of Terms
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  By creating an account, accessing, or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and XolveTech. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  To access certain features of our Service, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Acceptable Use Policy</h2>
              <div className="text-gray-700 space-y-3">
                <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Post, transmit, or share content that is illegal, harmful, threatening, abusive, or discriminatory</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use the Service to spam, harass, or harm other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the proper functioning of the Service</li>
                </ul>
              </div>
            </section>

            {/* Content and Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Content and Intellectual Property</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  You retain ownership of content you post on our Service. By posting content, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content in connection with the Service.
                </p>
                <p>
                  Our Service and its original content, features, and functionality are owned by XolveTech and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Privacy</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
                <p>
                  We collect, use, and share your information as described in our Privacy Policy. By using our Service, you consent to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                7. Prohibited Activities
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>You may not use our Service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Termination</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Disclaimers</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Excludes all representations and warranties relating to this Service and its contents</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this Service</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@xolvetech.com</p>
                  <p><strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
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
