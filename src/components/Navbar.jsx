import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

export default function Navbar(){
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Mi Sitio</Link>
      <div className="links">
        <NavLink to="/" className={linkClass}>Inicio</NavLink>
        <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
      </div>
    </nav>
  )
}
