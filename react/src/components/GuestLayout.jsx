import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {

    const { token } = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="login">
            <div className="form">
                <Outlet/>
            </div>
        </div>
    )
}
