import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import StocksList from "./StocksList/StockList";
import StockDetail from "./StockDetail/StockDetail";
import ComponentMenu from '../../components/ComponentMenu'
import styles from './styles.scss';

class StocksPage extends React.Component {

    getMenu() {
        let menu = (
            <NavLink to='/stocks'>
                <span>Склады</span>
            </NavLink>);
        if (this.props.match.params.stockId && this.props.stock !== null) {
            menu = (
                <ComponentMenu menu={menu} name={this.props.stock.name}/>
            );
        }
        return menu;
    }

    render() {
        const menu = this.getMenu();
        return (
            <div>
                <div className={styles["stocks-menu"]}>
                    {menu}
                </div>
                <Switch>
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route path='/stocks/:stockId' component={StockDetail}/>
                </Switch>
            </div>
        )
    }
}

export default connect((state) => ({
    stock: state.stocks.stock,
}))(StocksPage);