import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = ev => {
        ev.preventDefault()

    }


    return (
        <div id="defaultLayout">
            <sidebar>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </sidebar>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
