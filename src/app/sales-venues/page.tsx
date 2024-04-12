import { createPage } from "~/lib/createPage";

const { SalesVenuesPage, SalesVenuesLink } = createPage({
  name: "SalesVenues",
  path: import.meta.url,
  component: () => {
    return (
      <div>
        <h1>SalesVenues</h1>
        <p>Welcome to the SalesVenues!</p>
      </div>
    );
  },
});

export { SalesVenuesPage as default, SalesVenuesLink };
