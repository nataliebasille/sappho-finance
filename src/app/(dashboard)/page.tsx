import { createPage } from "~/app/_components/create-page";

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
