import React from "react";
import styles from "./User.module.css";
const User = ({ user, selectUser }) => {
  // console.log(user);
  return (
    <div onClick={() => selectUser(user)} className={styles.user_wrapper}>
      <div className={styles.user_info}>
        <div className={styles.user_detail}>
          <h4>{user.name}</h4>
        </div>
        <div
          className={`${styles.user_status} ${
            user.isOnline ? styles.online : styles.offline
          }`}
        >
          {}
        </div>
      </div>
    </div>
  );
};
export default User;
