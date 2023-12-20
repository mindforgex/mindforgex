import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const CheckboxGroupController = ({ control, name, label, option = [] }) => {
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
            <CheckboxGroup
              colorScheme="green"
              value={value}
              onChange={onChange}
            >
              <Stack mt={2}>
                {option.map((item) => (
                  <Checkbox
                    value={item.value}
                    key={item.value}
                    m={0}
                    fontWeight={"normal"}
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
        );
      }}
    />
  );
};

export default CheckboxGroupController;
