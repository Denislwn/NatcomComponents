import styles from "./styles.scss"
import {BaseApi} from "../../../services/base";

export default class extends React.Component {
    editStock;

    constructor(props) {
        super(props);
        this.editStock = this.props.stock;
        this.state = {
            supplierName: this.editStock.name,
            supplierAddress: this.editStock.address,
        }

    }

    handleChangeStockName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleChangeStockAddress = event => {
        this.setState({supplierAddress: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        const newStock = {name: this.state.supplierName, address: this.state.supplierAddress};
        baseApi.put(`stocks/${this.editStock.id}/`, newStock)
            .then(res => {
                this.props.successEditStock(res.data);
            }, err => {
                console.log(err);
            })

    };

    close() {
        this.props.openEditStock();
    }

    render() {
        return (
            <div className={["modal show", styles.open].join(' ')}>
                <div className={["modal-dialog modal-dialog-centered",
                                styles['modal-dialog']].join(' ')}>
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
                                <div className="form-group">
                                    <label>Название склада</label>
                                    <textarea defaultValue={this.state.supplierName}
                                              className={["form-control",
                                                  styles['text-field-dialog']].join(' ')}
                                              onChange={this.handleChangeStockName}/>
                                </div>
                                <div className="form-group">
                                    <label>Адрес склада</label>
                                    <textarea defaultValue={this.state.supplierAddress}
                                              className={["form-control",
                                                  styles['text-field-dialog']].join(' ')}
                                              onChange={this.handleChangeStockAddress}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.close.bind(this)}
                                        type="button"
                                        className="btn btn-secondary">Закрыть
                                </button>
                                <button type="submit"
                                        className="btn btn-primary">Изменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={[styles.modal].join(' ')}
                     onClick={this.close.bind(this)}>
                </div>
            </div>
        )
    }
}