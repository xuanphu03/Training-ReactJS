import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store.ts';
import App from './App.tsx';
import * as ElementRoute from './ElementRoute.ts'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route
              path="login"
              element={
                <ElementRoute.GuestRoute>
                  <ElementRoute.LoginPage />
                </ElementRoute.GuestRoute>
              }
            />
            <Route
              path="shopping-cart"
              element={
                <ElementRoute.AuthRoute>
                  <ElementRoute.ShoppingCart />
                </ElementRoute.AuthRoute>
              }
            />
            <Route index element={<ElementRoute.HelloWorld />} />
            <Route path="about-me" element={<ElementRoute.AboutMe />} />
            <Route path="contact" element={<ElementRoute.Contact />} />
            <Route path="skills" element={<ElementRoute.Skills />} />
            <Route path="products" element={<ElementRoute.ProductsPage />} />
            <Route
              path="products/:id"
              element={<ElementRoute.ProductDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
