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
import useValidateUpdateChannel from "../../hooks/validate/useValidateUpdateChannel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateChannel } from "../../hooks/api/useChannel";
import moment from "moment";
import { FIELD_TYPE } from "../Form/constant";

const UpdateChannelModel = ({ isOpen, onClose, detailChannel }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateUpdateChannel();
  const { mutate: updateChannel, isLoading } = useUpdateChannel({
    id: detailChannel?._id,
    onSuccess: async (success) => {
      toast({
        title: "Update channel in successfully",
        status: "success",
        isClosable: true,
        position: "top",
      });
      onClose(); 
    },
    onError: (error) => {
      toast({
        title: "Update channel failed",
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
    updateChannel({
      ...data,
      followerYoutube: +data?.followerYoutube,
      followerTwitter: +data?.followerTwitter,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    if (detailChannel) {
      const {
        name,
        channelName,
        description,
        country,
        founded,
        mainGame,
        profestionalFeild,
        email,
        sex,
        dateOfBirth,
        socialLinks,
      } = detailChannel;
      const social =
        socialLinks.reduce(
          (a, v) => ({
            ...a,
            [v.name]: {
              icon: v.icon,
              url: v.url,
              totalFollower: v.totalFollower,
            },
          }),
          {}
        ) || {};
      const { discord, youtube, x } = social;
      reset({
        name,
        channelName,
        description,
        country: country.name,
        founded,
        mainGame,
        profestionalFeild,
        email,
        sex,
        dateOfBirth,
        discord: discord?.url,
        youtube: youtube?.url,
        x: x?.url,
        followerYoutube: youtube?.totalFollower,
        followerTwitter: x?.totalFollower,
        dateOfBirth: dateOfBirth || null,
      });
    }
  }, [detailChannel]);

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              Update channel
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

export default React.memo(UpdateChannelModel);
