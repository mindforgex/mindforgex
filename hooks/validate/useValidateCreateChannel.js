import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import moment from "moment";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";
import { USER_TYPE } from "../../utils/constants";

const useValidateCreateChannel = () => {
  const { t } = useTranslation("common");

  const listField = [
    {
      type: FIELD_TYPE.INPUT,
      name: "name",
      typeInput: INPUT_TYPE.TEXT,
      label: "name",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "channelName",
      typeInput: INPUT_TYPE.TEXT,
      label: "channelName",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "description",
      typeInput: INPUT_TYPE.TEXT,
      label: "description",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "dateOfBirth",
      typeInput: INPUT_TYPE.DATE,
      label: "dateOfBirth",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "discord",
      typeInput: INPUT_TYPE.TEXT,
      label: "discord",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "youtube",
      typeInput: INPUT_TYPE.TEXT,
      label: "youtube",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "x",
      typeInput: INPUT_TYPE.TEXT,
      label: "x",
    },
    {
      type: FIELD_TYPE.FILE,
      name: "file",
      typeInput: INPUT_TYPE.FILE,
      label: "file",
    },
  ];

  const validationSchema = Yup.object().shape({
    walletAddress: Yup.string().required("required"),
    userType: Yup.string().required(t("validate.required")),
    email: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.USER,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .email(t("validate.is_email"))
          .max(100, t("validate.string_max_100")),
    }),
    name: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(255, t("validate.string_max_255")),
    }),
    channelName: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(255, t("validate.string_max_255")),
    }),
    description: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(1000, t("validate.string_max_1000")),
    }),
    dateOfBirth: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.date()
          .required(t("validate.required"))
          .max(
            moment().subtract(18, "years").endOf("year"),
            t("validate.number_min_18")
          ),
    }),
    discord: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
    youtube: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
    x: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
  });

  const defaultValues = {
    userType: USER_TYPE.KOL,
    email: "",
    name: "",
    channelName: "",
    description: "",
    dateOfBirth: moment().format("YYYY-MM-DD"),
    discord: "",
    youtube: "",
    x: "",
    file: null,
    walletAddress: "",
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateCreateChannel;
