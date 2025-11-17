import { get } from "./api";

export interface Category {
  id: string;
  name: string;
  key: string;
  description?: string;
  postCount?: number;
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
}

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await get<{ data: Category[] }>(
      "/content-management/categories",
      { next: { revalidate: 3600 } }
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

  getCategoriesWithCounts: async (): Promise<Category[]> => {
    const response = await get<{ data: Category[] }>(
      "/content-management/categories?includeCounts=true",
      { next: { revalidate: 1800 } }
    );

    return response.data as unknown as Category[];
  },
  getAllSubCategories: async (): Promise<SubCategory[]> => {
    const response = await get<{ data: SubCategory[] }>(
      "/content-management/sub-categories",
      { next: { revalidate: 1800 } }
    );

    return response as unknown as SubCategory[];
  },
};
