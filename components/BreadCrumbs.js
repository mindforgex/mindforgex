import { Link } from "@chakra-ui/react";
import PropTypes from 'prop-types';

export default function BreadCrumbs({ root, label }) {
  return (
    <div className="container">
      <ul className="nk-breadcrumbs">
        {
          Array.isArray(root) && root.length > 0 && root.map(_item => {
            return (
              <>
                <li key={_item.label}>
                  <Link rel="v:url" href={_item.href}>
                    {_item.label}
                  </Link>
                </li>
                <li>
                  <svg
                    className="svg-inline--fa fa-angle-right"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                    ></path>
                  </svg>
                </li>
              </>
            )
          })
        }
        <li>
          <span>
            <h1>{label}</h1>
          </span>
        </li>
      </ul>
    </div>
  )
}

BreadCrumbs.propTypes = {
  label: PropTypes.string.isRequired,
  root: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }),
}