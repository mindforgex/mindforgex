import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const TextareaController = ({ control, name, label, placeholder = "" }) => {
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
            <Textarea
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

export default TextareaController;
