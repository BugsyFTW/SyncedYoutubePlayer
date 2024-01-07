import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/pages/App'
import Room from "@/pages/Room/Room";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from "@components/theme-provider";

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey="synced-web-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/room/:id' element={<Room />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
