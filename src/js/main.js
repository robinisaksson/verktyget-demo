// UTILS
import {DOM} from 'verktyget';
import {DeviceInfo} from 'verktyget';
import {EventDispatcher} from 'verktyget';
// import ScrollDetector from './scroll-detector';


// Project
import ImageLoaderModule from './modules/image-loader-module';
import ResponsiveImageLoaderModule from './modules/responsive-image-loader-module';
import VideoLoaderModule from './modules/video-loader-module';
import VideoPlayerModule from './modules/video-player-module';
import VideoViewportModule from './modules/video-viewport-module';

import ScrollDetection from './modules/scroll-detection';


class Main {

	constructor() {
		
		console.log('init main');

		this.onScroll = this.onScroll.bind(this);
		this.onResize = this.onResize.bind(this);

		// SCROLL, RESIZE
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', this.onResize);

		this.size = DeviceInfo.GetSize();
		this.scroll = DeviceInfo.GetScroll();
		
		// NODES
		this.contentNode = document.getElementById('content');
		this.sceneNode = document.querySelector('.scene');
		
		// Initialize modules
		this.modules = [];
		
		var imageModule = new ImageLoaderModule(); 
		var responsiveImageModule = new ResponsiveImageLoaderModule(); 
		var videoLoaderModule = new VideoLoaderModule();
		var videoPlayerModule = new VideoPlayerModule();
		var videoViewportModule = new VideoViewportModule();
		var scrollDetection = new ScrollDetection();
		
		this.modules.push(imageModule);
		this.modules.push(responsiveImageModule);
		this.modules.push(videoLoaderModule);
		this.modules.push(videoPlayerModule);
		this.modules.push(videoViewportModule);
		this.modules.push(scrollDetection);
		
		
		
		
		
		// this.heroNode = document.querySelector('.hero');
		// this.hero = new Hero(this.heroNode);
		// 
		
		// this.nodes = document.querySelectorAll('.grid-module');
		// var i, node;
		// for (i = 0;  node = this.nodes[i]; i++) {
		// 	var module = new GridModule(node, i);
		// 	this.modules.push(module);
		// }
	}


	// SCROLL
	onScroll(event) {
		DeviceInfo.Scroll();

		var i = this.modules.length;
    while(i--) {
      this.modules[i].setScroll();
    }
	}

	// RESIZE
	onResize(event) {
		DeviceInfo.Resize();

		var i = this.modules.length;
    while(i--) {
      this.modules[i].setSize();
    }
	}

}

export default Main;
