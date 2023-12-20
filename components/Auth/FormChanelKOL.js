import React from "react";
import InputController from "../Form/InputController";
import UploadFileController from "../Form/UploadFileController";
import { FIELD_TYPE, INPUT_TYPE } from "../Form/constant";

const FormChanelKOL = ({ control }) => {
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
      name: "avatar",
      typeInput: INPUT_TYPE.FILE,
      label: "avatar",
    },
  ];
  return (
    <>
      {listField.map((field) => {
        switch (field.type) {
          case FIELD_TYPE.INPUT:
            return (
              <InputController
                control={control}
                name={field.name}
                label={field.label}
                type={field.typeInput}
              />
            );
          case FIELD_TYPE.FILE:
            return (
              <UploadFileController
                control={control}
                name={field.name}
                label={field.label}
                type={field.typeInput}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default FormChanelKOL;
