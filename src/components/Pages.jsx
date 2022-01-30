const Pages = ({ page, pageButtons, changePage }) => {
    return (
        <div className="page-btn-wrapper">
            { pageButtons.map((pageNumber, index) =>
                <button key={ index } 
                    className="page-btn" 
                    onClick={() => changePage(pageNumber)}
                    style={ pageNumber === page ? selectedButton : {} }
                >
                    { isNaN(pageNumber) ? pageNumber : pageNumber+1 }
                </button>
            )}
        </div>
    )
}

// Turn the button blue if it's selected

const selectedColor = {
    background: '#1890FF',
    text: '#FCFCFC'
};

const selectedButton = {
    backgroundColor: selectedColor.background,     // css var selectedBtn value
    color: selectedColor.text                      // css var mainColor value
}

export default Pages;