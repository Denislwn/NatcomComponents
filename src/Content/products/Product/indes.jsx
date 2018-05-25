export class Product extends React.Component {
    render() {
        const {product} = this.props;
        return (
            <div>
                <div>{product.name}</div>
                <div>{product.vendor_code}</div>
                <div>{product.price_standard}</div>
                <div>{product.price_good}</div>
                <div>{product.price_best}</div>
                <div>{product.unit}</div>
            </div>
        )
    }
}