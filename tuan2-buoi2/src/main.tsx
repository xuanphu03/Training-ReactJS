import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import AboutMe from './pages/AboutMe.tsx';
import HelloWorld from './pages/HelloWorld.tsx';
import Contact from './pages/Contact.tsx';
import Skills from './pages/SkillTechnical.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HelloWorld />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path='contact' element={<Contact />} />
          <Route path='skills' element={<Skills />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
