import React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { MdDeleteOutline } from 'react-icons/md';

export function DeleteConfirMationModal({ handleDelete }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={handleOpen} className="hover:text-primary">
        <MdDeleteOutline size="20" />
      </button>
      <Dialog size={'xs'} open={open} handler={handleOpen}>
        <DialogBody className="mt-3 flex justify-center items-center font-bold text-2xl text-black xl:pl-11">
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
