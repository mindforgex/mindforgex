import React, { useMemo } from "react";
import { Box, IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import EmptyMsg from "../../EmptyMsg";

const TYPE_ABOUT_ME = {
  REMOTE_URL: "REMOTE URL",
  YOUTUBE: "YOUTUBE",
};
const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const AboutMe = ({ isAuthor, onOpenModal, dataAboutMe }) => {
  const { t } = useTranslation("common");

  const aboutMe = useMemo(() => {
    if (!dataAboutMe) return;
    if (YOUTUBE_REGEX.test(dataAboutMe))
      return { url: dataAboutMe, type: TYPE_ABOUT_ME.YOUTUBE };
    return { url: dataAboutMe, type: TYPE_ABOUT_ME.REMOTE_URL };
  }, [dataAboutMe]);

  return (
    <>
      <section className="nk-decorated-h-2">
        <h3 className="px-4">{t("channel.about_me")}</h3>
      </section>
      {isAuthor && (
        <Stack justifyContent={"end"} flexDirection={"row"} mb={4}>
          <Tooltip label={"Edit about me"} placement="bottom">
            <IconButton
              onClick={onOpenModal}
              backgroundColor={"transparent"}
              _hover={{}}
              _active={{}}
              icon={
                dataAboutMe ? (
                  <FaEdit fontSize={"26px"} color="white" />
                ) : (
                  <FaPlusSquare fontSize={"26px"} color="white" />
                )
              }
            />
          </Tooltip>
        </Stack>
      )}
      {aboutMe?.url ? (
        <>
          {aboutMe.type === TYPE_ABOUT_ME.YOUTUBE && (
            <div className="cyberpress-twitch">
              <iframe
                width="875"
                height="492"
                src={`https://www.youtube.com/embed/${
                  aboutMe.url.split("v=")[1].split("&")[0]
                }`}
                title="Youtube Player"
                frameborder="0"
                allowFullScreen
              />
            </div>
          )}
          {aboutMe.type === TYPE_ABOUT_ME.REMOTE_URL && (
            <Box mb={6}>
              <video controls>
                <source src={aboutMe.url} type="video/mp4" />
                Sorry, your browser doesn't support videos.
              </video>
            </Box>
          )}
        </>
      ) : (
        <EmptyMsg />
      )}
    </>
  );
};

export default AboutMe;
