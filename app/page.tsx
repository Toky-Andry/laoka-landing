import Cta from '@/components/Cta';
import Faq from '@/components/Faq';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Steps from '@/components/Steps';
import TileReveal from '@/components/TileReveal';

export default function Home() {
  return (
    <>
      <TileReveal />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
