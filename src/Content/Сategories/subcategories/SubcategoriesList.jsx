import connect from "react-redux/es/connect/connect";
import {mapToArr} from "../../../helpers";
import styles from './styles.scss';

import Loader from '../../../components/Loader';
import Subcategory from './Subcategory';

class SubcategoriesList extends React.Component {
    subcategoriesList;

    getBody(subcategories) {
        if (subcategories.length > 0) {
            console.log(subcategories);
            this.subcategoriesList = subcategories.map(subcategory => (
                <tr key={subcategory.id}>
                    <Subcategory subcategory={subcategory}/>
                </tr>)
            );
            return (
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Название подкатегории</th>
                    </tr>
                    </thead>
                    <tbody>{this.subcategoriesList}</tbody>
                </table>
            );
        } else {
            return <span>Подкатегории отсутвуют</span>;
        }
    }

    render() {
        const {isLoading, subcategories} = this.props;
        if (isLoading || !subcategories) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        let currentSubcategories = this.getBody(subcategories);
        return (
            <div>{currentSubcategories}</div>
        )
    }
}

export default connect((state) => ({
    subcategories: mapToArr(state.categories.subcategories),
    isLoading: state.categories.isLoadingSubcategories
}))(SubcategoriesList);