import NavLink from "react-router-dom/es/NavLink";

export default class extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header>
                <ul className="nav flex-column">
                    <li className="nav-item active">
                        <NavLink to='/stocks' activeClassName="active" className="nav-link active">Склады</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/login' className="nav-link active">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/suppliers' className="nav-link active">Поставщики</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/categories' className="nav-link active">Категории</NavLink>
                    </li>
                </ul>
            </header>
        )
    }
}
