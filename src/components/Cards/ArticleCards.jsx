import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

import { FaEdit, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  ArticleInteractions,
  DeleteArticle,
  EditArticles,
} from "../../Services/Services";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialogue } from "../drawer/ConfirmDialogue";
import EditArticleDialogue from "../drawer/EditArticleDialogue";
import { ArticleView } from "../drawer/ArticleView";

export function ArticleCards({
  name,
  description,
  image,
  author_id,
  tags,
  category,
  author,
  id,
  like,
  dislike,
  userInteractions,
  onokclick,
}) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };
  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleArticleEdit = async (data, img) => {
    console.log(data, "data");
    console.log(img, "image");
    try {
      const formData = new FormData();
      formData.append("article_name", data.article_name);
      // formData.append("category", data.category);
      formData.append("tags", data.tags);
      formData.append("description", data.description);
      formData.append("author", decoded.user_id);
      if (img instanceof File) {
        formData.append("image", img);
      }

      const res = await EditArticles(id, formData);
      console.log(res.data);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };
  const handleArticleDelete = async () => {
    try {
      const res = await DeleteArticle(id);
      console.log(res.data);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const [article, setArticle] = useState({
    article_name: name,
    description: description,
    image: image,
    tags: tags,
    category: category,
  });

  console.log(author, "author");

  const onSubmit = () => {
    const preference = "foryou";
    onokclick(preference);
  };
  useEffect(() => {
    const currentUserInteraction = userInteractions.find(
      (interaction) => interaction.user === decoded.user_id
    );

    if (currentUserInteraction) {
      setIsLiked(currentUserInteraction.liked);
      setIsDisliked(currentUserInteraction.disliked);
    } else {
      setIsLiked(false);
      setIsDisliked(false);
    }
  }, []);

  // truncate words
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");

    if (words.length > wordLimit) {
      const truncatedDescription = words.slice(0, wordLimit).join(" ") + "...";
      return truncatedDescription;
    }
    return description;
  };

  const truncatedDescription = truncateDescription(description, 20);

  const [isDisliked, setIsDisliked] = useState(false);
  const handledislike = async () => {
    try {
      const data = {
        user: decoded.user_id,
        article: id,
        action: "dislike",
      };
      const res = await ArticleInteractions(data);
      console.log(res.data, "hi");
      setIsLiked(false);
      setIsDisliked(true);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = async () => {
    try {
      const data = {
        user: decoded.user_id,
        article: id,
        action: "like",
      };
      const res = await ArticleInteractions(data);
      console.log(res.data, "like");
      setIsLiked(true);
      setIsDisliked(false);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id) => {
    try {
      const data = {
        user: decoded.user_id,
        article: id,
        action: "block",
      };
      const res = await ArticleInteractions(data);
      console.log(res.data, "block");
      setIsLiked(false);
      setIsDisliked(false);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-[48rem] flex-col md:flex-row h-auto md:h-80">
      <CardHeader
        shadow={false}
        floated={false}
        className="mb-3 md:w-2/5 md:shrink-0 md:rounded-r-none"
      >
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-4 md:p-0">
        <div className="flex justify-between">
          <Typography variant="h6" color="gray" className="mt-4 mb-4 uppercase">
            {category}
          </Typography>
          {decoded.user_id === author_id ? (
            <div className="mt-4 mr-8">
              <Tooltip content="Edit this post">
                <button className="hover:scale-110 mr-2">
                  <FaEdit onClick={() => handleEditClick()} />
                  <EditArticleDialogue
                    isOpen={isEditDialogOpen}
                    onClose={handleCloseDialog}
                    title="Edit Article"
                    profile_data={article}
                    setProfileData={setArticle}
                    onSubmit={handleArticleEdit}
                  />
                </button>
              </Tooltip>
              <Tooltip content="Delete this post">
                <button className="hover:scale-110">
                  <ConfirmDialogue
                    purpose="delete"
                    id={id}
                    header="Delete"
                    content="This Post Will be permanently deleted "
                    onsubmit={handleArticleDelete}
                  />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="mt-4 mr-8">
              <Tooltip content="Block this post">
                <button className="hover:scale-110">
                  <ConfirmDialogue
                    purpose="block"
                    id={id}
                    header="Block"
                    content="You won't be able to see this post again"
                    onsubmit={handleBlock}
                  />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
        <Typography variant="h4" color="blue-gray" className="mb-2 w-3/4">
          {name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {truncatedDescription}
        </Typography>
        <a className="inline-block">
          <div className="flex justify-around">
            <ArticleView
              article_name={name}
              description={description}
              image={image}
              author={author}
              tags={tags}
              category={category}
            />

            <div className="mt-1 ml-10 flex gap-1">
              <button
                className={` focus:outline-none transform transition-all ${
                  isLiked ? "scale-110 text-blue-700" : ""
                }`}
                onClick={handleLike}
              >
                <FaThumbsUp />
              </button>
              <h1 className="text-sm mt-2">{like}</h1>
            </div>

            <div className="mt-1 ml-5 flex gap-1 ">
              <button
                className={` focus:outline-none transform transition-all mt-1 ${
                  isDisliked ? "scale-110 text-blue-700" : ""
                }`}
                onClick={handledislike}
              >
                <FaThumbsDown />
              </button>
              <h1 className="text-sm mt-2">{dislike}</h1>
            </div>
          </div>
        </a>
      </CardBody>
    </Card>
  );
}
