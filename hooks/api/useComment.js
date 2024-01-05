import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../../services";
import { KEY_GET_COMMENT, KEY_GET_COMMENTS } from "../../utils/constants";

export function useGetComments(params) {
  const res = useInfiniteQuery({
    queryKey: [KEY_GET_COMMENTS, params],
    queryFn: ({ pageParam }) =>
      getComments({ ...params, pageIndex: pageParam }),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const { meta } = lastPage;
      const { hasNextPage, pageIndex } = meta;
      if (hasNextPage) return pageIndex + 1;
      return undefined;
    },
  });
  return res;
}

export function useGetComment(commentId) {
  const res = useQuery({
    queryKey: [KEY_GET_COMMENT, commentId],
    queryFn: () => getComment(commentId),
    refetchOnWindowFocus: false,
    enabled: Boolean(commentId),
  });
  return res;
}

export function useCreateComment({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await createComment(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_COMMENTS);
      onSuccess(success);
    },
    onError: (error) => onError(error),
  });
}

export function useUpdateComment({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updateComment(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_COMMENTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useDeleteComment({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await deleteComment(id),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_COMMENTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
