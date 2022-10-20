import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.css'


export default function Navbar() {

  const { color, changeColor } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav onClick={() => changeColor("pink")}>
        <Link to='/' className="brand">
          <h1>Cooking King</h1>
        </Link>
        <Searchbar />
        <Link to='/create'>Create Recipe</Link>

      </nav>
    </div>
  )
}