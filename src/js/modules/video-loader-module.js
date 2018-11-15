// Vendor
import {TweenLite} from 'gsap';

// UTILS
import {EventDispatcher, DOM, DeviceInfo, VideoLoader} from 'verktyget';
// import ScrollDetector from '../scroll-detector'; // in general module


class VideoLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		this.onVideoLoaded = this.onVideoLoaded.bind(this);
		this.onPlayVideo = this.onPlayVideo.bind(this);
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.video-loader');
		
		
		this.videoNode = this.node.querySelector('.media');
		this.playContainerNode = this.node.querySelector('.big-play-icon');
		this.iconNode = this.playContainerNode.querySelector('.icons');
		
		this.playContainerNode.addEventListener('click', this.onPlayVideo);
		
		var url = this.videoNode.getAttribute('data-video-url');
		
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
		this.video = event.target.videoNode;
		// Add to DOM
		this.videoNode.appendChild(this.video);
		// Show controls
		this.video.setAttribute('controls', 'false');
		this.video.controls = false;
		
		
		this.dispatchEvent({type: 'loaded', target: this}); // Dispatch to main
	}
	
	onPlayVideo(event) {
		this.video.play();
		
		
		TweenLite.to(this.iconNode, 0.5, { scale:0, transformOrigin:'50% 50%'});
		TweenLite.to(this.playContainerNode, 1, {opacity:0});
		
	}
	
	
	setScroll() {}
	
	setSize() {}
}

export default VideoLoaderModule;
