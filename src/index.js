import React from 'react';
import { render } from 'react-dom';

import loadImage from 'blueimp-load-image';

class ImagePreviewer extends React.Component {
  constructor(props) {
    super(props);

    this.onImageSelected = this.onImageSelected.bind(this);
  }

  onImageSelected(e) {
    const file = e.target.files[0];
    loadImage.parseMetaData(file, (data) => {
      const options = {
        maxHeight: 1024,
        maxWidth: 1024,
        canvas: true
      };
      if (data.exif) {
        options.orientation = data.exif.get('Orientation');
      }
      loadImage(file, (canvas) => {
        const resized = canvas.toDataURL('image/jpeg');
        const imgNode = this.refs.image;
        imgNode.src = resized;
      }, options);
    });
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
