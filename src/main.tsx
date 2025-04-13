import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NotFoundPage, WordListPage, WordPage } from './pages';
import { PageLayout } from './components';
import { APP_PATHS } from './constants';
import { SettingsProvider } from './context/settingsContext';
import 'react-quill/dist/quill.snow.css';
import './assets/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<SettingsProvider />}>
          <Route element={<PageLayout />}>
            <Route path={APP_PATHS.home} element={<WordListPage />} />
            <Route path={`${APP_PATHS.word}/:id`} element={<WordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
