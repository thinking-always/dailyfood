import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
    const { access } = useContext(AuthContext);
    const nav = useNavigate();
    const [me, setMe] = useState(null);

    useEffect(() => {
        if (!access) {
            nav("/login");
            return;
        }
        api.get("/api/me/").then((res) => setMe(res.data)).catch(() => {});
    }, [access, nav]);

    if (!access) return null;

    if (!access) return null;
    return (
        <div>
            <h2>Profile</h2>
            <pre>{JSON.stringify(me, null, 2)}</pre>
        </div>
    );
}