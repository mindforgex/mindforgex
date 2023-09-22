import BreadCrumbs from '../components/BreadCrumbs';
import ListProfile from '../components/ListProfile';
import { MOCK_NEW_DATA, MOCK_PROFILE_DATA } from '../utils/data';
import TopRecent from '../components/TopRecent';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getChannels } from '../services';
import { getPosts } from '../services/postService';

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [pageParams] = useState({ pageSize: 6, pageIndex: 1 });
  const [postParams] = useState({ pageSize: 5, pageIndex: 1 });
  const [posts, setPosts] = useState([])

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

  return (
    <>
      <Head>
        <title>MindForgeX</title>
      </Head>
      <div id="content" className="site-content">
        <div className="nk-gap-2" />

        <BreadCrumbs label="Channel" />
        <div className="nk-gap-2 mt-10" />

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
