import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const InputController = ({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
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
          <FormControl isInvalid={error?.message}>
            <FormLabel
              as="p"
              color={"white"}
              fontSize={"md"}
              mt={3}
              mb={1}
              textTransform={"capitalize"}
            >
              {label}
            </FormLabel>
            <Input
              type={type}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
            {error?.message && (
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default InputController;