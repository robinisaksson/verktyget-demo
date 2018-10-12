// Vendor
// import TweenLite from 'gsap';

// UTILS
import {EventDispatcher, DOM, DeviceInfo, VideoLoader} from 'verktyget';
// import ScrollDetector from '../scroll-detector'; // in general module


class VideoLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		this.onVideoLoaded = this.onVideoLoaded.bind(this);
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.video-loader');
		
		
		this.staticVideoNode = this.node.querySelector('.media');
		
		var url = this.staticVideoNode.getAttribute('data-video-url');
		
		// Video loader example
		// 1. Create new loader
		// 2. Listen for 'complete' event
		// 3. Start loading with execute
		this.videoLoader = new VideoLoader(url);
		this.videoLoader.addEventListener('complete', this.onVideoLoaded);
		this.videoLoader.execute();
		
	}
	
	onVideoLoaded(event) {
		
		// Video is loaded
		
		// Store reference to video element
		this.staticVideo = event.target.videoNode;
		// Add to DOM
		this.staticVideoNode.appendChild(this.staticVideo);
		// Show controls
		this.staticVideo.setAttribute('controls', 'true');
		
		
		this.dispatchEvent({type: 'loaded', target: this}); // Dispatch to main
	}
	
	onEnter() {
		
	}
	
	onLeave() {
		
	}
	
	setScroll() {}
	
	setSize() {}
}

export default VideoLoaderModule;
