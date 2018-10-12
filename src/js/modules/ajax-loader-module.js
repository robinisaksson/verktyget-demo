// Vendor
// import TweenLite from 'gsap';

// UTILS
import {AjaxRequest, EventDispatcher, DOM, DeviceInfo, URLManager} from 'verktyget';


class AjaxLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		this.onAjaxLoaded = this.onAjaxLoaded.bind(this);
		// this.onNewPageLoaded = this.onNewPageLoaded.bind(this);
		// this.onLoadNewPage = this.onLoadNewPage.bind(this);
		// this.onOldSceneHidden = this.onOldSceneHidden.bind(this);
		// this.onHistoryChange = this.onHistoryChange.bind(this);
		
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.module.ajax-loading');
		
		// // URL Handling, AJAX Loading
		// URLManager.Init();
    // URLManager.addEventListener('onUrlChange', this.onHistoryChange); // Browser interaction - Back/Forward
		var url = '/subpage';
		var ajax = new AjaxRequest(url);
		ajax.addEventListener('loaded', this.onAjaxLoaded);
		ajax.load();
	}
	

	onAjaxLoaded(event) {


		// Create new html node
		var newHtml = event.target.htmlResponse;
		var newNode = document.createElement('div');
		newNode.innerHTML = newHtml;
		this.subpageHTML = newNode.querySelector('.scene');
		console.log(this.subpageHTML, this.sceneNode);
		// Add subpage html
		this.node.appendChild(this.subpageHTML);
		
		// // set title
		// let headTitle = newHtml.match(/<title>([^$]+)<\/title>/);
		// var title = headTitle ? headTitle[1] : "";
		// document.title = title;
		// 
		// 
		// // hide current scene
		// anime({
		// 	targets: this.sceneNode,
		// 	opacity: 0,
		// 	duration: 500,
		// 	easing: 'linear'
		// });
		// 
		// 
		// if (this.fromHistory === false) {
		// 	let obj = { scrollY:this.scroll.y };
		// 
		// 	let windowScroll = anime({
		// 	  targets: obj,
		// 	  scrollY: 0,
		// 	  duration: 400,
		// 		delay: 300,
		// 		easing: 'easeInQuart',
		// 		update: (anim) => {
		// 			window.scrollTo(0, obj.scrollY);
	  // 		},
		// 		complete: this.onOldSceneHidden
		// 	});
		// } else {
		// 	window.setTimeout(this.onOldSceneHidden, 700);
		// }
		
		this.dispatchEvent({type: 'loaded', target: this});
	}
	// onLoaded(event) {
	// 
	// 	// Image is loaded
	// 	this.imageNode.src = event.target.image.src;
	// 
	// 	// Dispatch to main
	// 	this.dispatchEvent({type: 'loaded', target: this});
	// }
	
	
	setScroll() {}
	
	setSize() {
		// this.size = DeviceInfo.GetSize();
		// this.imageLoader.updateSize();
	}
}

export default AjaxLoaderModule;
