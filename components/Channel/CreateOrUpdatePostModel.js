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
import InputController from "../Form/InputController";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FIELD_TYPE } from "../Form/constant";
import TextareaController from "../Form/TextareaController";
import useValidateCreateOrUpdatePost from "../../hooks/validate/useValidateCreateOrUpdatePost";
import UploadFileController from "../Form/UploadFileController";
import CheckboxGroupController from "../Form/CheckboxGroupController";
import { useCreatePost, useUpdatePost } from "../../hooks/api/usePost";
import { optionError, optionSuccess } from "../../utils/optionToast";

const CreateOrUpdatePostModel = ({
  isOpen,
  onClose,
  detailChannel,
  currentPost,
  setCurrentPost,
}) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateCreateOrUpdatePost();

  const { mutate: createPost, isLoading: creating } = useCreatePost({
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Create post successfully",
      });
      setCurrentPost(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: "Create post failed",
      });
    },
  });

  const { mutate: updatePost, isLoading: updating } = useUpdatePost({
    id: currentPost?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Update post successfully",
      });
      setCurrentPost(null);
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        ...optionError,
        title: "Update post failed",
      });
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (currentPost) {
      const { _id, title, content, tasks } = currentPost;
      const formatTask = tasks
        .filter((task) => task.status === "active")
        .map((task) => task.taskType);
      reset({ title, content, tasks: formatTask });
    }
  }, [currentPost]);

  const onSubmit = (data) => {
    currentPost
      ? updatePost({
          ...data,
          channelId: detailChannel._id,
        })
      : createPost({
          ...data,
          channelId: detailChannel._id,
        });
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              {currentPost ? "Update post" : "Create post"}
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
                case FIELD_TYPE.TEXTAREA:
                  return (
                    <TextareaController
                      control={control}
                      name={field.name}
                      label={field.label}
                      option={field.option}
                    />
                  );
                case FIELD_TYPE.FILE:
                  return (
                    <UploadFileController
                      control={control}
                      name={field.name}
                      label={field.label}
                      type={field.typeInput}
                    />
                  );
                case FIELD_TYPE.CHECKBOX:
                  return (
                    <CheckboxGroupController
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
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              {currentPost ? "Update" : "Create"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setCurrentPost(null);
              }}
            >
              {t("modal.btn_cancel")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(CreateOrUpdatePostModel);
