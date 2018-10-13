// Verktyget
import {EventDispatcher, DOM, DeviceInfo} from 'verktyget';

import srcset from 'srcset';
import ImageLoader from '../utils/image-loader';

class SrcsetLoaderModule extends EventDispatcher {

	constructor() {
		
		super();
		
		// Bind event
		this.onLoaded = this.onLoaded.bind(this);
		
		this.size = DeviceInfo.GetSize();
		
		// query DOM for relevant nodes
		this.node = document.querySelector('.srcset-loader');
		this.mediaNode = this.node.querySelector('.media');
		this.imageNode = this.node.querySelector('.srcset-demo-img');

		
		var url = this.mediaNode.getAttribute('data-srcset'); // 'banner-HD.jpg 2x, banner-phone.jpg 100w';
		
		// Srcset example
		var urls = [];
		var sizes = [];
		var parsedUrl = srcset.parse(url);
		var i;
		for (i = 0; i < parsedUrl.length; i++) {
			urls.push(parsedUrl[i].url);
			sizes.push(parsedUrl[i].width);
		}
		
		this.imageLoader = new ImageLoader(urls, sizes);
		this.imageLoader.addEventListener('complete', this.onLoaded);
		this.imageLoader.execute(this.size.x*0.75);
	}
	
	onLoaded(event) {
		
		// Image is loaded
		console.log(event.target.image.src);
		this.imageNode.src = event.target.image.src;
		
		// Dispatch to main
		this.dispatchEvent({type: 'loaded', target: this});
	}
	setScroll() {}
	
	
	setSize() {

		this.size = DeviceInfo.GetSize();
		this.imageLoader.updateSize(this.size.x*0.75);
	}
}

export default SrcsetLoaderModule;
