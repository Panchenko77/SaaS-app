import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../redux/actions/authActions";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaHandPeace } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { useFormik } from "formik";
import { SignupSchema } from "../validationSchemas/SignupSchema";
import { SigninSchema } from "../validationSchemas/SigninSchema";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }));
    },
    validationSchema: SigninSchema,
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [props.isAuthenticated]);

  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_SERVER_URI}api/auth/google`, "_self");
  };

  return (
    <div style={{ color: "black" }}>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="black"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <FaHandPeace color="yellow" bg="yellow" size={40} />
          <Heading color="yellow.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="black"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="white.300" />}
                    />
                    <Input
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      type="email"
                      placeholder="email address"
                      color={"white"}
                      _placeholder={{ color: "grey.200" }}
                    />
                  </InputGroup>
                </FormControl>
                <div>
                  {formik.errors.email ? (
                    <p style={{ color: "red" }}>{formik.errors.email}</p>
                  ) : null}
                </div>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="white.300"
                      children={<CFaLock color="white.300" />}
                    />
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      color="white"
                      _placeholder={{ color: "grey.200" }}
                    />

                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        background={"none"}
                        _hover={{ color: "yellow.500" }}
                        color={"yellow.400"}
                        _active={{ color: "yellow.700" }}
                        onClick={handleShowClick}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <div>
                  {formik.errors.password ? (
                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                  ) : null}
                </div>
                <FormControl></FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="yellow"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
            <Stack spacing={4} p="1rem" backgroundColor="black" boxShadow="md">
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="yellow"
                width="full"
                onClick={googleLogin}
              >
                {<FcGoogle mr={4} size={25} />}
                Sign in with Google
              </Button>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="yellow"
                width="full"
              >
                {<SiApple mr={4} size={25} />}
                Sign in with Apple
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Box display={"flex"} alignItems={"space-between"}>
          <Text color={"white"} mr={2}>
            New to us?
          </Text>
          <Link color="yellow.500" href="/signup">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Login);
