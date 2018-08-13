// import {DeviceInfo} from 'verktyget';
// import {EventDispatcher} from 'verktyget';
// import {ImageLoader} from 'verktyget';
// 
// 
// class NewImageLoader extends EventDispatcher {
// 
//   constructor(urls, sizes) {
// 
//     super();
//     this.onResponsiveImageLoaded = this.onResponsiveImageLoaded.bind(this);
// 
//     this.size = DeviceInfo.GetSize();
//     this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
//     this.sizes = sizes; // [767, 1024, 1280]
// 
//     if (this.urls.length > 1 && this.urls.length !== this.sizes.length) {
//       console.log('Warning, please check that amount of URLs match amount of Sizes');
//     }
// 
//     this.imageLoader = new ImageLoader();
//     this.imageLoader.addEventListener('complete', this.onResponsiveImageLoaded);
//   }
// 
//   execute(containerWidth = 0) {
// 
//     // No sizes, use first url
//     if (this.sizes === undefined) {
//       newUrl = this.urls[0];
// 
//     }
//     // Mutiple sizes
//     else {
//       var i, url, newUrl;
//       for (i = 0; url = this.urls[i]; i++) {
//         if (containerWidth < this.sizes[i]) {
//           newUrl = url;
//           break;
//         }
//       }
//       // conatinerWidth is larger than image size
//       if (newUrl === undefined) {
//         console.log('Warning, image might be low-res. Node width: ', containerWidth, '  Image width: ', this.sizes[this.sizes.length-1]);
//         newUrl = this.urls[this.sizes.length-1];
//       }
//     }
// 
//     if (this.url !== newUrl) {
//       this.url = newUrl;
//       this.imageLoader.setUrl(this.url);
//       this.imageLoader.execute();
// 			// console.log('LOAD NEW URL: ', this.url);
//     }
//   }
// 
// 
//   onResponsiveImageLoaded (event) {
//     this.dispatchEvent({type: 'complete', target: event.target});
//   }
// 
// 
//   updateSize(containerWidth = 0) {
//     this.execute(containerWidth, false);
//   }
// 
//   destroy() {
// 		this.imageLoader.destroy();
// 
//     this.imageLoader.removeEventListener('complete')
//     this.imageLoader = null;
//  }
// 
// }
// export default NewImageLoader;
