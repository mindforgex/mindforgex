import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const UploadFileController = ({ control, name, label, type = "text" }) => {
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
            <input type="file" />
            {error?.message && (
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default UploadFileController;
