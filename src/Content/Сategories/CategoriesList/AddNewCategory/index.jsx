import {BaseApi} from "../../../../services/base";

export default class extends React.Component {

    state = {
        categoryName: '',
    };

    constructor(props) {
        super(props)
    }

    handleChangeCategoryName = event => {
        this.setState({supplierName: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        let newCategory = {
            name: this.state.supplierName,
        };
        baseApi.post(`categories/`, newCategory)
            .then(res => {
                this.handleStocksChange(res.data);
            }, err => {
                console.log(err);
            })

    };

    handleStocksChange = (category) => {
        this.props.addNewCategory(category);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Название категории</label>
                    <input type="text" name="categoryName" onChange={this.handleChangeCategoryName}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        )
    }
}