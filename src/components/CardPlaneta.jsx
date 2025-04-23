import planetsData from "../assets/img/planets.json"

export const CardPlaneta = ({id, nombre}) => {
    const planetImage = planetsData.planets.find(p => p.id === Number(id))?.image
    console.log(planetImage, id)

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src={planetImage} className="card-img-top" alt={nombre} style={{height:"22rem"}} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">Información interesante sobre el planeta. 🌍</p>
                    <a href="#" className="btn btn-success">Explorar</a>
                </div>
            </div>
        </div>
    )
}
