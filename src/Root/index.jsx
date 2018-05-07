import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.scss'

import Header from "../Header";
import Content from "../Content"


export default class extends React.Component {
    render() {
        return (
            <div className={["row", styles["main-row"]].join(' ')}>
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
