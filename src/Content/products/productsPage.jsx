import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import ProductsList from "./productsList/ProductsList";
import {AddNewProduct} from "./addNewProduct/AddNewProduct";
import ComponentMenu from '../../components/ComponentMenu'
import styles from './styles.scss'
import NavLink from "react-router-dom/es/NavLink";

export class ProductsPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/products'>
                <span>Товары</span>
            </NavLink>
        );
        if (this.props.match.url.indexOf('add') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новый товар'}/>
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
                    <Route exact path='/products' component={ProductsList}/>
                    <Route path='/products/add' component={AddNewProduct}/>
                </Switch>
            </div>
        )
    }
}
