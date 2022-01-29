const PageBtn = ({ pageNumber, changePage }) => {
    return (
        <button className="page-btn" onClick={() => changePage(pageNumber)}>
            { isNaN(pageNumber) ? pageNumber : pageNumber+1 }
        </button>
    )
}

export default PageBtn;