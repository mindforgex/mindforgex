import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import PostItem from "./PostItem";
import { PAGINATION } from "../../../utils/constants";
import { useGetPosts } from "../../../hooks/api/usePost";
import Pagination from "../../Pagination";

const ChannelPost = ({
  // posts,
  avatar,
  channelName,
  channelId,
  isAuthor,
  onOpenModalEdit,
  onOpenModalDelete,
}) => {
  const [params, setParams] = useState({
    channelId: channelId,
    pageIndex: PAGINATION.PAGE_INDEX,
    pageSize: PAGINATION.PAGE_SIZE,
  });

  const { data: posts, isLoading } = useGetPosts(params);
  console.log("postspostsposts", posts)
  return (
    <>
      <Flex alignContent={"center"} w={`100%`} direction={"column"} mt={4}>
        {posts?.items?.map((post) => (
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
      <Pagination
        pageCount={posts?.meta?.totalPages}
        onPageChange={(pageIndex) =>
          setParams({ ...params, pageIndex: pageIndex + 1 })
        }
      />
    </>
  );
};

export default React.memo(ChannelPost);
