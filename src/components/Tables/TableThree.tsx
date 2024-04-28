import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { toast } from 'react-toastify';
import { CiEdit } from 'react-icons/ci';
import { baseUrl } from '../../utils/baseUrl';
import { DeleteConfirMationModal } from '../modal/modal';
import { Chip } from '@material-tailwind/react';
const TableThree = () => {
  const token = localStorage.getItem('token');
  const [recruiterList, setRecruiterList] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${baseUrl}/recruiter/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      handleOpen();
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      handleOpen();

      toast.error(error.response.data.message);
    }
  };

  const getRecruiterList = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${baseUrl}/recruiter`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setRecruiterList(res.data.data);
      setLoading(false);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError(true);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getRecruiterList();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <h1 className="text-red-500">
        Opps! Something Went wrong While Fetching The Data
      </h1>
    );
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                YohoID
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Full Name
              </th>

              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Active
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Coin
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Commision
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recruiterList.map((packageItem: any, key: number) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.YohoId || '--'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.firstName} {packageItem.lastName}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.phoneNumber}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="w-max">
                    <Chip
                      size="sm"
                      className=""
                      value={packageItem.active ? 'Yes' : 'No'}
                      color={packageItem.active ? 'green' : 'red'}
                    />
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.coin}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.commision}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <div className="flex items-center space-x-3.5">
                      <DeleteConfirMationModal
                        open={open}
                        handleOpen={handleOpen}
                        handleDelete={() => handleDelete(packageItem._id)}
                        children={'Are You Sure , You Want To Delete.'}
                      />
                    </div>
                    <Link
                      to={`/add-edit/${packageItem._id}`}
                      className="hover:text-primary"
                    >
                      <CiEdit size="20" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
