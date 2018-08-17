// Vendor
import TweenLite from 'gsap';

// UTILS
import {DOM, DeviceInfo, Video} from 'verktyget';

import ScrollDetector from '../utils/scroll-detector';


import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';




class ScrollDetection {

	constructor() {
		
		// Bind event
		this.onEnter = this.onEnter.bind(this);
		this.onLeave = this.onLeave.bind(this);
		this.onEnterTop = this.onEnterTop.bind(this);
		this.onEnterBottom = this.onEnterBottom.bind(this);
		this.onLeaveTop = this.onLeaveTop.bind(this);
		this.onLeaveBottom = this.onLeaveBottom.bind(this);
		
		this.onSMEnter = this.onSMEnter.bind(this);
		this.onSMLeave = this.onSMLeave.bind(this);
		
		
		
		// Screen size
		this.size = DeviceInfo.GetSize();
		this.scroll = DeviceInfo.GetScroll();
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.scroll-detection');
		this.demoNode = this.node.querySelector('.demo');
		
		this.enterNode = this.demoNode.querySelector('.enter');
		this.leaveNode = this.demoNode.querySelector('.leave');
		
		this.enterTopNode = this.demoNode.querySelector('.enter-top');
		this.enterBottomNode = this.demoNode.querySelector('.enter-bottom');
		
		this.leaveTopNode = this.demoNode.querySelector('.leave-top');
		this.leaveBottomNode = this.demoNode.querySelector('.leave-bottom');
		
		// Options are used to tell where detection should START & STOP
		var options = {
			node: this.enterNode, // Required!
			// duration: 100,
			// offsetStart: 0, // offset start position
			// offsetEnd: 0, // offset start position
			// triggerY: 0, // triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
		}
		this.scroller = new ScrollDetector(options, true);
		this.scroller.addEventListener('enter', this.onEnter);
		this.scroller.addEventListener('leave', this.onEnter);
		console.log('scroller: ', this.scroller);
		
		this.setSize()
		
		
		// init controller
		var controller = new ScrollMagic.Controller();

		// Create a scene
		var scene = new ScrollMagic.Scene({triggerElement: this.leaveNode, duration: this.leaveNode.offsetHeight}).addTo(controller); // assign the scene to the controller
		scene.on("enter", this.onSMEnter);
		scene.on("leave", this.onSMLeave);
		scene.addIndicators();
		
		
		// get the scene's trigger position
		var triggerPosition = scene.triggerPosition();
		
		// get the current scroll offset for the start and end of the scene.
		var start = scene.scrollOffset();
		var end = scene.scrollOffset() + scene.duration();
		console.log("the scene starts at", start, "and ends at", end, '   triggerPosition: ', triggerPosition);

		// // Check Scroll
		// var top = DOM.AbsoluteY(this.node) - (this.headerOffset/2);
		// var duration = node.offsetHeight;
		// this.navScene = new ScrollMagic.Scene({offset: top, duration: duration});
		// this.navScene.triggerHook(0);
		// this.navScene.on('enter', this.onEnterModule); // Fires whenever the scene enters the "DURING" state. Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
		// this.navScene.addTo(controller);
		// this.navScene.addIndicators();
		
		
		// this.progressScene1 = new ScrollMagic.Scene({triggerElement: this.titleNode, duration: duration});
		// this.progressScene1.on('progress', this.onProgress);
		// this.progressScene1.addTo(this.controller);
		
	}
	
	onEnter(event) {
		console.log('enter: scrolldetection');
	}
	
	onLeave(event) {
		console.log('leave: scrolldetection');
	}
	
	onEnterTop(event) {}
	onEnterBottom(event) {}

	onLeaveTop(event) {}
	onLeaveBottom(event) {}
	
	onSMEnter(event) {
		console.log('enter scrollmagic');
		
		// event.type, 
		// event.target, 
		// event.progress, 
		// event.state, 
		// event.scrollDirection
	}
	onSMLeave(event) {
		console.log('leave scrollmagic');
	}
	
	setScroll() {
		this.scroll = DeviceInfo.GetScroll();
		// console.log(this.scroll.y);
		this.scroller.update();
	}
	
	
	setSize() {
		this.size = DeviceInfo.GetSize();
		
		//var options = {}
		this.scroller.setSize();
	}
}

export default ScrollDetection;
