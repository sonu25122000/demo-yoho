import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/baseUrl';

const FormLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [payload, setPayload] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const getRecruiterById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/recruiter/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `b ${token}`,
        },
      });
      const data = res.data.data;
      setPayload(data);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // change password

  const handlePasswordChangeSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.patch(
        `${baseUrl}/recruiter/change-password/${id}`,
        { newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/recruiter');
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getRecruiterById();
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.patch(
          `${baseUrl}/recruiter/${id}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `b ${token}`,
            },
          },
        );
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/recruiter');
        }, 1000);
      } else {
        const response = await axios.post(
          `${baseUrl}/recruiter/register`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `b ${token}`,
            },
          },
        );
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/recruiter');
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={id ? 'Update Recruiter' : 'Add Recruiter'} />
      <div
        className={`${
          id
            ? 'grid grid-cols-1 gap-9 sm:grid-cols-2'
            : 'flex justify-center items-center'
        } `}
      >
        <div
          className={`${
            id ? 'w-full' : 'w-full md:w-1/2'
          } rounded-sm border  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {id ? 'Update Recruiter' : 'Add Recruiter'}
            </h3>
          </div>
          <form action="">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  name="firstName"
                  value={payload.firstName}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {payload.firstName.length < 3 && (
                  <span className="text-red-800 text-xs">
                    firstName is required and minimun length should be 3.
                  </span>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  name="lastName"
                  value={payload.lastName}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {payload.lastName.length < 3 && (
                  <span className="text-red-800 text-xs">
                    lastName is required and minimun length should be 3.
                  </span>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={payload.email}
                  disabled={id ? true : false}
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {payload.email == '' && (
                  <span className="text-red-800 text-xs">
                    email is required.
                  </span>
                )}
              </div>
              {!id ? (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {payload.password.length < 6 && (
                    <span className="text-red-800 text-xs">
                      password is required and minimun length should be 6.
                    </span>
                  )}
                </div>
              ) : (
                ''
              )}

              <div className="mb-5.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Phone Number
                </label>
                <input
                  onChange={handleChange}
                  value={payload.phoneNumber}
                  name="phoneNumber"
                  type="number"
                  disabled={id ? true : false}
                  placeholder="enter phone number"
                  className={`${
                    id ? 'cursor-not-allowed' : ''
                  } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {payload.phoneNumber.length < 10 ||
                  (payload.phoneNumber.length > 10 && (
                    <span className="text-red-800 text-xs">
                      phoneNumber is required and length must be 10 digit.
                    </span>
                  ))}
              </div>

              <button
                disabled={
                  payload.firstName.length < 3 ||
                  payload.lastName.length < 3 ||
                  payload.email == '' ||
                  payload.password.length < 6 ||
                  payload.phoneNumber.length < 10 ||
                  payload.phoneNumber.length > 10
                }
                onClick={handleSubmit}
                className={`${
                  payload.firstName.length < 3 ||
                  payload.lastName.length < 3 ||
                  payload.email == '' ||
                  payload.password.length < 6 ||
                  payload.phoneNumber.length < 10 ||
                  payload.phoneNumber.length > 10
                    ? 'bg-graydark cursor-not-allowed'
                    : 'bg-primary'
                } flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 `}
              >
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        {id ? (
          <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {id ? 'Change Password' : ''}
              </h3>
            </div>
            <form action="">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    New Password
                  </label>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="password"
                    type="text"
                    placeholder="enter new password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {newPassword.length < 6 && (
                    <span className="text-red-800 text-xs">
                      Minimun Length 6 char required.
                    </span>
                  )}
                </div>

                <button
                  disabled={newPassword == ''}
                  onClick={handlePasswordChangeSubmit}
                  className={` ${
                    newPassword == '' || newPassword.length < 6
                      ? 'bg-graydark text-black cursor-not-allowed'
                      : 'bg-primary text-white'
                  }flex w-full justify-center rounded  p-3 font-medium text-gray `}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
