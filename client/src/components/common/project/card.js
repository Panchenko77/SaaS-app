import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  IconButton,
  Badge,
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaSearch, FaEraser } from "react-icons/fa";

const ProjectCard = ({ project, onClick }) => {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        backgroundColor="black"
        color="white"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">
              {project.name}
              <Badge
                ml="5"
                bg={
                  project.status === "open"
                    ? "blue.500"
                    : project.status === "inprogress"
                    ? "yellow"
                    : "green"
                }
              >
                {project.status === "open"
                  ? "Open"
                  : project.status === "inprogress"
                  ? "In Progress"
                  : "Done"}
              </Badge>
            </Heading>

            <Text py="2">{project.description}</Text>
          </CardBody>

          <CardFooter>
            <Stack flexDir="row" justifyContent="end" alignItems="end">
              <IconButton
                colorScheme="yellow"
                aria-label="Search database"
                icon={<FaSearch />}
                onClick={() => onClick("show", true, project._id)}
              />
              <IconButton
                colorScheme="green"
                aria-label="Search database"
                icon={<FaEdit />}
                onClick={() => onClick("edit", true, project._id)}
              />
              <IconButton
                colorScheme="red"
                aria-label="Search database"
                icon={<FaEraser />}
                onClick={() => onClick("delete", true, project._id)}
              />
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default ProjectCard;
