import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateBulkPreference,
  EditProfileDetails,
  GetCategory,
} from "../Services/Services";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Preference() {
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    handleListCategory();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Check if the clicked category is already selected
    const index = selectedCategories.indexOf(categoryId);
    if (index === -1) {
      // If not selected, add the category to the array
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    } else {
      // If already selected, remove the category from the array
      const newSelectedCategories = [...selectedCategories];
      newSelectedCategories.splice(index, 1);
      setSelectedCategories(newSelectedCategories);
    }
  };

  // validation
  const validation = () => {
    if (selectedCategories.length < 4) {
      toast.warning("Kindly select atleast four preferences");
      return false;
    }
    return true;
  };

  const handlesubmit = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    if (validation()) {
      try {
        const userPreferencesData = selectedCategories.map((categoryId) => ({
          user: decoded.user_id,
          preference: categoryId,
        }));
        console.log(userPreferencesData, "Formatted data");
        const res = await CreateBulkPreference(userPreferencesData);
        console.log(res.data, "anzil");
        const dataz = {
          is_completed: true,
        };
        console.log(decoded.user_id);
        const res1 = await EditProfileDetails(decoded.user_id, dataz);
        console.log(res1.data, "anzzzzz");
        navigate("/user/homepage/ ");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleListCategory = async () => {
    try {
      const res = await GetCategory();

      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-cover bg-fixed h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20210706/pngtree-green-abstract-backgrounds-4k-hd-free-dowunlode-pngtree-image_737768.jpg')`,
      }}
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="bg-opacity-60 px-10 py-20 sm:py-10">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-black font-serif">
              Choose Your Preference
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-5">
            {category?.map((e, index) => (
              <button
                key={index}
                className={`px-10 py-4 rounded-full cursor-pointer border-0 bg-${
                  selectedCategories.includes(e.id) ? "black" : "white"
                } shadow-md uppercase text-sm transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                  selectedCategories.includes(e.id)
                    ? "text-white"
                    : "text-black"
                }`}
                onClick={() => handleCategoryClick(e.id)}
              >
                {e.category}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-10">
            <button
              onClick={handlesubmit}
              className="px-10 text-white py-4 rounded-full cursor-pointer border-0 bg-blue-gray-400 shadow-md uppercase text-sm transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-indigo-600 hover:text-white active:bg-indigo-700 active:shadow-none active:translate-y-1"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Preference;
