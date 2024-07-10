import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  chakra,
  Text,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaInbox } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useToast } from "@chakra-ui/react";
const CFaInbox = chakra(FaInbox);

const VerifyEmail = ({ emailSent }) => {
  const email = localStorage.getItem("email");
  const [clickResendEmail, setClickResendEmail] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const resendEmail = () => {
    setClickResendEmail(false);
    dispatch(resendEmail({ email: email }));
    setClickResendEmail(true);
  };

  useEffect(() => {
    if (emailSent && clickResendEmail) {
      toast({
        position: "top",
        title: "Success",
        description: "Your email has been resend successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (!emailSent && clickResendEmail) {
      toast({
        position: "top",
        title: "Failure",
        description:
          "We're sorry, an error occured when trying to resend email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [emailSent, clickResendEmail]);

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
          <CFaInbox color="yellow.500" size={100} />
          <Heading as="h3" size="lg" color={"white"}>
            Verify your email to continue
          </Heading>
          <Text fontSize="lg" color={"yellow"} textAlign={"center"}>
            We just sent an email to the address: {email}
            <br />
            Please check your email and select the link provided to verify your
            address
          </Text>
          <Stack
            flexDir="row"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              borderRadius={0}
              onClick={resendEmail}
              variant="outline"
              colorScheme="yellow"
              width="full"
            >
              Send again
            </Button>

            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="yellow"
              width="full"
            >
              <Link href="mailto:">Open Inbox</Link>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    emailSent: state.emailSent,
  };
}
export default connect(mapStateToProps)(VerifyEmail);
