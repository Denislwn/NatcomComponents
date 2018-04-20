import {BaseApi} from "../../../services/base";
import EditStock from "../EditStock"

export default class extends React.Component {
    baseApi = new BaseApi();

    state = {
        stock: null,
        editStock: false,
        removeStock: false
    };

    componentWillMount() {
        console.log(this.props);
        const stockId = this.props.match.params.stockId;
        this.baseApi
            .get(`stocks/${stockId}/`)
            .then((stock) => {
                this.setState({stock: stock.data});
            });
    }

    openEditStock = () => {
        this.setState({editStock: !this.state.editStock});
    };

    successEditStock = (stock) => {
        this.setState({editStock: !this.state.editStock, stock: stock});
    };

    ready() {
        if (this.state.stock !== null) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false;
        }
        let editStock = null;
        if (this.state.editStock) {
            editStock = <EditStock openEditStock={this.openEditStock}
                                   successEditStock = {this.successEditStock}
                                   stock={this.state.stock}/>;
        }
        const stock = this.state.stock;
        return (
            <div>
                <div>{stock.name}</div>
                <div>{stock.address}</div>
                {editStock}
                <button type="button"
                        onClick={this.openEditStock}
                        className="btn btn-primary btn-sm">Редактирова склад</button>
            </div>
        )
    }
}