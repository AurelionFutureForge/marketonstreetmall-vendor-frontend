import {
  LayoutGrid,
  LucideIcon,
  Package,
  ShoppingBag,
  BarChart,
  User
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Products",
          icon: Package,
          submenus: [
            {
              href: "/manage-products",
              label: "Manage Products"
            },
          ]
        },
        {
          href: "/orders",
          label: "Orders",
          icon: ShoppingBag
        },
        {
          href: "/reports",
          label: "Reports",
          icon: BarChart
        },
        {
          href: "/profile",
          label: "Profile",
          icon: User
        }
      ]
    },
  ];
}
