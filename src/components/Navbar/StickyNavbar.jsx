import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  
} from "@material-tailwind/react";


import { FaUserCircle } from "react-icons/fa";
import { Logout } from "../../Services/Services";
import { useNavigate } from "react-router-dom";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const LogoutFn = async () => {
    try {
      await Logout();
      navigate("/"); // Navigate after successful logout
    } catch (error) {
      console.log(error);
      // Handle errors if needed
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          onClick={() => navigate("/user/homepage/")}
          href="#"
          className="flex items-center"
        >
          Home
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          href="#"
          onClick={() => navigate("/user/createarticle/")}
          className="flex items-center"
        >
          Create Article
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-4 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            onClick={() => navigate("/user/homepage/")}
            className="mr-4 cursor-pointer py-1.5 font-serif font-bold text-xl ml-2"
          >
            Article Flow
          </Typography>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Typography as="div" className="relative group">
                <Menu>
                  <MenuHandler>
                    <Button
                      variant="text"
                      className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
                    >
                      <FaUserCircle size={28} />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <div className="flex justify-between">
                      <MenuItem onClick={() => navigate("/user/profile/")}>
                        Profile
                      </MenuItem>
                    </div>

                    <hr className="my-3" />
                    <MenuItem onClick={LogoutFn}>Sign Out</MenuItem>
                  </MenuList>
                </Menu>
              </Typography>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
