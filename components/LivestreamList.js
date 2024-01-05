import { Box, Flex, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { getUserInfo } from "../utils/helpers";
import Section from "./Section";
import { FaCalendarAlt, FaEdit, FaPlusSquare } from "react-icons/fa";
import { PAGINATION } from "../utils/constants";
import { useGetSchedules } from "../hooks/api/useSchedule";
import { useState } from "react";
import Pagination from "./Pagination";
import EmptyMsg from "./EmptyMsg";

export default function LivestreamList({ channelId, isAuthor, onOpenModal }) {
  const userInfo = getUserInfo();
  const { t } = useTranslation("common");
  const [params, setParams] = useState({
    channelId: channelId,
    pageIndex: PAGINATION.PAGE_INDEX,
    pageSize: PAGINATION.PAGE_SIZE - 6,
  });

  const { data: schedules, isLoading } = useGetSchedules(params);

  return (
    <Section title="Livestream">
      {schedules?.items?.length && !isLoading ? (
        <>
          {schedules?.items.map((schedule) => (
            <Flex justifyContent={"space-between"} mb={4}>
              <Flex columnGap={2}>
                <Box w={"100px"} height={"100px"} minW={"100px"} minH={"100px"}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${schedule.cover}`}
                    alt=""
                    boxSize="100px"
                    objectFit="cover"
                  />
                </Box>
                <Box>
                  <Text
                    m={0}
                    color={"#fff"}
                    textTransform={"uppercase"}
                    noOfLines={2}
                  >
                    {schedule.title}
                  </Text>
                  <Text m={0} textTransform={"capitalize"} noOfLines={3}>
                    {schedule.description}
                  </Text>
                  <Flex alignItems={"center"} columnGap={2}>
                    <FaCalendarAlt />
                    <Text m={0}>
                      {moment(schedule.date).format("HH:mm DD MMM, YYYY")}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              {isAuthor && (
                <Stack justifyContent={"end"} flexDirection={"row"}>
                  <Tooltip label={"Edit channel"} placement="bottom">
                    <IconButton
                      onClick={() => onOpenModal(schedule)}
                      backgroundColor={"transparent"}
                      _hover={{}}
                      _active={{}}
                      icon={<FaEdit fontSize={"26px"} color="white" />}
                    />
                  </Tooltip>
                </Stack>
              )}
            </Flex>
          ))}
        </>
      ) : (
        <EmptyMsg />
      )}
      <Pagination
        pageCount={schedules?.meta?.totalPages}
        onPageChange={(pageIndex) =>
          setParams({ ...params, pageIndex: pageIndex + 1 })
        }
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
      />
      {isAuthor && (
        <Stack alignItems={"flex-start"}>
          <Tooltip label={"Edit channel"} placement="bottom">
            <IconButton
              onClick={() => onOpenModal(null)}
              backgroundColor={"transparent"}
              _hover={{}}
              _active={{}}
              icon={<FaPlusSquare fontSize={"26px"} color="white" />}
            />
          </Tooltip>
        </Stack>
      )}
    </Section>
  );
}
