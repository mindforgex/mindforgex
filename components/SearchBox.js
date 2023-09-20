import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBox() {
  return (
    <div
      id="search-4"
      className="nk-widget nk-widget-highlighted widget_search"
    >
      <form
        className="nk-form nk-form-style-1"
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control required"
            name="s"
            placeholder="Search..."
          />
          <button className="nk-btn nk-btn-color-main-1">
            <AiOutlineSearch />
          </button>
        </div>
      </form>
    </div>

  )
}