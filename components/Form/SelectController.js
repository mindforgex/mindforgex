import React from "react";
import {
  option,
  Select,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const SelectController = ({
  control,
  name,
  label,
  placeholder = "",
  option = [],
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error, ...rest },
      }) => {
        return (
          <FormControl>
            <FormLabel as="p" color={"white"} fontSize={"md"} mt={6} mb={1}>
              {label}
            </FormLabel>
            <Select value={value} onChange={onChange}>
              {option.map((item) => (
                <option
                  value={item.value}
                  key={item.value}
                >
                  {item.label}
                </option>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

export default SelectController;
