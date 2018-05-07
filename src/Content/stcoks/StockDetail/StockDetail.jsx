import {BaseApi} from '../../../services/base';
import EditStock from '../EditStock';
import RemoveStock from '../RemoveStock';
import {connect} from "react-redux";
import {editStock, getStockDetail} from "../../../AC/stocks";

class StockDetail extends React.Component {
    state = {
        editStock: false,
        removeStock: false
    };

    componentWillMount() {
        const stockId = this.props.match.params.stockId;
        this.props.getStockDetail(stockId);
    }

    openEditStock = () => {
        this.setState({editStock: !this.state.editStock});
    };

    successEditStock = (stock) => {
        this.setState({editStock: !this.state.editStock});
        this.props.editSupplier(stock);
    };

    openRemoveStock = () => {
        this.setState({removeStock: !this.state.removeStock});
    };

    successRemoveStock = () => {
        this.setState({removeStock: !this.state.removeStock});
        this.props.history.push(`/stocks`);
    };

    ready() {
        if (this.props.stock !== null) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false;
        }
        let changeStock = null;
        if (this.state.editStock) {
            changeStock = <EditStock openEditStock={this.openEditStock}
                                   successEditStock={this.successEditStock}
                                   stock={this.props.stock}/>;
        }
        if (this.state.removeStock) {
            changeStock = <RemoveStock openRemoveStock={this.openRemoveStock}
                                     successRemoveStock={this.successRemoveStock}
                                     stockId={this.props.stock.id}/>;
        }
        const stock = this.props.stock;
        return (
            <div>
                <div>{stock.name}</div>
                <div>{stock.address}</div>
                {changeStock}
                <button type="button"
                        onClick={this.openEditStock}
                        className="btn btn-primary btn-sm">Редактировать склад
                </button>
                <button type="button"
                        onClick={this.openRemoveStock}
                        className="btn btn-primary btn-sm">Удалить склад
                </button>
            </div>
        )
    }
}

export default connect((state) => ({
    stock: state.stocks.stock,
}), {getStockDetail, editStock})(StockDetail);