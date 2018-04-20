import NavLink from "react-router-dom/es/NavLink";


export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    checkMainStock(main) {
        if (main) {
            return 'Главный';
        } else {
            return 'Второстепенный';
        }
    }

    render() {
        const {stock} = this.props;
        return (
            <tr>
                <td>{stock.name}</td>
                <td>{stock.address}</td>
                <td>{this.checkMainStock(stock.main)}</td>
                <td><NavLink to={`stocks/${stock.id}`}>Перейти</NavLink></td>
            </tr>
        )
    }
}
//
// <div className="row">
//     <div className="col-sm-6">
//         <div>{stock.name}</div>
//         <div>{stock.address}</div>
//     </div>
//     <div className="col-sm-6">
//                     <span aria-hidden="true"
//                           onClick={this.edit.bind(this, stock.id)}>&times;</span>
//     </div>
// </div>