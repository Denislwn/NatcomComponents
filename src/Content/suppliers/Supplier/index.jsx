import NavLink from "react-router-dom/es/NavLink";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    checkFields(supplier) {
        let checkSupplier = Object.assign({}, supplier);
        if (!checkSupplier.inn) {
            checkSupplier.inn = 'Нет ИНН';
        }
        if (!checkSupplier.comment) {
            checkSupplier.comment = 'комментарий отсутсвует'
        }
        return checkSupplier;
    }

    render() {
        const {supplier} = this.props;
        return (
            <NavLink to={`/suppliers/${supplier.id}`}>
                <div>{supplier.name}</div>
                <div>{supplier.inn}</div>
                <div>{supplier.comment}</div>
            </NavLink>
        )
    }
}