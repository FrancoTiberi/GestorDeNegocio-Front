import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="d-flex bg-light min-vh-100">

      <aside className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-white border-end" style={{ width: '260px', height: '100vh', position: 'sticky', top: 0 }}>
        <div className="d-flex align-items-center mb-4 mb-md-0 me-md-auto text-decoration-none px-2">
          <Package className="text-primary me-2" size={30} />
          <span className="fs-4 fw-bold text-dark">MiNegocio</span>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-header text-uppercase text-muted font-size-xs ms-2 mt-2 mb-2" style={{ fontSize: '0.75rem' }}>Menu Principal</li>
          <SidebarItem icon={LayoutDashboard} text="Inicio" to="/" />
          <SidebarItem icon={ShoppingCart} text="Productos" to="/productos" />
          <SidebarItem icon={Package} text="Inventario" to="/inventario" />
          <SidebarItem icon={Users} text="Clientes" to="/clientes" />
          <SidebarItem icon={Users} text="proveedores" to="/proveedores" />
          <li className="nav-header text-uppercase text-muted font-size-xs ms-2 mt-4 mb-2" style={{ fontSize: '0.75rem' }}>Sistema</li>
          <SidebarItem icon={Settings} text="Configuración" to="/config" />
        </ul>
        <hr />
        <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      <main className="flex-grow-1 d-flex flex-column h-100 overflow-auto">
        {/* <Header /> */}
        <div className="flex-grow-1">
          {children}
        </div>

      </main>
    </div>
  );
};

export default Layout;
