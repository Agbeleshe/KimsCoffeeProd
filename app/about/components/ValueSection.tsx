import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Leaf, Globe } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-8 h-8 text-amber-600" />,
    title: "Passion for Quality",
    description:
      "Every bean is carefully selected and roasted with love and dedication.",
  },
  {
    icon: <Users className="w-8 h-8 text-amber-600" />,
    title: "Community First",
    description: "We support local farmers and build lasting relationships.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-amber-600" />,
    title: "Sustainability",
    description:
      "We use environmentally friendly and sustainable farming methods.",
  },
  {
    icon: <Globe className="w-8 h-8 text-amber-600" />,
    title: "Global Standards",
    description:
      "Our coffee meets and exceeds international quality standards.",
  },
];

export const ValuesSection = () => (
  <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
          Our Core Values
        </h2>
        <p className="text-lg text-amber-800 max-w-3xl mx-auto">
          These principles guide everything we do, from sourcing our beans to
          serving our customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((v, i) => (
          <Card
            key={i}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  {v.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                {v.title}
              </h3>
              <p className="text-amber-800">{v.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
