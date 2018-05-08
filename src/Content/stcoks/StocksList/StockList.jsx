import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/AddNewStock"
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {getAllStocks, getNextStocks} from "../../../AC/stocks";
import {getStocksSelector} from "../../../selectors/stocksSelector";
import styles from './styles.scss';

export class StockList extends React.Component {
    stock;
    stocksList;
    state = {
        addStock: false,
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

    openAddStock = () => {
        this.setState({addStock: !this.state.addStock});
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
        let addStock = null;
        if (this.state.addStock) {
            addStock = <AddNewStock openAddStock={this.openAddStock}/>;
        }
        return (
            <div className="row">
                {addStock}
                <div className={["col-12", styles['main-page']].join(' ')}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadStocks.bind(this)}
                        hasMore={this.props.hasMoreStocks}
                        useWindow={false}
                    >
                        <div className="row">
                            <div className="col-10">
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Название</th>
                                        <th scope="col">Адрес</th>
                                        <th scope="col">Статус</th>
                                    </tr>
                                    </thead>
                                    <tbody>{this.stocksList}</tbody>
                                </table>
                            </div>
                            <div className="col-2">
                                <div className={styles["add-button"]}
                                     onClick={this.openAddStock}>+</div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    stocks: getStocksSelector(state),
    hasMoreStocks: state.stocks.hasMoreStocks
}), {getAllStocks, getNextStocks})(StockList);