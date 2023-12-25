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
import { useGetPost } from "../../hooks/api/usePost";
import { TASK_TYPE } from "../../utils/constants";
import { useModalState } from "../../hooks/useModalState";
import DeleteTaskModel from "./DeleteTaskModel";

const MODAL_CREATE_OR_UPDATE_TASK = "modal_create_or_update_task";
const MODAL_DELETE_TASK = "modal_delete_task";

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
  const { open, close, modalState } = useModalState({
    [MODAL_CREATE_OR_UPDATE_TASK]: false,
    [MODAL_DELETE_TASK]: false,
  });

  const { data: dataPost, isLoading: loadingDetail } = useGetPost(
    currentPost?._id
  );
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
            {dataPost?.tasks?.map((task, index) => (
              <Flex
                key={task._id}
                justifyContent={"space-between"}
                columnGap={2}
                mb={8}
              >
                <Box>
                  <Text as={"h5"} mb={2} noOfLines={1}>
                    {index + 1}. {task.name}
                  </Text>
                  <Text as="p" m={0} noOfLines={2}>
                    {task.description}
                  </Text>
                  {(task.taskType === TASK_TYPE.JOIN_DISCORD ||
                    task.taskType === TASK_TYPE.SUBSCRIBE_TWITCH) && (
                    <Text as="p" m={0} noOfLines={2}>
                      {task.taskType === TASK_TYPE.JOIN_DISCORD
                        ? t("channel.task.join_channel")
                        : t("channel.task.follow_channel")}
                      <Link
                        ml="1"
                        color="#dd163b"
                        href={task.taskInfo?.link || "#"}
                        target="_blank"
                      >
                        {task.taskInfo?.title}
                      </Link>
                    </Text>
                  )}
                </Box>
                <Flex flexDirection={"column"}>
                  <Stack justifyContent={"end"} flexDirection={"row"}>
                    <Tooltip label={"Edit channel"} placement="bottom">
                      <IconButton
                        onClick={() => {
                          setCurrentTask(task);
                          open(MODAL_CREATE_OR_UPDATE_TASK);
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
                        onClick={() => {
                          setCurrentTask(task);
                          open(MODAL_DELETE_TASK);
                        }}
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
              onClick={() => open(MODAL_CREATE_OR_UPDATE_TASK)}
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
      {modalState[MODAL_CREATE_OR_UPDATE_TASK] && (
        <CreateOrUpdateTaskModel
          currentPost={currentPost}
          isOpen={modalState[MODAL_CREATE_OR_UPDATE_TASK]}
          onClose={() => close(MODAL_CREATE_OR_UPDATE_TASK)}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
      {modalState[MODAL_DELETE_TASK] && (
        <DeleteTaskModel
          currentPost={currentPost}
          isOpen={modalState[MODAL_DELETE_TASK]}
          onClose={() => close(MODAL_DELETE_TASK)}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}
    </>
  );
};

export default React.memo(ManageTaskListModel);
