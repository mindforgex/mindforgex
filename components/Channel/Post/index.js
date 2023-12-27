import React, { useEffect, useState } from "react";
import { Flex, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import PostItem from "./PostItem";
import { PAGINATION } from "../../../utils/constants";
import { useGetPosts } from "../../../hooks/api/usePost";
import Pagination from "../../Pagination";
import EmptyMsg from "../../EmptyMsg";
import { useTranslation } from "next-i18next";
import { FaPlusSquare } from "react-icons/fa";

const ChannelPost = ({
  // posts,
  avatar,
  channelName,
  channelId,
  isAuthor,
  onOpenModalCreate,
  onOpenModalEdit,
  onOpenModalDelete,
  onOpenModalManageTaskList,
}) => {
  const { t } = useTranslation("common");
  const [params, setParams] = useState({
    channelId: channelId,
    pageIndex: PAGINATION.PAGE_INDEX,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [posts, setPosts] = useState(null);
  const { data: dataPosts, isLoading } = useGetPosts(params);
  useEffect(() => {
    if (dataPosts) {
      setPosts(dataPosts);
    }
  }, [JSON.stringify(dataPosts)]);

  return (
    <>
      <section className="nk-decorated-h-2">
        <h3 className="px-4">{t("channel.posts")}</h3>
      </section>
      {isAuthor && (
        <Stack justifyContent={"end"} flexDirection={"row"}>
          <Tooltip label={"Create post"} placement="bottom">
            <IconButton
              onClick={onOpenModalCreate}
              backgroundColor={"transparent"}
              _hover={{}}
              _active={{}}
              icon={<FaPlusSquare fontSize={"26px"} color="white" />}
            />
          </Tooltip>
        </Stack>
      )}
      <Flex alignContent={"center"} w={`100%`} direction={"column"} mt={4}>
        {posts?.items?.length && !isLoading ? (
          <>
            {posts?.items?.map((post) => (
              <PostItem
                key={post._id + post.name}
                post={post}
                avatar={avatar}
                channelName={channelName}
                channelId={channelId}
                isAuthor={isAuthor}
                onOpenModalEdit={onOpenModalEdit}
                onOpenModalDelete={onOpenModalDelete}
                onOpenModalManageTaskList={onOpenModalManageTaskList}
              />
            ))}
            {+posts?.meta?.totalPages > 1 && (
              <Pagination
                pageCount={posts?.meta?.totalPages}
                pageIndex={posts.meta.pageIndex}
                onPageChange={(pageIndex) =>
                  setParams({ ...params, pageIndex: pageIndex + 1 })
                }
              />
            )}
          </>
        ) : (
          <EmptyMsg />
        )}
      </Flex>
    </>
  );
};

export default ChannelPost;
