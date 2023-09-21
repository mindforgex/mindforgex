import { Image, Link } from "@chakra-ui/react";
import classNames from "classnames";
import moment from "moment";

export default function NFTProfile({ data, className = '' }) {
  const _data = Array.isArray(data) ? data : []

  return (
    <ul className={classNames("products", { [className]: true })} >
      {
        _data.map(_item => {
          return (
            <li key={_item.id} className="product type-product status-publish first instock product_cat-pc has-post-thumbnail taxable shipping-taxable purchasable product-type-simple">
              <div className="nk-product-cat-2">
                <Link
                  href={window.location.href}
                  onClick={(event) => { event.preventDefault() }}
                  className="woocommerce-LoopProduct-link woocommerce-loop-product__link nk-product-image"
                >
                  <Image
                    width={300}
                    height={384}
                    src="https://wp.nkdev.info/squadforce/wp-content/uploads/2019/09/product-121-300x384.jpg"
                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                    alt=""
                  />
                </Link>
                <div className="nk-product-cont">
                  <h3 className="woocommerce-loop-product__title nk-product-title">
                    <Link
                      href={window.location.href}
                      onClick={(event) => { event.preventDefault() }}
                    >
                      {_item.name}
                    </Link>
                  </h3>
                  <p>
                    {_item.description}
                  </p>
                  <span className="h5">
                    Released at: {moment(data.releasedAt).format("DD MMM, YYYY")}
                  </span>
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>

  )
}