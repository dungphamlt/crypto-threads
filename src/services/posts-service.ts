import { Post, POST_STATUS, PostListParams, PostListResponse } from "@/types";
import { get } from "./api";

const cacheConfig = {
  featured: { next: { revalidate: 300 } },
  latest: { next: { revalidate: 600 } },
  detail: { next: { revalidate: 3600 } },
  category: { next: { revalidate: 900 } },
};

export const postService = {
  getPosts: async (params: PostListParams = {}): Promise<PostListResponse> => {
    const defaultParams = {
      page: 1,
      pageSize: 10,
      status: POST_STATUS.PUBLISHED,
      ...params,
    };

    const urlParams = new URLSearchParams();

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        urlParams.append(key, String(value));
      }
    });

    const response = await get<PostListResponse>(
      `/content-management/articles?${urlParams.toString()}`,
      cacheConfig.latest
    );

    console.log("getPosts response", response);
    if (response.data) {
      if (
        typeof response.data === "object" &&
        "data" in response.data &&
        "pagination" in response.data
      ) {
        return response.data as PostListResponse;
      }
      if (Array.isArray(response.data)) {
        const dataArray = response.data as Post[];
        return {
          data: dataArray,
          pagination: {
            currentPage: Number(defaultParams.page) || 1,
            pageSize: Number(defaultParams.pageSize) || 10,
            totalItems: dataArray.length,
            totalPages: 1,
          },
        };
      }
    }

    if (
      (response as unknown as PostListResponse).data &&
      Array.isArray((response as unknown as PostListResponse).data) &&
      (response as unknown as PostListResponse).pagination
    ) {
      return response as unknown as PostListResponse;
    }

    return {
      data: [],
      pagination: {
        currentPage: Number(defaultParams.page) || 1,
        pageSize: Number(defaultParams.pageSize) || 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  },

  getFeaturedPosts: async (limit: number = 5): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}`,
      cacheConfig.featured
    );

    if (response.data) {
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    }

    if (Array.isArray((response as unknown as PostListResponse).data)) {
      return response as unknown as Post[];
    }

    return [];
  },

  getLatestPosts: async (limit: number = 12): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}`,
      cacheConfig.latest
    );

    // Case 1: response.data is PostListResponse object
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      "pagination" in response.data
    ) {
      return (response.data as PostListResponse).data;
    }

    // Case 2: response.data is array directly
    if (response.data && Array.isArray(response.data)) {
      return response.data as Post[];
    }

    // Case 3: response itself is PostListResponse (direct return from API)
    if (
      (response as unknown as PostListResponse).data &&
      Array.isArray((response as unknown as PostListResponse).data) &&
      (response as unknown as PostListResponse).pagination
    ) {
      return response as unknown as Post[];
    }

    return [];
  },

  getPostsByCategory: async (
    categoryKey: string,
    limit: number = 10
  ): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?category=${categoryKey}&page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}`,
      cacheConfig.category
    );

    // Case 3: response.data is PostListResponse object
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      "pagination" in response.data
    ) {
      return (response.data as PostListResponse).data;
    }

    // Case 4: response.data is array directly
    if (response.data && Array.isArray(response.data)) {
      return response.data as Post[];
    }

    // Case 5: response itself is PostListResponse
    if (
      (response as unknown as PostListResponse).data &&
      Array.isArray((response as unknown as PostListResponse).data) &&
      (response as unknown as PostListResponse).pagination
    ) {
      return response as unknown as Post[];
    }

    return [];
  },

  getPostBySlug: async (slug: string): Promise<Post | null> => {
    try {
      const response = await get<Post>(
        `/content-management/articles/slug/${slug}`,
        cacheConfig.detail
      );
      console.log("response", response);
      return response as unknown as Post | null;
    } catch (error) {
      console.error(`Error fetching post ${slug}:`, error);
      return null;
    }
  },

  getPostById: async (id: string): Promise<Post | null> => {
    try {
      const response = await get<Post>(
        `/content-management/articles/${id}`,
        cacheConfig.detail
      );
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      return null;
    }
  },

  searchPosts: async (query: string, limit: number = 10): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?search=${encodeURIComponent(
        query
      )}&page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}`,
      { next: { revalidate: 300 } }
    );

    return response.data?.data || [];
  },

  getRelatedPosts: async (post: Post, limit: number = 4): Promise<Post[]> => {
    const tagsParam = post.tags
      .slice(0, 3)
      .map((tag) => `tags=${encodeURIComponent(tag)}`)
      .join("&");

    const response = await get<PostListResponse>(
      `/content-management/articles?${tagsParam}&page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}&exclude=${post.id}`,
      cacheConfig.latest
    );

    return response.data?.data || [];
  },

  getPopularPosts: async (limit: number = 5): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}&sortBy=views&sortOrder=desc`,
      cacheConfig.featured
    );

    // Case 3: response.data is PostListResponse object
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      "pagination" in response.data
    ) {
      return (response.data as PostListResponse).data;
    }

    // Case 4: response.data is array directly
    if (response.data && Array.isArray(response.data)) {
      return response.data as Post[];
    }

    // Case 5: response itself is PostListResponse (direct return from API)
    if (
      (response as unknown as PostListResponse).data &&
      Array.isArray((response as unknown as PostListResponse).data) &&
      (response as unknown as PostListResponse).pagination
    ) {
      return response as unknown as Post[];
    }

    return [];
  },

  getPostsByAuthor: async (
    author_id: string,
    limit: number = 10
  ): Promise<Post[]> => {
    const response = await get<PostListResponse>(
      `/content-management/articles?creator=${author_id}&page=1&pageSize=${limit}&status=${POST_STATUS.PUBLISHED}`,
      cacheConfig.latest
    );
    return (response.data as unknown as Post[]) || [];
  },
};
