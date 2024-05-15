import axios from 'axios';
import { useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { baseUrl } from '../../utils/baseUrl';
import { RxCross2 } from 'react-icons/rx';
import RejectRechargeRemark from '../modal/RejectRechargeRemark';
import Modal from '../modal/ParentModal';

const WithDrawTable = ({ withDraw }: any) => {
  const token = localStorage.getItem('token');
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [remark, setRemark] = useState('');
  const [recruiterID, setRecruiterId] = useState('');
  const [cardId, setCardId] = useState('');

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleApprove = async (coin: any, recruiterID: any, id: any) => {
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
        `${baseUrl}/history/reject/${cardId}`,
        { recruiterID, remark },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      closeModal1();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  if (withDraw.length <= 0) {
    return (
      <p className="text-red-600 w-full font-bold text-lg">
        No Request Available
      </p>
    );
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Full Name
              </th>

              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                UpiID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Coin
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {withDraw.map((item: any, key: number) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {`${item.recruiterID.firstName}${' '}${
                      item.recruiterID.lastName
                    }`}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.recruiterID.phoneNumber || '--'}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : '--'}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    Rs {item.amount || 0}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.upiId || '--'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.coin || '--'}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <div className="flex items-center space-x-3.5">
                      <RxCross2
                        onClick={() => {
                          openModal1();
                          setRecruiterId(item.recruiterID._id);
                          setCardId(item._id);
                        }}
                        size="25"
                        className="text-black font-bold hover:text-red-600 cursor-pointer"
                      />
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

                    <FcApproval
                      onClick={() =>
                        handleApprove(item.coin, item.recruiterID._id, item._id)
                      }
                      size="25"
                      className="text-black font-bold hover:text-red-600 cursor-pointer"
                    />
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

export default WithDrawTable;
