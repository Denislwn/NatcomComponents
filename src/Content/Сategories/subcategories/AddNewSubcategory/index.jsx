import {BaseApi} from "../../../../services/base";

export default class extends React.Component {

    state = {
        subcategoryName: '',
    };

    constructor(props) {
        super(props)
    }

    handleChangeSubcategoryName = event => {
        this.setState({subcategoryName: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const id = this.props.categoryId;
        const baseApi = new BaseApi();
        let newCategory = {
            name: this.state.subcategoryName,
        };
        baseApi.post(`categories/${id}/subcategories/`, newCategory)
            .then(res => {
                console.log(res.data);
                this.handleChange(res.data);
            }, err => {
                console.log(err);
            })

    };

    handleChange = (subcategory) => {
        this.props.addNewSubcategory(subcategory);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Название категории</label>
                    <input type="text"
                           onChange={this.handleChangeSubcategoryName}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        )
    }
}