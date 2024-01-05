import {
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { numberFormatter } from "../utils/helpers";
import { useTranslation } from "next-i18next";
import { useAppRedireact } from "../utils/hook";
import EmptyMsg from "./EmptyMsg";
import Pagination from "./Pagination";

export const ProfileInfo = ({ metadata }) => {
  return (
    <li key={metadata.key}>
      <strong>{metadata.key}</strong>: {metadata.value}
    </li>
  );
};

export default function ListProfile({
  isLoading,
  data,
  meta,
  pageParams,
  setPageParams,
  total = 100,
  onPageChange = () => {},
  pageSize = 6,
}) {
  const { t } = useTranslation("common");
  const [generateRouter] = useAppRedireact();
  return (
    <>
      {isLoading ? (
        <Flex justifyContent={"center"} alignItems={"center"} height={"360px"}>
          <Spinner size="xl" color="white" />
        </Flex>
      ) : (
        <>
          {data.length ? (
            <>
              <Grid
                templateColumns={"repeat(12, 1fr)"}
                templateRows={"repeat(2, 1fr)"}
                rowGap={1}
                columnGap={4}
              >
                {data?.map((_item) => {
                  return (
                    <GridItem
                      key={_item._id}
                      colSpan={{ base: 12, sm: 12, md: 6, xl: 4 }}
                      rowSpan={1}
                    >
                      <Flex
                        key={_item.channelName}
                        direction={"column"}
                        py={5}
                        px={5}
                        bgColor={"var(--cbp-color-background)"}
                        boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
                        transition="all 0.3s ease-in-out"
                        mb="18px"
                        overflow="hidden"
                        borderRadius="20"
                        _hover={{
                          "&>*": { opacity: 1 },
                          transform: "translateY(-10px)",
                          transition: "all 0.4s ease",
                        }}
                        role="group"
                        css={{ webkitFilter: "grayscale(0%)" }}
                        alignItems={"stretch"}
                        minHeight={"480px"}
                      >
                        <div className="cyberpress-team-thumbnail">
                          <Link href={generateRouter(`channel/${_item._id}`)}>
                            <Image
                              width={300}
                              height={300}
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${_item.avatarUrl}`}
                              className="attachment-medium size-medium"
                              alt=""
                            />{" "}
                          </Link>
                        </div>

                        {/* .post-thumbnail */}
                        <Text
                          as={"h4"}
                          textAlign={"left"}
                          w={"100%"}
                          mt={2}
                          fontSize={"1.2rem"}
                        >
                          <Link href={generateRouter(`channel/${_item._id}`)}>
                            {_item.channelName}
                          </Link>
                        </Text>
                        <ul className="cyberpress-team-info">
                          <ProfileInfo
                            metadata={{
                              key: t("channel.country"),
                              value: _item?.country?.name,
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.founded"),
                              value: _item?.founded,
                            }}
                          />
                          {/* <ProfileInfo metadata={{ key: "Main Game", value: _item?.mainGame }} /> */}
                          <ProfileInfo
                            metadata={{
                              key: t("channel.followers"),
                              value: numberFormatter(_item?.follower || 0),
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.youtube_followers"),
                              value: numberFormatter(
                                _item?.followerYoutube || 0
                              ),
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.twitch_followers"),
                              value: numberFormatter(
                                _item?.followerTwitter || 0
                              ),
                            }}
                          />
                        </ul>
                      </Flex>
                    </GridItem>
                  );
                })}
              </Grid>
              <div className="nk-gap-2" />
              {+meta?.totalPages > 1 && (
                <Pagination
                  pageCount={meta.totalPages}
                  onPageChange={(pageIndex) =>
                    setPageParams({ ...pageParams, pageIndex: pageIndex + 1 })
                  }
                  pageIndex={meta.pageIndex}
                />
              )}
            </>
          ) : (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height={"360px"}
            >
              <EmptyMsg />
            </Flex>
          )}
        </>
      )}
    </>
  );
}

ListProfile.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      href: PropTypes.string,
      metadata: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func, // pageNumber
};
