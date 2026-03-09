
import HeroBanner from "../components/HeroBanner";
import SkillsVideoSection from "../components/SkillsVideoSection";
import UseCasesSection from "../components/UseCasesSection";
import LanguagesCarousel from "../components/LanguagesCarousel";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";


function HomePage () {


    return (
        <>
        <HeroBanner />
        <UseCasesSection />
        <SkillsVideoSection />
        <LanguagesCarousel />
        <Footer />
        <CookieBanner />
        </>
    )
    
}

export default  HomePage