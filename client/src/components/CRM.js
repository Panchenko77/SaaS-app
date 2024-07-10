import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";
import { SiOpenai } from "react-icons/si";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Text,
  Checkbox,
  Select,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { connect, useDispatch } from "react-redux";
import { getParsedUsersFromFiles } from "../redux/actions/dataActions";
import { useToast } from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { useFormik } from "formik";
import { CampaignSchema } from "../validationSchemas/CampaignSchema";
import { createCampaign } from "../redux/actions/campaignActions";
import {
  getCampaignsProspects,
  getConversationDetails,
  getParsedUsersFromAllFiles,
  getRecording,
} from "../redux/actions/crmActions";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

const CRM = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [campaignCheckedUsers, setCampaignCheckedUsers] = useState([]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { conversations, recordings } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [campaignStartDate, setCampaignStartDate] = useState();
  const [campaignEndDate, setCampaignEndDate] = useState();
  const [campaignType, setCampaignType] = useState("");
  const [whatsappChecked, setWhatsappChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);
  const [voiceChecked, setVoiceChecked] = useState(true);
  const rowsPerPage = 5; // You can adjust this number as needed
  const numPages = Math.ceil(props.prospects?.length / rowsPerPage);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [whatsappConversations, setWhatsappConversations] = useState([]);
  const [voiceConversations, setVoiceConversations] = useState([]);
  const [emailConversations, setEmailConversations] = useState([]);

  const currentPageData = props.prospects?.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const nextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, numPages - 1));
  };

  const previousPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 0));
  };

  const [parsedUsersFromFiles, setParsedUsersFromFiles] = useState([]);
  // useEffect(() => {
  //   // dispatch(getCampaignProspects(campaignStartDate, campaignEndDate));
  // }, []);

  useEffect(() => {
    if (props.isError) {
      toast({
        position: "top",
        title: "Failure",
        description: props.errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [props.prospects, props.isError, props.errorMessage]);

  useEffect(() => {
    if (selected)
      dispatch(
        getConversationDetails(
          campaignStartDate,
          campaignEndDate
          // selected.phoneNumber,
          // selected.email
        )
      );
  }, [selected]);

  useEffect(() => {
    console.log("conversations, recordings: ", conversations, recordings);

    const whatsappConversations = conversations.filter(
      (conversation) => conversation.conversationType === "whatsapp"
    );

    const voiceConversations = conversations.filter(
      (conversation) => conversation.conversationType === "voice"
    );

    const emailConversations = conversations.filter(
      (conversation) => conversation.conversationType === "email"
    );

    setWhatsappConversations(
      whatsappConversations.length > 0
        ? whatsappConversations.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        : whatsappConversations
    );

    setVoiceConversations(
      voiceConversations.length > 0
        ? voiceConversations.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        : voiceConversations
    );

    setEmailConversations(
      emailConversations.length > 0
        ? emailConversations.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        : emailConversations
    );
  }, [conversations, recordings]);

  const handleDateSelect = (ranges) => {
    console.log(ranges);

    ranges.selection.startDate.setHours(
      ranges.selection.startDate.getHours() + 4
    );
    ranges.selection.endDate.setHours(ranges.selection.endDate.getHours() + 4);

    const newSelectionRange = {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    };
    setSelectionRange(newSelectionRange);
    setCampaignStartDate(ranges.selection.startDate);
    setCampaignEndDate(ranges.selection.endDate);
    dispatch(
      getCampaignsProspects(
        ranges.selection.startDate,
        ranges.selection.endDate
      )
    );
    // formik.setFieldValue("startDate", ranges.selection.startDate);
    // formik.setFieldValue("endDate", ranges.selection.endDate);

    // dispatch(
    //   getConversationDetails(
    //     ranges.selection.startDate,
    //     ranges.selection.endDate
    //   )
    // );
  };

  const MessageConversations = () => {
    let messageDirection = "incoming";
    let conversations = [];

    switch (campaignType) {
      case "voice":
        conversations = [...voiceConversations];
        break;
      case "whatsapp":
        conversations = [...whatsappConversations];
        break;
      case "email":
        conversations = [...emailConversations];
        break;
      default:
        break;
    }
    return conversations.map((conversation, key) => {
      if (key > 0) {
        messageDirection =
          conversations[key - 1].from !== conversation.from
            ? messageDirection === "incoming"
              ? "outgoing"
              : "incoming"
            : messageDirection;
      }
      return (
        <>
          <Message
            model={{
              message: conversation.text,
              sentTime: conversation.createdAt,
              sender: conversation.from,
              direction: messageDirection,
            }}
          />
          <MessageSeparator>
            {new Date(conversation.createdAt).toLocaleString()}
          </MessageSeparator>
        </>
      );
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100wh"
          backgroundColor="black"
          justifyContent="center"
          alignItems="center"
        >
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "orange",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Conversation Details And Audio Files
          </h1>

          <Flex justifyContent={"center"} flexDirection="column">
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "orange",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Please select date range for campaign(start date and end date)
            </h1>
            <DateRange ranges={[selectionRange]} onChange={handleDateSelect} />
          </Flex>

          <TableContainer>
            <Table variant="simple">
              <TableCaption color="orange"></TableCaption>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th color={"gray"}>Name</Th>
                  <Th color={"gray"}>First Name</Th>
                  <Th color={"gray"} isNumeric>
                    Phone Number
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPageData?.map((user, index) => (
                  <Tr
                    key={index}
                    onClick={() => {
                      setIsOpen(true);
                      setSelected(user);
                    }}
                  >
                    <Td>
                      <Button
                        borderRadius={0}
                        mr={5}
                        onClick={previousPage}
                        disabled={currentPage === 0}
                        colorScheme="transparent"
                      >
                        <SiOpenai color="green"></SiOpenai>
                      </Button>
                    </Td>
                    <Td color={"yellow"}>{user.name}</Td>
                    <Td color={"yellow"}>{user.firstName}</Td>
                    <Td color={"yellow"} isNumeric>
                      {user.phoneNumber}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Td>
                  <Text color={"grey"}>Page: {currentPage + 1}</Text>
                  {/* <Text color={"grey"}>Total: {numPages}</Text> */}
                </Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <Text color={"grey"}>Total pages: {numPages}</Text>
                  {/* <Text color={"grey"}>Total: {numPages}</Text> */}
                </Td>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="space-between" mt="4">
            <Button
              borderRadius={0}
              mr={5}
              onClick={previousPage}
              disabled={currentPage === 0}
              colorScheme="yellow"
            >
              Previous
            </Button>
            <Button
              colorScheme="yellow"
              borderRadius={0}
              onClick={nextPage}
              disabled={currentPage >= numPages - 1}
            >
              Next
            </Button>
          </Box>

          <Flex marginTop={10} justifyContent={"center"}>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="yellow"
              width="30"
            >
              {/* {!loading && <Spinner mr={2} />} */}
              Get Details
            </Button>
          </Flex>
        </Flex>
      </div>

      {/* Adaugă funcționalitatea pentru configurarea campaniilor aici */}

      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        onClick={() => setIsOpen(false)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent backgroundColor={"gray"}>
          <ModalHeader color={"yellow.400"}>Conversation history</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Button
                colorScheme="yellow"
                borderRadius={0}
                onClick={() => setCampaignType("voice")}
              >
                See Voice Conversations And Audio
              </Button>
              <Button
                colorScheme="green"
                borderRadius={0}
                onClick={() => setCampaignType("whatsapp")}
              >
                See Whatsapp Conversations
              </Button>
              <Button
                colorScheme="blue"
                borderRadius={0}
                onClick={() => setCampaignType("email")}
              >
                See Email Conversations
              </Button>
            </Stack>

            <MainContainer>
              <ChatContainer>
                <MessageList>{MessageConversations()}</MessageList>
              </ChatContainer>
            </MainContainer>
            <Text>Recordings</Text>
            <UnorderedList styleType="'-'">
              {recordings &&
                recordings.map((recording, key) => {
                  return (
                    <ListItem
                      key={key}
                      onClick={() => {
                        dispatch(getRecording(recording.recordingSid));
                      }}
                    >
                      {recording.recordingSid}
                      {recording.recordingUrl && (
                        <AudioPlayer url={recording.recordingUrl} />
                      )}
                    </ListItem>
                  );
                })}
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button borderRadius={0} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const AudioPlayer = ({ url }) => {
  return (
    <div>
      <audio controls>
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    parsedUsersFromFiles: state.data.parsedUsersFromFiles,
    prospects: state.crm.prospects,
    recordings: state.crm.recordings,
    conversations: state.crm.conversations,
    isError: state.data.isError,
    errorMessage: state.data.errorMessage,
  };
}
export default connect(mapStateToProps)(CRM);
