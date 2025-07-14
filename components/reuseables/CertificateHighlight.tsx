import Image from "next/image";
import React from "react";
import certificateImage from "../../public/certificate.png";

const CertificateHighlight = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            We are Officially Registered
          </h2>
          <p className="text-amber-800 text-lg mb-6">
            Kim’s Coffee Limited is proudly incorporated under the Companies and
            Allied Matters Act 2020 of the Federal Republic of Nigeria. This
            certificate affirms our commitment to transparency, professionalism,
            and our vision to empower a sustainable coffee culture in Nigeria
            and beyond.
          </p>
          <ul className="list-disc list-inside text-amber-700 space-y-2">
            <li>
              Company Registration No. <strong>2002921</strong>
            </li>
            <li>
              Certified by CAC on <strong>22nd November, 2022</strong>
            </li>
            <li>Private company limited by shares</li>
            <li>Verified by Registrar General A.G. Abubakar</li>
          </ul>
        </div>

        {/* Certificate Image */}
        <div className="relative w-full h-[500px] rounded-xl shadow-2xl overflow-hidden">
          <Image
            src={certificateImage}
            alt="Certificate of Incorporation"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CertificateHighlight;
