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

const SuperAdminDashBoard: React.FC = () => {
  const token = localStorage.getItem('token');
  const userProfileString = localStorage.getItem('userProfile');
  const userProfile = userProfileString ? JSON.parse(userProfileString) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [superAdminProfile, setSuperAdminProfile] = useState<any>({});
  const [requestedRecharge, setRequestedRecharge] = useState<any>([1, 2, 3]);
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

  // het recrruiter details
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

  // const getRequestedCoin = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/superAdmin/${userProfile._id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `b ${token}`,
  //       },
  //     });
  //     setRequestedRecharge(res.data.data);
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.response.data.message || error.response.data.error);
  //   }
  // };

  useEffect(() => {
    getSuperAdminProfileDetails();
    // getRequestedCoin();
    getRecruiterList();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="dashBoard" />
      <div className="grid-cols-1 grid md:grid-cols-3  gap-4">
        <div>
          <DashBoardCard
            Icon1={<GiCrownCoin size="40" className="dark:text-white" />}
            icon={<FaBitcoin size="20" />}
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
        <DashBoardCard
          coin="300"
          heading="Monthly Earning"
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
        />
        <DashBoardCard
          coin="300"
          heading="Today's Earning"
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
                  name={item.name}
                  coin={item.coin}
                  id={item}
                />
              );
            })
          : 'abc'}
      </div>
    </DefaultLayout>
  );
};

export default SuperAdminDashBoard;
