import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from '@material-tailwind/react';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const TABLE_HEAD = [
  'FirstName',
  'LastName',
  'Phone Number',
  'Email',
  'Coin',
  'Recharge Status',
];

export function HistoryTable() {
  const [rechargeHistory, setRechargeHistory] = useState<any>([
    1, 2, 3, 4, 4, 4, 4, 1, 2, 3, 4, 4, 4, 4,
  ]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem('token');
  const itemsPerPage = 5; // Number of items to display per page

  // Function to calculate the start and end indexes of the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, rechargeHistory.length);

  //   function to get recharge history

  //   const getRechargeHistory = async () => {
  //     try {
  //       const res = await axios.get(`${baseUrl}/recruiter`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `b ${token}`,
  //         },
  //       });
  //       setRechargeHistory(res.data.data);
  //       toast.success(res.data.message);
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error(error.response.data.message || error.response.data.error);
  //     }
  //   };

  //   useEffect(() => {
  //     getRechargeHistory();
  //   }, []);

  return (
    <Card className="h-full w-full dark:bg-[#23303f] md:px-5">
      <CardBody className="overflow-scroll ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="cursor-pointer dark:bg-[#303d4a] dark:text-white  border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rechargeHistory
              .slice(startIndex, endIndex)
              .map((item: any, index: any) => {
                return (
                  <tr key={index} className="dark:text-white text-black">
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">Sonu</p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">Kumar</p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">6202945018</p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        skg74@gmail.com
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">$ 300</p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="w-max">
                        <Chip
                          size="sm"
                          className=""
                          value={index % 2 == 0 ? 'approved' : 'rejected'}
                          color={index % 2 == 0 ? 'green' : 'red'}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between p-4">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-white"
        >
          Page {page} of {Math.ceil(rechargeHistory.length / 5)}
        </Typography>
        <div className="flex gap-2">
          <Button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="dark:text-white border text-black"
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={Math.ceil(rechargeHistory.length / 5) == page}
            onClick={() => setPage(page + 1)}
            className="text-white bg-primary border border-black"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
