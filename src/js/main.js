// Vendor
// import scrollMonitor from 'scrollmonitor';

// UTILS
import DOM from './utils/dom';
import DeviceInfo from './utils/device-info';
import FontLoader from './utils/font-loader';
import ScrollDetector from './scroll-detector';

// Project
import GridModule from './modules/grid-module';
import Hero from './modules/hero';
// import {MapValueInRange} from './utils/math';

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

		// Variables
		this.iOS = /iPad|iPhone|iPod/.test(navigator.platform),


		// NODES
		this.contentNode = document.getElementById('content');
		this.sceneNode = document.querySelector('.scene');

		this.heroNode = document.querySelector('.hero');
		this.hero = new Hero(this.heroNode);

		this.modules = [];
		this.nodes = document.querySelectorAll('.font-module');
		var i, node;
		for (i = 0;  node = this.nodes[i]; i++) {
			var module = new GridModule(node, i);
			this.modules.push(module);
		}
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

		this.hero.setSize();

		var i = this.modules.length;
    while(i--) {
      this.modules[i].setSize({bottom: -50});
    }
	}

}

export default Main;
