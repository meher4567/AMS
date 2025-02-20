import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { UserProvider } from './components/UserContext'; // Import UserProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap the entire app with UserProvider */}
      <BrowserRouter> {/* Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
);
