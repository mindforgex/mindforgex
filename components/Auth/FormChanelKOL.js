import React from "react";
import { FIELD_TYPE, INPUT_TYPE } from "../Form/constant";
import { fields } from "../../utils/fields";

const FormChanelKOL = ({ control, watch }) => {
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
  return <>{listField.map((field) => fields[field.type](field, control, watch))}</>;
};

export default FormChanelKOL;
