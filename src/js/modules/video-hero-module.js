// Vendor
import TweenLite from 'gsap';

// UTILS
import {DOM, DeviceInfo, Video} from 'verktyget';

import NewVideo from '../utils/new-video';

// import ScrollDetector from '../scroll-detector'; // in general module

class VideoHeroModule { // extends generalModule

	constructor() {
		
		// Bind event
		this.onVideoLoaded = this.onVideoLoaded.bind(this);
		
		// Screen size
		this.size = DeviceInfo.GetSize();
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.video-hero');
		this.mediaNode = this.node.querySelector('.media');
		
		// Urls
		var urlDesktop = this.mediaNode.getAttribute('data-video-desktop');
		var urlMobile = this.mediaNode.getAttribute('data-video-mobile');
		
		// Video player example
		// 1. Create new Player
		// 2. Listen for 'complete' event
		// 3. Start loading with execute
		var options = {
			autoplay: true,
			loop: true,
			size: 'cover', // cover, contain
			videoAspect: 1920/800,
			
			// videoAspect: 16/9,
      // containerAspect: 16/9, //this.node.offsetWidth/this.node.offsetHeight, // this.size.x/this.size.y,
      // size: 'cover', // cover, contain
      // volume: 0,
		}
		this.video = new NewVideo(this.mediaNode, [urlDesktop], [1920], options); // from small size to larger sizes
		this.video.addEventListener('complete', this.onVideoLoaded);
		this.video.execute(this.size.x); // screen width
		
		this.setSize()
	}
	
	onVideoLoaded(event) {
		
		// Video is loaded
		// console.log('video loaded: ', event.target.videoNode);
		// this.mediaNodeOne.appendChild(event.target.videoNode);
	}
	
	onEnter() {}
	
	onLeave() {}
	
	setScroll() {}
	
	
	setSize() {
		this.size = DeviceInfo.GetSize();
		
		DOM.Style(this.mediaNode, {height: this.size.y+'px'})
		
		this.video.setContainerAspect(this.size.x/this.size.y);
		// setVideoAspect(as) {
		// 	this.options.videoAspect = as;
		// }
		this.video.setSize();
	}
}

export default VideoHeroModule;
