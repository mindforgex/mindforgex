import ReactPaginate from "react-paginate";

export default function Pagination({ pageCount, onPageChange }) {
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
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={({ selected }) => onPageChange(selected)}
          containerClassName="pagination"
          activeClassName="nk-pagination-current"
        />
      </nav>
    </div>
  )
}