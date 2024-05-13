import axios from 'axios';
import { FaBitcoin } from 'react-icons/fa';
import { baseUrl } from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import { destructureDate } from './getTime';
import { GiTwoCoins } from 'react-icons/gi';
import { useState } from 'react';
import Modal from '../modal/ParentModal';
import RejectRechargeRemark from '../modal/RejectRechargeRemark';
export function WithDrawCard({
  id,
  name,
  phoneNumber,
  coin,
  purchaseDate,
  recruiterID,
  amount,
}: any) {
  const token = localStorage.getItem('token');
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [remark, setRemark] = useState('');

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleApprove = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/history/approveWithdraw/${id}`,
        { amountToWithDraw: coin, recruiterID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  //   function to reject the recharge
  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/history/reject/${id}`,
        { recruiterID, remark },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  // get the time and date
  const time = destructureDate(new Date(purchaseDate));
  return (
    <div className="flex bg-white dark:bg-[#23303f] p-4 gap-7 border border-black  rounded-xl">
      <div className="w-1/3 flex flex-col justify-evenly items-center ">
        <GiTwoCoins size="100px" className="dark:text-white " />
        <h1 className="text-gray-900 flex justify-center items-center gap-3 dark:text-white text-xl font-bold">
          <GiTwoCoins size="30" /> {coin}
        </h1>
      </div>
      <div className="w-2/3 flex flex-col justify-center py-3">
        <h5 className="mb-2 uppercase text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <h5 className="mb-2 uppercase text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Amount: {(amount && amount.toFixed(2)) || 0}
        </h5>

        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {time.day + '-' + time.month + '-' + time.year}
        </h5>
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {phoneNumber}
        </h5>
        <div className=""></div>
        <div className="flex gap-3 mt-3 justify-between">
          <button
            onClick={handleApprove}
            type="button"
            className="text-gray-900 bg-white border border-black px-3 focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
          >
            Approve
          </button>
          <button
            onClick={openModal1}
            type="button"
            className="text-gray-900 bg-red-400  px-4 text-black focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-white dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
          >
            Reject
          </button>
          {isModalOpen1 && (
            <Modal
              closeModal={closeModal1}
              handleOpen={openModal1}
              isModalOpen={isModalOpen1}
            >
              <RejectRechargeRemark
                closeModal={closeModal1}
                confirmReject={handleReject}
                remark={remark}
                setRemark={setRemark}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
