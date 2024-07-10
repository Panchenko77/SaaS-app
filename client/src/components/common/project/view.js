import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Badge,
  Text,
  Input,
  ListItem,
  Checkbox,
  List,
  Divider,
  Stack,
} from "@chakra-ui/react";

import {
  addIssueOrComment,
  deleteIssueOrComment,
  getProject,
  updateIssueOrComment,
} from "../../../redux/actions/projectActions";

import { MdDescription } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

const ShowModal = (props) => {
  const { onClose, isOpen, projectId } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [author, setAuthor] = useState("");
  const [issues, setIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [issue, setIssue] = useState([]);
  const [comment, setComment] = useState([]);
  const [edit, setEdit] = useState(null);

  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setStatus("");
      setAuthor("");
      setIssues([]);
      setComments([]);
      setIssue("");
      setComment("");
      setEdit(null);
    } else {
      if (projectId) dispatch(getProject(projectId));
    }
  }, [isOpen, projectId]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStatus(project.status);
      setAuthor(project.author.email);
      setIssues(project.issues);
      setComments(project.comments);
    }
  }, [project]);

  const debouncedUpdateIssueOrComment = _.debounce(
    (projectId, type, id, data) => {
      dispatch(updateIssueOrComment(projectId, type, id, data));
    },
    300
  );

  const debouncedAddIssueOrComment = _.debounce((projectId, type, data) => {
    dispatch(addIssueOrComment(projectId, type, data));
  }, 300);

  const debouncedDeleteIssueOrComment = _.debounce((projectId, type, id) => {
    dispatch(deleteIssueOrComment(projectId, type, id));
  }, 300);

  const handleClick = (e, key, type) => {
    switch (e.target.name) {
      case "append":
        edit === null
          ? debouncedAddIssueOrComment(projectId, type, {
              text: type === "issues" ? issue : comment,
            })
          : debouncedUpdateIssueOrComment(
              projectId,
              type,
              type === "issues" ? issues[key]._id : comments[key]._id,
              {
                text: type === "issues" ? issue : comment,
              }
            );

        setIssue("");
        setComment("");
        setEdit(null);
        break;
      case "check":
        debouncedUpdateIssueOrComment(projectId, "issues", issues[key]._id, {
          status: e.target.checked,
        });
        break;
      case "edit":
        type === "issues"
          ? setIssue(issues[key].text)
          : setComment(comments[key].text);
        setEdit(key);
        break;
      case "delete":
        debouncedDeleteIssueOrComment(
          projectId,
          type,
          type === "issues" ? issues[key]._id : comments[key]._id
        );
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "issue":
        setIssue(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="black">
        <ModalHeader>
          <Heading color="yellow.400" textAlign={"center"}>
            {name}
            <Badge
              ml="5"
              colorScheme={
                status === "open"
                  ? "purple"
                  : status === "inprogress"
                  ? "red"
                  : "green"
              }
            >
              {status}
            </Badge>
          </Heading>
          <Text textAlign={"center"} color="yellow.100">
            {author}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack flexDir={"row"} alignItems={"center"}>
            <Text color="yellow.400">DESCRIPTION</Text>
            <MdDescription size={40} fill="orange" />
          </Stack>

          <Text color="yellow.100">{description}</Text>
          <Divider mt={5} orientation="horizontal" />
          <Stack flexDir={"row"} alignItems={"center"} mb={5} mt={5}>
            <Text color="orange.400">ISSUES</Text>
            <AiOutlineIssuesClose size={40} fill="orange" />
          </Stack>

          <List mt={5}>
            {issues &&
              issues.map((item, key) => {
                console.log(item);
                return (
                  <ListItem key={key}>
                    <Text color="blue.500">Author: {item.author.email}</Text>
                    <Checkbox
                      name="check"
                      colorScheme={"green"}
                      onChange={(e) => handleClick(e, key, "issues")}
                      defaultChecked={item.status}
                    >
                      <Text
                        // textDecorationLine={
                        //   issues[key].status ? "line-through" : "none"
                        // }
                        color="yellow.100"
                      >
                        {item.text}
                      </Text>
                    </Checkbox>
                    {/* <Button
                    colorScheme="green"
                    name="edit"
                    onClick={(e) => handleClick(e, key, "issues")}
                    size="sm"
                  >
                    Edit
                  </Button> */}
                    <Button
                      colorScheme="red"
                      name="delete"
                      onClick={(e) => handleClick(e, key, "issues")}
                      size="sm"
                      ml={5}
                    >
                      Delete
                    </Button>
                  </ListItem>
                );
              })}
          </List>

          <Button
            mt={5}
            borderRadius={0}
            colorScheme="yellow"
            name="append"
            onClick={(e) => handleClick(e, edit, "issues")}
          >
            Add Issue
          </Button>

          <Input
            mt={4}
            name="issue"
            textColor={"yellow.500"}
            placeholder="Issue name"
            onChange={handleChange}
            value={issue}
          />
          <Divider mt={5} orientation="horizontal" />

          <Stack flexDir={"row"} alignItems={"center"} mb={5} mt={5}>
            <Text color="white">COMMENTS</Text>
            <FaComments size={40} fill="white" />
          </Stack>

          <Button
            borderRadius={0}
            colorScheme="yellow"
            name="append"
            onClick={(e) => handleClick(e, edit, "comments")}
          >
            Add Comment
          </Button>
          <Input
            mt={4}
            textColor={"yellow.500"}
            name="comment"
            placeholder="Comment name"
            onChange={handleChange}
            value={comment}
          />
          <List>
            {comments &&
              comments.map((item, key) => (
                <ListItem key={key}>
                  <Text color={"blue.500"}>Author: {item.author.email}</Text>
                  <Text color={"white"}>{item.text}</Text>
                  {/* <Button
                    colorScheme="green"
                    name="edit"
                    onClick={(e) => handleClick(e, key, "comments")}
                    size="sm"
                  >
                    Edit
                  </Button> */}
                  <Button
                    colorScheme="red"
                    name="delete"
                    onClick={(e) => handleClick(e, key, "comments")}
                    size="sm"
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
          </List>
          <Divider mt={5} mb={5} orientation="horizontal" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShowModal;
