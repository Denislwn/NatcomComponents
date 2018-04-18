import CategoryList from "./CategoriesList";
import Subcategory from "./SubcategoriesList/Subcategory"
import {BaseApi} from "../../services/base";

export default class extends React.Component {
    baseApi = new BaseApi();
    constructor(props) {
        super(props);

        this.state = {
            subcategories: [],
        }
    }

    setCategoryId = (id) => {
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

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <CategoryList setCategoryId={this.setCategoryId}/>
                    </div>
                    <div className="col-sm-6">
                        {this.state.subcategories}
                    </div>
                </div>
            </div>
        )
    }
}