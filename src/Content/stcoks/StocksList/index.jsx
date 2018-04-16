import {BaseApi} from "../../../services/base";
import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/index"
import InfiniteScroll from 'react-infinite-scroller';

export default class extends React.Component {
    baseApi = new BaseApi();
    stocksList;
    state = {
        stocks: [],
        hasMore: true,
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.baseApi.get(`stocks/`)
            .then(res => {
                if (res.data.next === null) {
                    this.setState({hasMore: false});
                }
                console.log(res.data);
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
        this.setState({hasMore: false});
        self.baseApi.get(`stocks/?page=${page}`)
            .then(res => {
                this.stocksList = this.stocksList.concat(res.data.results.map(stock =>
                    <li key={stock.id}><Stock stock={stock}/></li>
                ));
                const temp = this.state.stocks.concat(res.data.results);
                this.setState({stocks: temp});
                if (res.data.next !== null) {
                    this.setState({hasMore: true});
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
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <div>
                    <AddNewStock addNewStock={this.addNewStock}/>
                    <div>{this.stocksList}</div>
                </div>
            </InfiniteScroll>
        );
    }
}