import { Link } from "react-router-dom";
import {createRef, useState} from "react";
export default function Signup() {

    const nameRef = createRef();
    const emailRef = createRef();
    const contactRef = createRef();
    const addressRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {

            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            address: addressRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload);
    }
    return (
        <div className="login-signup">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for Free</h1>
                    <input  ref={nameRef} type="text" placeholder="Name" />
                    <input  ref={emailRef} type="email" placeholder="Email" />
                    <input  ref={contactRef} type="text" placeholder="Contact Number" />
                    <input  ref={addressRef} type="address" placeholder="Address" />
                    <input  ref={passwordRef} type="password" placeholder="Password" />
                    <input  ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}
