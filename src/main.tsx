import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotFoundPage, WordListPage, WordPage } from './pages';
import { PageLayout } from './components';
import './assets/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<WordListPage />} />
          <Route path="/word/:id" element={<WordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
