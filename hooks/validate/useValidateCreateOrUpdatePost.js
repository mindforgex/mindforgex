import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";

const useValidateCreateOrUpdatePost = () => {
  const { t } = useTranslation("common");

  const TASK_TYPE = {
    SUBSCRIBE_WEB3_CHANNEL: "SUBSCRIBE_WEB3_CHANNEL",
    JOIN_DISCORD: "JOIN_DISCORD",
    SUBSCRIBE_YOUTUBE: "SUBSCRIBE_YOUTUBE",
  };

  const listField = [
    {
      type: FIELD_TYPE.FILE,
      name: "file",
      typeInput: INPUT_TYPE.FILE,
      label: "image",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "title",
      typeInput: INPUT_TYPE.TEXT,
      label: "title",
      placeholder: "Title",
    },
    {
      type: FIELD_TYPE.TEXTAREA,
      name: "content",
      label: "content",
      placeholder: "Inser link to attach video which introduce yourself...",
    },
    {
      type: FIELD_TYPE.CHECKBOX,
      name: "tasks",
      label:
        "Select tasks which you want to assign for users in this post to verify",
      option: [
        {
          value: TASK_TYPE.SUBSCRIBE_WEB3_CHANNEL,
          label: "Subscribe MindForgeX channel",
        },
        {
          value: TASK_TYPE.JOIN_DISCORD,
          label: "Join Discord server",
        },
        {
          value: TASK_TYPE.SUBSCRIBE_YOUTUBE,
          label: "Subscribe Youtube channel",
        },
      ],
    },
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t("validate.required"))
      .max(500, t("validate.string_max_500")),
    content: Yup.string()
      .required(t("validate.required"))
      .max(10000, t("validate.string_max_10000")),
  });

  const defaultValues = {
    file: "",
    title: "",
    content: "",
    tasks: [],
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateCreateOrUpdatePost;
