import styles from "./styles.scss"
import {BaseApi} from "../../../services/base";

export default class extends React.Component {
    editSupplier;

    constructor(props) {
        super(props);
        this.editSupplier = this.props.supplier;
        this.state = {
            supplierName: this.editSupplier.name,
            supplierInn: this.editSupplier.inn,
            supplierComment: this.editSupplier.comment
        }

    }

    handleChangeSupplierName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleChangeSupplierInn = event => {
        this.setState({supplierInn: event.target.value});
    };

    handleChangeSupplierComment = event => {
        this.setState({supplierComment: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        const newSupplier = this.getFormValues();
        baseApi.put(`suppliers/${this.editSupplier.id}/`, newSupplier)
            .then(res => {
                this.props.successEditSupplier(res.data);
            }, err => {
                console.log(err);
            })

    };

    getFormValues() {
        let newSupplier = {
            name: this.state.supplierName,
            inn: this.state.supplierInn,
            comment: this.state.supplierComment
        };
        if (!newSupplier.inn) {
            newSupplier.inn = null;
        }
        if (!newSupplier.comment) {
            newSupplier.comment = null;
        }
        return newSupplier;
    }

    close() {
        this.props.openEditSupplier();
    }

    render() {
        return (
            <div className={["modal show", styles.open].join(' ')}>
                <div className={["modal-dialog modal-dialog-centered",
                    styles['modal-dialog']].join(' ')}>
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Редактирование поставщика</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={this.close.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div>Название поставщика</div>
                                    <textarea defaultValue={this.state.supplierName}
                                              className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeSupplierName}/>
                                </div>
                                <div>
                                    <div>ИНН</div>
                                    <textarea defaultValue={this.state.supplierInn}
                                              className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeSupplierInn}/>
                                </div>
                                <div>
                                    <div>Комментарий</div>
                                    <textarea defaultValue={this.state.supplierComment}
                                              className={styles['text-comment-dialog']}
                                              onChange={this.handleChangeSupplierComment}/>
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