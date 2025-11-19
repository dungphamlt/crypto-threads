import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/posts-service";
import type { Post, PostListParams, PostListResponse } from "@/types";

export const postsQueryKeys = {
  all: ["posts"] as const,
  lists: () => [...postsQueryKeys.all, "list"] as const,
  list: (params: PostListParams) =>
    [...postsQueryKeys.lists(), params] as const,
  featured: () => [...postsQueryKeys.all, "featured"] as const,
  latest: (limit?: number) => [...postsQueryKeys.all, "latest", limit] as const,
  byCategory: (category: string, limit?: number) =>
    [...postsQueryKeys.all, "category", category, limit] as const,
  bySlug: (slug: string) => [...postsQueryKeys.all, "slug", slug] as const,
};

export function usePosts(params: PostListParams = {}) {
  return useQuery<PostListResponse, Error>({
    queryKey: postsQueryKeys.list(params),
    queryFn: () => postService.getPosts(params),
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedPosts(limit: number = 5) {
  return useQuery<Post[], Error>({
    queryKey: postsQueryKeys.featured(),
    queryFn: () => postService.getFeaturedPosts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useLatestPosts(limit: number = 12) {
  return useQuery<Post[], Error>({
    queryKey: postsQueryKeys.latest(limit),
    queryFn: () => postService.getLatestPosts(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePostsByCategory(categoryKey: string, limit: number = 10) {
  return useQuery<Post[], Error>({
    queryKey: postsQueryKeys.byCategory(categoryKey, limit),
    queryFn: () => postService.getPostsByCategory(categoryKey, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

