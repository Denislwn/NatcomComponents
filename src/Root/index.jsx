import {Switch, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import {Main} from "../components/main";
import {Login} from "../components/login"
import {Stocks} from "../components/stocks/StocksList/index";
import Link from "react-router-dom/es/Link";
import {Content} from "../components/content";
import {Header} from "../components/header";

export default class extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <Header />
                </div>
                <div className="col-sm-10">
                    <Content />
                </div>
            </div>
        )

    }
}
