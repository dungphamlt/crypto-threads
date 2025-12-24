import { get } from "./api";

export interface Category {
  id: string;
  name: string;
  key: string;
  description?: string;
  postCount?: number;
  imageUrl?: string;
  slug?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  key: string;
  description?: string;
  postCount?: number;
  categoryId: {
    id: string;
    key: string;
  };
  imageUrl?: string;
  slug?: string;
}

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await get<{ data: Category[] }>(
      "/content-management/categories",
      { next: { revalidate: 10000 } }
    );

    return response as unknown as Category[];
  },

  getCategoryByKey: async (key: string): Promise<Category | null> => {
    try {
      const response = await get<{ data: Category }>(
        `/content-management/categories/key/${key}`,
        { next: { revalidate: 3600 } }
      );
      return response.data as unknown as Category | null;
    } catch (error) {
      console.error(`Error fetching category ${key}:`, error);
      return null;
    }
  },

  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    try {
      const response = await get<unknown>(
        `/content-management/categories/slug/${slug}`,
        { next: { revalidate: 10000 } }
      );

      // Case 1: Response has data property (wrapped response)
      if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        response.data &&
        typeof response.data === "object" &&
        "id" in response.data &&
        "key" in response.data
      ) {
        return response.data as Category;
      }

      // Case 2: Response is Category object directly (direct API response)
      if (
        response &&
        typeof response === "object" &&
        "id" in response &&
        "key" in response &&
        !("data" in response)
      ) {
        return response as unknown as Category;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching category by slug ${slug}:`, error);
      return null;
    }
  },

  getCategoriesWithCounts: async (): Promise<Category[]> => {
    const response = await get<{ data: Category[] }>(
      "/content-management/categories?includeCounts=true",
      { next: { revalidate: 10000 } }
    );

    return response.data as unknown as Category[];
  },
  getAllSubCategories: async (): Promise<SubCategory[]> => {
    const response = await get<{ data: SubCategory[] }>(
      "/content-management/sub-categories",
      { next: { revalidate: 10000 } }
    );

    return response as unknown as SubCategory[];
  },
  getSubCategoryBySlug: async (slug: string): Promise<SubCategory | null> => {
    try {
      const encodedSlug = encodeURIComponent(slug);
      const response = await get<unknown>(
        `/content-management/sub-categories/slug/${encodedSlug}`,
        { next: { revalidate: 10000 } }
      );

      // Case 1: Response has data property (wrapped response)
      if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        response.data &&
        typeof response.data === "object" &&
        "id" in response.data &&
        "key" in response.data &&
        "categoryId" in response.data
      ) {
        return response.data as SubCategory;
      }

      // Case 2: Response is SubCategory object directly (direct API response)
      if (
        response &&
        typeof response === "object" &&
        "id" in response &&
        "key" in response &&
        "categoryId" in response &&
        !("data" in response)
      ) {
        return response as unknown as SubCategory;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching subcategory by slug ${slug}:`, error);
      return null;
    }
  },
};
