export default class extends React.Component {
    render() {
        const {subcategory} = this.props;
        return (
            <div>{subcategory.name}</div>
        )
    }
}