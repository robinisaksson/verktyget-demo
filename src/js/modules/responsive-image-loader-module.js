// Verktyget
import {EventDispatcher, DOM, DeviceInfo, ImageLoader} from 'verktyget';

class ResponsiveImageLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		this.onImageLoaded = this.onImageLoaded.bind(this);
		
		// console.log('Responsive image loader module');
		this.node = document.querySelector('.module.responsive-image-loader');
		
		this.mediaNodes = Array.from(this.node.querySelectorAll('.media')); // nodeList to [array]
		this.imageLoaders = [];
		this.imagesLoaded = 0;
		
		var i, media;
		for (i = 0; media = this.mediaNodes[i]; i++) {
			
			let root = media.getAttribute('data-root-url'); // get root url from DOM
			let urls = [root+'-960.jpg', root+'-1440.jpg', root+'-1920.jpg']; // create array of image urls, small to large, add the different breakpoints
			let sizes = [960, 1440, 1920]; // create array, small to large, with the width of each image
			let imageLoader = new ImageLoader(urls, sizes); // create new loader and pass urls & sizes
			imageLoader.addEventListener('complete', this.onImageLoaded); // Callback function when image is loaded
			imageLoader.node = media; // remember DOM element, onImageLoaded needs to know which element to add the image
			imageLoader.execute(); // Load images
			
			this.imageLoaders.push(imageLoader); // Remember loader, so we can update onResize
		}
	}
	
	onImageLoaded(event) {
		let img = event.target.node.querySelector('img');
		img.src = event.target.image.src;
		// console.log('loaded: ', img, event.target.image.src);
		
		if (this.imagesLoaded === this.mediaNodes.length-1) {
			this.dispatchEvent({type: 'loaded', target: this}); // Dispatch to main
		}
		this.imagesLoaded++;
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
