import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

import Header from "../Header";
import Content from "../Content"


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

// export default connect(
//     state => ({
//         testStore: state
//     }),
//     dispach => ({})
// )(Root);
