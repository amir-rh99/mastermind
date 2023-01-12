import "./celebrate.scss";

const Celebrate = () => {

    const celebItems = [...new Array(25)]
    
    return(
        <div className="celeb">
            { celebItems.map((cel, index) => <div key={`cle_${index}`} className="celeb-item"></div>) }
        </div>
    )
}

export default Celebrate;