import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Architecture from "@/components/Architecture";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

//home

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Architecture />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
