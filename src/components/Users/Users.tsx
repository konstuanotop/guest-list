import { Dispatch, SetStateAction } from 'react';
import plus from '../../assets/img/icon_plus.png'
import minus from '../../assets/img/icon_minus.png'
import { UsersArr } from '../../types'
import styles from './Users.module.scss'

interface UsersProps {
    usersArr: UsersArr[];
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    added: UsersArr[];
    setAdded: Dispatch<SetStateAction<UsersArr[]>>
    setOpenResult: Dispatch<SetStateAction<boolean>>;
}

const Users: React.FC<UsersProps> = ({ usersArr, value, setValue, added, setAdded, setOpenResult }) => {

    // При нажатии на кнопку "добавить" надо:
    // 1) Изменить картинку с + на - или наоборот, если чел уже был добавлен
    // 2) Добавить в useState added чела или удалить, если он уже добавлен

    const handleToggleClick = (user: UsersArr) => {
        setAdded(((prev) => {
            if (prev.some(u => u.id === user.id)) {
                return prev.filter(u => u.id !== user.id)
            } else {
                return [...prev, user]
            }
        }))
    }

    const isUserAdded = (user: UsersArr) => {
        return added.some(u => u.id === user.id)
    }

    return (
        <div className={styles.Users}>
            <div className={styles.Users__block}>
                <input
                    className={styles.Users__block_input}
                    placeholder='Найти пользователя'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ul className={styles.Users__block_items}>

                    {
                        usersArr
                            .filter((user, i) => {
                                const name = user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase();
                                return name.includes(value.toLowerCase()) || user.email.includes(value.toLowerCase())
                            })
                            .map((user, i) => (
                                <li
                                    key={i}
                                    className={`${styles.Users__block_items_item} ${styles.item}`}
                                >
                                    <div className={styles.item__content}>
                                        <div className={styles.item__content_img}>
                                            <img src={user.avatar} alt="Фотография" />
                                        </div>
                                        <div className={styles.item__content_text}>
                                            <div className={styles.item__content_text_name}>{user.first_name} {user.last_name}</div>
                                            <div className={styles.item__content_text_email}>{user.email}</div>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.item__add}
                                        onClick={() => handleToggleClick(user)}
                                    >
                                        <img src={isUserAdded(user) ? minus : plus} alt="Добавление"></img>
                                    </div>
                                </li>
                            ))
                    }
                </ul>
                <button
                    className={styles.Users__block_btn}
                    onClick={() => setOpenResult(true)}
                >Отправить приглашение</button>
            </div>
        </div>
    )
}

export default Users