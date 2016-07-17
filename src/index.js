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

    fr.onload = () => {
      console.log('before resizing: ', fr.result.length);
      // Image オブジェクトに src を指定すると、元画像の width と height が取れる
      const img = new Image();
      img.src = fr.result;
      const width = img.width;
      const height = img.height;
      console.log('width, height = ', width, height);

      // 縮小後のサイズを計算。ここでは横幅 (width) を指定
      const dstWidth = 1024;
      const scale = dstWidth / width;
      const dstHeight = height * scale;

      // Canvas オブジェクトを使い、縮小後の画像を描画
      const canvas = document.createElement('canvas');
      canvas.width = dstWidth;
      canvas.height = dstHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, dstWidth, dstHeight);

      // Canvas オブジェクトから Data URL を取得
      const resized = canvas.toDataURL();
      console.log('after resizing: ', resized.length);
      console.log('width, height = ', dstWidth, dstHeight);

      const imgNode = this.refs.image;
      imgNode.src = resized;
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
