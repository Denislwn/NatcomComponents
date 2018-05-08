import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {mapToArr} from '../../../helpers';
import {getAllSuppliers, getNextSuppliers} from '../../../AC/suppliers';
import styles from './styles.scss';

import Supplier from '../Supplier'
import AddNewSupplier from '../AddNewSupplier/AddNewSupplier';
import AddButton from '../../../components/AddButton';

class SuppliersList extends React.Component {
    suppliersList;
    state = {
        hasMoreSuppliers: true,
        addSupplier: false
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

    openAddSupplier = () => {
        this.setState({addSupplier: !this.state.addSupplier});
    };

    ready() {
        if (this.props.suppliers !== undefined) {
            this.suppliersList = this.props.suppliers.map(supplier =>
                <Supplier key={supplier.id} supplier={supplier} history={this.props.history}/>
            );
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false;
        }
        let newSupplier = null;
        if (this.state.addSupplier) {
            newSupplier = <AddNewSupplier openAddSupplier={this.openAddSupplier}/>;
        }
        return (
            <div className="row">
                {newSupplier}
                <div className={["col-12", styles['main-page']].join(' ')}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadSuppliers.bind(this)}
                        hasMore={this.props.hasMoreSuppliers}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-10">
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
                            <div className="col-2">
                                <AddButton openAdd={this.openAddSupplier}/>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    suppliers: mapToArr(state.suppliers.suppliers),
    hasMoreSuppliers: state.suppliers.hasMoreSuppliers
}), {getAllSuppliers, getNextSuppliers})(SuppliersList);