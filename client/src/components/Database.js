import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Navbar from "./Navbar";
import { Flex, Input, useToast, Select } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import * as Yup from "yup";
import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import { upload } from "../redux/actions/dataActions";
import { useSelector, useDispatch, connect } from "react-redux";
import { DatabaseFileType } from "../redux/consts/project";

const FileUploadSchema = Yup.object().shape({
  myFile: Yup.mixed().required("A file is required"),
});

function Database(props) {
  const [fileName, setFileName] = useState([]);
  const [fileType, setFileType] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      myFile: null,
    },
    validationSchema: FileUploadSchema,
    onSubmit: (values) => {
      console.log("Logging values from onSubmit: ", values);
      const uploadFile = async () => {
        try {
          // await setUploadedStarted(true);
          await dispatch(upload(values.myFile, user._id, fileType));

          // await setUploadedStarted(false);
          console.log("Upload perfect asset ran");
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      };
      uploadFile();
    },
  });

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!props.fileSent && !firstUpdate.current) {
      toast({
        position: "top",
        title: "File Sent.",
        description:
          "Congratulations! The file was successfully saved into the database",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Failure",
        description:
          "We're sorry, an error occured when trying to save the file to database",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [props.fileSent]);

  const onChange = (event) => {
    const { files } = event.target;
    if (files) {
      formik.setFieldValue("myFile", files);
      setFileName(Array.from(files).map((file) => file.name));
    }
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  return (
    <div className="database-container container">
      <Navbar />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="black"
        justifyContent="center"
        alignItems="center"
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "gray",
            marginBottom: 20,
          }}
        >
          Database
        </h1>
        <>
          <Select
            marginTop={10}
            marginbottom={10}
            width={"fit-content"}
            color={"yellow"}
            // placeholder="Select campaign type"
            // _placeholder={{ backgroundColor: "black", color: "yellow" }}
            bg="black"
            colorScheme={"yellow"}
            onChange={(e) => handleFileTypeChange(e)}
          >
            <option selected hidden disabled value="">
              Select file type
            </option>

            <option
              style={{ backgroundColor: "black", color: "yellow" }}
              color="black"
              value={DatabaseFileType.prospectsFile}
            >
              Prospects file
            </option>
            <option
              style={{ backgroundColor: "black", color: "yellow" }}
              color="black"
              value={DatabaseFileType.aiTrainingDataFile}
            >
              Ai Training Data File
            </option>
          </Select>

          <form onSubmit={formik.handleSubmit}>
            <FormControl mb={5}>
              <FormLabel color={"yellow.500"}>
                {fileName.length ? fileName.join(", ") : "No File Selected"}
              </FormLabel>

              <FileUpload
                onChange={onChange}
                accept={".csv, .xlsx, .xls"}
                multiple={true}
              >
                <Button leftIcon={<Icon as={FiFile} />}>Select A File</Button>
              </FileUpload>
            </FormControl>

            <div>
              {formik.errors.myFile ? (
                <p style={{ color: "red" }}>{formik.errors.myFile}</p>
              ) : null}
            </div>

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="yellow"
              width="full"
            >
              Upload
            </Button>
          </form>
        </>
      </Flex>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    fileSent: state.data.fileSent,
  };
}
export default connect(mapStateToProps)(Database);
