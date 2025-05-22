import { useRentCategories } from "@/hooks/useRentCategories";

export const useMenuList = () => {
  const { rentCategories } = useRentCategories();

  return [
    {
      id: "01",
      title: "Home",
      link: "/",
    },
    {
      id: "02",
      title: "Rent",
      link: "/rent",
      dropdownItems: [
        {
          key: "all",
          label: "All Rents",
          href: "/rent?category=all",
        },
        ...(rentCategories?.map((cat) => ({
          key: cat?._id,
          label: cat?.categoryName,
          href: `/rent?category=${cat?._id}`,
        })) || []),
      ],
    },
    {
      id: "03",
      title: "Buy/Sale",
      link: "#",
      dropdownItems: [
        {
          key: "flat",
          label: "Flat Listing",
          href: `/flat`,
        },
        {
          key: "land",
          label: "Land Listing",
          href: `/land`,
        },
      ],
    },

    {
      id: "04",
      title: "About",
      link: "/about",
    },
    {
      id: "05",
      title: "Blogs",
      link: "/blogs",
    },
    {
      id: "06",
      title: "Contact",
      link: "/contact",
    },
  ];
};
