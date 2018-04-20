import {BaseApi} from "../../../services/base";
import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/index"
import InfiniteScroll from 'react-infinite-scroller';

export default class extends React.Component {
    baseApi = new BaseApi();
    stock;
    stocksList;
    state = {
        stocks: [],
        hasMoreStocks: true,
        newStock: {visibility: false, message: 'Добавить склад'},
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.baseApi.get(`stocks/`)
            .then(res => {
                if (res.data.next === null) {
                    this.setState({hasMoreStocks: false});
                }
                this.stocksList = res.data.results.map(stock =>
                    <Stock key={stock.id} stock={stock}/>
                );
                this.setState({stocks: res.data.results});
            });
    }

    addNewStock = (stock) => {
        this.stocksList.push(<Stock stock={stock}
                                    key={stock.id}/>);
        this.state.stocks.push(stock);
        this.setState({stocks: this.state.stocks});
    };

    loadStocks(page) {
        const self = this;
        this.setState({hasMoreStocks: false});
        self.baseApi.get(`stocks/?page=${page}`)
            .then(res => {
                self.stocksList = self.stocksList.concat(res.data.results.map(stock =>
                    <Stock stock={stock}
                           key={stock.id}/>
                ));
                const temp = self.state.stocks.concat(res.data.results);
                self.setState({stocks: temp});
                if (res.data.next !== null) {
                    self.setState({hasMoreStocks: true});
                }
            });
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
        if (this.state.stocks.length !== 0) {
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
            newStock = <AddNewStock addNewStock={this.addNewStock}/>;
        }
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadStocks.bind(this)}
                hasMore={this.state.hasMoreStocks}
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