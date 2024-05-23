import ReactDOM from 'react-dom/client';
import { Providers } from './context';
import { Router } from './router';
import { GlobalStyle } from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <Router />
    <GlobalStyle />
  </Providers>
);
