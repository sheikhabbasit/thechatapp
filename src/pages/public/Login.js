import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import { Fragment } from "react/cjs/react.production.min";
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  // handles login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setLoading(false);
      history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <Navbar />
      <div className={styles.login_container}>
        <h1>Log in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <input
              placeholder="Email Address"
              id="email"
              name="email"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className={styles.input_container}>
            <input
              placeholder="Type a Password"
              id="password"
              name="password"
              type="password"
              ref={passwordRef}
            />
          </div>
          {error && <p>One or more fields empty</p>}
          <button disabled={loading} type="submit">
            {loading ? "Logging in.." : "Log In"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
