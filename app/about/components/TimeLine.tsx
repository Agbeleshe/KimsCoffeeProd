"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { timeline } from "./data";
import { useInView } from "react-intersection-observer";

const TimelineItem = ({ item, index }: any) => {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  const { ref, inView } = useInView({
    threshold: 0.2, // how much of the element must be visible (0–1)
    triggerOnce: true, // trigger only the first time it enters view
  });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-0 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Mobile/Tablet Layout */}
      <div className="md:hidden w-full">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-amber-50/50 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}"></div>

          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full blur-2xl"></div>
          </div>

          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              {/* Icon with gradient */}
              <div
                className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-7 h-7 text-white" />
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-md opacity-50 -z-10 group-hover:opacity-70 transition-opacity`}
                ></div>
              </div>

              <div className="flex-1">
                {/* Year badge */}
                <div className="inline-block mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${item.color} text-white shadow-md`}
                  >
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-amber-800/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center w-full">
        {/* Left side */}
        <div className={`w-1/2 ${isEven ? "pr-8 text-right" : "pl-8 order-3"}`}>
          <Card
            className={`group relative overflow-hidden bg-gradient-to-br from-white to-amber-50/50 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 ${
              isEven ? "hover:-translate-x-2" : "hover:translate-x-2"
            } hover:-translate-y-1`}
          >
            <div
              className={`absolute top-0 ${
                isEven ? "right-0" : "left-0"
              } w-full h-1 bg-gradient-to-r ${item.color}`}
            ></div>

            {/* Animated background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className={`absolute ${
                  isEven ? "top-0 right-0" : "top-0 left-0"
                } w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-2xl`}
              ></div>
            </div>

            <CardContent className="p-6 relative z-10">
              <div
                className={`flex ${
                  isEven ? "flex-row-reverse" : "flex-row"
                } items-start gap-4`}
              >
                {/* Icon */}
                <div
                  className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-md opacity-50 -z-10 group-hover:opacity-70 transition-opacity`}
                  ></div>
                </div>

                <div className="flex-1">
                  {/* Year */}
                  <div
                    className={`mb-2 ${isEven ? "text-right" : "text-left"}`}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${item.color} text-white shadow-md`}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-amber-800/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center dot */}
        <div className="relative z-10 flex-shrink-0 order-2">
          <div
            className={`relative w-6 h-6 rounded-full bg-gradient-to-br ${item.color} border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300`}
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} blur-md opacity-50 animate-pulse`}
            ></div>
          </div>
        </div>

        {/* Right side (empty space) */}
        <div className={`w-1/2 ${isEven ? "order-3" : ""}`}></div>
      </div>
    </div>
  );
};

export const TimelineSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...Array.from(prev), index]));
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 bg-clip-text text-transparent mb-4">
            Our Journey Through Time
          </h2>
          <p className="text-base md:text-lg text-amber-800/80 max-w-3xl mx-auto leading-relaxed px-4">
            From our founding to today, here are the key milestones that shaped
            Kim Coffee into what it is today.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent"></div>

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, index) => (
              <div key={index} ref={(el) => (observerRefs.current[index] = el)}>
                <TimelineItem
                  item={item}
                  index={index}
                  isVisible={visibleItems.has(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 shadow-lg">
            <p className="text-amber-900 font-semibold text-lg">
              🎉 The journey continues...
            </p>
            <p className="text-amber-800/80 text-sm mt-2">
              Join us as we brew the future of Nigerian coffee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
