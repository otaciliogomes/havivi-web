import { useState, useEffect } from "react";
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"

const Admin = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsersAPI()
    }, [])

    const getUsersAPI = async () => {
        const [usersList] = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(users => users.json())
        setUsers(usersList)
    }


    return (
        <div className="containerAdmin">
            <Header title="Area administrativa" />
            <main>
                TESTE
                {/* {users.map(user => 
                        <div>
                            <p>user.id</p>
                            <p>user.name</p>
                        </div>
                )} */}
            </main>
            <Footer />
        </div>
    )
}

export { Admin }