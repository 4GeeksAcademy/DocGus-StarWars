import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // ✅ Tu hook personalizado

export const Navbar = () => {
    const { store } = useGlobalReducer(); // ✅ Aquí accedes al estado global

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3">
            <Link to="/" className="navbar-brand mb-0 h1">StarWars</Link>

            <div className="ml-auto dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Favoritos ❤️
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {store.favoritos.length === 0 ? (
                        <li className="dropdown-item">No hay favoritos</li>
                    ) : (
                        store.favoritos.map((fav, index) => (
                            <li key={index} className="dropdown-item">{fav}</li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
