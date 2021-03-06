import {BaseApi} from "../../../../services/base";

export default class extends React.Component {

    state = {
        categoryName: '',
    };

    constructor(props) {
        super(props)
    }

    handleChangeCategoryName = event => {
        this.setState({categoryName: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const baseApi = new BaseApi();
        let newCategory = {
            name: this.state.categoryName,
        };
        baseApi.post(`categories/`, newCategory)
            .then(res => {
                this.handleCategoryChange(res.data);
            }, err => {
                console.log(err);
            })

    };

    handleCategoryChange = (category) => {
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