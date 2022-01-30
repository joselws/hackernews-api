const Buttons = ({ favs, changeFavs }) => {
    return (
        <div className="buttons-wrapper">
            <button className="fav-btn" onClick={() => changeFavs(false)}>
                <span className="btn-text">All</span>
            </button>
            <button className="fav-btn" onClick={() => changeFavs(true)}>
                <span className="btn-text">My faves</span>
            </button>
        </div>
    )
}

export default Buttons;