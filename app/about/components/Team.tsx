"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { team } from "./data";

export const TeamSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-lg text-amber-800 max-w-3xl mx-auto">
            The passionate individuals driving Kim Coffee’s mission forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
            >
              <CardContent className="p-6 text-center">
                <Image
                  height={100}
                  width={100}
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-amber-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-700 font-medium mb-3">{member.role}</p>
                <p className="text-amber-800 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
