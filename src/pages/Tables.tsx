import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="recruiter" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white capitalize"></h2>
        <Link to="/add-edit">
          <button className="text-base bg-blue-700 p-2 rounded-sm font-semibold text-white dark:text-white capitalize">
            Add Recruiter
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
