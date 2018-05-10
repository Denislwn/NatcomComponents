import connect from "react-redux/es/connect/connect";
import {mapToArr} from "../../../helpers";
import styles from './styles.scss';

import Loader from '../../../components/Loader';

class SubcategoriesList extends React.Component {

    getBody(subcategories) {
        if (subcategories.length > 0) {
            return subcategories.map(sub => {
                return <div key={sub.id}>{sub.name}</div>
            });
        } else {
            return <span>Подкатегории отсутвуют</span>;
        }
    }

    render() {
        const {isLoading, subcategories} = this.props;
        let subs = this.getBody(subcategories);
        if (isLoading || !subcategories) {
            return (
                <div className={styles["pre-loader-container"]}>
                    <Loader/>
                </div>
            );
        }
        return (
            <div>{subs}</div>
        )
    }
}

export default connect((state) => ({
    subcategories: mapToArr(state.categories.subcategories),
    isLoading: state.categories.isLoadingSubcategories
}))(SubcategoriesList);