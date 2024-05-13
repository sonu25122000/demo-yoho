import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
const Pin = ({ closeModal, confirmRecharge }: any) => {
  const [otp, setOtp] = useState('');
  const handleCheckPin = () => {
    if (otp != '2508') {
      toast.error('Wrong Pin');
      closeModal();
    } else {
      confirmRecharge();
    }
  };
  return (
    <div className="">
      <div className="w-full mb-4 text-3xl font-bold text-black flex justify-center items-center">
        <h1>Enter Your Pin</h1>
      </div>

      <div className="w-full flex justify-center items-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          inputStyle={{
            border: '1px solid transparent',
            borderRadius: '8px',
            width: '54px',
            height: '54px',
            fontSize: '20px',
            color: '#000',
            fontWeight: '400',
            caretColor: 'blue',
            background: '#EEF7FF',
            marginRight: '12px',
            marginLeft: '12px',
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <div className="flex gap-4 items-center mt-6 space-x-4 flex-row-reverse">
        <button
          onClick={handleCheckPin}
          type="button"
          className={`$
           text-white bg-blue-700 hover:bg-blue-800   font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600`}
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200  hover:text-black dark:text-black dark:border-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Pin;
