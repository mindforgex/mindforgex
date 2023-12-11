import React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const RadioGroupController = ({ control, name, label, option = [] }) => {
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
            <RadioGroup onChange={onChange} value={value}>
              <Stack direction="row" justifyContent={"space-between"}>
                {option.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    <Text
                      color={"white"}
                      fontSize="md"
                      m={0}
                      fontWeight={"light"}
                    >
                      {item.label}
                    </Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};

export default RadioGroupController;
