import LeadsTable from './LeadsTable';

const SalesmanDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Leads</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track your leads efficiently.
        </p>
      </div>
      <LeadsTable />
    </div>
  );
};

export default SalesmanDashboard;
