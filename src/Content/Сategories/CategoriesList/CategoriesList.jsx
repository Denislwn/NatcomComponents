import {connect} from 'react-redux';
import {mapToArr} from '../../../helpers';
import {getAllCategories, getSubcategories} from '../../../AC/categories';

import Category from './Category';
import AddNewCategory from './AddNewCategory';
import {getCategoriesSelector} from "../../../selectors/categoriesSelector";
import NavLink from "react-router-dom/es/NavLink";

class CategoriesList extends React.Component {
    categoriesList = [];
    state = {
        newCategory: {visibility: false, message: 'Добавить категорию'},
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAllCategories();
    }

    // addNewCategory = (category) => {
    //     this.categories.push(category);
    //     const temp = <li key={category.id}><Category category={category}/></li>;
    //     this.state.categoriesList.push(temp);
    //     this.setState({
    //         categoriesList: this.state.categoriesList
    //     });
    // };

    getSubcategories(categoryId) {
        this.props.getSubcategories(categoryId);
        this.props.history.push(`/categories/${categoryId}`);
    };

    ready() {
        if (this.props.categories !== undefined) {
            this.categoriesList = this.props.categories.map(category =>
                <div onClick={this.getSubcategories.bind(this, category.id)}
                     key={category.id}>
                    <Category category={category}
                              history={this.props.history}/>
                </div>
            );
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
                    {this.categoriesList}
                </ul>
            </div>
        )
    }
}

export default connect((state) => ({
    categories: getCategoriesSelector(state),
    hasMoreCategories: state.categories.hasMoreEntries
}), {getAllCategories, getSubcategories})(CategoriesList);