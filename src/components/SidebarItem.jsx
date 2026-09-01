import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="nav-item mb-1">
      <Link
        to={to}
        className={`nav-link d-flex align-items-center px-3 py-2 ${isActive ? 'active bg-primary text-white rounded' : 'text-dark'}`}
      >
        <Icon size={18} className="me-3" />
        {text}
      </Link>
    </li>
  );
};

export default SidebarItem;
