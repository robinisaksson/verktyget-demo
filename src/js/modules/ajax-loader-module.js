// Vendor
import TweenLite from 'gsap';

// UTILS
import {AjaxRequest, EventDispatcher, DOM, DeviceInfo, URLManager} from 'verktyget';


class AjaxLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		this.onAjaxLoaded = this.onAjaxLoaded.bind(this);
		this.onClickCTA = this.onClickCTA.bind(this);
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.module.ajax-loading');
		this.ctaNode = this.node.querySelector('.cta');
		this.linkNode = this.node.querySelector('.link');

		this.linkNode.addEventListener('click', this.onClickCTA);
			
	}
	
	onClickCTA(event) {
		// var url = '/subpage';
		event.preventDefault();
		
		
		var url = event.target.href;
		var ajax = new AjaxRequest(url);
		ajax.addEventListener('loaded', this.onAjaxLoaded);
		ajax.load();
		
	}
	
	onAjaxLoaded(event) {

		// Hide CTA + animateOut
		TweenLite.to(this.ctaNode, 0.5, {height:0, opacity:0});
		
		// Create new html node
		var newHtml = event.target.htmlResponse;
		var newNode = document.createElement('div');
		newNode.innerHTML = newHtml;
		this.subpageHTML = newNode.querySelector('.scene');
		
		// Add subpage html + animateIn
		DOM.Style(this.subpageHTML, {opacity:0});
		this.node.appendChild(this.subpageHTML);
		TweenLite.to(this.subpageHTML, 0.5, {delay:0.5, opacity:1});
		
		this.dispatchEvent({type: 'loaded', target: this});
	}
	
	
	setScroll() {}
	
	setSize() {
		// this.size = DeviceInfo.GetSize();
	}
}

export default AjaxLoaderModule;
