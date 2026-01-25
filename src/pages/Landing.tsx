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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
