import plus from '../../assets/img/icon_plus.png'
import minus from '../../assets/img/icon_minus.png'
import { UserType } from '../../types'
import styles from './Users.module.scss'

interface UsersProps {
    users: UserType[];
    value: string;
    onSearchChange: (value: string) => void;
    added: UserType[];
    onToggleUser: (user: UserType) => void;
    onSendInvitation: () => void;
}

const Users: React.FC<UsersProps> = ({ users, value, onSearchChange, added, onToggleUser, onSendInvitation }) => {

    const handleToggleClick = (user: UserType) => {
        onToggleUser(user)
    }

    const isUserAdded = (user: UserType) => {
        return added.some(u => u.id === user.id)
    }

    return (
        <div className={styles.Users}>
            <div className={styles.Users__block}>
                <input
                    className={styles.Users__block_input}
                    placeholder='Найти пользователя'
                    value={value}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <ul className={styles.Users__block_items}>

                    {
                        users
                            .filter((user) => {
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
                    onClick={onSendInvitation}
                >Отправить приглашение</button>
            </div>
        </div>
    )
}

export default Users