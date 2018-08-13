// Vendor
// import TweenMax from 'gsap';

// UTILS
import {DOM, DeviceInfo, Video} from 'verktyget';
// import {ResponsiveVideoLoader, Video} from 'verktyget';
// import {MapValueInRange} from './utils/math';

import ScrollDetector from '../scroll-detector';


class Hero {

	constructor(node) {
		console.log('init Hero');
		
		this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
		
    this.size = DeviceInfo.GetSize();
    this.scroll = DeviceInfo.GetScroll();
    this.node = node;
		this.mediaNode = DOM.Qs('.media', this.node);
    this.video = DOM.Qs('video', this.mediaNode);

    var imgSm = this.mediaNode.getAttribute('data-image-sm');
    var imgMd = this.mediaNode.getAttribute('data-image-md');
    var imgLg = this.mediaNode.getAttribute('data-image-lg');
    this.imageUrls = [imgSm, imgMd, imgLg];
    this.imageSizes = [300, 600, 800];

		// Video
		var vidSm = this.mediaNode.getAttribute('data-video-sm');
    var vidMd = this.mediaNode.getAttribute('data-video-md');
    var videoUrls = [vidSm, vidMd];
    var videoSizes = [720, 1080];
		var options = {
			autoplay:true,
      loop:true,
      videoAspect: 1920/800 // 16/9*
		}
		this.video = new Video(this.mediaNode, videoUrls, videoSizes, options); // node, urls, sizes, options
		this.video.addEventListener('complete', this.onVideoLoaded);
		this.video.execute(this.node.offsetWidth);


    // Check Scroll
    this.detector = new ScrollDetector(node, {triggerY: 0.5}, true);
    this.detector.addEventListener('enter', this.onEnter);
    this.detector.addEventListener('leave', this.onLeave);
	}

	onEnter(event) {
		// play
		this.video.play();
	}

	onLeave(event) {
    // pause
		this.video.pause();
	}

  onVideoLoaded(event) {
    // console.log('video loaded !!');
		// console.log(event.target.videoNode);
		DOM.Add(event.target.videoNode, this.mediaNode);
		this.video.seek(5);
		this.video.play();
	}

	// SCROLL
	setScroll(event) {
		this.scroll = DeviceInfo.GetScroll();
		this.detector.update();
	}

	// RESIZE
	setSize(event) {
		this.size = DeviceInfo.GetSize();

    this.detector.setSize();

		this.video.setSize();
		this.video.setVideoSize('cover');
	}

}

export default Hero;
