import PageBtn from './PageBtn';

const Pages = ({ pageButtons, changePage }) => {
    return (
        <div className="page-btn-wrapper">
            { pageButtons.map((pageNumber, index) =>
                <PageBtn key={ index } changePage={ changePage } pageNumber={ pageNumber } />
            )}
        </div>
    )
}

export default Pages;