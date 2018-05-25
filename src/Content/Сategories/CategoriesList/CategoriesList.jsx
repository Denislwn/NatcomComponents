import {connect} from 'react-redux';
import {getAllCategories, getSubcategories} from '../../../AC/categories';
import {getCategoriesSelector} from "../../../selectors/categoriesSelector";
import styles from './styles.scss';

import Category from './Category';
import AddNewCategory from './AddNewCategory';
import Loader from '../../../components/Loader';

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

    newCategory = () => {
        if (!this.state.newCategory.visibility) {
            this.state.newCategory = {visibility: true, message: 'Удалить'};
        } else {
            this.state.newCategory = {visibility: false, message: 'Добавить категорию'};
        }
        this.setState({newCategory: this.state.newCategory})
    };

    getBody(categories) {
        this.categoriesList = categories.map(category => (
            <tr onClick={this.getSubcategories.bind(this, category.id)}
                className={styles["hover-element"]}
                key={category.id}>
                <Category category={category}
                          history={this.props.history}/>
            </tr>)
        );
    }

    render() {
        const {isLoading, categories, hasMoreCategories} = this.props;
        if (isLoading || !categories) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        this.getBody(categories);
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
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Название категории</th>
                    </tr>
                    </thead>
                    <tbody>{this.categoriesList}</tbody>
                </table>
            </div>
        )
    }
}

export default connect((state) => ({
    categories: getCategoriesSelector(state),
    hasMoreCategories: state.categories.hasMoreEntries,
    isLoading: state.categories.isLoading
}), {getAllCategories, getSubcategories})(CategoriesList);