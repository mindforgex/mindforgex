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
import { optionError, optionSuccess } from "../../utils/optionToast";
import { useDeleteTask } from "../../hooks/api/useTask";

const DeleteTaskModel = ({ isOpen, onClose, currentTask, setCurrentTask }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { mutate: deletePost, isLoading: deleting } = useDeleteTask({
    id: currentTask?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Delete task successfully",
      });
      setCurrentTask(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: "Delete task failed",
      });
    },
  });

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              Delete task
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
            <Text
              as="p"
              color={"white"}
              fontSize={"md"}
              mt={3}
              mb={1}
              textTransform={"capitalize"}
              textAlign={"center"}
            >
              {`Delete task ${currentTask?.name}?`}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={deletePost}
              isLoading={deleting}
            >
              Delete
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

export default React.memo(DeleteTaskModel);
