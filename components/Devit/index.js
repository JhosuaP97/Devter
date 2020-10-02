import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
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
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date>{timeago}</date>
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
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        date {
          color: #555;
          font-size: 0.875rem;
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
