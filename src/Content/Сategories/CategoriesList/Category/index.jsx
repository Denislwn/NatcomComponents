import './styles.scss';

export default class extends React.Component {

    render() {
        let {category} = this.props;
        return (
            <td onClick={this.categoryId}>{category.name}</td>
        )
    }
}