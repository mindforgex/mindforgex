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
import * as Yup from "yup";

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
  const validationRequiredFile = Yup.object().shape({
    file: Yup.mixed().required(t("validate.required_file")),
  });

  const { mutate: createSchedule, isLoading: creating } = useCreateSchedule({
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: t("channel.schedule.create_succ"),
      });
      setCurrentSchedule(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: t("channel.schedule.create_fail"),
      });
    },
  });

  const { mutate: updateSchedule, isLoading: updating } = useUpdateSchedule({
    id: currentSchedule?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: t("channel.schedule.update_succ"),
      });
      setCurrentSchedule(null);
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
      toast({
        ...optionError,
        title: t("channel.schedule.update_fail"),
      });
    },
  });

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues,
    resolver: yupResolver(
      currentSchedule
        ? validationSchema
        : validationSchema.concat(validationRequiredFile)
    ),
  });

  useEffect(() => {
    if (currentSchedule) {
      const { _id, cover, title, description, date } = currentSchedule;
      console.log(moment(date).format("YYYY-MM-DD hh:mm a"));
      reset({
        title,
        description,
        date: moment(date).format("YYYY-MM-DD HH:mm"),
        cover,
      });
    }
  }, [currentSchedule]);

  const onSubmit = ({ cover, ...data }) => {
    const formData = new FormData();
    const formatData = { ...data, channelId: detailChannel._id };
    Object.entries(formatData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    currentSchedule ? updateSchedule(formData) : createSchedule(formData);
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              {currentSchedule
                ? t("channel.schedule.update")
                : t("channel.schedule.create")}
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
              {currentSchedule ? t("update") : t("create")}
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
