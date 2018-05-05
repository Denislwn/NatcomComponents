import styles from "./styles.scss"
import {BaseApi} from "../../../services/base";

export default class extends React.Component {

    removeStock() {
        const baseApi = new BaseApi();
        const {stockId} = this.props;
        baseApi
            .delete(`stocks/${stockId}`)
            .then(() => {
                this.props.successRemoveStock();
            });
    }

    close() {
        this.props.openRemoveStock();
    }

    render() {
        return (
            <div className={["modal show", styles.open].join(' ')}>
                <div className={["modal-dialog modal-dialog-centered",
                    styles['modal-dialog']].join(' ')}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Удаление склада</h5>
                            <button type="button" className="close"
                                    onClick={this.close.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Вы действительно хотите удалить этот склад?
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    onClick={this.close.bind(this)}
                                    className="btn btn-secondary">Отмена
                            </button>
                            <button type="button"
                                    onClick={this.removeStock.bind(this)}
                                    className="btn btn-primary">Удалить</button>
                        </div>
                    </div>
                </div>
                <div className={[styles.modal].join(' ')}
                     onClick={this.close.bind(this)}>
                </div>
            </div>
        )
    }
}