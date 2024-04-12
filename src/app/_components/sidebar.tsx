import { DashboardLink } from "../(dashboard)/page";
import { SalesVenuesLink } from "../sales-venues/page";

export const Sidebar = () => {
  return (
    <nav className="list gap-4">
      <DashboardLink className="inline-block list-item h-full w-full">
        Dashboard
      </DashboardLink>
      <span className="list-item">Products</span>
      <SalesVenuesLink className="inline-block list-item h-full w-full">
        Sales Venue
      </SalesVenuesLink>
      <span className="list-item">Sales reports</span>
    </nav>
  );
};
