import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {mapToArr} from "../../../helpers";
import {getAllProducts, getNextProducts} from "../../../AC/products";
import styles from './styles.scss';

import Loader from '../../../components/Loader';
import AddButton from '../../../components/AddButton'
import {Product} from "../Product/indes";

class ProductsList extends React.Component {
    productsList;

    componentWillMount() {
        this.props.getAllProducts();
    }

    loadProducts(page) {
        this.props.getNextProducts(page);
    }

    getBody(products) {
        this.productsList = products.map((product) => {
            return (<div key={product.id}>
                <Product product={product}/>
            </div>)
        })
    }

    openAddProduct = () => {
      this.props.history.push('/products/add');
    };

    render() {
        const {isLoading, products, hasMoreProducts} = this.props;
        if (isLoading || products.length === 0) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        this.getBody(products);
        const loader = hasMoreProducts ? <Loader/> : false;
        return (
            <div className="row">
                <div className={["col-12", styles['main-page']].join(' ')}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadProducts.bind(this)}
                        hasMore={hasMoreProducts}
                        useWindow={false}>
                        <div className="row">
                            <div className="col-10">
                                {this.productsList}
                                {loader}
                            </div>
                            <AddButton openAdd={this.openAddProduct}/>
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
        products: mapToArr(state.products.products),
        isLoading: state.products.isLoading,
        hasMoreProducts: state.products.hasMoreProducts
    }),
    {getAllProducts, getNextProducts})(ProductsList);