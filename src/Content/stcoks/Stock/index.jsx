export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {stock} = this.props;
        return (
            <div>
                <div>{stock.name}</div>
                <div>{stock.address}</div>
            </div>
        )
    }
}