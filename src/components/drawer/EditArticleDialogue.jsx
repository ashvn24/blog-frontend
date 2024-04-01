import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react"; // Import your UI components
import { GetCategory } from "../../Services/Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditArticleDialogue = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  profile_data,
  setProfileData,
}) => {
  const [newImg, setNewImg] = useState(null); // To track the selected image file
  const [showImage, setShowImage] = useState(null);

  const [category, setCategory] = useState(null);
  useEffect(() => {
    handleListCategory();
    setNewImg(profile_data.image);
    setShowImage(profile_data.image);
  }, []);

  const handleListCategory = async () => {
    try {
      const res = await GetCategory();
      console.log(res.data, "sdaasda");
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewImg(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setShowImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profile_data, [name]: value });
  };

  const handleConfirm = () => {
    if (validation) {
    }
    onSubmit(profile_data, newImg);
    onClose();
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");

    if (words.length < 50) {
      return true;
    } else {
      return false;
    }
  };

  const validation = () => {
    if (profile_data.article_name.trim() === "") {
      toast.error("Article name should not be empty");
      return false;
    } else if (profile_data.category.trim() === "") {
      toast.error("category should not be empty");
      return false;
    } else if (newImg === null) {
      toast.error("Please provide an Image");
      return false;
    } else if (truncateDescription(profile_data.description)) {
      toast.error("Description should be atleast 50 words");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <div className="grid gap-6">
          <>
            <Input
              label="Article Name"
              name="article_name"
              value={profile_data.article_name}
              onChange={handleChange}
            />
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className="text-blue-gray-700 border border-blue-gray-200 rounded-md p-2 w-full"
              disabled
            >
              <option disabled value="">
                Select Category
              </option>
              {category?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.category}
                </option>
              ))}
            </select>

            <Input
              label="#Tags"
              name="tags"
              value={profile_data.tags}
              onChange={handleChange}
            />
            <div className="w-1/3 mt-8">
              <div className="flex items-center justify-center h-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600"
                >
                  {newImg ? (
                    <img
                      src={showImage}
                      className="w-56 h-full"
                      alt="Selected"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop image
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG, or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <Textarea
              label="Description"
              name="description"
              value={profile_data.description}
              onChange={handleChange}
            />
          </>
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
      <ToastContainer />
    </Dialog>
  );
};

export default EditArticleDialogue;
