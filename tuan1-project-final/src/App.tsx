import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import SkillTechnical from './components/SkillTechnical';
import Footer from './components/Footer';
import ButtonScrollTop from './components/ui/button-scroll-top';

function App() {

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8">
        <AboutMe />
        <SkillTechnical />
        <Contact />
      </main>
      <Footer />
      <ButtonScrollTop />
    </div>
  );
}

export default App;
