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
import useValidateCreateOrUpdateSchedule from "../../hooks/validate/useValidateCreateOrUpdateSchedule";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "../../hooks/api/useSchedule";
import { fields } from "../../utils/fields";
import moment from "moment";

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

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (currentSchedule) {
      const { _id, cover, title, description, date } = currentSchedule;
      console.log(moment(date).format("YYYY-MM-DD hh:mm a"));
      reset({
        title,
        description,
        date: moment(date).format("YYYY-MM-DD HH:mm"),
        cover
      });
    }
  }, [currentSchedule]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("channelId", detailChannel._id);
    currentSchedule ? updateSchedule(formData) : createSchedule(formData);
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
            {listField.map((field) =>
              fields[field.type](field, control, watch)
            )}
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
