// Vendor
import TweenLite from 'gsap';

// UTILS
import {DOM, DeviceInfo, Video} from 'verktyget';

// import ScrollDetector from '../scroll-detector'; // in general module

class VideoPlayerModule { // extends generalModule

	constructor() {
		
		// Bind event
		this.onVideoLoaded = this.onVideoLoaded.bind(this);
		// this.onResponsiveVideoLoaded = this.onResponsiveVideoLoaded.bind(this);
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.video-player');
		
		
		this.videoNodeOne = this.node.querySelector('.media:first-child');
		this.videoNodeTwo = this.node.querySelector('.media:last-child');
		
		var urlDesktop = this.videoNodeOne.getAttribute('data-video-desktop');
		var urlMobile = this.videoNodeOne.getAttribute('data-video-mobile');
		
		// Video player example
		// 1. Create new Player
		// 2. Listen for 'complete' event
		// 3. Start loading with execute
		var options = {
			autoplay: true,
			loop: true
		}
		this.video = new Video(this.videoNodeOne, [urlMobile, urlDesktop], [404, 1280], options); // from small size to larger sizes
		this.video.addEventListener('complete', this.onVideoLoaded);
		this.video.execute(this.videoNodeOne.offsetWidth);
		
		
		// Second video
		var urlDesktop2 = this.videoNodeTwo.getAttribute('data-video-desktop');
		var urlMobile2 = this.videoNodeTwo.getAttribute('data-video-mobile');
		
		var options2 = {
			autoplay: true,
			loop: true,
			videoAspect: 16/9,
      containerAspect: 4/3,
      size: 'cover', // cover, contain
      volume: 0,
		}
		this.video2 = new Video(this.videoNodeTwo, [urlMobile2, urlDesktop2], [404, 1280], options2); // from small size to larger sizes
		this.video2.addEventListener('complete', this.onVideoLoaded);
		this.video2.execute(this.videoNodeTwo.offsetWidth);
		
		
		// Update position
		this.setSize();

	}
	
	onVideoLoaded(event) {
		
		// Video is loaded
		console.log('video loaded: ', event.target.videoNode);
		// this.videoNodeOne.appendChild(event.target.videoNode);
	}
	
	onEnter() {}
	
	onLeave() {}
	
	setScroll() {}
	
	setSize() {
		var height = this.videoNodeTwo.offsetWidth * (3/4);
		var margin = height/2;
		DOM.Style(this.videoNodeTwo, {height: height+'px', marginTop: -margin+'px'});
		
		this.video.setSize();
		this.video2.setSize();
	}
}

export default VideoPlayerModule;
