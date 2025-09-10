import { Star, Users } from "lucide-react";
import React from "react";
import coffeePac from "../../public/coffee-pac-no-bg.png";
import Image from "next/image";
import CardDeck from "../cool/CardDeck";

const About = () => {
  return (
    <div>
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              About Kims Coffee
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-md mx-auto">
              <h3 className="text-2xl text-center md:text-left font-semibold text-amber-900">
                Our Story
              </h3>
              <p className="text-amber-800 leading-relaxed text-center md:text-left">
                Kim Coffee was born from a passion for exceptional coffee and a
                commitment to showcasing Nigeria rich coffee heritage. We work
                directly with local farmers, ensuring fair trade practices and
                the highest quality beans.
              </p>
              <p className="text-amber-800 leading-relaxed text-center md:text-left">
                Every cup tells a story of tradition, quality, and the
                dedication of Nigerian coffee farmers who have perfected their
                craft over generations.
              </p>
              <div className="flex flex-col md:flex-row items-center space-x-4 text-amber-700">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5" />
                  <span className="ml-1 font-semibold">
                    10,000+ Happy Customers
                  </span>
                </div>
              </div>
            </div>
            <div className="relative overflow-visible">
              <CardDeck />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
