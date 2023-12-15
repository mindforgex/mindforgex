import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, updatePost } from "../../services";

export function useCreatePost({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await createPost(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries("detail_channel");
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
      await queryClient.invalidateQueries("detail_channel");
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
      await queryClient.invalidateQueries("detail_channel");
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
