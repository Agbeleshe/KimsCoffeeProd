"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeaderSection } from "@/components/reuseables/HeaderSection";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
      title: "Visit Our Store",
      details: [
        "123 Coffee Street, Du",
        "Plateau, Nigeria 101241",
        "Open Mon-Sat: 7AM - 8PM",
      ],
    },
    {
      icon: <Phone className="w-6 h-6 text-amber-600" />,
      title: "Call Us",
      details: [
        "+234 806 956 9863",
        "+234 901 234 5678",
        "Available 24/7 for orders",
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-amber-600" />,
      title: "Email Us",
      details: [
        "kimscoffee24@gmail.com",
        "orders@kimcoffee.ng",
        "support@kimcoffee.ng",
      ],
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 6AM - 10PM",
        "Saturday: 7AM - 9PM",
        "Sunday: 8AM - 8PM",
      ],
    },
  ];

  const faqs = [
    {
      question: "What makes Kim Coffee different from other brands?",
      answer:
        "Kim Coffee is committed to showcasing the exceptional quality of Nigerian coffee while supporting local farmers through fair trade practices. Our beans are carefully selected, expertly roasted, and delivered fresh to ensure the best possible coffee experience.",
    },
    {
      question: "Do you offer nationwide delivery?",
      answer:
        "Yes! We deliver nationwide across Nigeria. Orders within Plateau, Nigeria are typically delivered within 24 hours, while other states receive their orders within 2-3 business days.",
    },
    {
      question: "Can I visit your roastery?",
      answer:
        "Absolutely! We offer roastery tours and coffee tasting sessions. Please contact us to schedule a visit. Tours are available Monday through Saturday from 10AM to 4PM.",
    },
    {
      question: "Do you offer bulk orders for offices or events?",
      answer:
        "Yes, we provide bulk orders and corporate packages. We offer special pricing for large orders and can customize packaging for events. Contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including bank transfers, card payments, mobile money (Opay, PalmPay), and cash on delivery for select locations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <HeaderSection
        title="Get in touch wih us"
        subtitle="  Have questions about our coffee? Need help with an order? Want to
              partner with us? We would love to hear from you and help you
              discover the perfect coffee experience."
      />

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-amber-800 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Send Us a Message
              </h2>
              <Card className="bg-white border-amber-200 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-amber-900 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-amber-900 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-amber-900 mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-amber-900 mb-2"
                        >
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="feedback">Feedback</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-amber-900 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-6">
                  Visit Our Store
                </h2>
                <Card className="bg-white border-amber-200 shadow-lg">
                  <CardContent className="p-0">
                    <div className="h-64 bg-amber-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                        <p className="text-amber-800 font-medium">
                          Interactive Map
                        </p>
                        <p className="text-amber-700 text-sm">
                          123 Coffee Street, Du
                        </p>
                        <p className="text-amber-700 text-sm">
                          Plateau, Nigeria
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-amber-900 mb-3">
                        Store Information
                      </h3>
                      <div className="space-y-2 text-amber-800">
                        <p>
                          <strong>Address:</strong> 123 Coffee Street, Du,
                          Plateau, Nigeria
                        </p>
                        <p>
                          <strong>Phone:</strong> +234 806 956 9863
                        </p>
                        <p>
                          <strong>Email:</strong> store@kimcoffee.ng
                        </p>
                        <p>
                          <strong>Parking:</strong> Free parking available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-amber-700 text-white border-amber-600">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="w-8 h-8 text-amber-200 mr-3" />
                    <h3 className="text-xl font-semibold">
                      Quick Response Guarantee
                    </h3>
                  </div>
                  <p className="text-amber-100 mb-4">
                    We are committed to providing excellent customer service.
                    Here is what you can expect:
                  </p>
                  <ul className="space-y-2 text-amber-100">
                    <li>
                      • Email responses within 2 hours during business hours
                    </li>
                    <li>• Phone support available 24/7 for urgent matters</li>
                    <li>• Live chat support on our website</li>
                    <li>• Social media responses within 30 minutes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              Find quick answers to common questions about Kim Coffee, our
              products, and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white border-amber-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-amber-800 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
