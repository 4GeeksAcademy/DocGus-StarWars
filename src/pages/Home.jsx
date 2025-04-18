import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { fechtPersonajes } from "../store.js";
import { CardPersonaje } from "../components/CardPersonaje.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
useEffect(()=>{
fechtPersonajes(dispatch)
},[])
	return (
		<div className="text-center mt-5">
			<h1>Star Wars</h1>
			<div className="d-flex flex-row overflow-scroll">
			{store.personajes.map((personaje)=>(
				// <p>{personaje.name}</p>
				<CardPersonaje
				key={personaje.uid}
				id={personaje.uid}
				nombre={personaje.name}
				/>
			))}
			</div>
		</div>
	);
}; 