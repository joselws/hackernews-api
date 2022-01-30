const Pages = ({ pageButtons, changePage }) => {
    return (
        <div className="page-btn-wrapper">
            { pageButtons.map((pageNumber, index) =>
                <button key={ index } className="page-btn" onClick={() => changePage(pageNumber)}>
                    { isNaN(pageNumber) ? pageNumber : pageNumber+1 }
                </button>
            )}
        </div>
    )
}

export default Pages;