import {BaseApi} from "../../../services/base";
import Stock from "../Stock"
import AddNewStock from "../AddNewStock"

export default class extends React.Component {
    baseApi = new BaseApi();
    stocksList;
    state = {
        stocks: [],
        isLoader: false,
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.baseApi.get('stocks/')
            .then(res => {
                this.stocksList = res.data.results.map(stock =>
                    <li key={stock.id}><Stock stock={stock}/></li>
                );
                this.setState({stocks: res.data.results});
                this.state.isLoader = true;
            });
    }

    addNewStock = (stock) => {
        console.log(stock);
        console.log(this.state.stocks);
        this.stocksList.push(<li key={stock.id}><Stock stock={stock}/></li>);
        this.setState({stocks: this.state.stocks.push(stock)});
    };

    ready() {
        if (this.state.stocks) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false
        }
        return (
            <div>
                <div>{this.stocksList}</div>
                <AddNewStock addNewStock={this.addNewStock}/>
            </div>
        );
    }
}