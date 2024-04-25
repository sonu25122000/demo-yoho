import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const FormLayout = () => {
  const { id } = useParams();
  const [payload, setPayload] = useState<any>({});
  const getRecruiterById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recruiter/${id}`);
      const data = res.data.data;
      setPayload(data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Opps! Something Went Wrong.');
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
          `http://localhost:5000/api/recruiter/${id}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: 'Bearer YOUR_ACCESS_TOKEN',
            },
          },
        );
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          'http://localhost:5000/api/recruiter/register',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: 'Bearer YOUR_ACCESS_TOKEN',
            },
          },
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Opps! Something Went Wrong');
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={id ? 'Update Recruiter' : 'Add Recruiter'} />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                  placeholder="Enter your full name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
                  placeholder="Enter your full name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={payload.email}
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
                  type="text"
                  placeholder="Re-enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
