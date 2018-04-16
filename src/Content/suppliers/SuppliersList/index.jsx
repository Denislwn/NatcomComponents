import {BaseApi} from "../../../services/base";
import Supplier from "../Supplier"
import AddNewSupplier from "../AddNewSupplier";
import InfiniteScroll from 'react-infinite-scroller';

export default class extends React.Component {
    baseApi = new BaseApi();
    suppliers;
    state = {
        suppliersList: [],
        hasMoreSuppliers: true
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.baseApi
            .get(`suppliers`)
            .then((suppliersList) => {
                console.log(suppliersList.data);
                if (suppliersList.data.next === null) {
                    this.setState({hasMoreSuppliers: false});
                }
                this.suppliers = suppliersList.data.results;
                this.setState({
                        suppliersList: this.suppliers.map((supplier) =>
                            <li key={supplier.id}><Supplier supplier={supplier}/></li>)
                    }
                )
            })
    }

    addNewSupplier = (supplier) => {
        this.suppliers.push(supplier);
        const temp = <li key={supplier.id}><Supplier supplier={supplier}/></li>;
        this.state.suppliersList.push(temp);
        this.setState({
            suppliersList: this.state.suppliersList
        });
    };

    loadSuppliers(page) {
        const self = this;
        this.setState({hasMoreSuppliers: false});
        self.baseApi.get(`suppliers/?page=${page}`)
            .then(res => {
                self.suppliers = self.suppliers.concat(res.data.results);
                const temp = self.state.suppliersList.concat(res.data.results.map(supplier =>
                    <li key={supplier.id}><Supplier supplier={supplier}/></li>
                ));
                self.setState({
                    suppliersList: temp
                });
                if (res.data.next !== null) {
                    self.setState({hasMoreSuppliers: true});
                }
            });
    }

    ready() {
        if (this.state.suppliersList.length !== 0) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false
        }
        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={this.loadSuppliers.bind(this)}
                hasMore={this.state.hasMoreSuppliers}
            >
                <div>
                    <ul>
                        {this.state.suppliersList}
                    </ul>
                    <div>
                        <AddNewSupplier addNewSupplier={this.addNewSupplier}/>
                    </div>
                </div>
            </InfiniteScroll>
        )
    }
}