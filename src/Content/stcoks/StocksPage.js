import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";

import StocksList from "./StocksList/StockList";
import StockDetail from "./StockDetail";


export default class extends React.Component {
    render() {
        let menu = <NavLink to='/stocks'><span>Склады</span></NavLink>;
        console.log(this.props);
        if (this.props.match.params.stockId) {
            menu = <div>
                <NavLink to='/stocks'>
                    <span>Склады</span>
                </NavLink>
                <span> => </span>
                <span>this.props.match.params.stockId</span>
            </div>
        }
        return (
            <div>
                {menu}
                <Switch>
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route path='/stocks/:stockId' component={StockDetail}/>
                </Switch>
            </div>
        )
    }
}