import Image from "next/image";
import coffee from "../../../public/image.png";

export const StorySection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">
          The Kim Coffee Journey
        </h2>
        <p className="text-amber-800 leading-relaxed text-lg">
          Kim Coffee started with one goal: to bring the rich aroma and taste of
          Nigerian coffee to every home.
        </p>
        <p className="text-amber-800 leading-relaxed">
          Our farmers, our beans, and our community all blend together to create
          the Kim Coffee experience.
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
        <Image
          height={400}
          width={400}
          src={coffee}
          alt="Coffee farming in Nigeria"
          className="w-full h-96 object-cover rounded-2xl shadow-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent rounded-2xl"></div>
      </div>
    </div>
  </section>
);
