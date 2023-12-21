import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";

const useValidateCreateOrUpdateTask = () => {
  const { t } = useTranslation("common");

  const TASK_TYPE = {
    SUBSCRIBE_WEB3_CHANNEL: "SUBSCRIBE_WEB3_CHANNEL",
    JOIN_DISCORD: "JOIN_DISCORD",
    SUBSCRIBE_YOUTUBE: "SUBSCRIBE_YOUTUBE",
  };

  const listField = [
    {
      type: FIELD_TYPE.INPUT,
      name: "name",
      typeInput: INPUT_TYPE.TEXT,
      label: "name",
      placeholder: "Name",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "description",
      typeInput: INPUT_TYPE.TEXT,
      label: "description",
      placeholder: "Description",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "title",
      typeInput: INPUT_TYPE.TEXT,
      label: "title",
      placeholder: "Title",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "link",
      typeInput: INPUT_TYPE.TEXT,
      label: "link",
      placeholder: "Link",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "serverId",
      typeInput: INPUT_TYPE.TEXT,
      label: "serverId",
      placeholder: "ServerId",
    },
    {
      type: FIELD_TYPE.SELECT,
      name: "taskType",
      label: "Task type",
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
    name: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    description: Yup.string()
      .required(t("validate.required"))
      .max(500, t("validate.string_max_500")),
    title: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    link: Yup.string()
      .required(t("validate.required"))
      .url(t("validate.is_url"))
      .max(255, t("validate.string_max_255")),
    serverId: Yup.string()
      .required(t("validate.required"))
      .max(255, t("validate.string_max_255")),
    taskType: Yup.string().required(t("validate.required")),
  });

  const defaultValues = {
    name: "",
    description: "",
    title: "",
    link: "",
    serverId: "",
    taskType: TASK_TYPE.SUBSCRIBE_WEB3_CHANNEL,
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateCreateOrUpdateTask;
