import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  getChannel,
  subscribeChannel,
  updateAboutMe,
  updateChannel,
  updatePost,
} from "../../services";

export function useDetailChannel(channelId) {
  const res = useQuery({
    queryKey: ["detail_channel", channelId],
    queryFn: () => getChannel(channelId),
    refetchOnWindowFocus: false,
    enabled: Boolean(channelId),
  });
  return res;
}

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

export function useUpdateAboutMe({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updateAboutMe(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries("detail_channel");
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useSubscribeChannel({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await subscribeChannel(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries("detail_channel");
      onSuccess();
    },
    onError: (error) => onError(error),
  });
}

export function useDeleteChannel() {}
