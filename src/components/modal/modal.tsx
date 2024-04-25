import React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';

export function DeleteConfirMationModal({ RecruiterId }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `${baseUrl}/recruiter/delete/${RecruiterId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `b ${token}`,
          },
        },
      );
      toast.success(response.data.message);
      handleOpen();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="hover:text-primary">
        <MdDeleteOutline size="20" />
      </button>
      <Dialog size={'xs'} open={open} handler={handleOpen}>
        <DialogBody className="mt-3 flex justify-center items-center font-bold text-2xl text-black dark:text-white xl:pl-11">
          Are You Sure , You Want To Delete.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
