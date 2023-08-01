import React, { Fragment } from 'react';
import Navbar from '@/components/Molecules/Navbar';
import DashboardTemplate from '@/components/features/dashboard';

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <DashboardTemplate />
    </Fragment>
  );
}

export default Dashboard
