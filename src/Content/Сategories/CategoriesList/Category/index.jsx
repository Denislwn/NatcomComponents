import NavLink from "react-router-dom/es/NavLink";

export default class extends React.Component {

    render() {
        let {category} = this.props;
        return (
                <div onClick={this.categoryId}>{category.name}</div>
        )
    }
}