//Product-Category Types
export interface fetchProductCategoryTypes{
  category_id: string,
  name: string,
  image_url:string,
  is_public: string,
  createdAt:string,
  updatedAt:string,
}

export interface fetchProductGroupTypes{
  group_id: string,
  name: string,
  category_id:string,
  is_public: string,
  createdAt:string,
  updatedAt:string,
}

export interface fetchProductSubCategoryTypes{
  subcategory_id:string,
  name:string,
  image_url:string,
  is_public:boolean,
  group_id:string,
  subCategoryGroup: {
    name: string,
    category: {
      name: string,
      category_id: string
    }
  }
  products: string[],
  _count: {
    products: number
  },
  category_id:string
}