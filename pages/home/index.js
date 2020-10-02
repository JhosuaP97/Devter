import AppLayout from "components/AppLayout";
import Devit from "components/Devit";
import useUser from "hooks/useUser";
import { useState, useEffect } from "react";
import { fetchLatestDevits } from "firebase/client";
import Link from "next/link";
import Create from "components/Icons/Create";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import { colors } from "styles/theme";
import Head from "next/head";
export default function Homepage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline);
  }, [user]);
  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ id, avatar, content, img, userName, userId, createdAt }) => (
              <Devit
                key={id}
                id={id}
                avatar={avatar}
                createdAt={createdAt}
                content={content}
                userName={userName}
                userId={userId}
                img={img}
              />
            )
          )}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
          background-color: #ffffffaa;
          backdrop-filter: blur(5px);
        }

        section {
          flex: 1;
        }

        h2 {
          font-weight: 800;
          font-size: 21px;
          padding-left: 15px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          background: #fff;
          display: flex;
        }

        nav a {
          display: flex;
          flex: 1 1 auto;
          align-items: center;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
}
