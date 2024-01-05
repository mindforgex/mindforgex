import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import InputComment from "./InputComment";
import moment from "moment";
import { useTranslation } from "next-i18next";

const TYPE_REPLY_COMMENT = {
  COMMENT: "COMMENT",
  COMMENT_CHILD: "COMMENT_CHILD",
};
const DetailComment = ({
  dataComments,
  name,
  control,
  setValue,
  onComment,
  commentReply,
  setCommentReply,
  hasNextPage,
  fetchNextPage,
}) => {
  const ref = useRef();
  const { t } = useTranslation("common");
  const [tagWallet, setTagWallet] = useState("");
  const actionReplyComment = ({ comment, commentChild, type }) => {
    setCommentReply({
      commentParentId: comment._id,
      tagUserId: TYPE_REPLY_COMMENT.COMMENT
        ? comment.userId._id
        : commentChild.userId._id,
    });
    {
      `${comment.userId.walletAddress.slice(
        0,
        7
      )}...${comment.userId.walletAddress.slice(-4)}`;
    }

    const tagWallet =
      type === TYPE_REPLY_COMMENT.COMMENT
        ? `@${comment.userId.walletAddress.slice(
            0,
            7
          )}...${comment.userId.walletAddress.slice(-4)} `
        : `@${commentChild.userId.walletAddress.slice(
            0,
            7
          )}...${commentChild.userId.walletAddress.slice(-4)} `;

    setTagWallet(tagWallet);
    setValue(name, tagWallet);
    setTimeout(() => {
      ref.current.focus();
    });
  };

  return (
    <>
      {dataComments?.pages.map((page) => (
        <React.Fragment key={page.nextId}>
          {page?.items?.map((comment) => (
            <Flex my={4} columnGap={2}>
              <Avatar src={""} title="avatar" />
              <Box width={"100%"}>
                <Text m={0} color={"white"} fontWeight={"semibold"}>
                  {`${comment.userId.walletAddress.slice(
                    0,
                    7
                  )}...${comment.userId.walletAddress.slice(-4)}`}
                </Text>
                <Text m={0}>{moment(comment.createdAt).fromNow()}</Text>
                <Text mt={3} mb={2} fontWeight={"light"}>
                  {comment.content}
                </Text>
                <Flex columnGap={2} mb={4}>
                  <Button
                    variant="link"
                    color={"#a0a7ab"}
                    onClick={() =>
                      actionReplyComment({
                        comment,
                        commentChild: null,
                        type: TYPE_REPLY_COMMENT.COMMENT,
                      })
                    }
                    _hover={{ transform: "unset", textDecoration: "underline" }}
                  >
                    {t("channel.comment.reply")}
                  </Button>
                </Flex>
                {comment?.childComments?.map((commentChild) => (
                  <Flex my={4} columnGap={2}>
                    <Avatar src={""} title="avatar" />
                    <Box width={"100%"}>
                      <Text m={0} color={"white"} fontWeight={"semibold"}>
                        {`${comment.userId.walletAddress.slice(
                          0,
                          7
                        )}...${comment.userId.walletAddress.slice(-4)}`}
                      </Text>
                      <Text m={0}>{moment(comment.createdAt).fromNow()}</Text>
                      <Text mt={3} mb={2} fontWeight={"light"}>
                        {commentChild.content}
                      </Text>
                      <Button
                        variant="link"
                        color={"#a0a7ab"}
                        onClick={() =>
                          actionReplyComment({
                            comment,
                            commentChild,
                            type: TYPE_REPLY_COMMENT.COMMENT_CHILD,
                          })
                        }
                        _hover={{
                          transform: "unset",
                          textDecoration: "underline",
                        }}
                      >
                        {t("channel.comment.reply")}
                      </Button>
                    </Box>
                  </Flex>
                ))}
                {commentReply.commentParentId === comment?._id && (
                  <InputComment
                    name={name}
                    control={control}
                    placeholder={t("channel.comment.add")}
                    ref={ref}
                    onComment={onComment}
                    tagWallet={tagWallet}
                  />
                )}
              </Box>
            </Flex>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <Button
          variant="link"
          color={"#a0a7ab"}
          onClick={() => {
            console.log(123);
            fetchNextPage();
          }}
          width={"fit-content"}
          mb={6}
          _hover={{ transform: "unset", textDecoration: "underline" }}
        >
          View more comments
        </Button>
      )}
    </>
  );
};

export default React.memo(DetailComment);
