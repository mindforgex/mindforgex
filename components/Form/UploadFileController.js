import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const UploadFileController = ({
  control,
  name,
  nameUrl = "",
  label,
  watch,
  accept = "image/*",
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
          <>
            {(watch(name) || watch(nameUrl)) && (
              <Box
                w={"168px"}
                h={"168px"}
                mt={3}
                borderWidth={"1px"}
                borderColor={"#fff"}
                borderRadius={"8px"}
                borderStyle={"dashed"}
                overflow={"hidden"}
                display={"flex"}
                alignItems={"center"}
              >
                {watch(name) ? (
                  <img src={URL.createObjectURL(watch(name))} alt="" />
                ) : (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${watch(nameUrl)}`}
                    alt=""
                  />
                )}
              </Box>
            )}
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
              <input
                type="file"
                accept={accept}
                value={value?.fileName}
                onChange={(event) => {
                  onChange(event.target.files[0]);
                }}
              />
              {error?.message && (
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              )}
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default UploadFileController;
