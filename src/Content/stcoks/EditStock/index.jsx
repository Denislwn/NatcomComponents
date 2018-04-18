import styles from "./styles.scss"
import {BaseApi} from "../../../services/base";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stockName: '',
            stockAddress: ''
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
        const stock = this.props.stock;
        const newStock = {name: this.state.stockName, address: this.state.stockAddress};
        baseApi.put(`stocks/${stock.id}/`, newStock)
            .then(res => {
                console.log(res.data);
                this.successEditStock(res.data);
            }, err => {
                console.log(err);
            })

    };

    successEditStock(stock) {
        this.props.successEditStock(stock)
    }

    close(id) {
        this.props.openEditStock(id);
    }

    render() {
        const stock = this.props.stock;
        return (
            <div className={["modal fade show", styles.modal].join(' ')}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true"
                                      onClick={this.close.bind(this)}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <label>Название склада</label>
                                    <input type="text"
                                           defaultValue={stock.stockName}
                                           onChange={this.handleChangeStockName}/>
                                </div>
                                <div>
                                    <label>Адрес склада</label>
                                    <input type="text"
                                           defaultValue={this.state.stockAddress}
                                           onChange={this.handleChangeStockAddress}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.close.bind(this)}
                                        type="button" className="btn btn-secondary">Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary">Изменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}