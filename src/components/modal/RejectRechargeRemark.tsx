const RejectRechargeRemark = ({
  closeModal,
  remark,
  setRemark,
  confirmReject,
}: any) => {
  return (
    <div>
      <div>
        <label className="block mb-2 text-2xl font-bold text-black">
          Remark
        </label>
      </div>
      <input
        onChange={(e) => setRemark(e.target.value)}
        type="text"
        className="border text-xl text-black font-medium  border-black outline-none p-2 rounded-md w-full"
        placeholder="Enter Remark"
      />
      {remark == '' && (
        <span className="text-red-700 text-sm font-medium">
          Remark is required
        </span>
      )}
      <div className="flex gap-4 items-center mt-6 space-x-4 flex-row-reverse">
        <button
          onClick={confirmReject}
          type="button"
          disabled={remark == ''}
          className={`${
            remark == '' && 'cursor-not-allowed'
          } text-white bg-blue-700 hover:bg-blue-800   font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600`}
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

export default RejectRechargeRemark;
