import Main from "./main";
import WebFont from "webfontloader";


import { DOM } from 'verktyget';
import { DeviceInfo } from 'verktyget';


class Application {

  constructor() {
    
    // Modern browsers IE 9+
    if (window.addEventListener) {

      // Listen on the DOM Ready
      document.addEventListener('DOMContentLoaded', this.OnDomReady.bind(this));

    }
    // OLD browsers IE 6,7,8
    else if (window.attachEvent) {

      // Fallback solution..
      window.onload = this.CreateFallback.bind(this);
    }
    
  
    // FONT LOADING
    // loading - This event is triggered when all fonts have been requested.
    // active - This event is triggered when the fonts have rendered.
    // inactive - This event is triggered when the browser does not support linked fonts or if none of the fonts could be loaded.
    // fontloading - This event is triggered once for each font that's loaded.
    // fontactive - This event is triggered once for each font that renders.
    // fontinactive - This event is triggered if the font can't be loaded.
    const config = {
      fontinactive: (familyName, fvd) => {
        this.OnFontFail(familyName, fvd);
      },
      fontactive: (familyName, fvd) => {
          this.OnFontComplete(familyName, fvd);
      },
      active: () => {
          this.OnAllFontsComplete();
      },
      // GOOGLE FONTS
      google: {
        families: ['Roboto Mono:400,500'],
      }
      // FROM CSS
      // custom: {
      //   families: ['No5', 'Home Text', 'Barrio', 'Baloo', 'Amaranth', 'Aladin', 'Advent', 'Acme'],
      //   urls: ['../css/bundle.css'],
      // }
    };
    WebFont.load(config);
    
  }
  
  CreateFallback() {
    // IE8 stuff
  }

  OnFontFail(familyName, fvd) {
    console.log(familyName, fvd,' failed to load');
  }

  OnFontComplete(familyName, fvd) {
    console.log(familyName,' loaded');
  }

  OnAllFontsComplete() {
    console.log('ALL fonts loaded');
    this.fontIsLoaded = true;
    if (this.domIsLoaded === true) { // Wait for DOM
      this.Init();
    }
  }

  OnDomReady() {
    console.log('DOM ready');
    this.domIsLoaded = true;
    if (this.fontIsLoaded === true) { // Wait for font
      this.Init();
    }
  }

  Init() {
    new Main(); // Lets begin - Main.js
  }

}

export default Application;

// Init
new Application();
