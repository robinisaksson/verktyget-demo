// Vendor
import TweenLite from 'gsap';

// Verktyget
import {EventDispatcher, DOM, DeviceInfo} from 'verktyget';

import ScrollDetector from '../utils/scroll-detector';

class ScrollAnimationModule extends EventDispatcher {

	constructor() {
		
		super();
		
		console.log('scroll animation');
		
		
		this.onEnter = this.onEnter.bind(this);
		this.onLeave = this.onLeave.bind(this);
		this.onProgress = this.onProgress.bind(this);
		
		this.size = DeviceInfo.GetSize();
		this.node = document.querySelector('.module.scroll-animation');
		this.animationContainer = this.node.querySelector('.animation-demo');
		this.box1 = this.animationContainer.querySelector('.box-1');
		this.box2 = this.animationContainer.querySelector('.box-2');
		this.box3 = this.animationContainer.querySelector('.box-3');
		this.box4 = this.animationContainer.querySelector('.box-4');
		this.box5 = this.animationContainer.querySelector('.box-5');
		
		
		// ------------------------------------------------------------------------------------------
		// Add scroll animation ---------------------------------------------------------------------
		var options = {
			debug: true,
			useAnimation: true,
			// offsetStart: this.size.y*0.65, // offset start position
			// offsetEnd: this.size.y*0.65, // offset start position
			// triggerY: 0.5, // triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
		};
		this.scrollAnimation = new ScrollDetector(this.animationContainer, options);
		this.scrollAnimation.addEventListener('enter', this.onEnter);
		this.scrollAnimation.addEventListener('leave', this.onLeave);
		this.scrollAnimation.addEventListener('progress', this.onProgress);
		
		// // Set initial position + tween
		// TweenLite.set(node, {y: -this.size.y*0.15});
		// this.scrollTween = TweenLite.to(node, 1, {y: this.size.y*0.15, paused:true, ease: Power0.easeNone});
		

		this.scroll1 = TweenLite.to(this.box1, 1, {height: this.size.y*0.6+'px', paused:true, ease: Power0.easeNone});
		this.scroll2 = TweenLite.to(this.box2, 1, {width: this.animationContainer.offsetWidth+'px', paused:true, ease: Power0.easeNone});
		this.scroll3 = TweenLite.to(this.box3, 1, {top: '0px', paused:true, ease: Power0.easeNone});
		this.scroll4 = TweenLite.to(this.box4, 1, {x: -this.animationContainer.offsetHeight/2+'px', paused:true, ease: Power0.easeNone});
		this.scroll5 = TweenLite.to(this.box5, 1, {scale: 2, rotate:180, paused:true, ease: Power0.easeNone});
	
		// ------------------------------------------------------------------------------------------
		
		// Nothing to load, dispatch direclty
		var _this = this;
		window.setTimeout(function() {
			_this.dispatchEvent({type: 'loaded', target:_this});
		}, 100);
	}
	
	
	onEnter(event) {
		console.log('Enter');
	}
	onLeave(event) {
		console.log('Leave');
	}
	
	onProgress(event) {
		console.log('Progress Animation ', event.target.progress);
		// this.scrollTween.progress(event.target.progress);
		
		this.scroll1.progress(event.target.progress);
		this.scroll2.progress(event.target.progress);
		this.scroll3.progress(event.target.progress);
		this.scroll4.progress(event.target.progress);
		this.scroll5.progress(event.target.progress);
	}
	
	
	setScroll() {
		// this.scrollAnimation.update();
		// this.scroll1.update();
		// this.scroll2.update();
		// this.scroll3.update();
		// this.scroll4.update();
		// this.scroll5.update();
		this.scrollAnimation.update();
	}
	
	setSize() {
		this.size = DeviceInfo.GetSize();
		
		
		this.scrollAnimation.setSize();
		// this.scroll1.setSize();
		// this.scroll2.setSize();
		// this.scroll3.setSize();
		// this.scroll4.setSize();
		// this.scroll5.setSize();
		
		// var options = {
		// 	offsetStart: this.size.y*0.65, // offset start position
		// 	offsetEnd: this.size.y*0.65, // offset start position
		// }
		// this.scrollAnimation.setSize(options);
		
		// // Set position + update tween
		// TweenLite.set(this.mediaNodes[0], {y: -this.size.y*0.15});
		// this.scrollTween = TweenLite.to(this.mediaNodes[0], 1, {y: this.size.y*0.15, paused:true, ease: Power0.easeNone});
		
	}
}

export default ScrollAnimationModule;
