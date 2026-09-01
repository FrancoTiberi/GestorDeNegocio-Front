import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productos from './components/Productos';
import Inicio from './components/Inicio';
import Inventario from './components/Inventario';
import Proveedores from './components/Proveedores';
import Clientes from './components/Clientes';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/config" element={<div className="p-5 text-center text-muted">Configuración</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}