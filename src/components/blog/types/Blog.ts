export interface IBlogFeature {
    _id: string;
    featureName: string;
  }
  
  export interface IBlog {
    _id: string;
    blogTitle: string;
    blogImage: string;
    blogDescription: string;
    feature?: IBlogFeature;
    createdAt: string;
    updatedAt: string;
  }
  