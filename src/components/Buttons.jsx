const Buttons = ({ favs, changeFavs }) => {
    return (
        <div className="buttons-wrapper">
            <button onClick={() => changeFavs(false)}>All</button>
            <button onClick={() => changeFavs(true)}>My faves</button>
        </div>
    )
}

export default Buttons;