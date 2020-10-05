import Avatar from "components/Avatar";
import useDateTimeFormat from "hooks/useDateTimeFormat";
import useTimeAgo from "hooks/useTimeAgo";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Devit({
  id,
  avatar,
  userName,
  content,
  img,
  userId,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push("/status/[id]", `/status/${id}`);
  };

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        a {
          color: #555;
          font-size: 0.875rem;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
