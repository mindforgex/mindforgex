import React, { useEffect } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { optionError, optionSuccess } from "../../utils/optionToast";
import { fields } from "../../utils/fields";
import useValidateCreateOrUpdateTask from "../../hooks/validate/useValidateCreateOrUpdateTask";
import { useCreateTask, useUpdateTask } from "../../hooks/api/useTask";

const CreateOrUpdateTaskModel = ({
  isOpen,
  onClose,
  currentPost,
  currentTask,
  setCurrentTask,
}) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateCreateOrUpdateTask();

  const { mutate: createTask, isLoading: creating } = useCreateTask({
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: t("channel.task.create_succ"),
      });
      setCurrentTask(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: t("channel.task.create_fail"),
      });
    },
  });

  const { mutate: updateSchedule, isLoading: updating } = useUpdateTask({
    id: currentTask?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: t("channel.task.update_succ"),
      });
      setCurrentTask(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: t("channel.task.update_fail"),
      });
    },
  });

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (currentTask) {
      const { name, description, taskInfo, taskType } = currentTask;
      const { link, serverId, title } = taskInfo;
      reset({
        name,
        description,
        link,
        serverId,
        title,
        taskType,
      });
    }
  }, [currentTask]);

  const onSubmit = (data) => {
    const formatData = {
      ...data,
      postId: currentPost._id,
    };
    currentTask ? updateSchedule(formatData) : createTask(formatData);
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"} height={"68vh"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              {currentTask
                ? t("channel.task.update")
                : t("channel.task.create")}
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
            {listField.map((field) =>
              fields[field.type](field, control, watch)
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              {currentTask ? t("update") : t("create")}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setCurrentTask(null);
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

export default React.memo(CreateOrUpdateTaskModel);
