import { useEffect, useState } from "react"
import planetsData from "../assets/img/planets.json"
import { Link } from "react-router-dom"

export const CardPlaneta = ({ id, nombre }) => {
    const planetImage = planetsData.planets.find(p => p.id === Number(id))?.image
    const [details, setDetails] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`https://www.swapi.tech/api/planets/${id}`)
                const data = await res.json()
                setDetails(data.result.properties)
            } catch (error) {
                console.error("Error fetching planet details:", error)
            }
        }
        fetchDetails()
    }, [id])

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src={planetImage} className="card-img-top" alt={nombre} style={{ height: "22rem" }} />
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
                <Link to = "/detailPlanet"><button>More</button></Link>

                </div>
            </div>
        </div>
    )
}
