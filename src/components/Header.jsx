import { Bell, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-bottom py-2 px-4 d-flex align-items-center justify-content-between sticky-top">
      <div className="d-flex align-items-center">
        <button className="btn btn-light d-md-none me-2">
          <Menu size={20} />
        </button>
        <h5 className="m-0 text-dark fw-bold">Panel de Control</h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light rounded-circle position-relative p-2">
          <Bell size={20} className="text-muted" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">Alertas</span>
          </span>
        </button>

        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
              FR
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
