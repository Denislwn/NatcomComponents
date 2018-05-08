import CategoryList from './CategoriesList/CategoriesList';
import Subcategory from './subcategories/Subcategory';
import AddNewSubcategory from './subcategories/AddNewSubcategory';
import {connect} from "react-redux";
import {mapToArr} from "../../helpers";

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
        console.log('refresh!');
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <CategoryList history={this.props.history}/>
                    </div>
                    <div className="col-sm-6">
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

// export default connect((state) => ({
//     subcategories: mapToArr(state.categories.subcategories)
// }))(CategoriesPage);