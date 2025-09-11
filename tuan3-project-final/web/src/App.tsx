import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonScrollTop from "./components/ui/button-scroll-top";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { NotificationProvider } from "./context/notificationContext";
import NotifyBar from "./components/ui/notify-bar";

function App() {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto flex-1">
        <NotificationProvider>
          <Outlet />
          <NotifyBar />
        </NotificationProvider>
      </main>
      <Footer />
      <ButtonScrollTop />
      <Toaster />
    </div>
  );
}

export default App;
