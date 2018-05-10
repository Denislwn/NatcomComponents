import styles from './styles.scss';

import CategoryList from './CategoriesList/CategoriesList';
import SubcategoriesList from './subcategories/SubcategoriesList';

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    // setCategoryId = (id) => {
    //     this.categoryId = id;
    //     this.baseApi
    //         .get(`categories/${id}/subcategories/`)
    //         .then((subcategories) => {
    //             console.log(subcategories);
    //             this.setState({
    //                     subcategories: subcategories.data.results.map((subcategory) =>
    //                         <li key={subcategory.id}><Subcategory subcategory={subcategory}/></li>)
    //                 }
    //             )
    //         })
    // };

    // addNewSubcategory = (subcategory) => {
    //     const temp = <li key={subcategory.id}><Subcategory subcategory={subcategory}/></li>;
    //     this.state.subcategories.push(temp);
    //     console.log(this.state.subcategories);
    //     this.setState({
    //             subcategories: this.state.subcategories
    //         }
    //     )
    // };

    getSubcategoriesList() {
        if (this.props.match.params.categoryId) {
            return <SubcategoriesList/>;
        } else {
            return 'Выберите категорию';
        }
    }

    render() {
        const subcategoriesList = this.getSubcategoriesList();
        return (
            <div>
                <div className="row">
                    <div className={["col-sm-6", styles["categories-page"]].join(' ')}>
                        <CategoryList history={this.props.history}/>
                    </div>
                    <div className={["col-sm-6", styles["subcategories-page"]].join(' ')}>
                        {subcategoriesList}
                    </div>
                </div>
            </div>
        )
    }
}