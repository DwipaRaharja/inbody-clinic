import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { getRoute } from './routes.js';
import { getPage } from './pages.jsx';
import { bodyClasses, documentClasses, backgroundClasses } from './theme.js';

export function render(path) {
  const route = getRoute(path);
  const page = route ? getPage(route) : null;
  return {
    html: renderToString(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>),
    route,
    documentClasses,
    bodyClasses: `${bodyClasses} ${backgroundClasses[page?.background] ?? backgroundClasses.cream}`,
  };
}
