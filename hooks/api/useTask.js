import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "../../services";
import { KEY_GET_CHANNEL, KEY_GET_POSTS, KEY_GET_TASK, KEY_GET_TASKS } from "../../utils/constants";


export function useGetTasks(params) {
  const res = useQuery({
    queryKey: [KEY_GET_TASKS, params],
    queryFn: () => getTasks(params),
    refetchOnWindowFocus: false,
  });
  return res;
}

export function useGetTask(taskId) {
  const res = useQuery({
    queryKey: [KEY_GET_TASK, taskId],
    queryFn: () => getChannel(taskId),
    refetchOnWindowFocus: false,
    enabled: Boolean(taskId),
  });
  return res;
}

export function useCreateTask({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await createTask(payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => onError(error),
  });
}

export function useUpdateTask({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await updateTask(id, payload),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_POSTS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}

export function useDeleteTask({ id, onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => await deleteTask(id),
    onSuccess: async (success) => {
      await queryClient.invalidateQueries(KEY_GET_TASKS);
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
