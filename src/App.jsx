import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Privacy from './pages/Privacy.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
