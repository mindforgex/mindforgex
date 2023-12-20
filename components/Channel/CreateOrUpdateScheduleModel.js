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
import UploadFileController from "../Form/UploadFileController";
import CheckboxGroupController from "../Form/CheckboxGroupController";
import { optionError, optionSuccess } from "../../utils/optionToast";
import useValidateCreateOrUpdateSchedule from "../../hooks/validate/useValidateCreateOrUpdateSchedule";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "../../hooks/api/useSchedule";

const CreateOrUpdateScheduleModel = ({
  isOpen,
  onClose,
  detailChannel,
  currentSchedule,
  setCurrentSchedule,
}) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { listField, validationSchema, defaultValues } =
    useValidateCreateOrUpdateSchedule();
  console.log("currentSchedule", currentSchedule);

  const { mutate: createSchedule, isLoading: creating } = useCreateSchedule({
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Create schedule successfully",
      });
      setCurrentSchedule(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: "Create schedule failed",
      });
    },
  });

  const { mutate: updateSchedule, isLoading: updating } = useUpdateSchedule({
    id: currentSchedule?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Update schedule successfully",
      });
      setCurrentSchedule(null);
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        ...optionError,
        title: "Update schedule failed",
      });
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // useEffect(() => {
  //   if (currentSchedule) {
  //     const { _id, title, content, tasks } = currentSchedule;
  //     const formatTask = tasks
  //       .filter((task) => task.status === "active")
  //       .map((task) => task.taskType);
  //     reset({ title, content, tasks: formatTask });
  //   }
  // }, [currentSchedule]);

  const onSubmit = (data) => {
    currentSchedule
      ? updateSchedule({
          ...data,
          channelId: detailChannel._id,
        })
      : createSchedule({
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
              {currentSchedule ? "Update schedule" : "Create schedule"}
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
              {currentSchedule ? "Update" : "Create"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setCurrentSchedule(null);
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

export default React.memo(CreateOrUpdateScheduleModel);
