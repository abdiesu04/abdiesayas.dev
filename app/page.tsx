import About from "./components/About";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import SiteHeader from "./components/SiteHeader";
import StackMarquee from "./components/StackMarquee";
import Testimonial from "./components/Testimonial";
import Work from "./components/Work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StackMarquee />
        <Work />
        <Testimonial />
        <Career />
        <About />
        <Contact />
      </main>
    </>
  );
}
