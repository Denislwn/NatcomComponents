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

    render() {
        // let subcategories = null;
        // if (this.props.subcategories !== []) {
        //     subcategories = this.props.subcategories.map(sub => {
        //         return <li>{sub.id}</li>
        //     });
        // }
        let subcategoriesList = null;
        if (this.props.match.params.categoryId) {
            subcategoriesList = <SubcategoriesList/>;
        }
        return (
            <div>
                <div className="row">
                    <div className={["col-sm-6", styles["categories-page"]].join(' ')}>
                        <CategoryList history={this.props.history}/>
                    </div>
                    <div className={["col-sm-6", styles["subcategories-page"]].join(' ')}>
                        {subcategoriesList}
                        {/*<ul>{subcategories}</ul>*/}
                        {/*<AddNewSubcategory categoryId={this.categoryId}*/}
                                           {/*addNewSubcategory={this.addNewSubcategory}/>*/}
                        {/*{this.state.subcategories}*/}
                    </div>
                </div>
            </div>
        )
    }
}