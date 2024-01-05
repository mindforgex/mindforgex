import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPost, getPosts, react, updatePost } from "../../services";
import { KEY_GET_POST, KEY_GET_POSTS } from "../../utils/constants";

export function useGetPosts(params) {
  const res = useQuery({
    queryKey: [KEY_GET_POSTS, params],
    queryFn: () => getPosts(params),
    refetchOnWindowFocus: false,
  });
  return res;
}

export function useGetPost(postId) {
  const res = useQuery({
    queryKey: [KEY_GET_POST, postId],
    queryFn: () => getPost(postId),
    refetchOnWindowFocus: false,
    enabled: Boolean(postId),
  });
  return res;
}

export function useCreatePost({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await createPost(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => onError(error),
  });
}

export function useUpdatePost({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updatePost(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useDeletePost({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await deletePost(id),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useReact({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await react(id),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
