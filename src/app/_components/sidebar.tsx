import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
  return (
    <ul className=" list text-primary-background-color gap-4">
      <SidebarItem href="">Dashboard</SidebarItem>
      <SidebarItem href="">Products</SidebarItem>
      <SidebarItem href="/sales-venues">Sales venues</SidebarItem>
      <SidebarItem href="">Sales reports</SidebarItem>
    </ul>
  );
};
