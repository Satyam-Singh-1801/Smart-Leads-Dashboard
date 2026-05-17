import DashboardLayout from '../layouts/DashboardLayout';
import LeadsTable from '../components/LeadsTable';

const AdminLeads = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Leads</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            System-wide lead management.
          </p>
        </div>
        <LeadsTable />
      </div>
    </DashboardLayout>
  );
};

export default AdminLeads;
