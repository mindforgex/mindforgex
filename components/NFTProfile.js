import { Image, Link } from "@chakra-ui/react";
import classNames from "classnames";
import moment from "moment";
import { TbMoodEmpty } from 'react-icons/tb'

export default function NFTProfile({ data, className = '' }) {
  const _data = Array.isArray(data) ? data : []

  return (
    <ul className={classNames("products", { [className]: true })}>
      {
        _data.length === 0 ? (
          <div className="empty-msg">
            <TbMoodEmpty />
            Nothing to display
          </div>
        ) : (
          _data.map(_item => {
            return (
              <li key={_item.id} className="product type-product status-publish first instock product_cat-pc has-post-thumbnail taxable shipping-taxable purchasable product-type-simple">
                <div className="nk-product-cat-2">
                  <Link
                    href={_item.external_url}
                    target="_blank"
                    className="woocommerce-LoopProduct-link woocommerce-loop-product__link nk-product-image"
                  >
                    <Image
                      width={300}
                      height={384}
                      src={_item.image || "/assets/thumbnail.png"}
                      className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                      alt=""
                      onError={(event) => {
                        event.target.src = "/assets/thumbnail.png"
                      }}
                    />
                  </Link>
                  <div className="nk-product-cont">
                    <h3 className="woocommerce-loop-product__title nk-product-title">
                      <Link
                        href={_item.external_url}
                        target="_blank"
                      >
                        {_item.name}
                      </Link>
                    </h3>
                    <p
                      className="nft-desc"
                      dangerouslySetInnerHTML={{
                        __html: _item?.description?.replace(/\n/g, '<br />')
                      }}
                    />
                    <span>Symbol: {_item.symbol}</span><br />
                    <span className="">
                      Released at: {moment(data.createdAt).format("DD MMM, YYYY")}
                    </span>
                  </div>
                </div>
              </li>
            )
          })
        )
      }
    </ul>

  )
}
