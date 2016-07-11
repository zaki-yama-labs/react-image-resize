import React from 'react';
import { render } from 'react-dom';

class ImagePreviewer extends React.Component {
  constructor(props) {
    super(props);

    this.onImageSelected = this.onImageSelected.bind(this);
  }

  onImageSelected(e) {
    const file = e.target.files[0];
    const fr = new FileReader();

    fr.onload = (event) => {
      const imgNode = this.refs.image;
      imgNode.src = event.target.result;
    };
    fr.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={this.onImageSelected} />
        <p>Image will be previewed here!</p>
        <img ref="image" src="" />
      </div>
    );
  }
}

render(
  <ImagePreviewer />,
  document.getElementById('root')
);
