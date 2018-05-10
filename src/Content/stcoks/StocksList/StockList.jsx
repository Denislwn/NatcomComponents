import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {getAllStocks, getNextStocks} from "../../../AC/stocks";
import {getStocksSelector} from "../../../selectors/stocksSelector";
import styles from './styles.scss';

import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/AddNewStock"
import AddButton from '../../../components/AddButton';
import Loader from '../../../components/Loader';

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

    getBody(stocks) {
        this.stocksList = stocks.map(stock =>
            <Stock key={stock.id} stock={stock} history={this.props.history}/>
        );
    }

    getNewStock() {
        if (this.state.addStock) {
            return <AddNewStock openAddStock={this.openAddStock}/>;
        } else {
            return null;
        }
    }

    render() {
        const {isLoading, stocks, hasMoreStocks} = this.props;
        if (isLoading || !stocks) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreStocks ? <Loader/> : false;
        this.getBody(stocks);
        let addStock = this.getNewStock();
        return (
            <div className="row">
                {addStock}
                <div className={["col-12", styles['main-page']].join(' ')}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadStocks.bind(this)}
                        hasMore={hasMoreStocks}
                        useWindow={false}>
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
                                {loader}
                            </div>
                            <div className="col-2">
                                <AddButton openAdd={this.openAddStock}/>
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
    hasMoreStocks: state.stocks.hasMoreStocks,
    isLoading: state.stocks.isLoading,
    loaded: state.stocks.loaded
}), {getAllStocks, getNextStocks})(StockList);