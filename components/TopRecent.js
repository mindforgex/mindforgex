import { Image, Link } from "@chakra-ui/react";
import moment from "moment";
import PropTypes from 'prop-types'

export default function TopRecent({ data, total }) {
  return (
    <div
      id="ghostkit_reusable_widget-16"
      className="nk-widget nk-widget-highlighted ghostkit-reusable-widget"
    >
      <h4 className="nk-widget-title">
        <span>Top {total} Post</span>
      </h4>
      <div className="wp-block-visual-portfolio">
        <div
          className="vp-portfolio vp-uid-27dc1c0b vp-id-59 vp-portfolio__ready"
        >
          <div className="vp-portfolio__items-wrap">
            <div
              className="vp-portfolio__items vp-portfolio__items-style-squadforce-list"
            >
              {
                Array.isArray(data) && data.map(_item => {
                  return (
                    <article
                      key={_item.id}
                      className="vp-portfolio__item-wrap post type-post status-publish format-standard has-post-thumbnail hentry category-strategy"
                    >
                      <figure className="vp-portfolio__item">
                        <div className="nk-blog-post nk-post-widget">
                          <div className="row vertical-gap">
                            <div className="col-lg-4">
                              <Link
                                href={`/channel/${_item.channelId}`}
                                className="nk-post-img nk-widget-img"
                              >
                                <Image
                                  decoding="async"
                                  width={970}
                                  height={545}
                                  src={_item.images?.[0]}
                                  className="lazyautosizes ls-is-cached vp-lazyloaded"
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="col-lg-8">
                              <h2 className="nk-post-title h5">
                                <Link href={`/channel/${_item.channelId}`}>
                                  {_item.title}
                                </Link>
                              </h2>
                              <div className="nk-post-date">
                                <svg
                                  className="svg-inline--fa fa-calendar-days"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="calendar-days"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                                  ></path>
                                </svg>
                                &nbsp;{moment(_item.createdAt).format("DD MMM, YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </figure>
                    </article>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TopRecent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
  total: PropTypes.number.isRequired,
}