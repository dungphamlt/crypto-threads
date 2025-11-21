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

export interface OtherAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface AuthorResponse {
  author: Author;
  articles: Post[];
  otherAuthors: OtherAuthor[];
}

const cacheConfig = {
  author: { next: { revalidate: 3600 } },
};

export const authorService = {
  getAuthorById: async (id: string): Promise<AuthorResponse | null> => {
    try {
      const response = await get<AuthorResponse>(
        `/content-management/authors/${id}`,
        cacheConfig.author
      );
      
      console.log("res", response)

      // Case 1: response.data contains the AuthorResponse
      if (response.data && (response.data as any).author) {
        return response.data;
      }

      // Case 2: response itself is the AuthorResponse (direct return from API)
      if ((response as any).author) {
        return response as unknown as AuthorResponse;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching author ${id}:`, error);
      return null;
    }
  },
};

