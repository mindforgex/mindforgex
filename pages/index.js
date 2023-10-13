import BreadCrumbs from '../components/BreadCrumbs';
import ListProfile from '../components/ListProfile';
import TopRecent from '../components/TopRecent';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getChannels } from '../services';
import { getPosts } from '../services/postService';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { getUserInfo } from '../utils/helpers';
import { useAppRedireact } from '../utils/hook';

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [pageParams] = useState({ pageSize: 6, pageIndex: 1 });
  const [postParams] = useState({ pageSize: 5, pageIndex: 1 });
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation('common');
  const router = useRouter()
  const toast = useToast()
  const [generateRouter] = useAppRedireact()

  useEffect(() => {
    const getAppChannels = async () => {
      const { items } = await getChannels(pageParams);
      setChannels(items);
    }

    const getTopPost = async () => {
      const data = await getPosts(postParams);
      setPosts(data.slice(0, 5))
    }
    getAppChannels && getAppChannels();
    getTopPost && getTopPost();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        toast({
          title: t('profile.disconnect_discord_success'),
          description: "",
          status: 'success',
          isClosable: true,
        })
      } else {
        const userInfo = getUserInfo()
        const session = await supabase.auth.getSession()
        if (
          userInfo && 
          !(userInfo.user.discordUsername && userInfo.user.discordId) && 
          session.data.session
        ) {
          router.push(generateRouter('profile'))
        }
      }
    })
  }, [])


  return (
    <>
      <Head>
        <title>{t('header')}</title>
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
                    <ListProfile data={channels} />
                  </div>
                </article>
              </div>

              <div className="col-lg-4 nk-sidebar-sticky-parent">
                <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                  <div>
                    <TopRecent total={postParams.pageSize} data={posts} />
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div >
    </>
  )
}


export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}
