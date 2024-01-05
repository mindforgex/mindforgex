import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import InputComment from "./InputComment";
import DetailComment from "./DetailComment";
import { PAGINATION } from "../../../../utils/constants";
import {
  useCreateComment,
  useGetComments,
} from "../../../../hooks/api/useComment";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { optionSuccess, optionError } from "../../../../utils/optionToast";

const Comment = ({ post }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const [commentReply, setCommentReply] = useState({
    commentParentId: null,
    tagUserId: null,
  });
  const [params, setParams] = useState({
    postId: post?._id,
    pageIndex: PAGINATION.PAGE_INDEX,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const {
    data: dataComments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useGetComments(params);
  const defaultValues = {
    comment: "",
    replyComment: "",
  };

  const { mutate: createComment, isLoading: creating } = useCreateComment({
    onSuccess: async (success) => {
      const { data } = success;
      const { commentParentId, tagUserId } = data;
      if (commentParentId && tagUserId) {
        setCommentReply({
          commentParentId: null,
          tagUserId: null,
        });
      } else {
        setValue("comment", "");
      }
      toast({
        ...optionSuccess,
        title: t("channel.comment.create_succ"),
      });
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: t("channel.comment.create_fail"),
      });
    },
  });

  const validationSchema = Yup.object().shape({
    comment: Yup.string().max(1000, t("validate.string_max_1000")),
    replyComment: Yup.string().max(1000, t("validate.string_max_1000")),
  });

  const { control, handleSubmit, watch, setValue, setError } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onComment = (data) => {
    const { comment } = data;
    createComment({
      postId: post?._id,
      content: comment,
    });
  };

  const onReplyComment = (data) => {
    const { replyComment } = data;
    createComment({
      postId: post?._id,
      content: replyComment,
      commentParentId: commentReply.commentParentId,
      tagUserId: commentReply.tagUserId,
    });
  };

  return (
    <>
      <DetailComment
        dataComments={dataComments}
        name="replyComment"
        control={control}
        setValue={setValue}
        onComment={handleSubmit(onReplyComment)}
        commentReply={commentReply}
        setCommentReply={setCommentReply}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      <InputComment
        name="comment"
        control={control}
        placeholder={t("channel.comment.add")}
        onComment={handleSubmit(onComment)}
      />
    </>
  );
};

export default React.memo(Comment);
