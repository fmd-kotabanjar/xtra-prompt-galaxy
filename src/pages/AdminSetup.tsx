
import AdminSetup from '@/components/AdminSetup';

const AdminSetupPage = () => {
  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Admin Setup</h1>
        <p className="text-muted-foreground mt-2">Create the initial admin account</p>
      </div>
      <AdminSetup />
    </div>
  );
};

export default AdminSetupPage;
