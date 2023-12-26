import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { FIELD_TYPE, INPUT_TYPE } from "../../components/Form/constant";

const useValidateUpdateAboutMe = () => {
  const { t } = useTranslation("common");

  const listField = [
    {
      type: FIELD_TYPE.INPUT,
      name: "aboutMe",
      typeInput: INPUT_TYPE.TEXT,
      label: "aboutMe",
      placeholder: "Inser link to attach video which introduce yourself...",
    },
  ];

  const validationSchema = Yup.object().shape({
    aboutMe: Yup.string()
      .required(t("validate.required"))
      .url(t("validate.is_url"))
      .max(1000, t("validate.string_max_1000")),
  });

  const defaultValues = {
    aboutMe: "",
  };

  return { listField, validationSchema, defaultValues };
};

export default useValidateUpdateAboutMe;
