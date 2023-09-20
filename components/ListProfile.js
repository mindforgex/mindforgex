import { Image, Link } from "@chakra-ui/react";
import PropTypes from 'prop-types'
import ReactPaginate from "react-paginate";

export default function ListProfile({ data, total = 100, onPageChange = () => { }, skip = 0, pageSize = 6, }) {
  const pageCount = Math.ceil(total / pageSize)

  return (
    <>
      <ul className="cyberpress-row cyberpress-row-3 cyberpress-teams-archive">
        {
          data.map(_item => {
            return (
              <li
                key={_item.name}
                className="cyberpress-col cyberpress-team post-807 team type-team status-publish has-post-thumbnail hentry"
              >
                <div className="cyberpress-team-thumbnail">
                  <Link href={_item.href}>
                    <Image
                      width={300}
                      height={300}
                      src={_item.image}
                      className="attachment-medium size-medium"
                      alt=""
                    />{" "}
                  </Link>
                </div>

                {/* .post-thumbnail */}
                <h2 className="cyberpress-team-title">
                  <Link href={_item.href}>
                    {_item.name}
                  </Link>
                </h2>
                <ul className="cyberpress-team-info">
                  {
                    _item.metadata.map((_itemMetadata) => {
                      return (
                        <li key={_itemMetadata.key}>
                          <strong>{_itemMetadata.key}</strong>:{" "}
                          {_itemMetadata.value}
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>

      <div className="nk-gap-2" />

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
            forcePage={skip}
          />
        </nav>
      </div>
    </>
  )
}

ListProfile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string,
    metadata: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }))
  })).isRequired,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  skip: PropTypes.number,
  onPageChange: PropTypes.func // pageNumber
}