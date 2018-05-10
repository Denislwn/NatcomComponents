import {connect} from "react-redux";
import {editStock, getStockDetail} from "../../../AC/stocks";

import styles from './styles.scss';
import EditStock from '../EditStock';
import RemoveStock from '../RemoveStock';
import Loader from '../../../components/Loader';

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
        this.props.editStock(stock);
    };

    openRemoveStock = () => {
        this.setState({removeStock: !this.state.removeStock});
    };

    successRemoveStock = () => {
        this.setState({removeStock: !this.state.removeStock});
        this.props.history.push(`/stocks`);
    };

    getChangeStockDialog() {
        if (this.state.editStock) {
            return <EditStock openEditStock={this.openEditStock}
                              successEditStock={this.successEditStock}
                              stock={this.props.stock}/>;
        } else if (this.state.removeStock) {
            return <RemoveStock openRemoveStock={this.openRemoveStock}
                                successRemoveStock={this.successRemoveStock}
                                stockId={this.props.stock.id}/>;
        } else {
            return null;
        }
    }

    render() {
        const {stock, isLoading} = this.props;
        if (isLoading || !stock) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const changeStock = this.getChangeStockDialog();
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
    isLoading: state.stocks.isLoading,
}), {getStockDetail, editStock})(StockDetail);