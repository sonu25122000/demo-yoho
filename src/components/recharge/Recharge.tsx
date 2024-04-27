import { GiTwoCoins } from 'react-icons/gi';
import { baseUrl } from '../../utils/baseUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Recharge = ({ closeModal, id }: any) => {
  const token = localStorage.getItem('token');
  const [coin, setCoin] = useState(0);
  const handleRecharge = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/superAdmin/recharge/${id}`,
        { coin },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      closeModal();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
      closeModal();
    }
  };

  return (
    <div>
      <form className="">
        <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
          Enter Coin
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <GiTwoCoins size="28" className="dark:text-black" />
          </div>
          <input
            type="number"
            aria-describedby="helper-text-explanation"
            onChange={(e) => setCoin(+e.target.value)}
            className="text-xl
                    focus:outline-none
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    font-normal border border-gray-300 text-gray-900 rounded-lg block w-full ps-12 p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            placeholder="Enter Coin"
            required
          />
        </div>
      </form>

      <div className="flex gap-3 mt-3 flex-row-reverse">
        <button
          onClick={handleRecharge}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          Recharge
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Recharge;
