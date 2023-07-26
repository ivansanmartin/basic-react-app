import {Link} from "react-router-dom"

export const Navegation = () => {

    return (
        <div className="container mt-5 fs-5">
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Llamadas App</a>

                </li>

                <li className="nav-item">
                    <Link to="/" className="nav-link">Principal</Link>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Panel</a>
                    <ul className="dropdown-menu">
                    <li><Link to="/dashboard/make-call" className="dropdown-item">Hacer llamadas</Link></li>
                    <li><Link to="/dashboard/calls" className="dropdown-item">Ver llamadas</Link></li>
                    <li><Link to="/dashboard/clients" className="dropdown-item">Ver y crear clientes</Link></li>
                    </ul>
                </li>
              

            </ul>

        </div>
    )

}