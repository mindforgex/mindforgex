import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import InputController from "../Form/InputController";

const FIELD_TYPE = {
  INPUT: "INPUT",
  SELECT: "SELECT",
  RADIO: "RADIO",
  FILE: "FILE",
};

const FormChanelKOL = ({ control }) => {
  const listField = [
    {
      type: FIELD_TYPE.INPUT,
      name: "name",
      typeInput: "text",
      label: "name",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "age",
      typeInput: "number",
      label: "age",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "nickName",
      typeInput: "text",
      label: "nickName",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "description",
      typeInput: "text",
      label: "description",
    },
    {
      type: FIELD_TYPE.FILE,
      name: "avatar",
      typeInput: "text",
      label: "avatar",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "discord",
      typeInput: "text",
      label: "discord",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "youtube",
      typeInput: "text",
      label: "youtube",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "x",
      typeInput: "text",
      label: "x",
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
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default FormChanelKOL;
