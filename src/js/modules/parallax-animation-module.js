// Vendor
import TweenLite from 'gsap';

// Verktyget
import {EventDispatcher, DOM, DeviceInfo, ImageLoader, ScrollDetector} from 'verktyget';


class ParallaxAnimationModule extends EventDispatcher {

	constructor() {
		
		super();
		
		this.onImageLoaded = this.onImageLoaded.bind(this);
		this.onEnter = this.onEnter.bind(this);
		this.onLeave = this.onLeave.bind(this);
		this.onProgress = this.onProgress.bind(this);
		
		this.size = DeviceInfo.GetSize();
		this.node = document.querySelector('.module.parallax-animation');
		
		this.mediaNodes = Array.from(this.node.querySelectorAll('.media')); // nodeList to [array]
		this.imageLoaders = [];
		this.imagesLoaded = 0;
		
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
		
		// Add scroll to first mediaNode
		// ------------------------------------------------------------------------------------------
		// Add scroll animation ---------------------------------------------------------------------
		var node = this.mediaNodes[0];
		var options = {
			debug: false,
			useAnimation: true,
			offsetStart: this.size.y*0.65, // offset start position
			offsetEnd: this.size.y*0.65, // offset start position
			// triggerY: 0.5, // triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
		};
		this.scrollAnimation = new ScrollDetector(node, options);
		this.scrollAnimation.addEventListener('enter', this.onEnter);
		this.scrollAnimation.addEventListener('leave', this.onLeave);
		this.scrollAnimation.addEventListener('progress', this.onProgress);
		
		// Set initial position + tween
		TweenLite.set(node, {y: -this.size.y*0.15});
		this.scrollTween = TweenLite.to(node, 1, {y: this.size.y*0.15, paused:true, ease: Power0.easeNone});
		
		// ------------------------------------------------------------------------------------------
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
	
	onEnter(event) {
		console.log('Enter');
	}
	onLeave(event) {
		console.log('Leave');
	}
	
	onProgress(event) {
		// console.log('Progress Animation ', event.target.progress);
		this.scrollTween.progress(event.target.progress);
	}
	
	
	setScroll() {
		this.scrollAnimation.update();
	}
	
	setSize() {
		this.size = DeviceInfo.GetSize();
		
		var i, loader;
		
		for (i = 0; loader = this.imageLoaders[i]; i++) {
			let width = this.mediaNodes[i].offsetWidth;
			loader.updateSize(width);
		}
		
		var options = {
			offsetStart: this.size.y*0.65, // offset start position
			offsetEnd: this.size.y*0.65, // offset start position
		}
		this.scrollAnimation.setSize(options);
		
		// Set position + update tween
		TweenLite.set(this.mediaNodes[0], {y: -this.size.y*0.15});
		this.scrollTween = TweenLite.to(this.mediaNodes[0], 1, {y: this.size.y*0.15, paused:true, ease: Power0.easeNone});
		
	}
}

export default ParallaxAnimationModule;
