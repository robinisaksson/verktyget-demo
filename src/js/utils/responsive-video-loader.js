import DeviceInfo from './device-info';
import VideoLoader from './video-loader';
import EventDispatcher from './event-dispatcher';

class ResponsiveVideoLoader extends EventDispatcher {
  
  constructor(url, mediaQueries) {
    
    super();
    
    // BIND
    this.onLoadCompleteHandler = this.onLoadCompleteHandler.bind(this);
    
    
    
    // SIZE
    this.size = DeviceInfo.GetSize();
    
    var l = url.length;
    this.baseUrl = url.slice(0,l-4); // all except extension
    this.format = url.substr(l-3); // last 3 characters
    
    // Order is important -> from BIG to SMALL!
    if(mediaQueries === undefined) {
      this.mediaQueries = {
        'small': 767,
      }
    } else {
      this.mediaQueries = mediaQueries;
    }
    // console.log('mediaQueries: ', this.mediaQueries);
    
    // LOADER
    this.videoLoader = new VideoLoader(url);
    this.videoLoader.addEventListener('complete', this.onLoadCompleteHandler)
  }
  
  getHTML() {
    return this.videoLoader.getHTML();
  }
  
  execute() {
    
    
    // set source
    let url = this.baseUrl+'.'+this.format;
    let qName = 'none';
    for (var key in this.mediaQueries) {
      if (this.mediaQueries.hasOwnProperty(key)) {
        if (this.size.x < this.mediaQueries[key]) {
          qName = key;
          url = this.baseUrl+'_'+key+'.'+this.format;
        }
      }
    }
    
    this.queryName = qName;
    
    
    
    // console.log('LOAD NEW VIDEO URL: ', url, qName);
    // starts loading
    this.videoLoader.setUrl(url);
    this.videoLoader.execute();
  }
  
  onLoadCompleteHandler(event) {
    
    // 
    // this.videoNode.removeEventListener("canplaythrough", this.onLoadCompleteHandler);
    
    // Dispatch event
    this.dispatchEvent({type:'complete', target:this});
  }
  
  
  updateSize() {
    
    this.size = DeviceInfo.GetSize();
    
    let url = this.baseUrl+'.'+this.format;
    let qName = 'none';
    for (var key in this.mediaQueries) {
      if (this.mediaQueries.hasOwnProperty(key)) {
        if (this.size.x < this.mediaQueries[key]) {
          qName = key;
          url = this.baseUrl+'_'+key+'.'+this.format;
        }
      }
    }
    
    if (this.queryName !== qName) {
      this.queryName = qName;
      
      // console.log('LOAD NEW URL: ', url, qName);
      this.videoLoader.setUrl(url);
      this.videoLoader.execute();
    }
    
  }
}

export default ResponsiveVideoLoader;
