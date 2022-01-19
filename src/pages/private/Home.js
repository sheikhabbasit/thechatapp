import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Navbar from "../../components/navbar";
import User from "../../components/User";
import Message from "../../components/Message";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import styles from "./Home.module.css";
import MessageForm from "../../components/MessageForm";

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  });

  const selectUser = (user) => {
    console.log(user);
    setChat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  console.log(msgs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  };
  return (
    <Fragment>
      <Navbar />
      <div className={styles.home_container}>
        <div className={styles.users_container}>
          {users.map((user) => (
            <User key={user.uid} user={user} selectUser={selectUser} />
          ))}
        </div>
        <div className={styles.messages_container}>
          {chat ? (
            <Fragment>
              <div className={styles.messages_user}>
                <h3>{chat.name}</h3>
              </div>
              <div className={styles.messages}>
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                textValue={text}
              />
            </Fragment>
          ) : (
            <h3 className={styles.no_conv}>
              Select a user to start conversation
            </h3>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
