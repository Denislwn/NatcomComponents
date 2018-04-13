import {BaseApi} from "../../../services/base";

export default class extends React.Component {

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
        const baseApi = new BaseApi();
        let newSupplier = {
            name: this.state.supplierName,
            inn: this.state.supplierInn,
            comment: this.state.supplierComment,
        };
        newSupplier = this.checkSupplier(newSupplier);
        baseApi.post(`suppliers/`, newSupplier)
            .then(res => {
                this.handleStocksChange(res.data);
            }, err => {
                console.log(err);
            })

    };

    checkSupplier(supplier) {
        if (supplier.inn === '') {
            supplier.inn = null;
        }
        if (supplier.comment === '') {
            supplier.comment = null;
        }
        return supplier;
    }

    handleStocksChange = (supplier) => {
        this.props.addNewSupplier(supplier);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Имя поставщика</label>
                    <input ref="form" type="text" name="supplierName" onChange={this.handleChangeSupplierName}/>
                </div>
                <div>
                    <label>Инн поставщика</label>
                    <input type="text" name="supplierInn" onChange={this.handleChangeSupplierInn}/>
                </div>
                <div>
                    <label>Комментарий</label>
                    <input type="text" name="supplierComment" onChange={this.handleChangeSupplierComment}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        )
    }
}