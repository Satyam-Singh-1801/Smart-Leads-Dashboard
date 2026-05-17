import { useAuthStore } from '../store/useAuthStore';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboard from '../components/AdminDashboard';
import SalesmanDashboard from '../components/SalesmanDashboard';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      {user?.role === 'Admin' ? <AdminDashboard /> : <SalesmanDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
