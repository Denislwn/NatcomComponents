import styles from "./styles.scss"
import {BaseApi} from "../../../services/base";

export default class extends React.Component {
    editStock;

    constructor(props) {
        super(props);
        this.editStock = this.props.stock;
        this.state = {
            stockName: this.editStock.name,
            stockAddress: this.editStock.address,
        }

    }

    handleChangeStockName = event => {
        this.setState({stockName: event.target.value});
    };

    handleChangeStockAddress = event => {
        this.setState({stockAddress: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        const newStock = {name: this.state.stockName, address: this.state.stockAddress};
        baseApi.put(`stocks/${this.editStock.id}/`, newStock)
            .then(res => {
                this.successEditStock(res.data);
            }, err => {
                console.log(err);
            })

    };

    successEditStock(stock) {
        this.props.successEditStock(stock);
    }

    close() {
        this.props.openEditStock();
    }

    render() {
        return (
            <div className={["modal fade show", styles.modal].join(' ')}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Редактирование склада</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={this.close.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div>Название склада</div>
                                    <textarea defaultValue={this.state.stockName}
                                              className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeStockName}/>
                                </div>
                                <div>
                                    <div>Адрес склада</div>
                                    <textarea defaultValue={this.state.stockAddress}
                                              className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeStockAddress}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.close.bind(this)}
                                        type="button"
                                        className="btn btn-secondary">Закрыть
                                </button>
                                <button type="submit"
                                        className="btn btn-primary">Изменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}