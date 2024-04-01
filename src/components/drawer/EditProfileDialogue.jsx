import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react"; // Import your UI components

const EditProfileDialogue = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  profile_data,
  setProfileData,
}) => {
  console.log(title, "anzil");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profile_data, [name]: value }); // Update profileData in the parent component
  };

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleConfirm = () => {
    if (onSubmit) {
      if (title === "EditProfile") {
        onSubmit(profile_data); // Execute the specific callback for the action
      } else {
        onSubmit(password);
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <div className="grid gap-6">
          {title === "EditProfile" ? (
            <>
              <Input
                label="Email"
                readOnly
                disabled
                value={profile_data.email}
              />
              <Input label="DOB" readOnly disabled value={profile_data.dob} />
              <Input
                label="First Name"
                name="first_name"
                value={profile_data.first_name}
                onChange={handleChange}
              />
              <Input
                label="Last Name "
                name="last_name"
                value={profile_data.last_name}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={profile_data.phone}
                onChange={handleChange}
              />
            </>
          ) : title === "ChangePassword" ? (
            <>
              <Input
                label="Current Password"
                type="password"
                name="current_password"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />

              <Input
                label="New Password"
                type="password"
                name="new_password"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />
              <Input
                label="Confirm New Password"
                type="password"
                name="confirm_password"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />
            </>
          ) : null}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProfileDialogue;
