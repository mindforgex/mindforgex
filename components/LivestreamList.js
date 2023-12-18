import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Image,
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
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { PAGINATION } from "../utils/constants";
import { useGetSchedules } from "../hooks/api/useSchedule";
import { useState } from "react";

export default function LivestreamList({ channelId, isAuthor, onOpenModal }) {
  const userInfo = getUserInfo();
  const { t } = useTranslation("common");
  const [params, setParams] = useState({
    channelId: channelId,
    pageIndex: PAGINATION.PAGE_INDEX,
    pageSize: PAGINATION.PAGE_SIZE,
  });

  const { data: schedules, isLoading } = useGetSchedules(params);

  return <Section title="Livestream"></Section>;
}
