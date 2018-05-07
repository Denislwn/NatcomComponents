import {connect} from "react-redux";
import NavLink from "react-router-dom/es/NavLink";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import SuppliersList from "./SuppliersList/SuppliersList";
import SupplierDetail from "./SupplierDetail/SupplierDetail";

class SupplierPage extends React.Component {
    render() {
        let menu = <NavLink to='/suppliers'><span>Поставщики</span></NavLink>;
        if (this.props.match.params.supplierId && this.props.supplier !== null) {
            menu = <div>
                <NavLink to='/suppliers'>
                    <span>Поставщики</span>
                </NavLink>
                <span> => </span>
                <span>{this.props.supplier.name}</span>
            </div>
        }
        return (
            <div>
                {menu}
                <Switch>
                    <Route exact path='/suppliers' component={SuppliersList}/>
                    <Route path='/suppliers/:supplierId' component={SupplierDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
}))(SupplierPage);