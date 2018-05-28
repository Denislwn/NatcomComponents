import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import System from '../System';
import Login from "../Content/Login";


export default class extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='' component={System}/>
            </Switch>
        )

    }
}
