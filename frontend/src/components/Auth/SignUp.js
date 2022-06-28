import {
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {}, [profilePic]);
  const uploadProfilePicture = async (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      console.log("in");
      const form = new FormData();
      form.append("file", pic);
      form.append("upload_preset", "chat-app");
      form.append("cloud_name", "douoayl8k");
      console.log(form);
      try {
        const config = {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        };
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/douoayl8k/image/upload",
          form,
          config
        );
        console.log(data.url);
        setProfilePic(data.url);
        console.log(profilePic);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

      // .then((res) => res.json())
      // .then((data) => {
      //   let picString = data.url.toString();
      //   console.log(picString);
      //   setProfilePic(picString);

      //   setLoading(false);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   setLoading(false);
      // });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, profilePic },
        config
      );

      toast({
        title: "Sign up successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast({
        title: "Sign up unsuccessful",
        description: err.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <form id="sign-up" className="w-full" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <label htmlFor="full-name" className="block w-full">
          <span className="text-gray-800 font-medium">Full Name</span>
          <input
            id="full-name"
            type="text"
            value={name}
            className="mt-1 w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="sign-up-email" className="block w-full">
          <span className="text-gray-800 font-medium">Email</span>
          <input
            id="sign-up-email"
            type="text"
            value={email}
            className="mt-1 w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Enter a valid email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="sign-up-password" className="block w-full">
          <span className="font-gray-800 font-medium">Password</span>
          <InputGroup>
            <input
              id="sign-up-password"
              type={showPassword === "password" ? "password" : "text"}
              value={password}
              required
              className="mt-1 w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement mt="0.25rem">
              <button
                className="h-7 mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(
                    showPassword === "password" ? "text" : "password"
                  );
                }}
              >
                {showPassword === "password" ? (
                  <EyeIcon className="h-5 w-5 mt-1" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 mt-1" />
                )}
              </button>
            </InputRightElement>
          </InputGroup>
        </label>
        <label htmlFor="confirm-password" className="block w-full">
          <span className="font-gray-800 font-medium">Confirm Password</span>
          <InputGroup>
            <input
              id="confirm-password"
              type={showConfirmPassword === "password" ? "password" : "text"}
              value={confirmPassword}
              required
              className="mt-1 w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement mt="0.25rem">
              <button
                className="h-7 mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(
                    showConfirmPassword === "password" ? "text" : "password"
                  );
                }}
              >
                {showConfirmPassword === "password" ? (
                  <EyeIcon className="h-5 w-5 mt-1" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 mt-1" />
                )}
              </button>
            </InputRightElement>
          </InputGroup>
        </label>
        <label htmlFor="profile-pic" className="flex w-full flex-col">
          <span className="font-gray-800 font-medium">
            Upload a profile picture
          </span>
          <input
            id="profile-pic"
            type="file"
            className="mt-1"
            accept="image/*"
            onChange={(e) => uploadProfilePicture(e.target.files[0])}
          />
        </label>
        <Button
          bg="#bee3f8"
          className="w-full"
          type="submit"
          isLoading={loading}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default SignUp;
