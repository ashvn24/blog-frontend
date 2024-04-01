import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export function ConfirmDialogue({
  button,
  header,
  content,
  onsubmit,
  id,
  purpose,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = () => {
    onsubmit(id);
    handleOpen();
  };

  return (
    <>
      <button onClick={handleOpen} variant="gradient">
        {purpose === "delete" ? (
          <FaTrash />
        ) : (
          <MdOutlineReportGmailerrorred size={25} />
        )}
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{header}</DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
