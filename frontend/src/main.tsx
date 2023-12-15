import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@components/App'
import Room from "@/components/Room/Room";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
