import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <div className="container max-w-xl w-11/12 md:w-8/12">
      <div className="flex justify-center p-3 w-full mt-10 mx-0 mb-4 bg-white border rounded-lg ">
        <p className="text-4xl">Chatter</p>
      </div>
      <div className="bg-white p-4 w-full border rounded-lg">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
