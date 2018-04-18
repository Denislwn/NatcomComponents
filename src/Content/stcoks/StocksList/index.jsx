import {BaseApi} from "../../../services/base";
import Stock from "../Stock/index"
import AddNewStock from "../AddNewStock/index"
import InfiniteScroll from 'react-infinite-scroller';
import EditStock from "../EditStock"

export default class extends React.Component {
    baseApi = new BaseApi();
    stock;
    stocksList;
    state = {
        stocks: [],
        hasMoreStocks: true,
        newStock: {visibility: false, message: 'Добавить склад'},
        editStock: false,
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
                    <li key={stock.id}><Stock stock={stock}
                                              openEditStock={this.openEditStock}/></li>
                );
                this.setState({stocks: res.data.results});
            });
    }

    addNewStock = (stock) => {
        this.stocksList.push(<li key={stock.id}><Stock stock={stock}
                                                       openEditStock={this.openEditStock}/></li>);
        this.state.stocks.push(stock);
        this.setState({stocks: this.state.stocks});
    };

    loadStocks(page) {
        const self = this;
        this.setState({hasMoreStocks: false});
        self.baseApi.get(`stocks/?page=${page}`)
            .then(res => {
                self.stocksList = self.stocksList.concat(res.data.results.map(stock =>
                    <li key={stock.id}><Stock stock={stock}
                                              openEditStock={this.openEditStock}/></li>
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

    openEditStock = (id) => {
        this.state.stocks.map(stock => {
            if (stock.id === id) {
                this.stock = stock;
                return null;
            }
        });
        this.setState({editStock: !this.state.editStock});
    };

    successEditStock = (editStock) => {
        let numberEditStock;
        this.state.stocks.map((stock, index) => {
            if (stock.id === editStock.id) {
                numberEditStock = index;
                stock = editStock;
                this.stocksList[index] = <li key={stock.id}>
                    <Stock stock={stock}
                           openEditStock={this.openEditStock}/></li>
                this.stock = null;
                return null;
            }
        });
        this.setState({editStock: !this.state.editStock});
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
        let editStock = null;
        if (this.state.editStock) {
            editStock = <EditStock openEditStock={this.openEditStock}
                                   successEditStock={this.successEditStock}
                                   stock={this.stock}/>;
        }
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadStocks.bind(this)}
                hasMore={this.state.hasMoreStocks}
            >
                <div>
                    {editStock}
                    <span onClick={this.newStock}>{this.state.newStock.message}</span>
                    {newStock}
                    <div>{this.stocksList}</div>
                </div>
            </InfiniteScroll>
        );
    }
}