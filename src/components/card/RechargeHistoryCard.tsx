import axios from 'axios';
import { FaBitcoin } from 'react-icons/fa';
import { baseUrl } from '../../utils/baseUrl';
import { toast } from 'react-toastify';
export function RechargeHistoryCard({ id, name, coin }: any) {
  const token = localStorage.getItem('token');

  //   function to approve the recharge
  const handleApprove = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/change-password/${id}`,
        'newPassword',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  //   function to reject the recharge
  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/change-password/${id}`,
        'newPassword',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  return (
    <div className="flex bg-white p-4 gap-7 border border-black  rounded-xl">
      <div className="w-1/3 flex flex-col justify-center items-center gap-3">
        <FaBitcoin size="100px" className="dark:text-black" />
        <h1 className="text-gray-900 dark:text-black text-xl font-bold">
          $ {coin}
        </h1>
      </div>
      <div className="w-2/3 flex flex-col justify-center py-3">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
          {name}
        </h5>
        <div className="mb-14"></div>
        <div className="flex gap-3 mt-3 justify-between">
          <button
            onClick={handleApprove}
            type="button"
            className="text-gray-900 bg-white border border-black px-3 focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            type="button"
            className="text-gray-900 bg-red-400  px-4 text-black focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-white dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
