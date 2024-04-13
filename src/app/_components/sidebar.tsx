import { DashboardLink } from "../(dashboard)/page";
import { SalesVenuesLink } from "../sales-venues/page";

export const Sidebar = () => {
  return (
    <nav className="list list-secondary gap-4">
      <DashboardLink className="text-primary-contrast-base inline-block list-item h-full w-full">
        Dashboard
      </DashboardLink>
      <span className="text-primary-contrast-base  list-item">Products</span>
      <SalesVenuesLink className="text-primary-contrast-base inline-block list-item h-full  w-full">
        Sales Venue
      </SalesVenuesLink>
      <span className="text-primary-contrast-base  list-item">
        Sales reports
      </span>
    </nav>
  );
};
