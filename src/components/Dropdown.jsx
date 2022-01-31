import selectIcon from '../icons/select-icon.png';
import angular from '../icons/angular.png';
import reactjs from '../icons/reactjs.png';
import vuejs from '../icons/vuejs.png';


const Dropdown = ({ changeFramework }) => {
    return (
        <div className="dropdown-wrapper">
            <button className="dropdown-btn">
                Select your news<img className="dropdown-icon" src={selectIcon} alt="Dropdown arrow icon" />
            </button>

            <div className="dropdown-content">
                <div className="dropdown-option" onClick={() => { changeFramework('angular') }}>
                    <div className="flex-container">
                        <img className="framework-img" src={angular} alt="Angular icon" />
                        <p className="option-text">Angular</p>
                    </div>
                </div>

                <div className="dropdown-option" onClick={() => { changeFramework('reactjs') }}>
                    <div className="flex-container">
                        <img className="framework-img" src={reactjs} alt="React icon" />
                        <p className="option-text">Reactjs</p>
                    </div>
                </div>

                <div className="dropdown-option" onClick={() => { changeFramework('vuejs') }}>
                    <div className="flex-container">
                        <img className="framework-img" src={vuejs} alt="Vue icon" />
                        <p className="option-text">Vuejs</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;