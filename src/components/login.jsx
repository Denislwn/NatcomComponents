import axios from 'axios';

export class Login extends React.Component {

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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Логин</label>
                    <input ref="form" type="text" name="name" onChange={this.handleChangeUsername}/>
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" name="password" onChange={this.handleChangePassword}/>
                </div>
                <button type="submit">Login</button>
            </form>
        )

    }
}