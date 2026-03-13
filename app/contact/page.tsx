"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  MessageCircle, HelpCircle, ArrowRight,
  ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeaderSection } from "@/components/reuseables/HeaderSection";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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
    console.log("Form submitted:", formData);
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
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Location",
      color: "amber",
      details: ["Satelocost, Jos", "Plateau, Nigeria"],
      action: "Get Directions",
      link: "https://www.google.com/maps?q=Satelocost,Jos,Plateau,Nigeria"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      color: "orange",
      details: ["+234 806 956 9863", "+234 901 234 5678"],
      action: "Call Now",
      link: "tel:+2348069569863"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      color: "amber",
      details: ["kimscoffee24@gmail.com", "orders@kimcoffee.ng"],
      action: "Send Email",
      link: "mailto:kimscoffee24@gmail.com"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Opening Hours",
      color: "orange",
      details: ["Mon - Fri: 6AM - 10PM", "Sat - Sun: 7AM - 9PM"],
      action: "View Schedule",
      link: "#"
    },
  ];

  const faqs = [
    {
      question: "What makes Kim Coffee different from other brands?",
      answer: "Kim Coffee is committed to showcasing the exceptional quality of Nigerian coffee while supporting local farmers through fair trade practices. Our beans are carefully selected, expertly roasted, and delivered fresh to ensure the best possible coffee experience."
    },
    {
      question: "Do you offer nationwide delivery?",
      answer: "Yes! We deliver nationwide across Nigeria. Orders within Plateau, Nigeria are typically delivered within 24 hours, while other states receive their orders within 2-3 business days."
    },
    {
      question: "Can I visit your store in Satelocost?",
      answer: "Absolutely! We love meeting our customers. You can visit us in Satelocost, Jos for fresh tastings and to purchase our full range of 100% Arabica beans."
    },
    {
      question: "Do you offer bulk orders for offices or events?",
      answer: "Yes, we provide bulk orders and corporate packages. We offer special pricing for large orders and can customize packaging for events. Contact our sales team for more information."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <HeaderSection
        title="Get in touch with us"
        subtitle="Have questions about our premium Nigerian coffee? Whether you're an enthusiast or a business partner, our team in Plateau is ready to assist you."
      />

      {/* Info Cards Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`transition-all duration-700 delay-[${index * 100}ms] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white/60 backdrop-blur-sm rounded-3xl">
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-2xl opacity-10 transition-colors group-hover:opacity-20 ${info.color === 'amber' ? 'bg-amber-600' : 'bg-orange-600'}`} />
                  
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${info.color === 'amber' ? 'bg-amber-100 text-amber-900' : 'bg-orange-100 text-orange-900'}`}>
                      {info.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-amber-950 mb-4">{info.title}</h3>
                    
                    <div className="flex-grow space-y-1 mb-6">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-amber-900/70 font-medium">{detail}</p>
                      ))}
                    </div>
                    
                    <a 
                      href={info.link} 
                      className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${info.color === 'amber' ? 'text-amber-700 hover:text-amber-900' : 'text-orange-700 hover:text-orange-900'}`}
                    >
                      {info.action} <ArrowRight className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section: Form & Map */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Form Column */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-amber-950 mb-4 leading-tight">
                  Let's craft <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-800 italic">something meaningful</span>
                </h2>
                <p className="text-lg text-amber-900/70 font-medium">
                  Have a specific inquiry or just want to say hello? Fill out the form and our coffee specialists will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-amber-900/60 uppercase ml-1">Full Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-amber-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-all placeholder:text-amber-900/20 font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-amber-900/60 uppercase ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-amber-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-all placeholder:text-amber-900/20 font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-amber-900/60 uppercase ml-1">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-amber-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-all placeholder:text-amber-900/20 font-medium"
                      placeholder="+234 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-amber-900/60 uppercase ml-1">Subject</label>
                    <select
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-amber-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">Choose inquiry type</option>
                      <option value="order">Order Support</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-amber-900/60 uppercase ml-1">Your Message</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border-2 border-amber-100 rounded-2xl focus:border-amber-500 focus:outline-none transition-all placeholder:text-amber-900/20 font-medium resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-8 text-lg font-bold bg-amber-800 hover:bg-amber-950 text-white rounded-2xl shadow-xl shadow-amber-900/20 transition-all active:scale-95 group"
                >
                  <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Initiate Connection
                </Button>
              </form>
            </div>

            {/* Map Column */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="sticky top-24">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                  <div className="absolute inset-0 bg-amber-900/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors" />
                  <iframe
                    width="100%"
                    height="500"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps?q=Satelocost,Jos,Plateau,Nigeria&output=embed"
                    allowFullScreen
                    className="grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>

                {/* Floating Support Note */}
                <div className="absolute -bottom-8 -left-8 md:bottom-12 md:-left-12 max-w-xs transition-all hover:scale-105">
                  <Card className="bg-amber-950 text-white border-none shadow-2xl rounded-3xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-800 rounded-2xl flex items-center justify-center shrink-0">
                        <MessageCircle className="w-6 h-6 text-amber-200" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Instant Support?</h4>
                        <p className="text-amber-200/80 text-sm leading-relaxed">
                          Our WhatsApp concierge is available 24/7 for urgent orders and inquiries.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Assistance</span>
            </div>
            <h2 className="text-4xl font-extrabold text-amber-950">Curious About Us?</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-amber-50 rounded-3xl overflow-hidden transition-all hover:border-amber-100">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white transition-colors"
                >
                  <span className="text-lg font-bold text-amber-950">{faq.question}</span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-amber-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-amber-400" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    activeFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-amber-900/70 font-medium leading-relaxed border-t border-amber-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
