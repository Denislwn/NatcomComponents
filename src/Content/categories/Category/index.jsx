import NavLink from "react-router-dom/es/NavLink";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {category} = this.props;
        return (
            <NavLink to={`/suppliers/${category.id}`}>
                <div>{category.name}</div>
            </NavLink>
        )
    }
}