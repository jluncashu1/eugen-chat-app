import React, { Dispatch, useContext, useEffect, useState } from "react";

type AuthUserType = {
    id: string,
    fullName: string,
    email: string,
    profilePic: string,
    gender: string
}

const AuthContext = React.createContext<{
    authUser: AuthUserType | null,
    setAuthUser: Dispatch<React.SetStateAction<AuthUserType | null>>,
    isLoading: boolean
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
} 

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                };

                setAuthUser(data);
            } catch (error) {
                console.error("Error in fetchAuthUser: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuthUser();
    }, [])

    return (
        <AuthContext.Provider value={{
            authUser,
            isLoading,
            setAuthUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}