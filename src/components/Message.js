import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import styles from "./Message.module.css";
const Message = (props) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.msg]);
  return (
    <div
      className={`${styles.message_wrapper} ${
        props.msg.from === props.user1 ? styles.own : ""
      }`}
      ref={scrollRef}
    >
      <p
        className={`${
          props.msg.from === props.user1 ? styles.me : styles.friend
        }`}
      >
        {props.msg.text}
      </p>
      <br />
      <small>
        <Moment fromNow>{props.msg.createdAt.toDate()}</Moment>
      </small>
    </div>
  );
};
export default Message;
