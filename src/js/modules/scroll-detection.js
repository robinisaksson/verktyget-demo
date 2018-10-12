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
		this.onEnter = this.onEnter.bind(this);
		this.onLeave = this.onLeave.bind(this);
		this.onEnterTop = this.onEnterTop.bind(this);
		this.onEnterBottom = this.onEnterBottom.bind(this);
		this.onLeaveTop = this.onLeaveTop.bind(this);
		this.onLeaveBottom = this.onLeaveBottom.bind(this);
		// this.onAdd = this.onAdd.bind(this);
		// this.onRemove = this.onRemove.bind(this);
		
		this.onEnterScroll = this.onEnterScroll.bind(this);
		this.onLeaveScroll = this.onLeaveScroll.bind(this);

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
		
		this.middleLine = this.demoNode.querySelector('.middle-line');
		this.boxLarge = this.demoNode.querySelector('.box-large');
		this.boxSmall = this.demoNode.querySelector('.box-small');
		
		this.descriptionLarge = this.boxLarge.querySelector('.description');
		this.descriptionSmall = this.boxSmall.querySelector('.description');
		
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


		var scrollContainer = new ScrollDetector(this.demoNode, options);
		scrollContainer.addEventListener('enter', this.onEnterScroll);
		scrollContainer.addEventListener('leave', this.onLeaveScroll);

		var scrollLarge = new ScrollDetector(this.boxLarge, options);
		scrollLarge.addEventListener('enter', this.onEnter);
		scrollLarge.addEventListener('leave', this.onLeave);
		
		var scrollSmall = new ScrollDetector(this.boxSmall, options);
		scrollSmall.addEventListener('enterTop', this.onEnterTop);
		scrollSmall.addEventListener('enterBottom', this.onEnterBottom);
		scrollSmall.addEventListener('leaveTop', this.onLeaveTop);
		scrollSmall.addEventListener('leaveBottom', this.onLeaveBottom);
		
		// // LEAVE
		// var scrollLeave = new ScrollDetector(this.leaveNode, {debug: true});
		// scrollLeave.addEventListener('leaveBottom', this.onAdd); // this.onLeave
		// scrollLeave.addEventListener('enter', this.onRemove);
		// 
		// // Enter TOP
		// var scrollEnterTop = new ScrollDetector(this.enterTopNode, {debug: true});
		// scrollEnterTop.addEventListener('enterTop', this.onAdd); // this.onEnterTop)
		// scrollEnterTop.addEventListener('leaveTop', this.onRemove);
		// 
		// // Enter BOTTOM
		// var scrollEnterBottom = new ScrollDetector(this.enterBottomNode, {debug: true});
		// scrollEnterBottom.addEventListener('enterBottom', this.onAdd); // this.onEnterBottom
		// scrollEnterBottom.addEventListener('leaveBottom', this.onRemove);
		// 
		// // Leave TOP
		// var scrollLeaveTop = new ScrollDetector(this.leaveTopNode, {debug: true});
		// scrollLeaveTop.addEventListener('leaveTop', this.onAdd); // this.onLeaveTop
		// scrollLeaveTop.addEventListener('leaveBottom', this.onRemove);
		// 
		// // Leave BOTTOM
		// var scrollLeaveBottom = new ScrollDetector(this.leaveBottomNode, {debug: true});
		// scrollLeaveBottom.addEventListener('leaveBottom', this.onAdd); // this.onLeaveBottom
		// scrollLeaveBottom.addEventListener('leaveTop', this.onRemove);
		
		this.scollers.push(scrollContainer);
		this.scollers.push(scrollLarge);
		this.scollers.push(scrollSmall);
		
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
	
	// onAdd(event) {
	// 	DOM.AddClass(event.target.node, 'active');
	// }
	// onRemove(event) {
	// 	DOM.RemoveClass(event.target.node, 'active');
	// }
	
	onEnterScroll(event) {
		console.log('onEnterScroll');
		DOM.AddClass(this.middleLine, 'active');
	}
	onLeaveScroll(event) {
		console.log('onLeaveScroll');
		DOM.RemoveClass(this.middleLine, 'active');
	}
	onEnter(event) {
		this.descriptionLarge.innerHTML = 'Enter';
		DOM.AddClass(this.boxLarge, 'active');
	}
	onLeave(event) {
		// DOM.RemoveClass(this.middleLine, 'active');
		this.descriptionLarge.innerHTML = 'Leave';
		DOM.RemoveClass(this.boxLarge, 'active');
	}
	
	onEnterTop(event) {
		this.descriptionSmall.innerHTML = 'EnterTop';
		DOM.AddClass(this.boxSmall, 'active');
	}
	onEnterBottom(event) {
		this.descriptionSmall.innerHTML = 'EnterBottom';
		DOM.AddClass(this.boxSmall, 'active');
	}
	onLeaveTop(event) {
		this.descriptionSmall.innerHTML = 'LeaveTop';
		DOM.RemoveClass(this.boxSmall, 'active');
	}
	onLeaveBottom(event) {
		this.descriptionSmall.innerHTML = 'LeaveBottom';
		DOM.RemoveClass(this.boxSmall, 'active');
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
