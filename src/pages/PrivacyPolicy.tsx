import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, UserCheck, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you place an order or request a quote, we collect your name, business name, email address, phone number, shipping address, and payment information. This information is essential for processing your bulk orders and maintaining our business relationship.",
        },
        {
          subtitle: "Business Information",
          text: "We may collect information about your business, including GST number, company registration details, and purchase history to provide better bulk pricing and customized service.",
        },
        {
          subtitle: "Technical Information",
          text: "We automatically collect certain information when you visit our website, including IP address, browser type, device information, and browsing patterns to improve our services.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Order Processing",
          text: "We use your information to process and fulfill your bulk orders, communicate order status, arrange delivery, and handle any queries or issues related to your purchases.",
        },
        {
          subtitle: "Business Communication",
          text: "We may use your contact information to send you quotes, product catalogs, bulk discount offers, and updates about our printing stationery products and services.",
        },
        {
          subtitle: "Service Improvement",
          text: "Your information helps us understand customer preferences, improve our product range, enhance website functionality, and provide personalized bulk pricing.",
        },
        {
          subtitle: "Legal Compliance",
          text: "We use your information to comply with applicable laws, regulations, tax requirements, and to maintain proper business records as required by Indian commercial laws.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your personal and business information from unauthorized access, disclosure, alteration, or destruction. Our payment processing uses secure, encrypted channels.",
        },
        {
          subtitle: "Data Storage",
          text: "Your information is stored on secure servers with restricted access. We maintain physical, electronic, and procedural safeguards to protect your data in accordance with Indian data protection regulations.",
        },
        {
          subtitle: "Third-Party Services",
          text: "We work with trusted third-party service providers for payment processing, shipping, and business analytics. These partners are contractually obligated to maintain confidentiality and security of your information.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Limited Disclosure",
          text: "We do not sell, trade, or rent your personal information to third parties. We only share information when necessary to complete your orders, comply with legal obligations, or with your explicit consent.",
        },
        {
          subtitle: "Business Partners",
          text: "We may share relevant information with shipping companies, payment processors, and suppliers to fulfill your bulk orders efficiently.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or governmental authority, or to protect our legal rights and business interests.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Correction",
          text: "You have the right to access, review, and update your personal information at any time. Contact us to request corrections or updates to your data.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your personal information, subject to our legal and contractual obligations to retain certain records for tax and accounting purposes.",
        },
        {
          subtitle: "Marketing Preferences",
          text: "You can opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails. This will not affect transactional communications related to your orders.",
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your personal data in a structured, commonly used format.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Cookies & Tracking",
      content: [
        {
          subtitle: "Cookie Usage",
          text: "We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser.",
        },
        {
          subtitle: "Analytics",
          text: "We use analytics tools to understand how visitors use our website. This helps us improve our services and provide better bulk ordering experiences.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16 sm:pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Last Updated: November 20, 2025
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                At Chandan Trading Company, we are committed to protecting your
                privacy and ensuring the security of your personal information.
                This policy explains how we collect, use, and safeguard your
                data.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-heading font-bold mb-4">
                Company Information
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">
                    Chandan Trading Company
                  </strong>
                </p>
                <p>A-1, Main Road, Kewal Park, Azadpur, Delhi – 110033</p>
                <p>Email: Chandantrading2014@gmail.com</p>
                <p>Phone: +91 9873535400</p>
                <p>Business Hours: Monday – Saturday | 10 AM – 7 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-heading font-bold">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold mb-2">
                            {item.subtitle}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Additional Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm"
              >
                <h2 className="text-2xl font-heading font-bold mb-4">
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our services are intended for businesses and individuals over
                  18 years of age. We do not knowingly collect information from
                  children under 18.
                </p>

                <h2 className="text-2xl font-heading font-bold mb-4 mt-8">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update this privacy policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any significant changes by posting the updated policy on
                  our website with a new "Last Updated" date.
                </p>

                <h2 className="text-2xl font-heading font-bold mb-4 mt-8">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this
                  privacy policy or how we handle your personal information,
                  please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> Chandantrading2014@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 9873535400
                  </p>
                  <p>
                    <strong>Address:</strong> A-1, Main Road, Kewal Park,
                    Azadpur, Delhi – 110033
                  </p>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      Governing Law:
                    </strong>{" "}
                    This privacy policy is governed by the laws of India. Any
                    disputes arising from this policy shall be subject to the
                    exclusive jurisdiction of the courts in Delhi, India.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

