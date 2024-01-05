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
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import Task from "./Task";
import { useTranslation } from "next-i18next";
import {
  FaCommentAlt,
  FaEdit,
  FaHeart,
  FaShare,
  FaTasks,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Comment from "./Comment";
import { useReact } from "../../../hooks/api/usePost";
import { useWallet } from "@solana/wallet-adapter-react";
import { numberFormatter } from "../../../utils/helpers";

const PostItem = ({
  post,
  avatar,
  channelName,
  channelId,
  isAuthor,
  onOpenModalEdit,
  onOpenModalDelete,
  onOpenModalManageTaskList,
}) => {
  const { images, amountReact, userAddressReact, amountComment, amountShare } =
    post;
  const [thumbnail] = images;
  const { t } = useTranslation("common");
  const toast = useToast();
  const [viewComment, setViewComment] = useState(false);
  const { publicKey } = useWallet();
  const { mutate: reactPost, isLoading } = useReact({
    id: post?._id,
    onSuccess: async (success) => {},
    onError: (error) => {},
  });
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
      <Stack
        direction="row"
        spacing={4}
        justifyContent={"space-between"}
        h={10}
      >
        <Button
          leftIcon={
            <FaHeart
              color={
                userAddressReact?.includes(publicKey.toString())
                  ? "red"
                  : "white"
              }
            />
          }
          isLoading={isLoading}
          variant="link"
          onClick={() => reactPost()}
          _hover={{
            transform: "unset",
            textDecoration: "underline",
          }}
        >
          {numberFormatter(amountReact || 0)}
        </Button>
        <Button
          leftIcon={<FaCommentAlt color="white" />}
          variant="link"
          loadingText="1K Comment"
          onClick={() => setViewComment(!viewComment)}
          _hover={{
            transform: "unset",
            textDecoration: "underline",
          }}
        >
          {numberFormatter(amountComment || 0)} {t("channel.comment.title")}
        </Button>
        <Button
          leftIcon={<FaShare color="white" />}
          variant="link"
          _hover={{
            transform: "unset",
            textDecoration: "underline",
          }}
        >
          {numberFormatter(amountShare || 0)} {t("channel.comment.shares")}
        </Button>
      </Stack>
      {viewComment && <Comment post={post} />}
      <Task post={post} channelId={channelId} />
      {isAuthor && (
        <Stack flexDirection={"row"} justifyContent={"end"}>
          <Stack justifyContent={"end"} flexDirection={"row"} mt={8}>
            <Tooltip
              label={t("channel.post.delete_post", { post: post?.title })}
              placement="bottom"
            >
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
            <Tooltip
              label={t("channel.task.manage_list_of", { post: post?.title })}
              placement="bottom"
            >
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
            <Tooltip
              label={t("channel.post.edit_post", { post: post?.title })}
              placement="bottom"
            >
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
