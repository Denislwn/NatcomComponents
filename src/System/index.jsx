import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.scss'

import Header from '../Header';
import Menu from "../Menu";
import Content from "../Content"


export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className={["row", styles["main-row"]].join(' ')}>
                    <Header history={this.props.history}/>
                </div>
                <div className={["row", styles["main-row"]].join(' ')}>
                    <Menu/>
                    <div className="col-sm-10">
                        <Content/>
                    </div>
                </div>
            </div>
        )

    }
}