import Supplier from "../Supplier"
import AddNewSupplier from "../AddNewSupplier/AddNewSupplier";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {mapToArr} from "../../../helpers";
import {getAllSuppliers, getNextSuppliers} from "../../../AC/suppliers";

class SuppliersList extends React.Component {
    suppliersList;
    state = {
        hasMoreSuppliers: true,
        newSupplier: {visibility: false, message: 'Добавить поставщика'},
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAllSuppliers();
    }

    loadSuppliers(page) {
        this.props.getNextSuppliers(page);
    }

    ready() {
        if (this.props.suppliers !== undefined) {
            this.suppliersList = this.props.suppliers.map(supplier =>
                <Supplier key={supplier.id} supplier={supplier} history={this.props.history}/>
            );
            return true;
        }
        return false;
    }

    newSupplier = () => {
        if (!this.state.newSupplier.visibility) {
            this.state.newSupplier = {visibility: true, message: 'Удалить'};
        } else {
            this.state.newSupplier = {visibility: false, message: 'Добавить поставщика'};
        }
        this.setState({newSupplier: this.state.newSupplier})
    };

    render() {
        if (!this.ready()) {
            return false;
        }
        let newSupplier = null;
        if (this.state.newSupplier.visibility) {
            newSupplier = <AddNewSupplier/>;
        }
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadSuppliers.bind(this)}
                hasMore={this.props.hasMoreSuppliers}
            >
                <div>
                    <div>
                        <span onClick={this.newSupplier}>{this.state.newSupplier.message}</span>
                        {newSupplier}
                    </div>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Поставщик</th>
                                <th scope="col">ИНН</th>
                                <th scope="col">Комментарий</th>
                            </tr>
                        </thead>
                        <tbody>{this.suppliersList}</tbody>
                    </table>
                </div>
            </InfiniteScroll>
        )
    }
}

export default connect((state) => ({
    suppliers: mapToArr(state.suppliers.suppliers),
    hasMoreSuppliers: state.suppliers.hasMoreSuppliers
}), {getAllSuppliers, getNextSuppliers})(SuppliersList);