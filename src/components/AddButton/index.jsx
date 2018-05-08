import styles from './styles.scss';

export default class extends React.Component {
    render() {
        return (
            <div className={styles["add-button"]}
                 onClick={this.props.openAdd}>+</div>
        )
    }
}