import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LuluEngineProvider } from '@lulu/engine';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const engineConfig = {
  menuCsvUrl: '/sample-menu.csv', // We'll create this sample data
  whatsappNumberIntl: '972525201978',
  orderEmails: ['lulu@lulu-k.com', 'lulu.kitchen.il@gmail.com'],
  businessHours: {
    sunday: [{ open: '11:00', close: '22:00' }],
    monday: [{ open: '11:00', close: '22:00' }],
    tuesday: [{ open: '11:00', close: '22:00' }],
    wednesday: [{ open: '11:00', close: '22:00' }],
    thursday: [{ open: '11:00', close: '23:00' }],
    friday: [{ open: '11:00', close: '23:00' }],
    saturday: [{ open: '12:00', close: '23:00' }],
  },
  paymentProviders: {
    bitUrl: 'https://bit.ly/lulu-payment',
    payboxUrl: 'https://paybox.co.il/lulu-payment',
    cash: true,
  },
};

function App() {
  return (
    <LuluEngineProvider config={engineConfig}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LuluEngineProvider>
  );
}

export default App;