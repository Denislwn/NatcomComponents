export default class extends React.Component {
    render() {
        const {menu, name} = this.props;
        return (
            <div>
                {menu}
                <span> => </span>
                <span>{name}</span>
            </div>
        )
    }
}