import React from "react";
import { Flex } from "@chakra-ui/react";
import PostItem from "./PostItem";

const ChannelPost = ({
  posts,
  avatar,
  channelName,
  channelId,
  isAuthor,
  onOpenModalEdit,
  onOpenModalDelete,
}) => {
  return (
    <>
      <Flex alignContent={"center"} w={`100%`} direction={"column"} mt={4}>
        {posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            avatar={avatar}
            channelName={channelName}
            channelId={channelId}
            isAuthor={isAuthor}
            onOpenModalEdit={onOpenModalEdit}
            onOpenModalDelete={onOpenModalDelete}
          />
        ))}
      </Flex>
    </>
  );
};

export default React.memo(ChannelPost);
