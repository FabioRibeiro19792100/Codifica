import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-text">Página não encontrada</p>
        <Link to="/" className="not-found-link">Voltar ao início</Link>
      </div>
    </div>
  )
}

export default NotFound
