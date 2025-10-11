"use client";

import React from "react";

interface FilterSectionProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  title?: string;
  subtitle?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  title = "Browse Our Coffee Selection",
  subtitle = "Filter by category to find your perfect brew.",
}) => {
  const handleFilterClick = (id: string) => {
    onSelectCategory(id);
    // Smooth scroll to the products grid
    const productsSection = document.getElementById("products-grid");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-2">{title}</h2>
        <p className="text-amber-700 mb-8 text-lg">{subtitle}</p>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-amber-700 text-white shadow-lg scale-105"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
