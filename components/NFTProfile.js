import { Button, Image, Link } from "@chakra-ui/react";
import classNames from "classnames";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { TbMoodEmpty } from 'react-icons/tb'
import { getUserInfo } from "../utils/helpers";
import axios from "axios";

export default function NFTProfile({ data, className = '' }) {
  const userInfo = getUserInfo();
  const _data = Array.isArray(data) ? data : []
  const { t } = useTranslation('common');

  return (
    <ul className={classNames("products", { [className]: true })}>
      {
        _data.length === 0 ? (
          <div className="empty-msg">
            <TbMoodEmpty />
            {t('nft.no_data')}
          </div>
        ) : (
          _data.map((_item, index) => {
            return (
              <li key={`item-index-${index}`} className="product type-product status-publish first instock product_cat-pc has-post-thumbnail taxable shipping-taxable purchasable product-type-simple">
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
                    <span>{t('nft.symbol', {symbol: _item.symbol})}</span><br />
                    <span className="">
                      {t('nft.released_at', {time: moment(data.createdAt).format("DD MMM, YYYY")})}
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
