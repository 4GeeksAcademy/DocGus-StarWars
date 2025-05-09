import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // Hook personalizado
import planetsData from "../assets/img/planets.json"; // Asegúrate que este archivo tenga planetas

export const CardPlaneta = ({ id, nombre }) => {
    const { store, dispatch } = useGlobalReducer(); // Usar el hook global
    const planetImage = planetsData.planets.find(p => p.id === Number(id))?.image;
    const [details, setDetails] = useState(null);

    // Funciones para agregar o eliminar de favoritos
    const agregarFavorito = () => {
        dispatch({
            type: "agregar_favorito",
            payload: nombre
        });
    };

    const eliminarFavorito = () => {
        dispatch({
            type: "eliminar_favorito",
            payload: nombre
        });
    };

    const esFavorito = store.favoritos.includes(nombre);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                const data = await res.json();
                setDetails(data.result.properties);
            } catch (error) {
                console.error("Error fetching planet details:", error);
            }
        };
        fetchDetails();
    }, [id]);

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img
                    src={planetImage}
                    className="card-img-top"
                    alt={nombre}
                    style={{ height: "22rem", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    {details ? (
                        <ul className="card-text">
                            <li><strong>Climate:</strong> {details.climate}</li>
                            <li><strong>Terrain:</strong> {details.terrain}</li>
                            <li><strong>Population:</strong> {details.population}</li>
                            <li><strong>Diameter:</strong> {details.diameter} km</li>
                        </ul>
                    ) : (
                        <p className="card-text">Cargando datos del planeta...</p>
                    )}
                    {/* Botón de favoritos */}
                    <button onClick={esFavorito ? eliminarFavorito : agregarFavorito}>
                        {esFavorito ? "💔 Quitar de Favoritos" : "❤️ Agregar a Favoritos"}
                    </button>

                    <Link to={`/detailPlanet/${id}`}><button>More</button></Link>
                </div>
            </div>
        </div>
    );
};
