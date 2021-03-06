import NavLink from "react-router-dom/es/NavLink";
import styles from "./styles.scss"

export default class extends React.Component {
    render() {
        return (
            <div className={["col-2", styles["menu-container"]].join(' ')}>
                <header className={styles['nav-bar']}>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to='/stocks' activeClassName={styles.active}
                                     className="nav-link">Склады</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/suppliers' activeClassName={styles.active}
                                     className="nav-link active">Поставщики</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/categories' activeClassName={styles.active}
                                     className="nav-link active">Категории</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/products' activeClassName={styles.active}
                                     className="nav-link active">Товары</NavLink>
                        </li>
                    </ul>
                </header>
            </div>
        )
    }
}
