import {BaseApi} from "../../../services/base";
import Supplier from "../Supplier"
import AddNewSupplier from "../AddNewSupplier";

export default class extends React.Component {
    suppliers;
    state = {
        suppliersList: [],
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const baseApi = new BaseApi();
        baseApi
            .get(`suppliers`)
            .then((suppliersList) => {
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
        const temp =  <li key={supplier.id}><Supplier supplier={supplier}/></li>;
        this.state.suppliersList.push(temp);
        this.setState({
            suppliersList: this.state.suppliersList
        });
        console.log(<li key={supplier.id}><Supplier supplier={supplier}/></li>);
    };

    ready() {
        if (this.state.suppliersList) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false
        }
        return (
            <div>
                <ul>
                    {this.state.suppliersList}
                </ul>
                <div>
                    <AddNewSupplier addNewSupplier={this.addNewSupplier}/>
                </div>
            </div>
        )
    }
}