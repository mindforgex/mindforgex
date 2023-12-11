import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannel } from "../../services";

export function useDetailChannel() {}

export function useCreateChannel({ onSuccess, onError }) {
  return useMutation({
    mutationFn: async (payload) => await createChannel(payload),
    onSuccess: async (success) => onSuccess(success),
    onError: (error) => onError(error),
  });
}

export function useUpdateChannel() {}

export function useDeleteChannel() {}
