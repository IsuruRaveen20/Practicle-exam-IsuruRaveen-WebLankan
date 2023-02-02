import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const contactRef = createRef()
    const addressRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        //Email validation
        const email = emailRef.current.value;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setErrors({ email: ["Invalid email address"] });
            return;
        }

        
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            address: addressRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
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
        <div className="login-signup-form animated fadeInDown">
            <div className="form" id="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign Up</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="text" placeholder="Email Address" />
                    <input ref={contactRef} type="text" placeholder="Contact" />
                    <input ref={addressRef} type="text" placeholder=" Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

