import { useEffect, useState } from "react"
import Users from "../components/Users/Users"
import { UserType } from "../types"
import Result from "../components/Result/Result"
import { UsersService } from "../services/reqres/users"

import styles from './UsersPage.module.scss'

const UsersPage = () => {

    const [users, setUsers] = useState<UserType[]>([])
    const [value, setValue] = useState<string>('')
    const [added, setAdded] = useState<UserType[]>([])
    const [openResult, setOpenResult] = useState<boolean>(false)
    const [isLoader, setIsLoader] = useState<boolean>(true)

    useEffect(() => {
        UsersService.getUsers()
            .then((data) => {
                setUsers(data.data)
                setIsLoader(false)
            })
            .catch((error) => {
                alert(error)
                console.log(error)
            })
    }, [])

    const handleSearchChange = (newValue: string) => {
        setValue(newValue)
    }

    const handleToggleUser = (user: UserType) => {
        setAdded(((prev) => {
            if (prev.some(u => u.id === user.id)) {
                return prev.filter(u => u.id !== user.id)
            } else {
                return [...prev, user]
            }
        }))
    }

    const handleSendInvitation = () => {
        setOpenResult(true)
    }


    return (
        <div>
            {
                openResult ?
                    <Result added={added} />
                    :
                    isLoader ?
                        <div className={styles.loader} />
                        :
                        <Users users={users} value={value} onSearchChange={handleSearchChange} added={added} onToggleUser={handleToggleUser} onSendInvitation={handleSendInvitation} />
            }

        </div>
    )
}

export default UsersPage