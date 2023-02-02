import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Signup() {

    const nameRef = createRef();
    const emailRef = createRef();
    const contactRef = createRef();
    const addressRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const { setUser, setToken } = useStateContext();

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
          .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }

    return (
        <div className="login-signup">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for Free</h1>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={contactRef} type="text" placeholder="Contact Number" />
                    <input ref={addressRef} type="address" placeholder="Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}
