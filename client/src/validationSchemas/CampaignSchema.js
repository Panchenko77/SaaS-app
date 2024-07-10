import * as Yup from "yup";

export const CampaignSchema = Yup.object({
  author: Yup.string()
    .max(15, "Must be 50 characters or less")
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  campaignType: Yup.string().required("Campaign Type Required"),
  users: Yup.array()
    .min(1, "At least one user must be checked")
    .required("Users Required"),
  startDate: Yup.date().required("Start Date Required"),
  endDate: Yup.date().required("End Date Required"),
});
