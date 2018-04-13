import {BaseApi} from "../../../services/base";
import Supplier from "../Supplier"

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
            <ul>
                {this.state.suppliersList}
            </ul>
        )
    }
}