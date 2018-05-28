import {BaseApi} from "../../../services/base";
import Loader from '../../../components/Loader';
import AddStocksForProduct from './AddStocksForProduct';
import ProductImages from './ProductImages';

export class AddNewProduct extends React.Component {
    baseApi = new BaseApi();
    categories = [];
    subcategories = [];
    units = ['Метр', 'Квадратный метр'];
    stocks = [];
    productStocks = [];

    state = {
        name: null,
        unit: 1,
        priceStandard: null,
        priceGood: null,
        priceBest: null,
        category: null,
        subcategory: null,
        harpoon: false,
        stocks: [],
        prepayment: false,
        images: [],
    };

    componentWillMount() {
        const categoriesPromise = this.baseApi
            .get(`categories/`)
            .then((categoriesPage) => {
                this.categories = categoriesPage.data.results;
                return this.baseApi
                    .get(`categories/${this.categories[0].id}/subcategories/`);
            })
            .then((subcategoriesPage) => {
                this.subcategories = subcategoriesPage.data.results;
            });
        const stocksPromise = this.baseApi
            .get(`stocks/`)
            .then((stocksPage) => {
                this.stocks = stocksPage.data.results;
            });
        Promise.all([categoriesPromise, stocksPromise])
            .then(() => {
                    console.log(this.subcategories);
                    let stocksState = [];
                    stocksState.push({stock: this.stocks[0].id});
                    this.productStocks = stocksState;
                    this.setState({
                        category: this.categories[0].id,
                        subcategory: this.subcategories[0].id
                    });
                }
            );
    }

    handleChangeProductName = event => {
        this.setState({name: event.target.value});
    };

    handleChangeProductUnit = event => {
        this.setState({unit: event.target.value});
    };


    handleChangeProductPrice = (event, param) => {
        this.setState({[param]: Number(event.target.value)});
    };


    handleChangeProductCategory = event => {
        const categoryId = event.target.value;
        this.baseApi
            .get(`categories/${categoryId}/subcategories/`)
            .then((subcategoriesPage) => {
                this.subcategories = subcategoriesPage.data.results;
                const subcategoryId = this.subcategories.length > 0 ? this.subcategories[0].id : null;
                this.setState({
                    category: Number(categoryId),
                    subcategory: subcategoryId
                });
            });
    };

    handleChangeProductSubcategory = event => {
        this.setState({subcategory: Number(event.target.value)});
    };

    handleChangeProductHarpoon = event => {
        this.setState({harpoon: Boolean(event.target.value)});
    };

    handleChangeProductPrepayment = event => {
        this.setState({prepayment: Boolean(event.target.value)});
    };

    addProductStocks = (stocks) => {
        this.productStocks = stocks;
    };

    handleProductImages = (images) => {
        this.setState({images});
    };

    handleSubmit = event => {
        event.preventDefault();
        const product = this.getProduct();
        console.log(product);
        this.baseApi
            .post(`items/products/`, product)
            .then(product => {
                console.log(product);
            });
    };

    getProduct() {
        return {
            harpoon: this.state.harpoon,
            price_good: this.state.priceGood,
            price_standard: this.state.priceStandard,
            requires_prepayment: this.state.prepayment,
            unit: this.state.unit,
            name: this.state.name,
            category: this.state.category,
            price_best: this.state.priceBest,
            stocks: this.productStocks
        };
    }

    getPricesFields() {
        return (
            <div className="row">
                <div className="col-4 form-group">
                    <label htmlFor="standardPrice">Стандартная цена</label>
                    <input type="text"
                           onChange={(e) => this.handleChangeProductPrice(e, 'priceStandard')}
                           className="form-control"
                           id="standardPrice"
                           placeholder="Введите цену"/>
                </div>
                <div className="col-4 form-group">
                    <label htmlFor="goodPrice">Хорошая цена</label>
                    <input type="text"
                           onChange={(e) => this.handleChangeProductPrice(e, 'priceGood')}
                           className="form-control"
                           id="goodPrice"
                           placeholder="Введите цену"/>
                </div>
                <div className="col-4 form-group">
                    <label htmlFor="bestPrice">Отличная цена</label>
                    <input type="text"
                           onChange={(e) => this.handleChangeProductPrice(e, 'priceBest')}
                           className="form-control"
                           id="bestPrice"
                           placeholder="Введите цену"/>
                </div>
            </div>
        )
    }

    getCategories() {
        let subs = null;
        if (this.state.subcategory) {
            console.log('zfas');
            subs = (
                <div className="col-6 form-group">
                    <label>Подкатегория</label>
                    <select className="form-control"
                            onChange={this.handleChangeProductSubcategory}
                            defaultValue={this.state.subcategory}>
                        {this.subcategories.map(subcategory => (
                            <option value={subcategory.id}
                                    key={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col-6 form-group">
                    <label>Категория</label>
                    <select className="form-control"
                            onChange={this.handleChangeProductCategory}
                            defaultValue={this.state.category}>
                        {this.categories.map(category => (
                            <option value={category.id}
                                    key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {subs}
            </div>
        )
    }

    getBody() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-6 form-group">
                        <label htmlFor="name">Название</label>
                        <input type="text"
                               onChange={this.handleChangeProductName}
                               className="form-control"
                               id="name"
                               placeholder="Введите название товара"/>
                    </div>
                    <div className="col-6 form-group">
                        <label>Единица измерений</label>
                        <select className="form-control"
                                onChange={this.handleChangeProductUnit}
                                defaultValue={this.state.unit}>
                            {this.units.map((unit, index) => (
                                <option value={++index} key={index}>{unit}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {this.getPricesFields()}
                {this.getCategories()}
                <div className="form-group form-check">
                    <input type="checkbox"
                           onChange={this.handleChangeProductHarpoon}
                           className="form-check-input"
                           id="harpoon"/>
                    <label className="form-check-label"
                           htmlFor="harpoon">Гарпун</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox"
                           onChange={this.handleChangeProductPrepayment}
                           className="form-check-input"
                           id="prepayment"/>
                    <label className="form-check-label"
                           htmlFor="prepayment">Предоплата</label>
                </div>
                <AddStocksForProduct stocks={this.stocks}
                                     addProductStocks={this.addProductStocks}/>
                <ProductImages handleProductImages={this.handleProductImages}/>
                <button type="submit"
                        className="btn btn-primary">Submit
                </button>
            </form>
        )
    }

    render() {
        if (this.state.category === undefined || this.stocks.length === 0) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }
        console.log(this.stocks);
        const body = this.getBody();
        return (
            <div>
                {body}
            </div>
        )
    }
}