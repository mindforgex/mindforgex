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
  Link,
  Flex,
  Stack,
  Tooltip,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { optionError, optionSuccess } from "../../utils/optionToast";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "../../hooks/api/useSchedule";
import { fields } from "../../utils/fields";
import moment from "moment";
import useValidateCreateOrUpdateTask from "../../hooks/validate/useValidateCreateOrUpdateTask";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
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
  console.log("currentPost", currentPost);
  console.log("currentTask", currentTask);

  const { mutate: createTask, isLoading: creating } = useCreateTask({
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Create task successfully",
      });
      setCurrentTask(null);
      // onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: "Create task failed",
      });
    },
  });

  const { mutate: updateSchedule, isLoading: updating } = useUpdateTask({
    id: currentTask?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Update schedule successfully",
      });
      setCurrentTask(null);
      // onClose();
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        ...optionError,
        title: "Update schedule failed",
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
              {currentTask ? "Update schedule" : "Create schedule"}
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
              {currentTask ? "Update" : "Create"}
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
