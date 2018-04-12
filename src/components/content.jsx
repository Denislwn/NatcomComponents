import {Main} from "./main";
import {Login} from "./login";
import StocksList from "./stocks/StocksList";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

export class Content extends React.Component {

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
            </Switch>
        </main>)
    }
}
