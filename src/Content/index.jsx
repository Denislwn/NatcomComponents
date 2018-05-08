import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import styles from './styles.scss';

import Main from "./Main";
import Login from "./Login";
import Categories from "./Сategories";
import StocksPage from "./stcoks/StocksPage";
import SuppliersPage from "./suppliers/SuppliersPage";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <main>
                <Switch className={styles["main-page"]}>
                    <Route exact path='/' component={Main}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/stocks/:stockId' component={StocksPage}/>
                    <Route path='/stocks' component={StocksPage}/>
                    <Route path='/suppliers/:supplierId' component={SuppliersPage}/>
                    <Route exact path='/suppliers' component={SuppliersPage}/>
                    <Route exact path='/categories' component={Categories}/>
                </Switch>
            </main>)
    }
}
