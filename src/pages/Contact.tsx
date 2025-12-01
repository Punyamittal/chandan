import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import {
  leftSlideIn,
  rightSlideIn,
  heroMinimal,
  glowPulse,
  viewportConfig,
} from "@/lib/cinematicAnimations";
import { Badge } from "@/components/ui/badge";
import { Component } from "@/components/ui/gradient-bar-hero-section";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted! We'll respond within 24 hours.");
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["A-1, Main Road, Kewal Park", "Azadpur, Delhi - 110033"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9873535400", "Mon - Sat: 9:00 AM - 7:00 PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["Chandantrading2014@gmail.com", "Response within 24 hours"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "9:00 AM - 7:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Navigation />

      {/* Gradient Bar Hero Section */}
      <Component />

      <main className="relative z-10" id="contact-form">

        {/* Contact Form & Info Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Contact Form - Left Slide In */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="relative group flex"
              >
                <div className="bg-white rounded-2xl p-8 border border-orange-300 hover:border-orange-500 hover:shadow-xl transition-all duration-300 w-full flex flex-col">
                  <div className="mb-8">
                    <Badge className="mb-4 px-3 py-1 text-xs font-semibold border-orange-500/50 bg-orange-50/80 text-orange-600 rounded-full">
                      REQUEST A QUOTE
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Send Us a Message</h2>
                    <p className="text-gray-600 mt-3 text-sm">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-700 font-medium">
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          placeholder="Your Company"
                          required
                          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          required
                          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          required
                          className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product" className="text-gray-700 font-medium">
                        Product Interest
                      </Label>
                      <Input
                        id="product"
                        placeholder="E.g. Business Cards, Letterheads, Diaries"
                        className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-gray-700 font-medium">
                        Estimated Quantity
                      </Label>
                      <Input
                        id="quantity"
                        placeholder="E.g. 1000 units"
                        className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col">
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        rows={6}
                        required
                        className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 min-h-[120px]"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white h-14 text-lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </div>
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/30 group-hover:to-orange-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.div>

              {/* Contact Info - Right Slide In */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-300">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help with all your printing needs. Reach out through any of these channels.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportConfig}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Map or Additional Info */}
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-8 border border-orange-300">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {[
                      "24-hour response time",
                      "Free quotes and consultations",
                      "Competitive bulk pricing",
                      "Quality guaranteed",
                      "Fast turnaround times",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section - Optional */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              className="rounded-2xl overflow-hidden border border-orange-300 shadow-xl"
            >
              <div className="bg-gradient-to-br from-orange-50 to-white p-12 text-center">
                <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
                <p className="text-gray-600 mb-4">A-1, Main Road, Kewal Park, Azadpur, Delhi - 110033</p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-gray-900 hover:bg-orange-50"
                  onClick={() => window.open('https://maps.google.com/?q=Azadpur+Delhi', '_blank')}
                >
                  Open in Maps
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
