import CategoryList from "./CategoriesList";
import Subcategory from "./subcategories/Subcategory"
import {BaseApi} from "../../services/base";
import AddNewSubcategory from "./subcategories/AddNewSubcategory"

export default class extends React.Component {
    categoryId;
    baseApi = new BaseApi();

    constructor(props) {
        super(props);

        this.state = {
            subcategories: [],
        }
    }

    setCategoryId = (id) => {
        this.categoryId = id;
        this.baseApi
            .get(`categories/${id}/subcategories/`)
            .then((subcategories) => {
                console.log(subcategories);
                this.setState({
                        subcategories: subcategories.data.results.map((subcategory) =>
                            <li key={subcategory.id}><Subcategory subcategory={subcategory}/></li>)
                    }
                )
            })
    };

    addNewSubcategory = (subcategory) => {
        const temp = <li key={subcategory.id}><Subcategory subcategory={subcategory}/></li>;
        this.state.subcategories.push(temp);
        console.log(this.state.subcategories);
        this.setState({
                subcategories: this.state.subcategories
            }
        )
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <CategoryList setCategoryId={this.setCategoryId}/>
                    </div>
                    <div className="col-sm-6">
                        <AddNewSubcategory categoryId={this.categoryId}
                                           addNewSubcategory={this.addNewSubcategory}/>
                        {this.state.subcategories}
                    </div>
                </div>
            </div>
        )
    }
}