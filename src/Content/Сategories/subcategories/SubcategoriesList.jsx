import connect from "react-redux/es/connect/connect";
import {mapToArr} from "../../../helpers";

class SubcategoriesList extends React.Component {
    render() {
        let subs = 'Подкатегории отсутвуют';
        if (this.props.subcategories.length > 0) {
            subs = this.props.subcategories.map(sub => {
                return <div key={sub.id}>{sub.name}</div>
            });
        }
        return (
            <div>{subs}</div>
        )
    }
}

export default connect((state) => ({
    subcategories: mapToArr(state.categories.subcategories)
}))(SubcategoriesList);