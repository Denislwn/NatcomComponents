import {connect} from "react-redux";
import {addNewStock} from "../../../AC/stocks";

export class AddNewStock extends React.Component {

    state = {
        supplierName: '',
        supplierInn: ''
    };

    constructor(props) {
        super(props)
    }

    handleChangeStockName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleChangeStockAddress = event => {
        this.setState({supplierInn: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newStock = {name: this.state.supplierName, address: this.state.supplierInn};
        this.props.addNewStock(newStock);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Название склада</label>
                    <input type="text" name="stockName" onChange={this.handleChangeStockName}/>
                </div>
                <div>
                    <label>Адрес склада</label>
                    <input type="text" name="stockAddress" onChange={this.handleChangeStockAddress}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        )
    }
}

export default connect(null, {addNewStock})(AddNewStock);