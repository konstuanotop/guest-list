import { UserType } from '../../types';
import styles from './Result.module.scss'

interface ResultProps {
    added: UserType[];
}

const Result: React.FC<ResultProps> = ({ added }) => {
    return (
        <div className={styles.Result}>
            <div className={styles.Result__block}>
                <h2 className={styles.Result__block_title}>Приглашены:</h2>
                <ul className={styles.Result__block_items}>

                    {
                        added.map((user, i) => (
                            <li
                                key={i}
                                className={`${styles.Result__block_items_item} ${styles.item}`}
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
                            </li>
                        ))
                    }
                </ul>
            </div>


        </div>
    )
}

export default Result