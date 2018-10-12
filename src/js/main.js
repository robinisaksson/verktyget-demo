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
import AjaxLoaderModule from './modules/ajax-loader-module';
import ScrollDetection from './modules/scroll-detection';


class Main {

	constructor() {
		
		console.log('init main');

		this.onScroll = this.onScroll.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onModuleLoaded = this.onModuleLoaded.bind(this);
		
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
		this.loadedModules = 0;
		
		// Create page modules
		var responsiveImageModule,
		imageModule,
		videoLoaderModule,
		videoPlayerModule,
		videoViewportModule,
		scrollDetection,
		ajaxLoading;
		
		imageModule = new ImageLoaderModule(); 
		imageModule.addEventListener('loaded', this.onModuleLoaded);
		
		responsiveImageModule = new ResponsiveImageLoaderModule(); 
		responsiveImageModule.addEventListener('loaded', this.onModuleLoaded);
		
		videoLoaderModule = new VideoLoaderModule();
		videoLoaderModule.addEventListener('loaded', this.onModuleLoaded);
		
		videoPlayerModule = new VideoPlayerModule();
		videoPlayerModule.addEventListener('loaded', this.onModuleLoaded);
		
		videoViewportModule = new VideoViewportModule();
		videoViewportModule.addEventListener('loaded', this.onModuleLoaded);
		
		scrollDetection = new ScrollDetection();
		scrollDetection.addEventListener('loaded', this.onModuleLoaded);
		
		ajaxLoading = new AjaxLoaderModule();
		ajaxLoading.addEventListener('loaded', this.onModuleLoaded);
		
		this.modules.push(imageModule);
		this.modules.push(responsiveImageModule);
		this.modules.push(videoLoaderModule);
		this.modules.push(videoPlayerModule);
		this.modules.push(videoViewportModule);
		this.modules.push(scrollDetection);
		this.modules.push(ajaxLoading);
		
		
		
		
		// this.nodes = document.querySelectorAll('.grid-module');
		// var i, node;
		// for (i = 0;  node = this.nodes[i]; i++) {
		// 	var module = new GridModule(node, i);
		// 	this.modules.push(module);
		// }
	}

	onModuleLoaded(event) {
		
		// All loaded
		if (this.loadedModules === this.modules.length-1) {
			console.log('-------- ALL MODULES LOADED --------');
			
			var i = this.modules.length;
	    while(i--) {
	      this.modules[i].setSize();
	    }
		}
		this.loadedModules++;
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
