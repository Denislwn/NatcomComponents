import NavLink from "react-router-dom/es/NavLink";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    checkFields(supplier) {
        if (!supplier.inn) {
            supplier.inn = 'Нет ИНН';
        }
        if (!supplier.comment) {
            supplier.comment = 'комментарий отсутсвует'
        }
        return supplier;
    }

    render() {
        let {supplier} = this.props;
        supplier = this.checkFields(supplier);
        return (
            <NavLink to={`/suppliers/${supplier.id}`}>
                <div>{supplier.name}</div>
                <div>{supplier.inn}</div>
                <div>{supplier.comment}</div>
            </NavLink>
        )
    }
}