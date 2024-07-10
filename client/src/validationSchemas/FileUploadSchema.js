import * as Yup from "yup";

export const FileUploadSchema = Yup.object().shape({
  myFile: Yup.mixed()
    .required("required")
    .test("fileFormat", "Only CSV files or XLSX, XLS are allowed", (value) => {
      if (value) {
        const supportedFormats = ["csv", "xlsx", "xls"];
        return supportedFormats.includes(value.name.split(".").pop());
      }
      return true;
    })
    .test("fileSize", "File size must be less than 3MB", (value) => {
      if (value) {
        return value.size <= 3145728;
      }
      return true;
    }),
});
