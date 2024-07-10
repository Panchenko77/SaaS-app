import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, toggleLoading } from "../redux/actions/authActions";
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
  Spinner,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaHandPeace } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { useFormik } from "formik";
import { SignupSchema } from "../validationSchemas/SignupSchema";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowConfirmClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const callbackRef = useRef();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setClickRegister(true);
      dispatch(
        register({
          email: values.email,
          password: values.password,
          name: values.name,
        })
      );
    },
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    const { isAuthenticated, emailSent } = props;
    console.log(isAuthenticated);
    if (isAuthenticated && emailSent && clickRegister) {
      toast({
        position: "top",
        title: "Account created.",
        description: "Congratulations! We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/verify");
    } else if (!(isAuthenticated && emailSent) & clickRegister) {
      toast({
        position: "top",
        title: "Failure",
        description:
          "We're sorry, an error occured when creating your account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [props.isAuthenticated, props.emailSent]);

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
                  <InputGroup mb={2}>
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
                  <div>
                    {formik.errors.email ? (
                      <p style={{ color: "red" }}>{formik.errors.email}</p>
                    ) : null}
                  </div>
                </FormControl>
                <FormControl>
                  <InputGroup mb={2}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="white.300" />}
                    />
                    <Input
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      type="name"
                      placeholder="name"
                      color={"white"}
                      _placeholder={{ color: "grey.200" }}
                    />
                  </InputGroup>
                  <div>
                    {formik.errors.name ? (
                      <p style={{ color: "red" }}>{formik.errors.name}</p>
                    ) : null}
                  </div>
                </FormControl>
                <FormControl>
                  <InputGroup mb={2}>
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
                  <div>
                    {formik.errors.password ? (
                      <p style={{ color: "red" }}>{formik.errors.password}</p>
                    ) : null}
                  </div>
                </FormControl>
                <FormControl>
                  <InputGroup mb={2}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="white.300"
                      children={<CFaLock color="white.300" />}
                    />
                    <Input
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
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
                        onClick={handleShowConfirmClick}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <div>
                    {formik.errors.confirmPassword ? (
                      <p style={{ color: "red" }}>
                        {formik.errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="yellow"
                    width="full"
                  >
                    {/* {!loading && <Spinner mr={2} />} */}
                    Register
                  </Button>
                </FormControl>
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
                Signup with Google
              </Button>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="yellow"
                width="full"
              >
                {<SiApple mr={4} size={25} />}
                Signup with Apple
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Box display={"flex"} alignItems={"space-between"}>
          <Text color={"white"} mr={2}>
            Already have account?
          </Text>
          <Link color="yellow.500" href="/login">
            Log In
          </Link>
        </Box>
      </Flex>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    emailSent: state.auth.emailSent,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Signup);
