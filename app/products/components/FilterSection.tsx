"use client";

interface Category {
  id: string;
  name: string;
}

interface FilterSectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  title: string;
  subtitle: string;
}

export function FilterSection({
  categories,
  selectedCategory,
  onSelectCategory,
  title,
  subtitle,
}: FilterSectionProps) {
  return (
    <section className="py-12 bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-amber-800 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
