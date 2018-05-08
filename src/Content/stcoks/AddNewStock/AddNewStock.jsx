import {connect} from "react-redux";
import {addNewStock} from "../../../AC/stocks";
import styles from './styles.scss';

export class AddNewStock extends React.Component {

    state = {
        supplierName: '',
        supplierAddress: ''
    };

    constructor(props) {
        super(props)
    }

    handleChangeStockName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleChangeStockAddress = event => {
        this.setState({supplierAddress: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newStock = {name: this.state.supplierName, address: this.state.supplierAddress};
        this.props.addNewStock(newStock);
        this.close();
    };

    close() {
        this.props.openAddStock();
    }

    render() {
        return (
            <div className={["modal show", styles.open].join(' ')}>
                <div className={["modal-dialog modal-dialog-centered",
                    styles['modal-dialog']].join(' ')}>
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Новый склад</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={this.close.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div>Название склада</div>
                                    <textarea className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeStockName}/>
                                </div>
                                <div>
                                    <div>Адрес склада</div>
                                    <textarea className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeStockAddress}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.close.bind(this)}
                                        type="button"
                                        className="btn btn-secondary">Закрыть
                                </button>
                                <button type="submit"
                                        className="btn btn-primary">Добавить
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

export default connect(null, {addNewStock})(AddNewStock);