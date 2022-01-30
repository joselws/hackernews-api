const Buttons = ({ favs, changeFavs }) => {
    return (
        <div className="buttons-wrapper">
            <button className="fav-btn" 
                style={ favs === false ? { border: '1px solid #1890FF' } : {} } 
                onClick={() => changeFavs(false)}
            >
                <span className="btn-text" style={ favs === false ? { color: '#1890FF' } : {} }>All</span>
            </button>
            
            <button className="fav-btn" 
                onClick={() => changeFavs(true)}
                style={ favs === true ? { border: '1px solid #1890FF' } : {} } 
            >
                <span style={ favs === true ? { color: '#1890FF' } : {} } className="btn-text">My faves</span>
            </button>
        </div>
    )
}

// Turn blue when the button is clicked

const selectedColor = {
    text: '#1890FF',
    border: '1px solid #1890FF'
};

const selectedButton = {                               
    color: selectedColor.text,                         
    border: selectedColor.border
}

export default Buttons;