// Vendor
import TweenLite from 'gsap';

// UTILS
import {DOM, DeviceInfo} from 'verktyget';
import NewImageLoader from '../utils/new-image-loader';

// import ScrollDetector from '../scroll-detector'; // in general module

class ImageLoaderModule { // extends generalModule

	constructor() {
		
		// Bind event
		this.onLoaded = this.onLoaded.bind(this);
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.image-loader');
		this.mediaNode = this.node.querySelector('.media');
		this.imageNode = this.mediaNode.querySelector('img');
		
		var url = this.mediaNode.getAttribute('data-image-url');
		
		// Image loader example
		// 1. Create new loader
		// 2. Listen for 'complete' event
		// 3. Start loading with execute
		this.imageLoader = new NewImageLoader(url);
		this.imageLoader.addEventListener('complete', this.onLoaded);
		this.imageLoader.execute();
		
		// // Load responsive assets
		// this.imageLoader = new NewImageLoader([url1, url2, url3], [960, 1400, 1920]);
	}
	
	onLoaded(event) {
		
		// Image is loaded
		this.imageNode.src = event.target.image.src;
	}
	
	onEnter() {
		
	}
	
	onLeave() {
		
	}
	
	setScroll() {}
	
	
	setSize() {
		// this.size = DeviceInfo.GetSize();
		// this.imageLoader.updateSize();
	}
}

export default ImageLoaderModule;
