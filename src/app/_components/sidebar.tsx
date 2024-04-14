import { DashboardLink } from "../(dashboard)/link";
import { ProductsLink } from "../products/link";
import { SalesVenuesLink } from "../sales-venues/link";

export const Sidebar = () => {
  return (
    <nav className="list list-secondary gap-2 bg-primary-400 pt-2 *:!rounded-none *:!py-4">
      <DashboardLink className="list-item h-full w-full text-primary-contrast-base">
        Dashboard
      </DashboardLink>
      <ProductsLink className="list-item text-primary-contrast-base">
        Products
      </ProductsLink>
      <SalesVenuesLink className="list-item h-full w-full text-primary-contrast-base">
        Sales Venue
      </SalesVenuesLink>
      <span className="list-item text-primary-contrast-base">
        Sales reports
      </span>
    </nav>
  );
};
