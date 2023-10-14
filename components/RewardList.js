import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import moment from "moment";
import EmptyMsg from './EmptyMsg'
import { useTranslation } from "next-i18next";

export default function NFTProfile({ data, className = '' }) {
  const _data = Array.isArray(data) ? data : []
  const { t } = useTranslation()

  return (
    <>
      {
        _data.length === 0 ? (
          <EmptyMsg />
        ) : (
          <Grid
            templateColumns={'repeat(12, 1fr)'}
            templateRows={'repeat(4, 1fr)'}
            gap={6}
          >
            {
              _data.map(_item => {
                const rewardData = _item.reward_data
                return (
                  <GridItem key={_item._id} colSpan={3} rowSpan={1}>
                    <Box
                      key={_item.id}
                      direction="column"
                      alignItems="center"
                      py={5}
                      px={5}
                      bgColor={'var(--cbp-color-background)'}
                      boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
                      transition="all 0.3s ease-in-out"
                      mb="40px"
                      overflow="hidden"
                      borderRadius="20"
                      _hover={{
                        '&>*': { opacity: 1 },
                        transform: 'translateY(-10px)',
                        transition: 'all 0.4s ease',
                      }}
                      role="group"
                      css={{ webkitFilter: 'grayscale(0%)' }}
                    >
                      <Flex gap={4} direction={'column'}>
                        <Image
                          width={300}
                          height={384}
                          src={rewardData?.image_uri || "/assets/thumbnail.png"}
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
                            {t('inventory.exchanged_at')}: {moment(data.createdAt).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </Flex>
                    </Box>
                  </GridItem>
                )
              })
            }
          </Grid>
        )
      }
    </>
  )
}
