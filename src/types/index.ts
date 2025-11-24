export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

export interface Creator {
  email: string;
  id: string;
  penName: string;
  avatarUrl: string;
}

export enum POST_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
  TRASH = "trash",
  SCHEDULE = "schedule",
}

export interface Post {
  _id: string;
  id: string;
  category: {
    id: string;
    key: string;
  };
  subCategory?: {
    id: string;
    key: string;
  };
  title: string;
  content: string;
  metaDescription: string;
  excerpt: string;
  creator: Creator;
  views: number;
  tags: string[];
  coverUrl?: string;
  status: POST_STATUS;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishTime: string;
}

export interface Category {
  id: string;
  name: string;
  key: string;
  description?: string;
}

export interface PostListParams {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  subCategory?: string;
  search?: string;
  creator?: string;
  status?: string;
  slug?: string;
}

export interface PostListResponse {
  data: Post[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
