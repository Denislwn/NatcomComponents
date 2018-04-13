import Link from "react-router-dom/es/Link";

export default class extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to='/stocks' className="nav-link active">Склады</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login' className="nav-link active">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login' className="nav-link active">Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login' className="nav-link active">Active</Link>
                    </li>
                </ul>
            </header>
        )
    }
}
