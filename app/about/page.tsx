"use client";

import { useState, useEffect } from "react";
import {
  Coffee,
  Award,
  Users,
  Truck,
  Star,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Leaf,
  Heart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-amber-600" />,
      title: "Passion for Quality",
      description:
        "Every bean is carefully selected and roasted with love and dedication to perfection.",
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Community First",
      description:
        "We believe in supporting our local farmers and building lasting relationships.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-amber-600" />,
      title: "Sustainability",
      description:
        "Committed to environmentally friendly practices and sustainable farming methods.",
    },
    {
      icon: <Globe className="w-8 h-8 text-amber-600" />,
      title: "Global Standards",
      description:
        "Nigerian coffee that meets and exceeds international quality standards.",
    },
  ];

  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description:
        "Kim Coffee was founded with a vision to showcase the rich heritage of Nigerian coffee to the world.",
    },
    {
      year: "2019",
      title: "First Partnerships",
      description:
        "Established direct trade relationships with 50+ local coffee farmers across Nigeria.",
    },
    {
      year: "2021",
      title: "Quality Recognition",
      description:
        "Received our first international quality certification and expanded to 5 major Nigerian cities.",
    },
    {
      year: "2023",
      title: "Community Impact",
      description:
        "Launched our farmer support program, improving livelihoods for over 200 farming families.",
    },
    {
      year: "2024",
      title: "National Expansion",
      description: "serving customers with same-day delivery in major cities.",
    },
    {
      year: "2025",
      title: "Dedication to Excellence",
      description:
        "Building a legacy of quality and community impact, with plans for international expansion.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-6">
              Our Story of
              <span className="text-amber-700"> Passion</span> and
              <span className="text-amber-700"> Excellence</span>
            </h1>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto mb-8">
              From humble beginnings to becoming Nigeria premier coffee brand,
              Kim Coffee represents a journey of dedication, quality, and
              community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">
                The Kim Coffee Journey
              </h2>
              <p className="text-amber-800 leading-relaxed text-lg">
                Kim Coffee was born from a simple yet powerful vision: to
                showcase the exceptional quality of Nigerian coffee to the world
                while supporting the hardworking farmers who make it all
                possible.
              </p>
              <p className="text-amber-800 leading-relaxed">
                Our founder, inspired by the rich coffee traditions of Nigeria,
                embarked on a mission to create direct relationships with local
                farmers, ensuring fair compensation and sustainable farming
                practices that benefit entire communities.
              </p>
              <p className="text-amber-800 leading-relaxed">
                Today, Kim Coffee stands as a testament to what is possible when
                passion meets purpose. Every cup tells a story of tradition,
                innovation, and the unwavering commitment to excellence that
                defines our brand.
              </p>
              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">200+</div>
                  <div className="text-amber-800">Partner Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">15+</div>
                  <div className="text-amber-800">Cities Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">50K+</div>
                  <div className="text-amber-800">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Coffee farming in Nigeria"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              These principles guide everything we do, from sourcing our beans
              to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-amber-800">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Our Journey Through Time
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              From our founding to today, here are the key milestones that
              shaped Kim Coffee.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <Card className="bg-white border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-amber-700 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-amber-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-amber-800">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              The passionate individuals driving Kim Coffee mission forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kimberly Adebayo",
                role: "Founder & CEO",
                image:
                  "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
                bio: "Passionate about coffee and community development, Kimberly founded Kim Coffee to showcase Nigerian coffee excellence.",
              },
              {
                name: "Emeka Okafor",
                role: "Head of Operations",
                image:
                  "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400",
                bio: "With 15 years in supply chain management, Emeka ensures our coffee reaches customers fresh and on time.",
              },
              {
                name: "Fatima Hassan",
                role: "Quality Control Manager",
                image:
                  "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400",
                bio: "A certified coffee taster with expertise in bean selection and roasting, ensuring every batch meets our high standards.",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-amber-700 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-amber-800 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Join Our Coffee Journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Experience the passion, quality, and community spirit that makes Kim
            Coffee special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50"
              >
                Explore Our Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-700"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
