import React, { useEffect, useState } from "react";
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
import CreateOrUpdateTaskModel from "./CreateOrUpdateTaskModel";

const ManageTaskListModel = ({
  isOpen,
  onClose,
  detailChannel,
  currentPost,
  setCurrentPost,
}) => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  console.log("currentPost", currentPost);
  const { tasks } = currentPost;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"} height={"68vh"}>
          <ModalHeader color={"white"} borderBottom={"1px"}>
            <Text as="h4" m={0} textAlign={"center"}>
              Manage task list
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
            {tasks?.map((task, index) => (
              <Flex
                key={task._id}
                justifyContent={"space-between"}
                columnGap={2}
              >
                <Box>
                  <Text as={"h5"} mb={2} noOfLines={1}>
                    {index + 1}. {task.name}
                  </Text>
                  <Text as="p" m={0} noOfLines={2}>
                    {task.description}
                  </Text>
                  <Text as="p" m={0} noOfLines={2}>
                    asdfaskdfbas ádfasđf
                    <Link ml="1" color="#dd163b" href={"#"} target="_blank">
                      aaaaaaaaaa
                    </Link>
                  </Text>
                </Box>
                <Flex flexDirection={"column"}>
                  <Stack justifyContent={"end"} flexDirection={"row"}>
                    <Tooltip label={"Edit channel"} placement="bottom">
                      <IconButton
                        onClick={() => {
                          setCurrentTask(task);
                          setIsOpenModal(true);
                        }}
                        backgroundColor={"transparent"}
                        _hover={{}}
                        _active={{}}
                        icon={<FaEdit fontSize={"26px"} color="white" />}
                      />
                    </Tooltip>
                  </Stack>
                  <Stack justifyContent={"end"} flexDirection={"row"}>
                    <Tooltip label={"Edit channel"} placement="bottom">
                      <IconButton
                        onClick={() => onOpenModal(schedule)}
                        backgroundColor={"transparent"}
                        _hover={{}}
                        _active={{}}
                        icon={
                          <MdDeleteForever fontSize={"26px"} color="white" />
                        }
                      />
                    </Tooltip>
                  </Stack>
                </Flex>
              </Flex>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsOpenModal(true)}
            >
              Create
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
      {isOpenModal && (
        <CreateOrUpdateTaskModel
          currentPost={currentPost}
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
    </>
  );
};

export default React.memo(ManageTaskListModel);
