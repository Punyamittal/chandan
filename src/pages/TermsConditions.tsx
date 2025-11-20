import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
  Scale,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

const TermsConditions = () => {
  const { currentTheme } = useTheme();
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement",
          text: "By accessing and using the Chandan Trading Company website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.",
        },
        {
          subtitle: "Business Transactions",
          text: "These terms govern all business transactions, bulk orders, quotations, and communications between Chandan Trading Company and its customers for printing stationery and related products.",
        },
      ],
    },
    {
      icon: ShoppingCart,
      title: "Orders & Quotations",
      content: [
        {
          subtitle: "Order Placement",
          text: "All orders are subject to acceptance by Chandan Trading Company. We reserve the right to refuse or cancel any order at our discretion, particularly in cases of pricing errors, product unavailability, or suspected fraudulent activity.",
        },
        {
          subtitle: "Bulk Orders",
          text: "Bulk orders require a minimum order quantity (MOQ) as specified for each product. Custom bulk orders may require advance payment or deposit before production commences.",
        },
        {
          subtitle: "Quotations",
          text: "Quotations provided are valid for 30 days from the date of issue unless otherwise specified. Prices are subject to change based on market conditions, raw material costs, and customization requirements.",
        },
        {
          subtitle: "Order Confirmation",
          text: "You will receive an order confirmation via email or phone. Please review all details carefully. Any discrepancies should be reported within 24 hours of receiving the confirmation.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Pricing & Payment",
      content: [
        {
          subtitle: "Pricing",
          text: "All prices are listed in Indian Rupees (INR) and are subject to applicable taxes including GST. Bulk discount tiers are applied automatically based on order quantity. Prices may vary based on customization, finishing options, and material specifications.",
        },
        {
          subtitle: "Payment Terms",
          text: "Payment terms are as follows: (1) Full advance payment for first-time customers or orders below ₹10,000, (2) 50% advance for regular customers with orders above ₹10,000, balance before delivery, (3) Credit terms available for established business clients subject to approval.",
        },
        {
          subtitle: "Payment Methods",
          text: "We accept payments via bank transfer (NEFT/RTGS/IMPS), UPI, credit/debit cards, and cheques for corporate clients. Cash payments accepted for in-person transactions at our Delhi office.",
        },
        {
          subtitle: "Late Payments",
          text: "Orders will not be processed or dispatched until payment is received as per agreed terms. Late payments may attract interest charges and may affect future credit terms.",
        },
      ],
    },
    {
      icon: Package,
      title: "Product Specifications",
      content: [
        {
          subtitle: "Product Quality",
          text: "We strive to provide accurate product descriptions, images, and specifications. However, actual products may vary slightly in color, finish, or appearance due to printing processes, material batches, and device display settings.",
        },
        {
          subtitle: "Customization",
          text: "Custom products (business cards, letterheads, notebooks, etc.) are manufactured according to your provided specifications and design files. It is your responsibility to ensure accuracy of all content, artwork, and specifications before approval.",
        },
        {
          subtitle: "Proof Approval",
          text: "For custom orders, we provide digital proofs for your approval. Production begins only after your written approval. Once approved, we are not responsible for errors in content, spelling, or design.",
        },
        {
          subtitle: "Color Variations",
          text: "Printed colors may vary slightly from screen displays due to differences in printing technology, paper quality, and calibration. We cannot guarantee exact color matches to digital proofs.",
        },
      ],
    },
    {
      icon: Truck,
      title: "Delivery & Shipping",
      content: [
        {
          subtitle: "Delivery Timeline",
          text: "Standard delivery times are 5-7 business days for Delhi NCR and 7-10 business days for other locations, subject to product availability and order confirmation. Custom orders may require additional production time (10-15 business days).",
        },
        {
          subtitle: "Shipping Charges",
          text: "Shipping charges vary based on order value, weight, and destination. Free delivery available for orders above ₹5,000 within Delhi NCR. Charges for other locations will be communicated during order confirmation.",
        },
        {
          subtitle: "Delivery Address",
          text: "Please ensure the delivery address is accurate and complete. We are not responsible for delays or non-delivery due to incorrect or incomplete addresses. Address changes after dispatch may incur additional charges.",
        },
        {
          subtitle: "Inspection at Delivery",
          text: "Please inspect products upon delivery. Report any visible damage, shortage, or defects to our customer service within 48 hours of receipt. Claims made after this period may not be entertained.",
        },
      ],
    },
    {
      icon: RefreshCw,
      title: "Returns & Refunds",
      content: [
        {
          subtitle: "Return Policy",
          text: "Standard products in original, unused condition can be returned within 7 days of delivery. Custom, personalized, or made-to-order products are not eligible for return unless there is a manufacturing defect or error on our part.",
        },
        {
          subtitle: "Defective Products",
          text: "If you receive defective or incorrect products, notify us within 48 hours with photographic evidence. We will arrange for replacement or refund at no additional cost to you.",
        },
        {
          subtitle: "Refund Process",
          text: "Approved refunds will be processed within 7-10 business days of receiving the returned product. Refunds will be issued to the original payment method. Shipping charges are non-refundable except in cases of our error.",
        },
        {
          subtitle: "Cancellation Policy",
          text: "Orders can be cancelled before production/dispatch. Cancellation of custom orders after proof approval may incur charges for work completed. Full refunds available for cancellations made within 24 hours of order placement (before production).",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Your Content",
          text: "You retain ownership of all content, designs, logos, and artwork you provide for customization. By submitting content, you grant us a license to use it solely for fulfilling your order.",
        },
        {
          subtitle: "Your Responsibility",
          text: "You are solely responsible for ensuring you have the legal rights to use all content, images, logos, and text provided for printing. You agree to indemnify Chandan Trading Company against any claims of copyright or trademark infringement.",
        },
        {
          subtitle: "Our Content",
          text: "All content on our website, including product images, descriptions, logos, and design elements, is the intellectual property of Chandan Trading Company and protected by copyright laws.",
        },
      ],
    },
    {
      icon: Scale,
      title: "Liability & Warranties",
      content: [
        {
          subtitle: "Product Warranties",
          text: "We warrant that our products are free from manufacturing defects. This warranty does not cover damage from misuse, normal wear and tear, or issues arising from your design specifications.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "Our liability is limited to the value of your order. We are not liable for any indirect, incidental, consequential, or special damages arising from product use or delays in delivery.",
        },
        {
          subtitle: "Force Majeure",
          text: "We are not responsible for delays or failures in performance due to circumstances beyond our control, including natural disasters, strikes, transportation delays, supplier issues, or government restrictions.",
        },
        {
          subtitle: "Disclaimer",
          text: "Products are provided 'as is' and we make no warranties beyond those explicitly stated. We do not guarantee that our products will meet your specific requirements or expectations beyond the specifications agreed upon.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}>
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
                <FileText className="w-3 h-3 mr-1" />
                Last Updated: November 20, 2025
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Terms & Conditions
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                Please read these terms and conditions carefully before placing
                any order with Chandan Trading Company. These terms govern your
                business relationship with us.
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

        {/* Terms Sections */}
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

              {/* Additional Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm"
              >
                <h2 className="text-2xl font-heading font-bold mb-4">
                  Dispute Resolution
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Any disputes arising from these terms or your use of our
                  services shall first be resolved through good faith
                  negotiations. If unresolved, disputes shall be subject to
                  arbitration in accordance with the Indian Arbitration and
                  Conciliation Act, 1996, in Delhi, India.
                </p>

                <h2 className="text-2xl font-heading font-bold mb-4 mt-8">
                  Modifications to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify these terms and conditions at
                  any time. Changes will be effective immediately upon posting
                  on our website. Your continued use of our services after
                  changes constitutes acceptance of the modified terms.
                </p>

                <h2 className="text-2xl font-heading font-bold mb-4 mt-8">
                  Severability
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If any provision of these terms is found to be invalid or
                  unenforceable, the remaining provisions shall continue in full
                  force and effect.
                </p>

                <h2 className="text-2xl font-heading font-bold mb-4 mt-8">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For any questions or concerns regarding these terms and
                  conditions, please contact us:
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
                  <p>
                    <strong>Business Hours:</strong> Monday – Saturday, 10:00 AM
                    – 7:00 PM
                  </p>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      Governing Law:
                    </strong>{" "}
                    These terms and conditions are governed by the laws of India.
                    All disputes shall be subject to the exclusive jurisdiction
                    of the courts in Delhi, India.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground font-medium">
                    By placing an order with Chandan Trading Company, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms and Conditions.
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

export default TermsConditions;

