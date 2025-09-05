import Header from './components/Header';
import Footer from './components/Footer';
import ButtonScrollTop from './components/ui/button-scroll-top';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Header />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
      <Footer />
      <ButtonScrollTop />
    </div>
  );
}

export default App;
