import { createPage } from "~/lib/createPage";

const { DashboardPage, DashboardLink } = createPage({
  name: "dashboard",
  path: import.meta.url,
  component: () => {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </div>
    );
  },
});

export { DashboardPage as default, DashboardLink };
