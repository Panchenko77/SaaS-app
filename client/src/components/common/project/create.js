import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
  OrderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";

import { createProject } from "../../../redux/actions/projectActions";

const CreateModal = (props) => {
  const { isOpen, onClose } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [issue, setIssue] = useState("");
  const [issues, setIssues] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setStatus("open");
      setIssue("");
      setIssues([]);
    }
  }, [isOpen]);

  const handleClick = (e, key) => {
    switch (e.target.name) {
      case "append":
        const newIssue = { text: issue, author: user._id };
        setIssues([...issues, newIssue]);
        break;
      case "delete":
        setIssues(issues.filter((item, i) => key !== i));
        break;
      case "save":
        dispatch(createProject({ name, description, status, issues }));
        onClose();
        break;
      default:
        break;
    }
    setIssue("");
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "issue":
        setIssue(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent backgroundColor={"gray"}>
        <ModalHeader color={"yellow.400"}>Create your Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel color={"yellow.400"}>Project name</FormLabel>
            <Input
              placeholder="Project name"
              _placeholder={{ color: "yellow.400" }}
              name="name"
              onChange={handleChange}
              value={name}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color={"yellow.400"}>Project description</FormLabel>
            <Textarea
              placeholder="Project description"
              name="description"
              onChange={handleChange}
              value={description}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color={"yellow.400"}>Project status</FormLabel>
            <RadioGroup onChange={setStatus} value={status}>
              <Stack direction="row">
                <Radio value="open" color={"blue.500"}>
                  <Text>Open</Text>
                </Radio>
                <Radio value="inprogress" colorScheme={"yellow"}>
                  <Text color={"yellow"}>In Progress</Text>
                </Radio>
                <Radio value="done" colorScheme={"green"}>
                  <Text color={"green"}>Done</Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color={"yellow.400"}>Append issue</FormLabel>
            <Button colorScheme="yellow" name="append" onClick={handleClick}>
              Append
            </Button>
            <Input
              mt={4}
              name="issue"
              placeholder="Issue name"
              onChange={handleChange}
              value={issue}
            />
            <OrderedList>
              {issues &&
                issues.map((item, key) => (
                  <ListItem key={key}>
                    {item.text}
                    <Button
                      colorScheme="red"
                      name="delete"
                      onClick={(e) => handleClick(e, key)}
                      size="sm"
                      ml={3}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
            </OrderedList>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="yellow"
            borderRadius={0}
            mr={3}
            name="save"
            onClick={handleClick}
          >
            Save
          </Button>
          <Button borderRadius={0} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
