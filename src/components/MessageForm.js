import React from "react";
import styles from "./MessageForm.module.css";
const MessageForm = (props) => {
  return (
    <form className={styles.message_form} onSubmit={props.handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter Your Message"
          onChange={(e) => props.setText(e.target.value)}
          value={props.textValue}
        />
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};
export default MessageForm;
