import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Navbar from "./Navbar";
import { Flex, SimpleGrid, Button } from "@chakra-ui/react";

import ProjectCard from "./common/project/card";
import CreateModal from "./common/project/create";
import UpdateModal from "./common/project/edit";
import ShowModal from "./common/project/view";
import { deleteProject, getProjects } from "../redux/actions/projectActions";
import { getUserById } from "../redux/actions/authActions";
import { useSearchParams, useParams, useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const [createable, setCreateable] = useState(false);
  const [updateable, setUpdateable] = useState(false);
  const [showable, setShowable] = useState(false);
  const [selected, setSelected] = useState(false);
  // const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  // const { userId, token } = useParams();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const handleClick = (type, open, id) => {
    setSelected(id);
    switch (type) {
      case "show":
        setShowable(open);
        break;
      case "edit":
        setUpdateable(open);
        break;
      case "delete":
        dispatch(deleteProject(id));
        break;
    }
  };

  useEffect(() => {
    if (userId && token) dispatch(getUserById({ userId, token }));
    // 10
  }, []);

  useEffect(() => {
    dispatch(getProjects());
  }, [getProjects]);

  return (
    <div>
      <Navbar></Navbar>

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="black"
        justifyContent="top"
        alignItems="center"
      >
        <Button
          mt={5}
          mb={5}
          variant="solid"
          colorScheme="yellow"
          onClick={() => setCreateable(props.isAuthenticated)}
        >
          Create Project
        </Button>

        <Flex
          flexDirection="row"
          backgroundColor="black"
          justifyContent="center"
          alignItems="center"
          flexWrap={"wrap"}
          gap={"10"}
        >
          {projects &&
            projects.map((project, key) => (
              <ProjectCard
                key={key}
                project={project}
                onClick={(type, open, id) => handleClick(type, open, id)}
              />
            ))}
        </Flex>
      </Flex>
      <CreateModal isOpen={createable} onClose={() => setCreateable(false)} />
      <UpdateModal
        isOpen={updateable}
        onClose={() => setUpdateable(false)}
        projectId={selected}
      />
      <ShowModal
        isOpen={showable}
        onClose={() => setShowable(false)}
        projectId={selected}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Dashboard);
