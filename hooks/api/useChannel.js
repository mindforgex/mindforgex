import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChannel,
  getChannel,
  getChannels,
  subscribeChannel,
  updateAboutMe,
  updateChannel,
} from "../../services";
import { KEY_GET_CHANNEL, KEY_GET_CHANNELS } from "../../utils/constants";

export function useChannels(params, enabled) {
  const res = useQuery({
    queryKey: [KEY_GET_CHANNELS, params],
    queryFn: () => getChannels(params),
    refetchOnWindowFocus: false,
    enabled,
  });
  return res;
}

export function useChannel(channelId) {
  const res = useQuery({
    queryKey: [KEY_GET_CHANNEL, channelId],
    queryFn: () => getChannel(channelId),
    refetchOnWindowFocus: false,
    enabled: Boolean(channelId),
  });
  return res;
}

export function useCreateChannel({ onSuccess, onError }) {
  return useMutation({
    mutationFn: async (payload) => await createChannel(payload),
    onSuccess: async (success) => onSuccess(success),
    onError: (error) => onError(error),
  });
}

export function useUpdateChannel({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updateChannel(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_CHANNEL);
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
      await queryClient.invalidateQueries(KEY_GET_CHANNEL);
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
      await queryClient.invalidateQueries(KEY_GET_CHANNEL);
      onSuccess();
    },
    onError: (error) => onError(error),
  });
}

export function useDeleteChannel() {}
