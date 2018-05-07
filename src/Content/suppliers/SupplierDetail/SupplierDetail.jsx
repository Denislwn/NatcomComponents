import {connect} from "react-redux";
import {getSupplierDetail} from "../../../AC/suppliers";

class SupplierDetail extends React.Component {

    componentWillMount() {
        const supplierId = this.props.match.params.supplierId;
        this.props.getSupplierDetail(supplierId);
    }

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
        const supplier = this.props.supplier;
        return (
            <div>
                <div>{supplier.name}</div>
                <div>{supplier.inn}</div>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
}), {getSupplierDetail})(SupplierDetail);