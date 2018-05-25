import {BaseApi} from "../../../../services/base";

export default class extends React.Component {
    baseApi = new BaseApi();

    state = {
      urlsImages: []
    };

    handleChangeProductImage = event => {
        let urls = this.state.urlsImages;
        let f = event.target.files[0];
        let fr = new FileReader();
        const self = this;
        fr.onload = ev => {
            urls.push(ev.target.result);
            self.setState({urlsImages: urls});
            console.log(urls);
        };
        fr.readAsDataURL(f);
    };

    getImages() {
        if (this.state.urlsImages) {
            return this.state.urlsImages.map((imageUrl) => (
                <div className="col-4">
                    <img src={imageUrl}/>
                </div>
            ))
        } else {
            return null;
        }
    }

    render() {
        const images = this.getImages();
        return (
            <div className="custom-file">
                <input type="file"
                       onChange={this.handleChangeProductImage}
                       className="custom-file-input"
                       id="customFile"/>
                <label className="custom-file-label"
                       htmlFor="customFile">Choose file</label>
                {images}
            </div>
        )
    }
}