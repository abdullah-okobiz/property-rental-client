export interface Category {
  _id: string;
  categoryName: string;
  feature: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v?: number;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: Category[];
}
