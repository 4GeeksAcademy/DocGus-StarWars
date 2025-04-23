import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { fetchPersonajes, fetchPlanetas } from "../store.js";
import { CardPersonaje } from "../components/CardPersonaje.jsx";
import { CardPlaneta } from "../components/CardPlaneta.jsx"; // Asegúrate de tener este componente

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetchPersonajes(dispatch);
    fetchPlanetas(dispatch);
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Star Wars</h1>

      {/* Contenedor de personajes */}
      <h2>Personajes</h2>
      <div className="d-flex flex-row overflow-scroll">
        {store.personajes.map((personaje) => (
          <CardPersonaje
            key={personaje.uid}
            id={personaje.uid}
            nombre={personaje.name}
          />
        ))}
      </div>

      {/* Contenedor de planetas */}
      <h2 className="mt-4">Planetas</h2>
      <div className="d-flex flex-row overflow-scroll">
        {store.planetas.map((planeta) => (
          <CardPlaneta
            key={planeta.uid}
            id={planeta.uid}
            nombre={planeta.name}
          />
        ))}
      </div>
    </div>
  );
};
