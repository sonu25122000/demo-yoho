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
import { GiCrownCoin, GiTwoCoins } from 'react-icons/gi';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { RechargeHistoryCardForSell } from '../../components/card/rechargeHistoryCardForSell';
import { WithDrawCard } from '../../components/card/withdrawCommissionCard';

const SuperAdminDashBoard: React.FC = () => {
  const token = localStorage.getItem('token');
  const userProfileString = localStorage.getItem('userProfile');
  const userProfile = userProfileString ? JSON.parse(userProfileString) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [superAdminProfile, setSuperAdminProfile] = useState<any>({});
  const [requestedRecharge, setRequestedRecharge] = useState<any>([]);
  console.log(requestedRecharge);
  const [requestedRechargeSellType, setRequestedRechargeSellType] =
    useState<any>([]);
  const [withDraw, setwithDraw] = useState<any>([]);
  const [recruiterList, setRecruiterList] = useState<any>([]);
  const [todaysSell, setTodaysSell] = useState<any>(0);
  const [monthlySell, setMonthlySell] = useState<any>(0);
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
      const buyTypeRecharge = res.data.data.filter(
        (el: any) => el.purchaseType == 'buy',
      );
      const sellTypeRecharge = res.data.data.filter(
        (el: any) => el.purchaseType == 'sell',
      );
      const withdraw = res.data.data.filter(
        (el: any) => el.purchaseType == 'withdraw',
      );
      setwithDraw(withdraw);
      setRequestedRecharge(buyTypeRecharge);
      setRequestedRechargeSellType(sellTypeRecharge);
      console.log(res.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  // get today's sell
  const getTodaysSell = async () => {
    try {
      const res = await axios.get(`${baseUrl}/history/today-sell`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setTodaysSell(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  // get monthly sell
  const getMonthlysSell = async () => {
    try {
      const res = await axios.get(`${baseUrl}/history/monthly-sell`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      setMonthlySell(res.data.data);
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
    getTodaysSell();
    getMonthlysSell();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="dashBoard" />
      <div className="grid-cols-1 grid md:grid-cols-3  gap-4">
        <div>
          <DashBoardCard
            Icon1={<GiTwoCoins size="40" className="dark:text-white" />}
            icon={<GiTwoCoins size="20" />}
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
          coin={todaysSell ? todaysSell : 'No sell in Today'}
          heading="Today's Sell"
          Icon1={<GiTwoCoins size="40" className="dark:text-white" />}
          icon={<GiTwoCoins size="20" />}
        />
        <DashBoardCard
          coin={monthlySell ? monthlySell : 'no coin sell in this month'}
          heading="Monthly Sells"
          Icon1={<GiTwoCoins size="40" className="dark:text-white" />}
          icon={<GiTwoCoins size="20" />}
        />
      </div>

      <PageHeader pageName="Recharge Requested for buy" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {requestedRecharge
          ? requestedRecharge.map((item: any) => {
              return (
                <RechargeHistoryCard
                  key={item}
                  name={`${item.recruiterID.firstName}${' '}${
                    item.recruiterID.lastName
                  }`}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  YohoId={item.YohoId}
                  coin={item.coin}
                  id={item._id}
                  amount={item.amount}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : 'abc'}
      </div>

      <PageHeader pageName="Recharge Requested for sell" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {requestedRechargeSellType
          ? requestedRechargeSellType.map((item: any) => {
              return (
                <RechargeHistoryCardForSell
                  key={item}
                  name={item.fullName}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  YohoId={item.YohoId}
                  coin={item.coin}
                  id={item._id}
                  amount={item.amount}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : 'abc'}
      </div>

      <PageHeader pageName="WithDraw Requested By Recruiter" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {withDraw
          ? withDraw.map((item: any) => {
              return (
                <WithDrawCard
                  key={item}
                  name={`${item.recruiterID.firstName}${' '}${
                    item.recruiterID.lastName
                  }`}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  coin={item.coin}
                  id={item._id}
                  amount={item.amount}
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
