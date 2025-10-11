"use client";
import CertificateHighlight from "@/components/reuseables/CertificateHighlight";
import { HeaderSection } from "@/components/reuseables/HeaderSection";
import { StorySection } from "./components/StorySection";
import { ValuesSection } from "./components/ValueSection";
import { TeamSection } from "./components/Team";
import { CTASection } from "./components/AboutCTA";
import { TimelineSection } from "./components/TimeLine";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <HeaderSection
        title="Our Story Of Passion and Excellence"
        subtitle="       From humble beginnings to becoming Nigeria premier coffee brand,
              Kim Coffee represents a journey of dedication, quality, and
              community impact."
      />

      {/* Our Story Section */}
      <StorySection />

      {/* Values Section */}
      <ValuesSection />

      {/* Certification */}
      <CertificateHighlight />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
