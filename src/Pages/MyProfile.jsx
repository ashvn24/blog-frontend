import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../components/Navbar/StickyNavbar";
import profile_photo from "../assets/profile/3dprof.jpg";
import { ArticleCards } from "../components/Cards/ArticleCards";

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { FaEdit, FaHeart, FaKey } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import {
  ChangeUserPassword,
  EditProfileDetails,
  GetProfileDetails,
  GetUserArticles,
} from "../Services/Services";
import EditProfileDialogue from "../components/drawer/EditProfileDialogue";

function MyProfile() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  // edit profile through speeddial and dialogue box
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [article, setArticle] = useState(null);

  const handleEditClick = (title) => {
    setIsEditDialogOpen(true);
    setDialogTitle(title);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const [profile, setProfile] = useState(null);

  // validation for userprofile edit
  const ValidationUserProfile = (data) => {
    if (data.first_name.trim() === "") {
      toast.error("First Name is empty");
      return false;
    } else if (data.last_name.trim() === "") {
      toast.error("Last Name is Empty");
      return false;
    } else if (data.phone.trim() === "") {
      toast.error("phone number is Empty");
      return false;
    } else if (data.phone.trim().length !== 10) {
      toast.error("Phone number should atleast be 10");
      return false;
    }
    return true;
  };

  // edit profile
  const handleProfileSubmit = async (data) => {
    if (ValidationUserProfile(data)) {
      try {
        const res = await EditProfileDetails(data.id, data);
        console.log(res.data);
        GetProfile();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ValidatePassword = (data) => {
    if (data.new_password !== data.confirm_password) {
      toast.error("Password doesn't match");
      return false;
    } else if (data.new_password.trim() === "") {
      toast.error("New Password is Empty");
      return false;
    } else if (data.current_password.trim() === "") {
      toast.error("Current Password is Empty");
      return false;
    } else if (data.confirm_password.trim() === "") {
      toast.error("confirm Password is Empty");
      return false;
    }
    return true;
  };

  const handleChangePassword = async (data) => {
    if (ValidatePassword(data)) {
      try {
        const res = await ChangeUserPassword(data);
        toast.success(res.data.message);
        GetProfile();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUserArticle = async () => {
    try {
      const res = await GetUserArticles(decoded.user_id);
      console.log(res.data);
      setArticle(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProfile();
    handleUserArticle();
  }, []);

  const GetProfile = async () => {
    try {
      const res = await GetProfileDetails(decoded.user_id);
      console.log(res.data, "profile data");
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };
  return (
    <div className="bg-gray-200">
      <div className="mt-2">
        <StickyNavbar />
      </div>

      <div></div>

      <div class="p-16">
        <div class="p-8 bg-white shadow mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img className="rounded-full" src={profile_photo} alt="" />
              </div>
            </div>
          </div>
          <div class="mt-28 text-center border-b pb-12 ">
            <h1 class="text-4xl font-medium text-gray-700">
              {profile?.first_name} {profile?.last_name}
            </h1>
            <p class="font-light text-gray-600 mt-3">{profile?.email}</p>
            <p class="mt-8 text-gray-500">{profile?.phone}</p>
            <p class="mt-2 text-gray-500">DOB : {profile?.dob}</p>
            <div className="flex justify-end">
              <div className="relative h-10 w-full">
                <div className="absolute right-10">
                  <SpeedDial>
                    <SpeedDialHandler>
                      <IconButton size="lg" className="rounded-full">
                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                      </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent>
                      <SpeedDialAction
                        className="relative"
                        onClick={() => handleEditClick("EditProfile")}
                      >
                        <FaEdit className="h-5 w-5" />
                        <Typography {...labelProps}>Edit Profile</Typography>
                      </SpeedDialAction>

                      <SpeedDialAction
                        className="relative"
                        onClick={() => handleEditClick("ChangePassword")}
                      >
                        <FaKey className="h-5 w-5" />
                        <Typography {...labelProps}>Change Password</Typography>
                      </SpeedDialAction>
                    </SpeedDialContent>
                  </SpeedDial>

                  <EditProfileDialogue
                    isOpen={isEditDialogOpen}
                    onClose={handleCloseDialog}
                    title={dialogTitle}
                    profile_data={profile}
                    setProfileData={setProfile}
                    onSubmit={
                      dialogTitle === "EditProfile"
                        ? handleProfileSubmit
                        : handleChangePassword
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 flex flex-col justify-center">
            <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
              Posts
            </button>
            {article && article.length > 0 ? (
              article.map((e) => (
                <div className="mt-5">
                  <div className="flex justify-center">
                    <ArticleCards
                      name={e.article_name}
                      description={e.description}
                      image={e.image}
                      tags={e.tags}
                      category={e.category.category}
                      author={e.author.username}
                      author_id={e.author.id}
                      id={e.id}
                      like={e.like_count}
                      dislike={e.dislike_count}
                      userInteractions={e.user_interactions}
                      onokclick={handleUserArticle}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">NO ARTICLE FOUND</p>
            )}
          </div>
        </div>
      </div>

      <hr />
      <ToastContainer />
    </div>
  );
}

export default MyProfile;
