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
            <div>
                <div>{supplier.name}</div>
                <div>{supplier.inn}</div>
                <div>{supplier.comment}</div>
            </div>
        )
    }
}