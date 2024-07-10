import { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
} from "@chakra-ui/react";

import { FiFile } from "react-icons/fi";
import React from "react";

const FileUpload = (props) => {
  const { accept, multiple, children, onChange } = props;
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        name="myFile"
        onChange={onChange}
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={(e) => {
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

export default FileUpload;
