import React, { useEffect, useState } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { StickyNavbar } from "../components/Navbar/StickyNavbar";
import { useNavigate } from "react-router-dom";
import { GetCategory, ShareArticle } from "../Services/Services";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateArticle() {
  const [newImg, setNewImg] = useState(null); // To track the selected image file
  const [showImage, setShowImage] = useState(null); // To display the selected image
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  console.log(decoded.user_id, "anzil");

  const [category, setCategory] = useState(null);
  const [form, setForm] = useState({
    article_name: "",
    category: "",
    tags: "",
    description: "",
  });

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

  useEffect(() => {
    handleListCategory();
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

  const truncateDescription = (description) => {
    const words = description.split(" ");

    if (words.length < 50) {
      return true;
    } else {
      return false;
    }
  };

  const validation = () => {
    if (form.article_name.trim() === "") {
      toast.error("Article name should not be empty");
      return false;
    } else if (form.category.trim() === "") {
      toast.error("category should not be empty");
      return false;
    } else if (newImg === null) {
      toast.error("Please provide an Image");
      return false;
    } else if (truncateDescription(form.description)) {
      toast.error("Description should be atleast 50 words");
      return false;
    }
    return true;
  };

  const handleCreateArticle = async () => {
    if (validation()) {
      try {
        const formData = new FormData();
        formData.append("article_name", form.article_name);
        formData.append("category", form.category);
        formData.append("tags", form.tags);
        formData.append("description", form.description);
        formData.append("author", decoded.user_id);
        formData.append("image", newImg);
        const res = await ShareArticle(formData);
        navigate("/user/homepage/");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="mt-2">
        <StickyNavbar />
      </div>

      <div
        className="bg-cover bg-fixed  h-screen"
        style={{
          backgroundImage: `url('https://wallpapercave.com/wp/wp1843783.jpg')`,
        }}
      >
        <div className="flex justify-center mt-10">
          <h1 className="text-2xl font-bold ">Share Your Article</h1>
        </div>

        <div className="flex items-center flex-col ">
          <div className="w-1/3 mt-8 flex justify-around gap-10">
            <Input
              className="border border-gray-300 rounded-md p-2 w-full" // Added w-full class for width
              name="article_name"
              value={form.article_name}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
                console.log(form);
              }}
              label="Article Name"
            />

            <select
              name="category"
              value={form.category}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
                console.log(form);
              }}
              className="text-blue-gray-700 border border-blue-gray-200 rounded-md p-2 w-full"
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
          </div>

          <div className="w-96 mt-5">
            <Input
              name="tags"
              value={form.tags}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
                console.log(form);
              }}
              label="#Tags"
            />
          </div>

          <div className="w-1/3 mt-8">
            <div className="flex items-center justify-center h-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600"
              >
                {newImg ? (
                  <img src={showImage} className="w-56 h-full" alt="Selected" />
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop image
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
          <div className="w-96 mt-8">
            <Textarea
              name="description"
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
                console.log(form);
              }}
              label="Post Content"
            />
          </div>
          <div className="mt-5">
            <Button onClick={handleCreateArticle}>Submit</Button>
          </div>
          <div className="mt-10"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateArticle;
