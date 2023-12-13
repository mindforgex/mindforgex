import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import InputController from "../Form/InputController";
import RadioGroupController from "../Form/RadioGroupController";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateAboutMe } from "../../hooks/api/useChannel";
import { FIELD_TYPE } from "../Form/constant";
import useValidateUpdateAboutMe from "../../hooks/validate/useValidateUpdateAboutMe";

const UpdateAboutMeModel = ({ isOpen, onClose, detailChannel }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateUpdateAboutMe();
  const { mutate: updateAboutMe, isLoading } = useUpdateAboutMe({
    id: detailChannel?._id,
    onSuccess: async (success) => {
      toast({
        title: "Update about me in successfully",
        status: "success",
        isClosable: true,
        position: "top",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Update about me failed",
        status: "error",
        isClosable: true,
        position: "top",
      });
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onUpdate = (data) => {
    updateAboutMe(data);
  };

  useEffect(() => {
    if (detailChannel) {
      const { aboutMe } = detailChannel;
      reset({ aboutMe });
    }
  }, [detailChannel]);

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              Update about me
            </Text>
          </ModalHeader>
          <ModalBody
            pb={6}
            maxHeight={"68vh"}
            overflowY={"auto"}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {listField.map((field) => {
              switch (field.type) {
                case FIELD_TYPE.INPUT:
                  return (
                    <InputController
                      control={control}
                      name={field.name}
                      label={field.label}
                      type={field.typeInput}
                      placeholder={field?.placeholder}
                    />
                  );
                case FIELD_TYPE.RADIO:
                  return (
                    <RadioGroupController
                      control={control}
                      name={field.name}
                      label={field.label}
                      option={field.option}
                    />
                  );
                default:
                  return <></>;
              }
            })}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onUpdate)}>
              Update
            </Button>
            <Button onClick={onClose}>{t("modal.btn_cancel")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(UpdateAboutMeModel);
