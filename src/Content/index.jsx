import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import Main from "./Main";
import Login from "./Login";
import StocksList from "./stcoks/StocksList";
import SuppliersList from "./suppliers/SuppliersList";
import SupplierDetail from "./suppliers/SupplierDetail";
import Categories from "./Сategories";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/stocks' component={StocksList}/>
                    <Route path='/suppliers/:suppliersId' component={SupplierDetail}/>
                    <Route exact path='/suppliers' component={SuppliersList}/>
                    <Route exact path='/categories' component={Categories}/>
                </Switch>
            </main>)
    }
}
