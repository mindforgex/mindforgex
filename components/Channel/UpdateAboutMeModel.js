import React from "react";
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
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateAboutMe } from "../../hooks/api/useChannel";
import useValidateUpdateAboutMe from "../../hooks/validate/useValidateUpdateAboutMe";
import { optionError, optionSuccess } from "../../utils/optionToast";
import { fields } from "../../utils/fields";

const UpdateAboutMeModel = ({ isOpen, onClose, detailChannel }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateUpdateAboutMe();
  const { mutate: updateAboutMe, isLoading } = useUpdateAboutMe({
    id: detailChannel?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: t("channel.about_me.update_succ"),
      });
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: t("channel.about_me.update_fail"),
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
              {detailChannel?.aboutMe
                ? t("channel.about_me.update")
                : t("channel.about_me.create")}
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
            {listField.map((field) => fields[field.type](field, control))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onUpdate)}>
              {detailChannel?.aboutMe ? t("update") : t("create")}
            </Button>
            <Button onClick={onClose}>{t("modal.btn_cancel")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(UpdateAboutMeModel);
