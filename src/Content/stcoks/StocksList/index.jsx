import {BaseApi} from "../../../services/base";
import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/index"
import InfiniteScroll from 'react-infinite-scroller';

export default class extends React.Component {
    baseApi = new BaseApi();
    stocksList;
    state = {
        stocks: [],
        hasMoreStocks: true,
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
                    <li key={stock.id}><Stock stock={stock}/></li>
                );
                this.setState({stocks: res.data.results});
            });
    }

    addNewStock = (stock) => {
        this.stocksList.push(<li key={stock.id}><Stock stock={stock}/></li>);
        this.state.stocks.push(stock);
        this.setState({stocks: this.state.stocks});
    };

    loadStocks(page) {
        const self = this;
        this.setState({hasMoreStocks: false});
        self.baseApi.get(`stocks/?page=${page}`)
            .then(res => {
                self.stocksList = self.stocksList.concat(res.data.results.map(stock =>
                    <li key={stock.id}><Stock stock={stock}/></li>
                ));
                const temp = self.state.stocks.concat(res.data.results);
                self.setState({stocks: temp});
                if (res.data.next !== null) {
                    self.setState({hasMoreStocks: true});
                }
            });
    }

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
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadStocks.bind(this)}
                hasMore={this.state.hasMoreStocks}
            >
                <div>
                    <AddNewStock addNewStock={this.addNewStock}/>
                    <div>{this.stocksList}</div>
                </div>
            </InfiniteScroll>
        );
    }
}