// Vendor
import TweenMax from 'gsap';
import TimelineMax from 'gsap/TimelineMax';

// UTILS
import DOM from '../utils/dom';
import DeviceInfo from '../utils/device-info';
import FontLoader from '../utils/font-loader';
import ResponsiveImageLoader from '../utils/responsive-image-loader';
import ScrollDetector from '../scroll-detector';

// import Video from '../utils/video';
// import {MapValueInRange} from './utils/math';

class GridModule {

	constructor(node, order) {
		console.log('init module');

		this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onFontLoaded = this.onFontLoaded.bind(this);
    this.onFontError = this.onFontError.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onWithin = this.onWithin.bind(this);


    this.size = DeviceInfo.GetSize();
    this.scroll = DeviceInfo.GetScroll();
    this.cssPath = '../css/bundle.css';
    this.node = node;
    this.order = order;
    this.isFontLoaded = false;
    this.isImageLoaded = false;
		this.fontName = this.node.getAttribute('data-font-name');
		this.h3 = DOM.Qs('h3', this.node);
    this.mediaNode = DOM.Qs('.media', this.node);
    this.image = DOM.Qs('img', this.mediaNode);

    var imgSm = this.mediaNode.getAttribute('data-image-sm');
    var imgMd = this.mediaNode.getAttribute('data-image-md');
    var imgLg = this.mediaNode.getAttribute('data-image-lg');
    this.imageUrls = [imgSm, imgMd, imgLg];
    this.imageSizes = [300, 600, 800];

    // Image loader
    this.imageLoader = new ResponsiveImageLoader(this.imageUrls, this.imageSizes);
    this.imageLoader.addEventListener('complete', this.onImageLoaded);


    // Set initial animation
    TweenMax.set(this.node, {y: 50, opacity:0});

    // Create timeline from 0-1, onWithin
    this.animNode = DOM.Create('div');
    DOM.Style(this.animNode, {position:'absolute', width:'5px', height:'5px', top:'0px', left:'5px', backgroundColor:'#615f5b', borderRadius: '50%'});
    DOM.Add(this.animNode, this.node);

    var tween = TweenMax.to(this.animNode, 1, {y: this.node.offsetHeight-10+'px'});
    this.tweenWithin = new TimelineMax({smoothChildTiming: true});
    this.tweenWithin.add(tween);
    this.tweenWithin.pause();

    // Check Scroll
    this.detector = new ScrollDetector(node, {triggerY: 0.5}, true);
    this.detector.addEventListener('enter', this.onEnter);
    this.detector.addEventListener('leave', this.onLeave);
    this.detector.addEventListener('progress', this.onWithin);
    // this.detector.addEventListener('progressWithin', this.onWithin);
    // this.detector.setTween(node, 1, {y: 100});
	}

	onEnter(event) {

    // Active state
    if (event.target.fromBottom === true) {
      TweenMax.set(this.node, {y: -50});
    }
    TweenMax.to(this.node, 0.4, {y: 0, opacity:1});

    // Load font
    if (this.isFontLoaded === false) {
  		var fontLoader = new FontLoader(this.fontName, this.cssPath);
  		fontLoader.addEventListener('fontComplete', this.onFontLoaded);
      fontLoader.addEventListener('fontFailed', this.onFontError);

    }
    // Load image
    this.imageLoader.execute(this.node.offsetWidth);
	}

	onLeave(event) {
    var y = (event.target.fromBottom === true) ? -50 : 50; // move up or down?
    TweenMax.to(this.node, 0.4, {y: y, opacity:0});
	}

  onWithin(event) {
    // go smooth
    this.tweenWithin.tweenTo(event.target.progress * this.tweenWithin.duration());
    // just hard set it
    // this.tween.progress(event.target.progress).pause();
  }

	onFontLoaded(event) {
    // console.log('font loaded ', event.target.families[0]);
    this.isFontLoaded = true;
    if (this.isImageLoaded) {
      this.h3.innerHTML = 'Font & image loaded';
    } else {
      this.h3.innerHTML = 'Font loaded';
    }
	}

  onFontError(event) {
    console.log('ERROR LOADING FONT!!!');
  }

  onImageLoaded(event) {
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

    // TODO Smoothly update timeline
    // this.tweenWithin.clear();
    // var tween = TweenMax.to(this.animNode, 1, {y: this.node.offsetHeight-10+'px'});
    // this.tweenWithin = new TimelineMax({smoothChildTiming: true});
    // this.tweenWithin.add(tween);
    // this.tweenWithin.pause();

    // var tween = TweenMax.to(obj, 1, {x:myCustomValue});

    this.detector.setSize();

    // Load new image if it's visible
    if (this.detector.isWithin === true) {
      this.imageLoader.updateSize(this.node.offsetWidth);
    }
	}

}

export default GridModule;
