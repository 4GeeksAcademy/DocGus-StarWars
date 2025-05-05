import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // Hook personalizado
import peopleData from "../assets/img/people.json"; // Asegúrate que este archivo tenga personajes



export const CardPersonaje = ({ id, nombre }) => {
    const { store, dispatch } = useGlobalReducer(); 
    const [peopleImage, setPeopleImage] = useState(null)
    const [details, setDetails] = useState(null)

    const agregarFavorito = () => {
        dispatch({
            type: "agregar_favorito",
            payload: nombre
        })
    }

    const eliminarFavorito = () => {
        dispatch({
            type: "eliminar_favorito",
            payload: nombre
        })
    }

    const esFavorito = store.favoritos.includes(nombre)

    useEffect(() => {
        const img = peopleData.people.find(p => p.id === Number(id))?.image
        setPeopleImage(img)
    }, [id])

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/people/${id}`)
                const data = await res.json()
                setDetails(data.result.properties)
            } catch (error) {
                console.error("Error fetching character details:", error)
            }
        }
        fetchDetails()
    }, [id])
    useEffect(() => {
        if (peopleData && peopleData.people) {
            const img = peopleData.people.find(p => p.id === Number(id))?.image;
            setPeopleImage(img || "ruta_a_imagen_por_defecto.jpg"); // Usa una imagen por defecto si no se encuentra la imagen
        }
    }, [id, peopleData]);
    
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img
                    src={peopleImage}
                    className="card-img-top"
                    alt={nombre}
                    style={{ height: "22rem", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    {details ? (
                        <ul className="card-text">
                            <li><strong>Height:</strong> {details.height} cm</li>
                            <li><strong>Mass:</strong> {details.mass} kg</li>
                            <li><strong>Gender:</strong> {details.gender}</li>
                        </ul>
                    ) : (
                        <p className="card-text">Cargando datos del personaje...</p>
                    )}

                    <button onClick={esFavorito ? eliminarFavorito : agregarFavorito}>
                        {esFavorito ? "💔 Quitar de Favoritos" : "❤️ Agregar a Favoritos"}
                    </button>

                    <Link to={`/detalle/${id}`}><button>More</button></Link>
                </div>
            </div>
        </div>
    )
}
