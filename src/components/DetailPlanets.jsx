import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDetallePlaneta } from "../store.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import planetsData from "../assets/img/planets.json";

const DetailPlanets = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchDetallePlaneta(dispatch, id);
  }, [id, dispatch]);

  const planeta = store.detalle_planeta;

  // Buscar la imagen desde el JSON
  const planetImage = planetsData.planets.find(p => p.id === Number(id))?.image;

  if (!planeta) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{planeta.name}</h1>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={planetImage}
              alt={planeta.name}
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Diámetro:</strong> {planeta.diameter} km</li>
                <li className="list-group-item"><strong>Población:</strong> {planeta.population}</li>
                <li className="list-group-item"><strong>Clima:</strong> {planeta.climate}</li>
                <li className="list-group-item"><strong>Terreno:</strong> {planeta.terrain}</li>
                <li className="list-group-item"><strong>Rotación:</strong> {planeta.rotation_period} horas</li>
                <li className="list-group-item"><strong>Revolución:</strong> {planeta.orbital_period} días</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPlanets;
