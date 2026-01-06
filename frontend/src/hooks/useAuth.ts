/**
 * Authentication hooks for user registration, login, and session management.
 */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import type { UserCreate, UserLogin, AuthResponse, UserRead } from "@/types/auth";

/**
 * Get current user session
 */
export function useSession() {
  return useQuery<UserRead | null>({
    queryKey: ["session"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;

      try {
        // For now, decode the token client-side to get user info
        // In a production app, you'd want a /api/v1/auth/me endpoint
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
          id: payload.sub,
          email: payload.email || "",
          created_at: new Date().toISOString(),
        };
      } catch {
        localStorage.removeItem("access_token");
        return null;
      }
    },
    staleTime: Infinity,
  });
}

/**
 * Register a new user
 */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCreate): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>(
        "/api/v1/auth/register",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("access_token", data.access_token);
      // Update session cache
      queryClient.setQueryData(["session"], data.user);
      // Redirect to tasks
      router.push("/tasks");
    },
  });
}

/**
 * Login an existing user
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserLogin): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>("/api/v1/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("access_token", data.access_token);
      // Update session cache
      queryClient.setQueryData(["session"], data.user);
      // Redirect to tasks
      router.push("/tasks");
    },
  });
}

/**
 * Logout current user
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/api/v1/auth/logout");
    },
    onSuccess: () => {
      // Clear token and session
      localStorage.removeItem("access_token");
      queryClient.setQueryData(["session"], null);
      queryClient.clear();
      // Redirect to login
      router.push("/auth/login");
    },
  });
}
