import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";
import moment from "moment";

const useValidateCreateOrUpdateSchedule = () => {
  const { t } = useTranslation("common");
  const listField = [
    {
      type: FIELD_TYPE.FILE,
      name: "file",
      typeInput: INPUT_TYPE.FILE,
      label: "Cover",
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
      name: "description",
      typeInput: INPUT_TYPE.TEXT,
      label: "description",
      placeholder: "Description",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "date",
      typeInput: INPUT_TYPE.DATE,
      label: "Date & time",
    },
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t("validate.required"))
      .max(500, t("validate.string_max_500")),
    description: Yup.string()
      .required(t("validate.required"))
      .max(10000, t("validate.string_max_10000")),
  });

  const defaultValues = {
    file: "",
    title: "",
    description: "",
    date: moment(),
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateCreateOrUpdateSchedule;
