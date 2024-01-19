import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/pages/App'
import { Room } from "@/pages/Room/Room";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from "@components/theme-provider";

import './index.css';
import { Header } from './components/header';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey="synced-web-ui-theme">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
