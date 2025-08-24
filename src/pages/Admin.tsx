import React from 'react';
import AdminPanel from '@/components/admin/AdminPanel';
import { ManualAccountConfirmation } from '@/components/admin/ManualAccountConfirmation';

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <AdminPanel />
        <ManualAccountConfirmation />
      </div>
    </div>
  );
};

export default Admin;