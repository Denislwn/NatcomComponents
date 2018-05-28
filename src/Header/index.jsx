import styles from './styles.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    getUserRole() {
        const userType = Number(localStorage.getItem('user_type'));
        switch (userType) {
            case 4: {
                return 'Админ';
            }
        }
    }

    userExit() {
        localStorage.clear();
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <div className={["col-12", styles["header-container"]].join(' ')}>
                <span className={styles["company-name"]}>Natcom Accounting</span>
                <span className={[styles["element-container"], styles["exit"]].join(' ')}
                      onClick={this.userExit.bind(this)}>
                    Выход</span>
                <span className={[styles["element-container"], styles["user-role"]].join(' ')}>
                    {this.getUserRole()}</span>
            </div>
        )
    }
}