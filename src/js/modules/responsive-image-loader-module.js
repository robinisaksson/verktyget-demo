// Vendor
import TweenLite from 'gsap';

// UTILS
import {DOM, DeviceInfo, Video, ImageLoader} from 'verktyget';

// import ScrollDetector from '../scroll-detector'; // in general module

class ResponsiveImageLoaderModule { // extends generalModule

	constructor() {
		// console.log('Responsive image loader module');
		this.node = document.querySelector('.module.responsive-image-loader');
		
		this.mediaNodes = Array.from(this.node.querySelectorAll('.media')); // nodeList to [array]
		this.imageLoaders = [];
		
		var i, media;
		for (i = 0; media = this.mediaNodes[i]; i++) {
			
			let root = media.getAttribute('data-root-url'); // get root url from DOM
			let urls = [root+'-960.jpg', root+'-1440.jpg', root+'-1920.jpg']; // create array of image urls, add the different breakpoints
			let sizes = [960, 1440, 1920]; // create array of with the size of each image
			let imageLoader = new ImageLoader(urls, sizes); // create new loader and pass urls & sizes
			imageLoader.addEventListener('complete', this.onImageLoaded); // Callback function when image is loaded
			imageLoader.node = media; // remember DOM element, onImageLoaded needs to know which element to add the image
			imageLoader.execute(); // TODO: Called when scrolled into view ...onScroll...
			
			this.imageLoaders.push(imageLoader); // Remember loader, so we can update onResize
		}
	}
	
	onImageLoaded(event) {
		let img = event.target.node.querySelector('img');
		img.src = event.target.image.src;
		// console.log('loaded: ', img, event.target.image.src);
	}
	
	setScroll() {}
	setSize() {
		
		var i, loader;
		
		for (i = 0; loader = this.imageLoaders[i]; i++) {
			let width = this.mediaNodes[i].offsetWidth;
			loader.updateSize(width);
		}
		
	}
}

export default ResponsiveImageLoaderModule;
