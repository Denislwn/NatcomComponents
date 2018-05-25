export default class extends React.Component {

    render() {
        const {subcategory} = this.props;
        return (
            <td>{subcategory.name}</td>
        )
    }
}