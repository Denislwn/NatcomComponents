import {connect} from "react-redux";
import NavLink from "react-router-dom/es/NavLink";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import styles from './styles.scss';

import SuppliersList from "./SuppliersList/SuppliersList";
import SupplierDetail from "./SupplierDetail/SupplierDetail";
import ComponentMenu from './../../components/ComponentMenu';

class SupplierPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/suppliers'>
                <span>Поставщики</span>
            </NavLink>
        );
        if (this.props.match.params.supplierId && this.props.supplier !== null) {
            menu = (
                <ComponentMenu menu={menu} name={this.props.supplier.name}/>
            );
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className={styles["suppliers-menu"]}>
                    {menu}
                </div>
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