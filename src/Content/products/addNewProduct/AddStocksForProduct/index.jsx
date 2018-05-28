export default class extends React.Component {

    state = {
        stocks: [{stock: this.props.stocks[0].id}]
    };

    handleChangeProductStocks = (event, index, param) => {
        let stocksState = this.state.stocks;
        param === 'stock' ? stocksState[index] = {} : false;
        stocksState[index][param] = Number(event.target.value);
        this.setProductState(stocksState);
    };

    addStock() {
        let stocksState = this.state.stocks;
        const {stocks} = this.props;
        for (const stock of stocks) {
            let count = 0;
            for (const stockState of stocksState) {
                if (stock.id === stockState.stock) {
                    count++;
                    break;
                }
            }
            if (count === 0) {
                stocksState.push({stock: stock.id});
                this.setProductState(stocksState);
                break;
            }
        }
    }

    removeStock(index) {
        let stocksState = this.state.stocks;
        stocksState.splice(index, 1);
        this.setProductState(stocksState);
    }

    setProductState(stocksState) {
        this.setState({stocks: stocksState});
        this.props.addProductStocks(this.state.stocks);
    }

    getDeleteButton(index) {
        if (this.state.stocks.length > 1) {
            return (
                <div className="col-2">
                    <button type="button"
                            onClick={this.removeStock.bind(this, index)}>delete</button>
                </div>
            )
        }
    }

    getAddButton() {
        if (this.state.stocks !== this.props.stocks) {
            return (<button type="button" onClick={this.addStock.bind(this)}>Add</button>);
        } else {
            return null;
        }
    }

    render() {
        const {stocks} = this.props;
        const productStocks = this.state.stocks.map((arrStock, index) => (
                <div key={arrStock.stock}>
                    <div className="row">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Склад</label>
                                    <select className="form-control"
                                            onChange={(e) => this.handleChangeProductStocks(e, index, 'stock')}
                                            defaultValue={this.state.stocks[index].stock}>
                                        {stocks.map(stock => (
                                            <option value={stock.id}
                                                    key={stock.id}>{stock.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor="minCount">Минимальное количество</label>
                                    <input type="text"
                                           onChange={(e) => this.handleChangeProductStocks(e, index, 'min_count')}
                                           className="form-control"
                                           id="minCount"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="desiredCount">Ожидаемое количество</label>
                                    <input type="text"
                                           onChange={(e) => this.handleChangeProductStocks(e, index, 'desired_count')}
                                           className="form-control"
                                           id="desiredCount"/>
                                </div>
                            </div>
                        </div>
                        {this.getDeleteButton(index)}
                    </div>
                </div>
            )
        );
        return (
            <div>
                {productStocks}
                {this.getAddButton()}
            </div>
        )
    }
}