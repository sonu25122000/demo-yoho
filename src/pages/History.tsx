import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { HistoryTable } from '../components/history/HistoryTable';

const History = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="History" />
      <HistoryTable />
    </DefaultLayout>
  );
};

export default History;
