import { DashboardLink } from "../(dashboard)/link";
import { SalesVenuesLink } from "../sales-venues/link";

export const Sidebar = () => {
  return (
    <nav className="list list-secondary gap-4">
      <DashboardLink className="list-item h-full w-full text-primary-contrast-base">
        Dashboard
      </DashboardLink>
      <span className="list-item text-primary-contrast-base">Products</span>
      <SalesVenuesLink className="list-item h-full w-full text-primary-contrast-base">
        Sales Venue
      </SalesVenuesLink>
      <span className="list-item text-primary-contrast-base">
        Sales reports
      </span>
    </nav>
  );
};
