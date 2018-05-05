import {connect} from "react-redux";
import {addNewStock} from "../../../AC";

export class AddNewStock extends React.Component {

    state = {
        stockName: '',
        stockAddress: ''
    };

    constructor(props) {
        super(props)
    }

    handleChangeStockName = event => {
        this.setState({stockName: event.target.value});
    };

    handleChangeStockAddress = event => {
        this.setState({stockAddress: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newStock = {name: this.state.stockName, address: this.state.stockAddress};
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