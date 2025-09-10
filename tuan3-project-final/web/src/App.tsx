import Header from './components/Header';
import Footer from './components/Footer';
import ButtonScrollTop from './components/ui/button-scroll-top';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
      <ButtonScrollTop />
    </div>
  );
}

export default App;
