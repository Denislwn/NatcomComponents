import {BaseApi} from "../../../services/base";
import Subcategory from "./Subcategory"

export default class extends React.Component {
    baseApi = new BaseApi();
    categoryId;

    constructor(props) {
        super(props);

        this.state = {
            subcategoriesList: [],
        }
    }

    render() {
        return (
            <div>
                {this.state.subcategoriesList}
            </div>
        )
    }
}