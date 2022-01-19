import React, { useState, useRef } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import styles from "./Signup.module.css";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import { Fragment } from "react/cjs/react.production.min";
const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!name || !email || !password) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
      });
      console.log(result.user);
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setLoading(false);
      alert("Sign Up Successful");
      history.replace("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <Navbar />
      <div className={styles.signup_container}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              ref={nameRef}
            />
          </div>
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
            {loading ? "Signing Up.." : "Sign Up"}
          </button>
        </form>
        <h3>Already a user?</h3>
        <Link to="/login">Log In</Link>
      </div>
    </Fragment>
  );
};

export default Signup;
