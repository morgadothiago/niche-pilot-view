import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Testimonials } from "@/components/Testimonials";
import { LandingTutorial } from "@/components/LandingTutorial";
import { AnimatedBubbles } from "@/components/AnimatedBubbles";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingSteps } from "@/components/landing/LandingSteps";
import { LandingBenefits } from "@/components/landing/LandingBenefits";
import { LandingCTA } from "@/components/landing/LandingCTA";

export default function Landing() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Header />

        <LandingHero />
        <LandingFeatures />
        <LandingSteps />
        <Testimonials />
        <LandingBenefits />
        <LandingCTA />

        <Footer />
        <LandingTutorial />
        <AnimatedBubbles />
      </div>
    </PageTransition>
  );
}
