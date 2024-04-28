import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DashBoardCard } from '../../components/card/Card';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/ParentModal';
import Recharge from '../../components/recharge/Recharge';
import PageHeader from '../../components/Breadcrumbs/PageHeader';
import { RechargeHistoryCard } from '../../components/card/RechargeHistoryCard';
import { FaBitcoin, FaUser } from 'react-icons/fa';
import { GiCrownCoin } from 'react-icons/gi';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const SuperAdminDashBoard: React.FC = () => {
  const token = localStorage.getItem('token');
  const userProfileString = localStorage.getItem('userProfile');
  const userProfile = userProfileString ? JSON.parse(userProfileString) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [superAdminProfile, setSuperAdminProfile] = useState<any>({});
  const [requestedRecharge, setRequestedRecharge] = useState<any>([]);
  const [recruiterList, setRecruiterList] = useState<any>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // get superadmin profile list
  const getSuperAdminProfileDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/superAdmin/${userProfile._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setSuperAdminProfile(res.data.data);
      // toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  // get recrruiter details
  const getRecruiterList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/recruiter`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setRecruiterList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  get pending recharge history

  const getPendingRecharge = async () => {
    try {
      const res = await axios.get(`${baseUrl}/history?status=pending`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setRequestedRecharge(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  useEffect(() => {
    getSuperAdminProfileDetails();
    getRecruiterList();
    getPendingRecharge();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="dashBoard" />
      <div className="grid-cols-1 grid md:grid-cols-3  gap-4">
        <div>
          <DashBoardCard
            Icon1={<FaIndianRupeeSign size="40" className="dark:text-white" />}
            icon={<FaIndianRupeeSign size="20" />}
            buttonContent="Recharge"
            handleOpenModal={openModal}
            heading="Available Coin"
            coin={(superAdminProfile && superAdminProfile.coin) || 'No Coin'}
          />
          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              handleOpen={openModal}
              isModalOpen={isModalOpen}
            >
              <Recharge
                id={superAdminProfile && superAdminProfile._id}
                closeModal={closeModal}
              />
            </Modal>
          )}
        </div>
        <DashBoardCard
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
          coin={(recruiterList && recruiterList.length) || 'No Recruiter'}
          heading="Total Recruiter"
        />

        <DashBoardCard
          coin="300"
          heading="Today's Sell"
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
        />
        <DashBoardCard
          coin="300"
          heading="Monthly Sells"
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
        />
      </div>

      <PageHeader pageName="Recharge Requested" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {requestedRecharge
          ? requestedRecharge.map((item: any) => {
              return (
                <RechargeHistoryCard
                  name={`${item.recruiterID.firstName}${' '}${
                    item.recruiterID.lastName
                  }`}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  YohoId={item.YohoId}
                  coin={item.coin}
                  id={item._id}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : 'abc'}
      </div>
    </DefaultLayout>
  );
};

export default SuperAdminDashBoard;
