export type TBanner = {
  _id: string;
  bannerImage: string;
  createdAt: string;
  updatedAt: string;
};

export type TAmenity = {
  _id: string;
  amenitiesLabel: string;
  amenitiesImage: string;
};

export type TFloorPlan = {
  bedRoomCount: number;
  bathCount: string;
  bedCount: number;
  guestCount: number;
};

export type TRoomDetails = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  amenities: TAmenity[];
  floorPlan: TFloorPlan;
  price: number;
  location: string;
};

export interface IChoose {
  _id: string;
  whyChooseUsTitle: string;
  whyChooseUsDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  feature: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAmenities {
  _id: string;
  amenitiesLabel: string;
  amenitiesImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFloorPlan {
  bedroomCount: number;
  bathCount: number;
  bathroomCount: number;
  balconyCount: number;
  bedCount: number;
  guestCount: number;
  drawing: boolean;
  dinning: boolean;
  bedRoomCount: number;
}

export interface IHost {
  _id: string;
  avatar: string | null;
  email: string;
  isVerified: boolean;
  accountStatus: string;
  name: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  identityDocument: string;
  isStaff: boolean;
}

export interface IListingFor {
  _id: string;
  featureName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRent {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
  isSold: boolean;
  category: ICategory;
  amenities: IAmenities[];
  allowableThings: string[];
  floorPlan: IFloorPlan;
  cancellationPolicy: string[];
  host: IHost;
  houseRules: string[];
  listingFor: IListingFor[];
  location: string;
  landSize: number;
  buildingYear:string;
  price: number;
  slug: string;
  status: string;
  publishStatus: string;
  __v: number;
}
