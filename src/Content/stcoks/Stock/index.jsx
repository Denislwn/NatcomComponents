export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    edit (id) {
        this.props.openEditStock(id);
    };

    render() {
        const {stock} = this.props;
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div>{stock.name}</div>
                    <div>{stock.address}</div>
                </div>
                <div className="col-sm-6">
                    <span aria-hidden="true"
                          onClick={this.edit.bind(this, stock.id)}>&times;</span>
                </div>
            </div>
        )
    }
}