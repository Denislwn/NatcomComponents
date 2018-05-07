import styles from './styles.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    openSupplierDetail(supplierId) {
        this.props.history.push(`suppliers/${supplierId}`);
    }

    checkInn(inn) {
        if (!inn) {
            return 'Инн не указан';
        }
        return inn;
    }

    checkComment(comment) {
        if (!comment) {
            return 'Комментрий отсутвует';
        }
        return comment;
    }

    render() {
        const {supplier} = this.props;
        return (
            <tr onClick={this.openSupplierDetail.bind(this, supplier.id)}
                className={styles["hover-element"]}>
                <td>{supplier.name}</td>
                <td>{this.checkInn(supplier.inn)}</td>
                <td>{this.checkComment(supplier.comment)}</td>
            </tr>
        )
    }
}