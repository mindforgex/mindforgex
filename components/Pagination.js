import ReactPaginate from "react-paginate";

export default function Pagination({
  pageCount,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
  pageIndex = 1
}) {
  return (
    <div className="nk-pagination nk-pagination-center">
      <nav>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageClassName="nk-pagination-item"
          previousClassName="nk-pagination-item"
          nextClassName="nk-pagination-item"
          breakLabel="..."
          breakClassName="nk-pagination-item"
          breakLinkClassName="nk-pagination-item"
          pageCount={pageCount}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={({ selected }) => onPageChange(selected)}
          containerClassName="pagination"
          activeClassName="nk-pagination-current"
          forcePage={pageIndex - 1}
        />
      </nav>
    </div>
  );
}
