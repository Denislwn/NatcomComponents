import {BaseApi} from "../../../services/base";

export default class extends React.Component {

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
        const baseApi = new BaseApi();
        const newStock = {name: this.state.stockName, address: this.state.stockAddress};
        baseApi.post(`stocks/`, newStock)
            .then(res => {
                this.handleStocksChange(res.data);
            }, err => {
                console.log(err);
            })

    };

    handleStocksChange = (stock) => {
        this.props.addNewStock(stock);
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