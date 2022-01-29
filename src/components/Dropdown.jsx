const Dropdown = ({ changeFramework }) => {
    return (
        <div className="dropdown-wrapper">
            <select onChange={ changeFramework } >
                <option selected disabled hidden>Select your news</option>
                <option value="angular">Angular</option>
                <option value="reactjs">Reactjs</option>
                <option value="vuejs">Vuejs</option>
            </select>
        </div>
    )
}

export default Dropdown;