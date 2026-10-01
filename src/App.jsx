import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Stub from './pages/Stub.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<Stub title="About" />} />
        <Route path="faq" element={<Stub title="FAQ" />} />
        <Route path="contact" element={<Stub title="Contact" />} />
        <Route path="*" element={<Stub title="Page not found" />} />
      </Route>
    </Routes>
  );
}
