import {connect} from "react-redux";
import {editSupplier, getSupplierDetail} from "../../../AC/suppliers";
import EditSupplier from '../EditSupplier'

class SupplierDetail extends React.Component {
    state = {
        editSupplier: false,
    };

    componentWillMount() {
        const supplierId = this.props.match.params.supplierId;
        this.props.getSupplierDetail(supplierId);
    }

    openEditSupplier = () => {
        this.setState({editSupplier: !this.state.editSupplier});
    };

    successEditSupplier = (supplier) => {
        this.setState({editSupplier: !this.state.editSupplier});
        this.props.editSupplier(supplier);
    };


    ready() {
        if (this.props.supplier !== null) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false;
        }
        let changeSupplier = null;
        if (this.state.editSupplier) {
            changeSupplier = <EditSupplier openEditSupplier={this.openEditSupplier}
                                           successEditSupplier={this.successEditSupplier}
                                           supplier={this.props.supplier}/>;
        }
        const supplier = this.props.supplier;
        return (
            <div>
                <div>{supplier.name}</div>
                <div>{supplier.inn}</div>
                <div>{supplier.comment}</div>
                {changeSupplier}
                <button type="button"
                        onClick={this.openEditSupplier}
                        className="btn btn-primary btn-sm">Редактировать поставщика
                </button>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
}), {getSupplierDetail, editSupplier})(SupplierDetail);