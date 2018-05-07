import styles from './styles.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    checkMainStock(main) {
        if (main) {
            return 'Главный';
        } else {
            return 'Второстепенный';
        }
    }

    openStockDetail(stockId) {
        this.props.history.push(`stocks/${stockId.toString()}`);
    }

    render() {
        const {stock} = this.props;
        return (
            <tr onClick={this.openStockDetail.bind(this, stock.id)}
                className={styles["hover-element"]}>
                <td>{stock.name}</td>
                <td>{stock.address}</td>
                <td>{this.checkMainStock(stock.main)}</td>
            </tr>
        )
    }
}