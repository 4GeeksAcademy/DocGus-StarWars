import { useEffect, useState } from "react"
import peopleData from "../assets/img/people.json"
import { Link } from "react-router-dom"

export const CardPersonaje = ({ id, nombre }) => {
    const peopleImage = peopleData.people.find(p => p.id === Number(id))?.image
    const [details, setDetails] = useState(null)

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

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src={peopleImage} className="card-img-top" alt={nombre} style={{ height: "22rem" }} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    {details ? (
                        <ul className="card-text">
                            <li><strong>Height:</strong> {details.height} cm</li>
                            <li><strong>Mass:</strong> {details.mass} kg</li>
                            <li><strong>Gender:</strong> {details.gender}</li>
                        </ul>
                    ) : (
                        <p className="card-text">Loading details...</p>
                    )}
 <Link to = "/detailPerson"><button>More</button></Link>
                </div>
            </div>
        </div>
    )
}
