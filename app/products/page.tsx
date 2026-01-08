"use client";

import { useState, useEffect } from "react";
import { useProducts } from "./hooks/useProducts";
import { ProductCard } from "./components/ProductCard";
import { FilterSection } from "./components/FilterSection";
import { HeaderSection } from "@/components/reuseables/HeaderSection";
import FeaturesSection from "./components/FeaturesSection";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default items per page

  const { products, loading, error, getProductsByCategory } = useProducts();

  useEffect(() => {
    setIsVisible(true);
    // Adjust items per page based on screen size
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(3); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6); // Tablet
      } else {
        setItemsPerPage(9); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "arabica", name: "Arabica" },
    { id: "robusta", name: "Robusta" },
    { id: "signature-blends", name: "Signature Blends" },
    { id: "ground-coffee", name: "Ground Coffee" },
    { id: "instant-coffee", name: "Instant Coffee" },
    { id: "promotional", name: "Promotional" },
    { id: "others", name: "Others" },
  ];

  // Get filtered products
  const filteredProducts = getProductsByCategory(selectedCategory);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Always show last page if not already shown
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to products grid smoothly
      const productsGrid = document.getElementById("products-grid");
      if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <HeaderSection
        title="Premium Nigerian Coffee Collection"
        subtitle="Discover our carefully curated selection of premium coffee beans,
              each with its unique flavor profile and story."
      />

      {/* Filter Section */}
      <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        title="Explore Our Coffee Range"
        subtitle="Choose from a variety of blends and origins to suit your taste."
      />

      {/* Products Grid */}
      <section id="products-grid" className="py-12 mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-amber-700">Loading products...</p>
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Error Loading Products
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedCategory === "all"
                  ? "No Products Available"
                  : `No Products in ${
                      categories.find((c) => c.id === selectedCategory)?.name
                    }`}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "all"
                  ? "Check back soon for new arrivals!"
                  : "Try another category or check back later."}
              </p>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Products Count */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-amber-800 font-medium">
                    Showing{" "}
                    <span className="font-bold text-amber-900">
                      {startIndex + 1}-
                      {Math.min(endIndex, filteredProducts.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-amber-900">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                    {selectedCategory !== "all" && (
                      <span className="text-amber-600">
                        {" "}
                        in{" "}
                        <span className="font-semibold">
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }
                        </span>
                      </span>
                    )}
                  </p>
                </div>

                {/* Items Per Page Selector (Desktop) */}
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-amber-800 font-medium">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-amber-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900"
                  >
                    <option value={3}>3 per page</option>
                    <option value={6}>6 per page</option>
                    <option value={9}>9 per page</option>
                    <option value={12}>12 per page</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Pagination - Only show if more than one page */}
            {totalPages > 1 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex flex-col items-center gap-6">
                  {/* Pagination Controls */}
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                        currentPage === 1
                          ? "border-amber-200 text-amber-300 cursor-not-allowed"
                          : "border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400"
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {pageNumbers.map((page, index) => {
                        if (
                          page === "ellipsis-start" ||
                          page === "ellipsis-end"
                        ) {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="flex items-center justify-center w-10 h-10 text-amber-500"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 font-medium ${
                              currentPage === page
                                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white border-transparent shadow-lg shadow-amber-200"
                                : "border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                            }`}
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                        currentPage === totalPages
                          ? "border-amber-200 text-amber-300 cursor-not-allowed"
                          : "border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400"
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Page Info */}
                  <div className="text-center">
                    <p className="text-amber-700">
                      Page{" "}
                      <span className="font-bold text-amber-900">
                        {currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-amber-900">
                        {totalPages}
                      </span>
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      {filteredProducts.length} products total
                    </p>
                  </div>

                  {/* Items Per Page Selector (Mobile) */}
                  <div className="md:hidden flex items-center gap-3 mt-4">
                    <span className="text-amber-800 font-medium">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-amber-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900"
                    >
                      <option value={3}>3 per page</option>
                      <option value={6}>6 per page</option>
                      <option value={9}>9 per page</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <FeaturesSection />
    </div>
  );
}
