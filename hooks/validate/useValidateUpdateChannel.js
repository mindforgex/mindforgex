import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import moment from "moment";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";

const useValidateUpdateChannel = () => {
  const { t } = useTranslation("common");

  const SEX_TYPE = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other",
  };

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
      name: "country",
      typeInput: INPUT_TYPE.TEXT,
      label: "country",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "founded",
      typeInput: INPUT_TYPE.TEXT,
      label: "founded",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "mainGame",
      typeInput: INPUT_TYPE.TEXT,
      label: "mainGame",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "profestionalFeild",
      typeInput: INPUT_TYPE.TEXT,
      label: "profestionalFeild",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "email",
      typeInput: INPUT_TYPE.TEXT,
      label: "email",
    },
    {
      type: FIELD_TYPE.RADIO,
      name: "sex",
      label: "sex",
      option: [
        {
          value: SEX_TYPE.MALE,
          label: SEX_TYPE.MALE,
        },
        {
          value: SEX_TYPE.FEMALE,
          label: SEX_TYPE.FEMALE,
        },
        {
          value: SEX_TYPE.OTHER,
          label: SEX_TYPE.OTHER,
        },
      ],
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
      name: "followerYoutube",
      typeInput: INPUT_TYPE.NUMBER,
      label: "followerYoutube",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "x",
      typeInput: INPUT_TYPE.TEXT,
      label: "x",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "followerTwitter",
      typeInput: INPUT_TYPE.NUMBER,
      label: "followerTwitter",
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    channelName: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    description: Yup.string()
      .required(t("validate.required"))
      .max(1000, t("validate.string_max_1000")),
    country: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    founded: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    mainGame: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    profestionalFeild: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    email: Yup.string()
      .required(t("validate.required"))
      .email(t("validate.is_email"))
      .max(100, t("validate.string_max_100")),
    sex: Yup.string().required(t("validate.required")),
    dateOfBirth: Yup.date()
      .required(t("validate.required"))
      .max(
        moment().subtract(18, "years").endOf("year"),
        t("validate.number_min_18")
      ),
    discord: Yup.string()
      .url(t("validate.is_url"))
      .max(255, t("validate.string_max_255")),
    youtube: Yup.string()
      .url(t("validate.is_url"))
      .max(255, t("validate.string_max_255")),
    followerYoutube: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(1000000000000),
    x: Yup.string()
      .url(t("validate.is_url"))
      .max(255, t("validate.string_max_255")),
    followerTwitter: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(1000000000000),
  });

  const defaultValues = {
    name: "",
    channelName: "aaa",
    description: "",
    country: "",
    founded: "",
    mainGame: "",
    profestionalFeild: "",
    email: "",
    sex: SEX_TYPE.MALE,
    dateOfBirth: null,
    aboutMe: "",
    discord: "",
    youtube: "",
    followerYoutube: "",
    x: "",
    followerTwitter: "",
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateUpdateChannel;
