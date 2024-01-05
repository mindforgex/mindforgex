// import BreadCrumbs from '../components/BreadCrumbs';
import ListProfile from "../components/ListProfile";
import TopRecent from "../components/TopRecent";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import supabase from "../utils/supabase";
import { useRouter } from "next/router";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { getUserInfo } from "../utils/helpers";
import { useAppRedireact } from "../utils/hook";
import { FaSearch } from "react-icons/fa";
import { useGetPosts } from "../hooks/api/usePost";
import { useChannels } from "../hooks/api/useChannel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE } from "../utils/constants";

export default function Channel() {
  const [pageParams, setPageParams, ready] = useLocalStorage(
    STORAGE.FILTER_DATA,
    {
      pageSize: 6,
      pageIndex: 1,
      textSearch: "",
    }
  );
  const [postParams] = useState({ pageSize: 5, pageIndex: 1 });
  const [textSearch, setTextSearch] = useState(pageParams?.textSearch);
  const { t } = useTranslation("common");
  const router = useRouter();
  const toast = useToast();
  const [generateRouter] = useAppRedireact();
  const { data: dataPosts, isLoading: isLoadingGetPosts } =
    useGetPosts(postParams);
  const { data: dataChannels, isLoading: isLoadingGetChannels } = useChannels(
    pageParams,
    ready
  );

  useEffect(() => {
    if (ready) {
      setTextSearch(pageParams.textSearch);
    }
  }, [ready]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        toast({
          title: t("profile.disconnect_discord_success"),
          description: "",
          status: "success",
          isClosable: true,
        });
      } else {
        const userInfo = getUserInfo();
        const session = await supabase.auth.getSession();
        if (
          userInfo &&
          !(userInfo.user.discordUsername && userInfo.user.discordId) &&
          session.data.session
        ) {
          router.push(generateRouter("profile"));
        }
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPageParams((pageParams) => ({
      ...pageParams,
      textSearch,
    }));
  };

  return (
    <>
      <Head>
        <title>{t("header")}</title>
      </Head>
      <div id="content" className="site-content">
        {/* <div className="nk-gap-2" /> */}

        {/* <BreadCrumbs label={t("channel.label")} /> */}
        <div className="nk-gap-2" />

        <div id="primary" className="content-area container cyberpress">
          <main id="main" className="site-main" role="main">
            <div className="row">
              <div className="col-lg-8">
                <article className="hentry">
                  <div className="entry-content">
                    <form onSubmit={handleSubmit}>
                      <InputGroup size={"lg"} mb={10}>
                        <Input
                          pr="4.5rem"
                          type="text"
                          placeholder="Enter password"
                          value={textSearch}
                          onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <InputRightElement>
                          <IconButton
                            pr={2}
                            type="submit"
                            backgroundColor={"transparent"}
                            _hover={{}}
                            _active={{}}
                            icon={<FaSearch fontSize={"22px"} color="white" />}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </form>
                    <ListProfile
                      data={dataChannels?.items || []}
                      meta={dataChannels?.meta}
                      pageParams={pageParams}
                      setPageParams={setPageParams}
                      isLoading={isLoadingGetPosts}
                    />
                  </div>
                </article>
              </div>

              <div className="col-lg-4 nk-sidebar-sticky-parent">
                <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                  <div>
                    <TopRecent
                      total={postParams.pageSize}
                      data={dataPosts?.items || []}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ["common"])) },
  };
};
