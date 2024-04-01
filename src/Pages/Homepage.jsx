import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../components/Navbar/StickyNavbar";
import { ArticleCards } from "../components/Cards/ArticleCards";
import {
  CreatePreference,
  DeletePreference,
  GetArticles,
  GetCategory,
  GetUserPreferences,
} from "../Services/Services";
import { jwtDecode } from "jwt-decode";
import { FaPlus, FaPlusCircle, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Homepage() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [category, setCategory] = useState(null);
  const [article, setArticle] = useState(null);
  const [preference, setPreference] = useState(null);
  const [filteredpref, setFilteredpref] = useState([]);

  const[filtered,setFiltered] = useState(null)

  useEffect(() => {
    handleListCategory();
    handleCategoryClick(selectedCategory);
    handlePreferenceList();
    filterPreference();

    // filterPreference(preference,category)
  }, []);

  const handleListCategory = async () => {
    try {
      const res = await GetCategory();
      // console.log(res.data, "sdaasda");
      setCategory(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const filterPreference = async () => {
    try {
      const res = await GetCategory();
      const res1 = await GetUserPreferences(decoded.user_id);
      console.log(res.data,"category");
      console.log(res1.data,"preferences");
      const preferenceCategories = res1.data.map(pref => pref.preference.category);

      // Filtering out categories that are in preferences
      const filteredCategoryList = res.data.filter(cat => !preferenceCategories.includes(cat.category));
      setFiltered(filteredCategoryList)
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreferenceList = async () => {
    try {
      const res = await GetUserPreferences(decoded.user_id);
     
      setPreference(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePreference = async (id) => {
    if (preference.length <= 1) {
      toast.warning("Sorry,You should have atleast three preferences");
      return;
    }
    try {
      const res = await DeletePreference(id);
      handlePreferenceList();
      console.log(category, "cate");
      const preference = "foryou";
      handleCategoryClick(preference);
      filterPreference();
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePreference = async (id) => {
    if (preference.length >= 8) {
      toast.warning("Sorry,You can only have atmost eight preferences");
      return;
    }
    try {
      const data = {
        user: decoded.user_id,
        preference: id,
      };
      
      const res = await CreatePreference(data);
      handlePreferenceList();
      const preference = "foryou";
      handleCategoryClick(preference);
      filterPreference();
    } catch (error) {
      console.log(error);
    }
  };

  // select category
  const [selectedCategory, setSelectedCategory] = useState("foryou");

  const handleCategoryClick = async (category) => {
    console.log("aaani");
    if (category === "foryou") {
      setSelectedCategory(category);
      try {
        const res = await GetUserPreferences(decoded.user_id);
        const preferencesArray = res.data.map((item) => item.preference.id);
        const data = {
          category_ids: preferencesArray,
        };
        const res1 = await GetArticles(data);
const filteredArticles = res1.data.filter(article =>
  !article.user_interactions.some(
    interaction => interaction.user === decoded.user_id && interaction.blocked
  )
);

setArticle(filteredArticles);

      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedCategory(category);
      try {
        let arr = [];
        arr.push(category);
        const data = {
          category_ids: arr,
        };
        
        const res1 = await GetArticles(data);
const filteredArticles = res1.data.filter(article =>
  !article.user_interactions.some(
    interaction => interaction.user === decoded.user_id && interaction.blocked
  )
);

setArticle(filteredArticles);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <div className="bg-gray-200 min-h-screen h-full ">
      <div className="mt-2">
        <StickyNavbar />
      </div>

      <div className="w-full flex justify-between">
        <div className="w-2/3 ">
          <div className="w-full border-gray-300 border-r-2">
            <div className="mt-10  flex justify-center">
              <div className="border-gray-300 border-b-2 w-3/5 mr-20 mt-10 flex gap-12 pb-3 pr-4 overflow-x-auto no-scrollbar">
                <h2
                  onClick={() => handleCategoryClick("foryou")}
                  className={`text-sm no-wrap cursor-pointer ${
                    selectedCategory === "foryou" ? "text-blue-500" : ""
                  }`}
                >
                  For you
                </h2>
                {category?.map((e) => (
                  <h2
                    key={e.id}
                    className={`text-sm no-wrap cursor-pointer ${
                      selectedCategory === e.id ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleCategoryClick(e.id)}
                  >
                    {e.category}
                  </h2>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <div className="flex">
                <div className="h-full ml-5">
                  {article && article.length > 0 ? (
                    article.map((e) => (
                      <div className="flex justify-center mb-5" key={e.id}>
                        <ArticleCards
                          name={e.article_name}
                          description={e.description}
                          image={`${import.meta.env.VITE_BASE_URL}${e.image}`}
                          tags={e.tags}
                          category={e.category.category}
                          author={e.author.username}
                          author_id={e.author.id}
                          id={e.id}
                          like={e.like_count}
                          dislike={e.dislike_count}
                          userInteractions={e.user_interactions}
                          onokclick={handleCategoryClick}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-center">NO ARTICLE FOUND</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-16 w-1/3">
          <div className="flex justify-center">
            <h1 className="font-bold">Your Preferences</h1>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5 mt-10">
              {preference?.map((e) => (
                <div className="w-28 rounded-full border border-blue-gray-200 h-10 flex justify-center items-center ">
                  <h1 className="text-sm mr-2">{e.preference.category}</h1>
                  <FaTrash
                    onClick={() => handleDeletePreference(e.id)}
                    className="hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <h1 className="font-bold">Select Your Preferences</h1>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5 mt-10">
              {filtered?.map((e) => (
                <div className="w-28 rounded-full border border-blue-gray-200 h-10  flex justify-center items-center ">
                  <h1 className="text-sm mr-2">{e.category}</h1>
                  <FaPlusCircle
                    onClick={() => handleCreatePreference(e.id)}
                    color="Gray"
                    className="hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Homepage;
