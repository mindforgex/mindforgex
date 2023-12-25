import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  updateSchedule,
} from "../../services";
import { KEY_GET_SCHEDULE, KEY_GET_SCHEDULES } from "../../utils/constants";

export function useGetSchedules(params) {
  const res = useQuery({
    queryKey: [KEY_GET_SCHEDULES, params],
    queryFn: () => getSchedules(params),
    refetchOnWindowFocus: false,
  });
  return res;
}

export function useGetSchedule(scheduleId) {
  const res = useQuery({
    queryKey: [KEY_GET_SCHEDULE, scheduleId],
    queryFn: () => getChannel(scheduleId),
    refetchOnWindowFocus: false,
    enabled: Boolean(scheduleId),
  });
  return res;
}

export function useCreateSchedule({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await createSchedule(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_SCHEDULES);
      onSuccess();
    },
    onError: (error) => onError(error),
  });
}

export function useUpdateSchedule({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updateSchedule(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_SCHEDULES);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useDeleteSchedule({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await deleteSchedule(id),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_SCHEDULES);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
