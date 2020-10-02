import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";

import { addDevit, uploadImage } from "firebase/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Avatar from "components/Avatar";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: "know",
  LOADING: "loading",
  SUCCESS: "sucess",
  ERROR: "error",
};

const DRAG_IMAGE_STATES = {
  ERROR: "error",
  NONE: "none",
  DRAG_OVER: "dragover",
  UPLOADING: "uploading",
  COMPLETE: "complete",
};

export default function ComposeTweet() {
  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
    const file = e.dataTransfer.files[0];

    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="¿Qué está pasando?"
              value={message}
            ></textarea>
            {imgURL && (
              <section className="removeimg">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL}></img>
              </section>
            )}
            <div>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .avatar-container {
          padding: 10px 0 0 15px;
        }

        form {
          padding: 10px;
        }

        div {
          padding: 15px;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          font-size: 21px;
          border-radius: 10px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
          min-height: 200px;
        }

        .removeimg {
          position: relative;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 999px;
          width: 30px;
          height: 30px;
          border: 0;
          top: 15px;
          position: absolute;
          right: 15px;
          color: #fff;
          font-size: 24px;
        }

        img {
          border-radius: 10px;
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
}
