import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import styles from './styles.scss';

import Main from "./Main";
import CategoriesPage from "./Сategories/CategoriesPage";
import StocksPage from "./stcoks/StocksPage";
import SuppliersPage from "./suppliers/SuppliersPage";
import {ProductsPage} from "./products/productsPage";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Switch className={styles["main-page"]}>
                    <Route exact path='/' component={Main}/>
                    <Route path='/stocks/:stockId' component={StocksPage}/>
                    <Route path='/stocks' component={StocksPage}/>
                    <Route path='/suppliers/:supplierId' component={SuppliersPage}/>
                    <Route exact path='/suppliers' component={SuppliersPage}/>
                    <Route exact path='/categories/:categoryId' component={CategoriesPage}/>
                    <Route exact path='/categories' component={CategoriesPage}/>
                    <Route exact path='/products' component={ProductsPage}/>
                    <Route exact path='/products/add' component={ProductsPage}/>
                </Switch>
            </main>)
    }
}
