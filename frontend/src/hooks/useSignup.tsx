import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

interface SignupInputs {
    fullName: string;
    password: string;
    gender: string;
    confirmPassword: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs: SignupInputs) => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.error);
            }

            setAuthUser(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }
}

export default useSignup