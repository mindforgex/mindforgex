import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Img,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import classNames from "classnames";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { TbMoodEmpty } from "react-icons/tb";
import { getUserInfo } from "../utils/helpers";
import axios from "axios";
import Section from "./Section";
import { FaCalendarAlt, FaEdit, FaPlusSquare } from "react-icons/fa";
import { PAGINATION } from "../utils/constants";
import { useGetSchedules } from "../hooks/api/useSchedule";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";

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
                s{schedule.description}asdfgasg asd asdfasdf asdas gd asdf asdf
                asfasd fa asdf asd asd
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
