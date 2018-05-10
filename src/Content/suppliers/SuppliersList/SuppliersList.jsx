import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {mapToArr} from '../../../helpers';
import {getAllSuppliers, getNextSuppliers} from '../../../AC/suppliers';
import styles from './styles.scss';

import Supplier from '../Supplier';
import AddNewSupplier from '../AddNewSupplier/AddNewSupplier';
import AddButton from '../../../components/AddButton';
import Loader from '../../../components/Loader';

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

    getBody(suppliers) {
        this.suppliersList = suppliers.map(supplier =>
            <Supplier key={supplier.id} supplier={supplier} history={this.props.history}/>
        );
    }

    getNewSupplier() {
        if (this.state.addSupplier) {
            return <AddNewSupplier openAddSupplier={this.openAddSupplier}/>;
        } else {
            return null;
        }
    }

    render() {
        const {isLoading, suppliers, hasMoreSuppliers} = this.props;
        if (isLoading || !suppliers) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        const loader = hasMoreSuppliers ? <Loader/> : false;
        this.getBody(suppliers);
        const newSupplier = this.getNewSupplier();
        return (
            <div className="row">
                {newSupplier}
                <div className={["col-12", styles['main-page']].join(' ')}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadSuppliers.bind(this)}
                        hasMore={hasMoreSuppliers}
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
                                {loader}
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
        isLoading: state.suppliers.isLoading,
        hasMoreSuppliers: state.suppliers.hasMoreSuppliers
    }),
    {getAllSuppliers, getNextSuppliers})(SuppliersList);