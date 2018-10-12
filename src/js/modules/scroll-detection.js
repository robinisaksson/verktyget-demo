// Vendor
// import TweenLite from 'gsap';

// UTILS
import {EventDispatcher, DOM, DeviceInfo, Video} from 'verktyget';

// Dev for new scroll-detection
import ScrollDetector from '../utils/scroll-detector';

// Compare with Scrollmagic
// import ScrollMagic from 'scrollmagic';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';




class ScrollDetection extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		// this.onEnter = this.onEnter.bind(this);
		// this.onLeave = this.onLeave.bind(this);
		// this.onEnterTop = this.onEnterTop.bind(this);
		// this.onEnterBottom = this.onEnterBottom.bind(this);
		// this.onLeaveTop = this.onLeaveTop.bind(this);
		// this.onLeaveBottom = this.onLeaveBottom.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onRemove = this.onRemove.bind(this);
		
		this.onSMEnter = this.onSMEnter.bind(this);
		this.onSMLeave = this.onSMLeave.bind(this);
		
		
		
		// Screen size
		this.size = DeviceInfo.GetSize();
		this.scroll = DeviceInfo.GetScroll();
		
		// Array of ScrollDetector's
		this.scollers = []
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.scroll-detection');
		this.demoNode = this.node.querySelector('.detection-demo');
		
		this.enterNode = this.demoNode.querySelector('.enter');
		this.leaveNode = this.demoNode.querySelector('.leave');
		
		this.enterTopNode = this.demoNode.querySelector('.enter-top');
		this.enterBottomNode = this.demoNode.querySelector('.enter-bottom');
		
		this.leaveTopNode = this.demoNode.querySelector('.leave-top');
		this.leaveBottomNode = this.demoNode.querySelector('.leave-bottom');
		
		// enter
		// leave
		// enterTop
		// enterBottom
		// leaveTop
		// leaveBottom
		
		// ENTER
		// Options are used to tell where detection should START & STOP
		var options = {
			debug: true,
			// duration: 100,
			// offsetStart: 0, // offset start position
			// offsetEnd: 0, // offset start position
			// triggerY: 0, // triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
		}
		var scrollEnter = new ScrollDetector(this.enterNode, options);
		scrollEnter.addEventListener('enter', this.onAdd);
		scrollEnter.addEventListener('leave', this.onRemove);
		
		// LEAVE
		var scrollLeave = new ScrollDetector(this.leaveNode, {debug: true});
		scrollLeave.addEventListener('leave', this.onAdd); // this.onLeave
		scrollLeave.addEventListener('enter', this.onRemove);
		
		// Enter TOP
		var scrollEnterTop = new ScrollDetector(this.enterTopNode, {debug: true});
		scrollEnterTop.addEventListener('enterTop', this.onAdd); // this.onEnterTop)
		scrollEnterTop.addEventListener('leaveTop', this.onRemove);
		
		// Enter BOTTOM
		var scrollEnterBottom = new ScrollDetector(this.enterBottomNode, {debug: true});
		scrollEnterBottom.addEventListener('enterBottom', this.onAdd); // this.onEnterBottom
		scrollEnterBottom.addEventListener('leaveBottom', this.onRemove);
		
		// Leave TOP
		var scrollLeaveTop = new ScrollDetector(this.leaveTopNode, {debug: true});
		scrollLeaveTop.addEventListener('leaveTop', this.onAdd); // this.onLeaveTop
		scrollLeaveTop.addEventListener('leaveBottom', this.onRemove);
		
		// Leave BOTTOM
		var scrollLeaveBottom = new ScrollDetector(this.leaveBottomNode, {debug: true});
		scrollLeaveBottom.addEventListener('leaveBottom', this.onAdd); // this.onLeaveBottom
		scrollLeaveBottom.addEventListener('leaveTop', this.onRemove);
		
		this.scollers.push(scrollEnter);
		this.scollers.push(scrollLeave);
		this.scollers.push(scrollEnterTop);
		this.scollers.push(scrollEnterBottom);
		this.scollers.push(scrollLeaveTop);
		this.scollers.push(scrollLeaveBottom);
		
		this.setSize()
		
		// // SCROLLMAGIC COMPARE TEST ------------------------------------------------------------------------
		// // init controller
		// var controller = new ScrollMagic.Controller();
		// 
		// // Create a scene
		// var scene = new ScrollMagic.Scene({triggerElement: this.leaveNode, duration: this.leaveNode.offsetHeight}).addTo(controller); // assign the scene to the controller
		// scene.on("enter", this.onSMEnter);
		// scene.on("leave", this.onSMLeave);
		// scene.addIndicators();
		// 
		// var triggerPosition = scene.triggerPosition(); // get the scene's trigger position
		// var start = scene.scrollOffset(); // get the current scroll offset for the start and end of the scene.
		// var end = scene.scrollOffset() + scene.duration();
		// console.log("the scene starts at", start, "and ends at", end, '   triggerPosition: ', triggerPosition);
		// 
		// // --------------------------------------------------------------------------------------------------
		
		// Nothing to load, dispatch direclty
		var _this = this;
		window.setTimeout(function() {
			_this.dispatchEvent({type: 'loaded', target:_this});
		}, 100);
		
	}
	
	onAdd(event) {
		DOM.AddClass(event.target.node, 'active');
	}
	onRemove(event) {
		DOM.RemoveClass(event.target.node, 'active');
	}
	
	// onEnter(event) {
	// 	console.log('scrolldetection: Enter');
	// }
	// 
	// onLeave(event) {
	// 	console.log('scrolldetection: Leave');
	// }
	// 
	// onEnterTop(event) {
	// 	console.log('scrolldetection: onEnterTop');
	// }
	// onEnterBottom(event) {
	// 	console.log('scrolldetection: onEnterBottom');
	// }
	// 
	// onLeaveTop(event) {
	// 	console.log('scrolldetection: onLeaveTop');
	// }
	// onLeaveBottom(event) {
	// 	console.log('scrolldetection: onLeaveBottom');
	// }
	
	// ------------------------------------------------------------------
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
	// ------------------------------------------------------------------
	
	setScroll() {
		this.scroll = DeviceInfo.GetScroll();
		// console.log(this.scroll.y);
		
		
		var i = this.scollers.length;
		while(i--) {
			this.scollers[i].update();
		}
		
	}
	
	
	setSize() {
		console.log('update size');
		this.size = DeviceInfo.GetSize();
		
		//var options = {}
		// this.scroller.setSize();
		
		var i = this.scollers.length;
		while(i--) {
			this.scollers[i].setSize();
		}
	}
}

export default ScrollDetection;
