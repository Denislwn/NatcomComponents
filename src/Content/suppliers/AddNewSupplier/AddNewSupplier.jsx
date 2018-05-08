import {connect} from 'react-redux';
import {addNewSupplier} from '../../../AC/suppliers';
import styles from './styles.scss';

class AddNewSupplier extends React.Component {

    state = {
        supplierName: '',
        supplierInn: '',
        supplierComment: ''
    };

    constructor(props) {
        super(props)
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
        const newSupplier = this.getSupplier();
        this.props.addNewSupplier(newSupplier);
        this.close();
    };

    getSupplier() {
        let newSupplier = {
            name: this.state.supplierName,
            inn: this.state.supplierInn,
            comment: this.state.supplierComment,
        };
        if (newSupplier.inn === '') {
            newSupplier.inn = null;
        }
        if (newSupplier.comment === '') {
            newSupplier.comment = null;
        }
        return newSupplier;
    }

    close() {
        this.props.openAddSupplier();
    }

    render() {
        return (
            <div className={["modal show", styles.open].join(' ')}>
                <div className={["modal-dialog modal-dialog-centered",
                    styles['modal-dialog']].join(' ')}>
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Новый поставщик</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={this.close.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Имя поставщика</label>
                                    <input type="text"
                                           onChange={this.handleChangeSupplierName}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Инн поставщика</label>
                                    <input type="text"
                                           onChange={this.handleChangeSupplierInn}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Комментарий</label>
                                    <textarea className={["form-control",
                                              styles['text-field-dialog']].join(' ')}
                                              onChange={this.handleChangeSupplierComment}/>
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

export default connect(null, {addNewSupplier})(AddNewSupplier)