import { useEffect, useState } from "react"

const useUser = (data) => {
    const [user, setUser] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [userData, setUserData] = useState(data);

    //console.log(userData);

    useEffect(() => {
        if (userData?.data?.email) {
            fetch(`https://hero-riders-server.vercel.app/api/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${userData?.accessToken}`
                },
                body: JSON.stringify({ email: userData?.data?.email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.verify) {
                        setUser(data.user);
                    }
                    setUserLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    setUserLoading(false);
                })
        } else {
            setUser(null);
            setUserLoading(false);
        }
    }, [userData])

    return { user, userLoading, setUserData }
}

export default useUser;