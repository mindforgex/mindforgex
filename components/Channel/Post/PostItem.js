import {
  Avatar,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Task from "./Task";
import { useTranslation } from "next-i18next";
import { FaEdit, FaTasks } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const PostItem = ({
  post,
  avatar,
  channelName,
  channelId,
  isAuthor,
  onOpenModalEdit,
  onOpenModalDelete,
  onOpenModalManageTaskList
}) => {
  const { images } = post;
  const [thumbnail] = images;
  const { t } = useTranslation("common");
  return (
    <Flex
      direction={"column"}
      mt={8}
      borderBottom={2}
      borderBottomColor={"teal.500"}
      borderBottomStyle={"solid"}
      py={8}
    >
      <Heading as="h3" size="lg" mb={4}>
        {post?.title}
      </Heading>
      <Flex w={`100%`}>
        <Image
          height={800}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${thumbnail}`}
          alt={post?.title}
          title={post?.title}
        />
      </Flex>
      <Flex alignItems={"center"} my={4}>
        <Avatar src={avatar} title="avatar" />
        <Text as="span" ml={4}>
          {t("channel.post.by")}
        </Text>
        <Text as="span" ml={2} fontWeight={"bold"} color={"red"}>
          {channelName}
        </Text>
        <Text as="span" ml={2}>
          {t("channel.post.in", {
            time: moment(post.createdAt).format("MMMM D, Y"),
          })}
        </Text>
      </Flex>
      <Text
        as="p"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(/\n/g, "<br />"),
        }}
      ></Text>
      <Task post={post} channelId={channelId} />
      {isAuthor && (
        <Stack flexDirection={"row"} justifyContent={"end"}>
          <Stack justifyContent={"end"} flexDirection={"row"} mt={8}>
            <Tooltip label={`Delete post ${post?.title}`} placement="bottom">
              <IconButton
                onClick={() => onOpenModalDelete(post)}
                backgroundColor={"transparent"}
                _hover={{}}
                _active={{}}
                icon={<MdDeleteForever fontSize={"26px"} color="white" />}
              />
            </Tooltip>
          </Stack>
          <Stack justifyContent={"end"} flexDirection={"row"} mt={8}>
            <Tooltip label={`Manage the task list of post ${post?.title}`} placement="bottom">
              <IconButton
                onClick={() => onOpenModalManageTaskList(post)}
                backgroundColor={"transparent"}
                _hover={{}}
                _active={{}}
                icon={<FaTasks fontSize={"26px"} color="white" />}
              />
            </Tooltip>
          </Stack>
          <Stack justifyContent={"end"} flexDirection={"row"} mt={8}>
            <Tooltip label={`Edit post ${post?.title}`} placement="bottom">
              <IconButton
                onClick={() => onOpenModalEdit(post)}
                backgroundColor={"transparent"}
                _hover={{}}
                _active={{}}
                icon={<FaEdit fontSize={"26px"} color="white" />}
              />
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
};

export default React.memo(PostItem);
