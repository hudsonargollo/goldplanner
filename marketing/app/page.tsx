import Navbar from "@/components/Navbar";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import HeroSection from "@/components/HeroSection";
import AgitacaoSection from "@/components/AgitacaoSection";
import ProcessoSection from "@/components/ProcessoSection";
import ObjetivoSection from "@/components/ObjetivoSection";
import QualificacaoFitSection from "@/components/QualificacaoFitSection";
import AutoridadeSection from "@/components/AutoridadeSection";
import FaqSection from "@/components/FaqSection";
import HubGoldPlannerSection from "@/components/HubGoldPlannerSection";
import QualificacaoSection from "@/components/QualificacaoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnalyticsBeacon />
      <Navbar />
      <main>
        <HeroSection />
        <AgitacaoSection />
        <ProcessoSection />
        <ObjetivoSection />
        <QualificacaoFitSection />
        <AutoridadeSection />
        <HubGoldPlannerSection />
        <QualificacaoSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
