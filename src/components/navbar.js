import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import styles from "./Navbar.module.css";
import { auth, db } from "../firebase";
import { Fragment } from "react/cjs/react.production.min";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
const Navbar = (props) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  return (
    <nav className={styles.navbar}>
      <h1>FireChat</h1>
      {user ? (
        <Fragment>
          <button onClick={handleLogout} className={styles.btn}>
            Log Out
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )}
    </nav>
  );
};
export default Navbar;
