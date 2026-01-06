/**
 * Task management hooks for CRUD operations.
 */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import type { TaskRead, TaskCreate, TaskUpdate } from "@/types/task";

/**
 * Get all tasks for current user
 */
export function useTasks() {
  return useQuery<TaskRead[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get<TaskRead[]>("/api/v1/tasks");
      return response.data;
    },
  });
}

/**
 * Create a new task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskCreate): Promise<TaskRead> => {
      const response = await apiClient.post<TaskRead>("/api/v1/tasks", data);
      return response.data;
    },
    onSuccess: () => {
      // Refetch tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

/**
 * Update a task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TaskUpdate;
    }): Promise<TaskRead> => {
      const response = await apiClient.put<TaskRead>(
        `/api/v1/tasks/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Refetch tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

/**
 * Delete a task
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/api/v1/tasks/${id}`);
    },
    onSuccess: () => {
      // Refetch tasks list
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

/**
 * Toggle task completion status
 */
export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskRead): Promise<TaskRead> => {
      const response = await apiClient.put<TaskRead>(
        `/api/v1/tasks/${task.id}`,
        { completed: !task.completed }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
