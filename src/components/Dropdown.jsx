const Dropdown = ({ changeFramework }) => {
    return (
        <div className="dropdown-wrapper">
            <button className="dropdown-btn">
                Select your news
            </button>
            <div className="dropdown-content">
                <p className="dropdown-option" onClick={() => { changeFramework('angular') }}>Angular</p>
                <p className="dropdown-option" onClick={() => { changeFramework('reactjs') }}>Reactjs</p>
                <p className="dropdown-option" onClick={() => { changeFramework('vuejs') }}>Vuejs</p>
            </div>
        </div>
    )
}

export default Dropdown;