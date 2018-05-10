import {connect} from "react-redux";
import {editSupplier, getSupplierDetail} from "../../../AC/suppliers";

import EditSupplier from '../EditSupplier';
import Loader from '../../../components/Loader';
import styles from './styles.scss';

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

    getChangeSupplierDialog() {
        if (this.state.editSupplier) {
            return (<EditSupplier openEditSupplier={this.openEditSupplier}
                                  successEditSupplier={this.successEditSupplier}
                                  supplier={this.props.supplier}/>);
        } else {
            return null;
        }
    }

    render() {
        const {supplier, isLoading} = this.props;
        if (isLoading || !supplier) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const changeSupplier = this.getChangeSupplierDialog();
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
        isLoading: state.suppliers.isLoading
    }),
    {getSupplierDetail, editSupplier})(SupplierDetail);