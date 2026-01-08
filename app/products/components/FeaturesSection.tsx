import React from "react";
import { Coffee, Award, Users, Truck } from "lucide-react";
const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            Why Choose Our Coffee?
          </h2>
          <p className="text-lg text-amber-800 max-w-3xl mx-auto">
            Every product in our collection meets the highest standards of
            quality and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Award className="w-8 h-8 text-amber-600" />,
              title: "Premium Quality",
              description:
                "Hand-selected beans from the finest Nigerian coffee farms",
            },
            {
              icon: <Users className="w-8 h-8 text-amber-600" />,
              title: "Fair Trade",
              description:
                "Supporting local farmers with fair compensation and sustainable practices",
            },
            {
              icon: <Truck className="w-8 h-8 text-amber-600" />,
              title: "Fast Delivery",
              description:
                "Fresh coffee delivered nationwide within 24-48 hours",
            },
            {
              icon: <Coffee className="w-8 h-8 text-amber-600" />,
              title: "Expert Roasting",
              description:
                "Masterfully roasted in small batches for optimal flavor",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-amber-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
