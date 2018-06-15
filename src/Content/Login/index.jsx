import axios from 'axios';
import styles from './styles.scss';

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    handleChangeUsername = event => {
        this.setState({username: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        axios
            .post(`http://188.225.25.85/api/login/`, user)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_type', res.data.type);
                console.log(res.data);
                this.props.history.push(`/stocks`)
            }, err => {
                console.log(err);
            })
    };

    getDisabledState() {
        if (!this.state.username || !this.state.password) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}
                      className={styles["auth-form"]}>
                    <h4 className="text-center">Авторизация</h4>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Логин</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   name="name"
                                   className="form-control"
                                   onChange={this.handleChangeUsername}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Пароль</label>
                        <div className="col-sm-10">
                            <input type="password"
                                   name="password"
                                   className="form-control"
                                   onChange={this.handleChangePassword}/>
                        </div>
                    </div>
                    <div className="col-sm-12 text-right">
                        <button type="submit"
                                disabled={this.getDisabledState()}
                                className="btn btn-primary pull-right">Войти
                        </button>
                    </div>
                </form>
            </div>
        )

    }
}