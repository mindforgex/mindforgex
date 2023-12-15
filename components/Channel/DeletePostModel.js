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
import { useDeletePost } from "../../hooks/api/usePost";
import { optionError, optionSuccess } from "../../utils/optionToast";

const DeletePostModel = ({ isOpen, onClose, currentPost, setCurrentPost }) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { mutate: deletePost, isLoading: deleting } = useDeletePost({
    id: currentPost?._id,
    onSuccess: async (success) => {
      toast({
        ...optionSuccess,
        title: "Delete post successfully",
      });
      setCurrentPost(null);
      onClose();
    },
    onError: (error) => {
      toast({
        ...optionError,
        title: "Delete post failed",
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
              Delete post
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
              {`Delete post ${currentPost?.title}?`}
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

export default React.memo(DeletePostModel);
