import {BaseApi} from "../../../../services/base";

export default class extends React.Component {
    baseApi = new BaseApi();
    imagesUrls = [];
    productImages = [];


    handleChangeProductImage = event => {
        let f = event.target.files[0];
        let fr = new FileReader();
        const self = this;
        fr.onload = ev => {
            self.imagesUrls.push(ev.target.result);
            this.addImageOnServer(f);
        };
        fr.readAsDataURL(f);
    };

    addImageOnServer(file) {
        let formData = new FormData();
        formData.append('url', file);
        this.baseApi
            .post(`items/images/`, formData)
            .then((imageResponse) => {
                this.productImages.push({image: imageResponse.data.id});
                this.props.handleProductImages(this.productImages);
            })
    }

    getImages() {
        if (this.imagesUrls !== []) {
            return this.imagesUrls.map((imageUrl, index) => (
                <div key={this.productImages[index].image}
                     className="col-4">
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
            <div className="row">
                <div className="col-12 custom-file">
                    <input type="file"
                           onChange={this.handleChangeProductImage}
                           className="custom-file-input"
                           id="customFile"/>
                    <label className="custom-file-label"
                           htmlFor="customFile">Choose file</label>
                </div>
                <div className="col-12">
                    {images}
                </div>
            </div>
        )
    }
}