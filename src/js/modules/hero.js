// Vendor
// import TweenMax from 'gsap';

// UTILS
import DOM from '../utils/dom';
import DeviceInfo from '../utils/device-info';
import ResponsiveVideoLoader from '../utils/responsive-video-loader';
import ScrollDetector from '../scroll-detector';

// import Video from '../utils/video';
// import {MapValueInRange} from './utils/math';

class Hero {

	constructor(node) {
		console.log('init module');

		this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onFontLoaded = this.onFontLoaded.bind(this);
    this.onFontError = this.onFontError.bind(this);
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onWithin = this.onWithin.bind(this);


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

    // Image loader
    this.videoLoader = new ResponsiveVideoLoader(this.imageUrls, this.imageSizes);
    this.videoLoader.addEventListener('complete', this.onVideoLoaded);

    // Check Scroll
    this.detector = new ScrollDetector(node, {triggerY: 0.5}, true);
    this.detector.addEventListener('enter', this.onEnter);
    this.detector.addEventListener('leave', this.onLeave);
	}

	onEnter(event) {
		// play
	}

	onLeave(event) {
    // pause
	}

  onVideoLoaded(event) {
    // console.log('image loaded !! ', event.target.image.src);
    this.isImageLoaded = true;
    this.image.src = event.target.image.src;
    this.detector.setSize();

    if (this.isFontLoaded) {
      this.h3.innerHTML = 'Font & image loaded';
    } else {
      this.h3.innerHTML = 'Image loaded';
    }
	}

	// SCROLL
	setScroll(event) {
		this.scroll = DeviceInfo.GetScroll();
		this.detector.update();
	}

	// RESIZE
	setSize(event) {
		this.size = DeviceInfo.GetSize();

    // this.detector.setSize();

    // // Load new image if it's visible
    // if (this.detector.isWithin === true) {
    //   this.imageLoader.updateSize(this.node.offsetWidth);
    // }
	}

}

export default Hero;
