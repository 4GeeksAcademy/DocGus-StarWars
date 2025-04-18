import peopleData from "../assets/img/people.json"
export const CardPersonaje = ({id, nombre}) => {
    const peopleImage = peopleData.people.find(p => p.id === Number(id))?.image
    console.log(peopleImage, id)
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src= {peopleImage} className="card-img-top" alt={nombre} style={{height:"22rem"}} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}