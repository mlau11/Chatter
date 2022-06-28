import {
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
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
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Log in successful",
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
        title: "Log in unsuccessful",
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
    <form id="login" className="w-full" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <label htmlFor="login-email" className="block w-full">
          <span className="text-gray-800 font-medium">Email</span>
          <input
            id="login-email"
            type="text"
            value={email}
            required
            className="mt-1 w-full rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Enter a valid email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="login-password" className="block w-full">
          <span className="font-gray-800 font-medium">Password</span>
          <InputGroup>
            <input
              id="login-password"
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
        <Button
          bg="#bee3f8"
          className="w-full"
          type="submit"
          isLoading={loading}
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <button
          className="w-full h-10 font-gray-800 font-semibold bg-red-400 rounded-lg hover:bg-[#E2E8F0]"
          type="button"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Guest User
        </button>
      </VStack>
    </form>
  );
};

export default Login;
