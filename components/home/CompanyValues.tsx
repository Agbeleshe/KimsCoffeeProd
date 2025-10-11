import { Coffee, Lightbulb, Heart, Users, Leaf } from "lucide-react";
import React from "react";
import bgImage from "../../public/captures/KimsCoffeeNine.jpg";

const sections = [
  {
    icon: <Heart className="w-6 h-6 text-amber-700" />,
    title: "Our Values",
    content:
      "Dedicated, skilled, passionate, and ready to overcome challenges to deliver top-tier coffee products and support our farmers' community.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-700" />,
    title: "Our Mission",
    content:
      "To sustain and encourage individuals growing a vibrant and lasting coffee culture.",
  },
  {
    icon: <Coffee className="w-6 h-6 text-amber-700" />,
    title: "What We Do",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Roast premium coffee beans</li>
        <li>Farm our own coffee</li>
        <li>Share knowledge to grow a sustainable coffee community</li>
      </ul>
    ),
  },
  {
    icon: <Leaf className="w-6 h-6 text-amber-700" />,
    title: "Why We Do It",
    content: (
      <ul className="list-disc pl-5">
        <li>To build a sustainable and thriving coffee culture</li>
      </ul>
    ),
  },
  {
    icon: <Users className="w-6 h-6 text-amber-700" />,
    title: "Who We Do It For",
    content: (
      <ul className="list-disc pl-5">
        <li>For every coffee lover out there</li>
      </ul>
    ),
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-700" />,
    title: "How We Do It",
    content: (
      <ul className="list-disc pl-5">
        <li>By sharing ideas and creating together</li>
      </ul>
    ),
  },
];

const CompanyValues = () => {
  return (
    <section
      className="bg-white py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
      }}
    >
      {/* overlay */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-amber-800/80 "></div>

      {/* Contenet */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-50 ">What Drives Us</h2>
          <p className="text-amber-50  mt-2 text-lg max-w-2xl mx-auto">
            At Kim’s Coffee, we blend passion, purpose, and people to cultivate
            a culture rooted in quality and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-amber-50 hover:shadow-lg min-h-[200px] transition-shadow duration-300 p-6 rounded-2xl border border-amber-100 flex flex-col"
            >
              <div className="flex items-center space-x-3 mb-4">
                {section.icon}
                <h3 className="text-xl font-semibold text-amber-900">
                  {section.title}
                </h3>
              </div>
              <div className="text-amber-800 text-sm leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
