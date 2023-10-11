import { Box, Flex, Image, Link } from "@chakra-ui/react";
import classNames from "classnames";
import moment from "moment";
import { TbMoodEmpty } from 'react-icons/tb'

export default function NFTProfile({ data, className = '' }) {
  const _data = Array.isArray(data) ? data : []

  return (
    <Flex gap={24} className={classNames("products", { [className]: true })}>
      {
        _data.length === 0 ? (
          <div className="empty-msg">
            <TbMoodEmpty />
            Nothing to display
          </div>
        ) : (
          _data.map(_item => {
            const rewardData = _item.reward_data
            return (
              <Box key={_item.id}>
                <Flex gap={4}>
                  <Image
                    width={300}
                    height={384}
                    src={rewardData.image_uri || "/assets/thumbnail.png"}
                    alt=""
                    onError={(event) => {
                      event.target.src = "/assets/thumbnail.png"
                    }}
                  />
                  <div className="nk-product-cont">
                    <h3 className="nk-product-title">
                      {rewardData.name}
                    </h3>
                    <span className="">
                      Exchanged at: {moment(data.createdAt).format("DD MMM, YYYY")}
                    </span>
                  </div>
                </Flex>
              </Box>
            )
          })
        )
      }
    </Flex>
  )
}