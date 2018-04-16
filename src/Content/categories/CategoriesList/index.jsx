import {BaseApi} from "../../../services/base";
import Category from "../Category";
import AddNewCategory from "../AddNewCategory"

export default class extends React.Component {
    categories;
    state = {
        categoriesList: [],
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
                            <li key={category.id}><Category category={category}/></li>)
                    }
                )
            })
    }

    addNewCategory = (category) => {
        this.categories.push(category);
        const temp =  <li key={category.id}><Category category={category}/></li>;
        this.state.categoriesList.push(temp);
        this.setState({
            categoriesList: this.state.categoriesList
        });
    };

    ready() {
        if (this.state.categoriesList.length !== 0) {
            return true;
        }
        return false;
    }

    render() {
        if (!this.ready()) {
            return false
        }
        return (
            <div>
                <ul>
                    {this.state.categoriesList}
                </ul>
                <div>
                    <AddNewCategory addNewCategory={this.addNewCategory}/>
                </div>
            </div>
        )
    }
}