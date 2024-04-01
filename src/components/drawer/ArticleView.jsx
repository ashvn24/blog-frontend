import React, { useState } from "react";
import profile_photo from "../../assets/profile/3dprof.jpg";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";

export function ArticleView({
  article_name,
  author,
  description,
  image,
  category,
  tags,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className="flex items-center gap-2 mr-28"
      >
        Read More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>

      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src={profile_photo}
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {author}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                {article_name}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm">{category}</h1>
          </div>
        </DialogHeader>
        <div className="flex">
          <DialogBody
            divider={true}
            className="w-1/2 p-0"
            style={{ overflow: "hidden" }}
          >
            {/* Image portion */}

            <img
              alt="nature"
              className="h-[41rem] w-full object-cover object-center"
              src={image}
            />
          </DialogBody>
          <div className="w-1/2 p-0">
            <div className="h-[37rem] p-4 border-t border-gray-200 overflow-x-auto no-scrollbar">
              {/* Multiple Comments */}
              <div className="flex justify-between mb-4"></div>

              <div className="flex justify-center">
                <p className="font-serif">{description}</p>
              </div>
            </div>

            {/* Fixed Input Field */}
            <div className="p-4 border-t border-gray-200 ">
              <div className="flex space-x-2 text-center w-full">
                <h1 className="w-full overflow-x-auto whitespace-nowrap text-blue-900">
                  {tags}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
