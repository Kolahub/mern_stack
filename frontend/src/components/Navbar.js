import { Link } from 'react-router-dom'
import AuthButtons from './AuthButtons'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/"><h1>Workout Buddy</h1></Link>
        <AuthButtons />
      </div>
    </header>
  )
}

export default Navbar