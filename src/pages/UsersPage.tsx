import { useEffect, useState } from "react"
import Users from "../components/Users/Users"
import { UsersArr } from "../types"
import Result from "../components/Result/Result"

const UsersPage = () => {

    const [usersArr, setUsersArr] = useState<UsersArr[]>([])
    const [value, setValue] = useState('')
    const [added, setAdded] = useState<UsersArr[]>([])
    const [openResult, setOpenResult] = useState(false)

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUsersArr(data.data)
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }, [])

    console.log(added)

    return (
        <div>
            {
                openResult ?
                    <Result added={added} setOpenResult={setOpenResult} />
                    :
                    <Users usersArr={usersArr} value={value} setValue={setValue} added={added} setAdded={setAdded} setOpenResult={setOpenResult} />
            }

        </div>
    )
}

export default UsersPage