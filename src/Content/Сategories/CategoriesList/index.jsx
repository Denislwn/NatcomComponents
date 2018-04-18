import {BaseApi} from "../../../services/base";
import Category from "./Category";
import AddNewCategory from "./AddNewCategory"

export default class extends React.Component {
    categories;
    state = {
        categoriesList: [],
        newCategory: {visibility: false, message: 'Добавить категорию'},
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const baseApi = new BaseApi();
        baseApi
            .get(`categories`)
            .then((categoriesList) => {
                this.categories = categoriesList.data.results;
                this.setState({
                        categoriesList: this.categories.map((category) =>
                            <li onClick={this.categoryClick.bind(this, category.id)}
                                key={category.id}><Category category={category}/></li>)
                    }
                )
            })
    }

    addNewCategory = (category) => {
        this.categories.push(category);
        const temp = <li key={category.id}><Category category={category}/></li>;
        this.state.categoriesList.push(temp);
        this.setState({
            categoriesList: this.state.categoriesList
        });
    };

    categoryClick(id) {
        this.props.setCategoryId(id);
    }

    ready() {
        if (this.state.categoriesList.length !== 0) {
            return true;
        }
        return false;
    }

    newCategory = () => {
        if (!this.state.newCategory.visibility) {
            this.state.newCategory = {visibility: true, message: 'Удалить'};
        } else {
            this.state.newCategory = {visibility: false, message: 'Добавить категорию'};
        }
        this.setState({newCategory: this.state.newCategory})
    };

    render() {
        if (!this.ready()) {
            return false
        }
        let newCategory = null;
        if (this.state.newCategory.visibility) {
            newCategory = <AddNewCategory addNewCategory={this.addNewCategory}/>
        }
        return (
            <div>
                <div>
                    <span onClick={this.newCategory}>{this.state.newCategory.message}</span>
                    {newCategory}
                </div>
                <ul>
                    {this.state.categoriesList}
                </ul>
            </div>
        )
    }
}