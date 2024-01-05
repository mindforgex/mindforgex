import { Flex, FormControl, IconButton, Input } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { IoMdSend } from "react-icons/io";

const InputComment = forwardRef((props, ref) => {
  const {
    control,
    name,
    type = "text",
    placeholder = "",
    onComment,
    tagWallet = "",
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error, ...rest },
      }) => {
        return (
          <form onSubmit={onComment}>
            <FormControl isInvalid={error?.message}>
              <Flex>
                <Input
                  borderRadius={"8px"}
                  borderWidth={"1px"}
                  borderColor={"gray.300"}
                  bg={"white"}
                  type={type}
                  onChange={(e) => {
                    if (!e.target.value.startsWith(tagWallet)) {
                      onChange(tagWallet);
                      return;
                    }
                    onChange(e.target.value);
                  }}
                  value={value}
                  placeholder={placeholder}
                  ref={ref}
                />
                <IconButton
                  pl={2}
                  pr={1}
                  ml={2}
                  backgroundColor={"white"}
                  _hover={{}}
                  _active={{}}
                  icon={<IoMdSend fontSize={"30px"} color="red" />}
                  disabled
                  _disabled={{}}
                  type="submit"
                />
              </Flex>
              {error?.message && (
                <FormErrorMessage>{error?.message}</FormErrorMessage>
              )}
            </FormControl>
          </form>
        );
      }}
    />
  );
});

export default React.memo(InputComment);
