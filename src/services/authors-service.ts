import { Post } from "@/types";
import { get } from "./api";

export interface Author {
  id: string;
  username: string;
  penName: string;
  email: string;
  avatarUrl: string;
  backgroundAvatarUrl: string | null;
  secondaryAvatarUrl: string | null;
  socials: Record<string, string>;
  description: string;
  designations: string[];
  role: string;
}

export interface AuthorShort {
  id: string;
  name: string;
  avatarUrl: string;
}

export type OtherAuthor = AuthorShort;

export interface AuthorResponse {
  author: Author;
  articles: Post[];
  otherAuthors: OtherAuthor[];
}

const cacheConfig = {
  author: { next: { revalidate: 3600 } },
  listAuthors: { next: { revalidate: 3600 } },
};

export interface AuthorsListResponse {
  data: AuthorShort[];
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export const authorService = {
  getListAuthors: async (): Promise<AuthorShort[]> => {
    try {
      const response = await get<AuthorsListResponse>(
        "/content-management/authors?offset=0&limit=9&role=writer",
        cacheConfig.listAuthors
      );

      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data;
        }
        if (
          typeof response.data === "object" &&
          "data" in response.data &&
          Array.isArray(response.data.data)
        ) {
          return response.data.data;
        }
      }

      if (Array.isArray(response)) {
        return response as unknown as AuthorShort[];
      }

      return [];
    } catch (error) {
      console.error("Error fetching authors list:", error);
      return [];
    }
  },

  getAuthorById: async (id: string): Promise<AuthorResponse | null> => {
    try {
      const response = await get<AuthorResponse>(
        `/content-management/authors/${id}`,
        cacheConfig.author
      );

      // Type guard to check if object has author property
      const hasAuthor = (obj: unknown): obj is AuthorResponse => {
        return (
          typeof obj === "object" &&
          obj !== null &&
          "author" in obj &&
          typeof (obj as { author: unknown }).author === "object"
        );
      };

      // Case 1: response.data contains the AuthorResponse
      if (response.data && hasAuthor(response.data)) {
        return response.data;
      }

      // Case 2: response itself is the AuthorResponse (direct return from API)
      if (hasAuthor(response)) {
        return response as AuthorResponse;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching author ${id}:`, error);
      return null;
    }
  },
};
