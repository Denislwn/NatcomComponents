import {BaseApi} from "../../../services/base";
import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/AddNewStock"
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {getAllStocks, getNextStocks} from "../../../AC";
import {mapToArr} from "../../../helpers";
import {getStocksSelector} from "../../../selectors/stocksSelector";

export class StockList extends React.Component {
    baseApi = new BaseApi();
    stock;
    stocksList;
    state = {
        newStock: {visibility: false, message: 'Добавить склад'},
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAllStocks();
    }

    loadStocks(page) {
        this.props.getNextStocks(page);
    }

    newStock = () => {
        if (!this.state.newStock.visibility) {
            this.state.newStock = {visibility: true, message: 'Удалить'};
        } else {
            this.state.newStock = {visibility: false, message: 'Добавить склад'};
        }
        this.setState({newStock: this.state.newStock})
    };

    ready() {
        if (this.props.stocks !== undefined) {
            this.stocksList = this.props.stocks.map(stock =>
                <Stock key={stock.id} stock={stock} history={this.props.history}/>
            );
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false
        }
        let newStock = null;
        if (this.state.newStock.visibility) {
            newStock = <AddNewStock/>;
        }
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadStocks.bind(this)}
                hasMore={this.props.hasMoreStocks}
            >
                <div>
                    <span onClick={this.newStock}>{this.state.newStock.message}</span>
                    {newStock}
                    <table className="table table-hover">
                        <tbody>{this.stocksList}</tbody>
                    </table>
                </div>
            </InfiniteScroll>
        );
    }
}

export default connect((state) => ({
    stocks: getStocksSelector(state),
    hasMoreStocks: state.stocks.hasMoreStocks
}), {getAllStocks, getNextStocks})(StockList);