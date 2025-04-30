import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDetallePersonaje } from "../store.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // ¡Te falta este import!

const DetailPerson = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer(); // <-- Aquí obtienes dispatch desde tu contexto

  useEffect(() => {
    fetchDetallePersonaje(dispatch, id);
  }, [id, dispatch]); // Es buena práctica incluir dispatch como dependencia también

  const personaje = store.detalle_personaje;

  if (!personaje) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{personaje.name}</h1>
      <ul className="list-group">
        <li className="list-group-item"><strong>Altura:</strong> {personaje.height} cm</li>
        <li className="list-group-item"><strong>Peso:</strong> {personaje.mass} kg</li>
        <li className="list-group-item"><strong>Color de pelo:</strong> {personaje.hair_color}</li>
        <li className="list-group-item"><strong>Color de piel:</strong> {personaje.skin_color}</li>
        <li className="list-group-item"><strong>Color de ojos:</strong> {personaje.eye_color}</li>
        <li className="list-group-item"><strong>Año de nacimiento:</strong> {personaje.birth_year}</li>
        <li className="list-group-item"><strong>Género:</strong> {personaje.gender}</li>
      </ul>
    </div>
  );
};

export default DetailPerson;
