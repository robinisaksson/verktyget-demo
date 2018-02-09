
import EventDispatcher from './event-dispatcher';
import DeviceInfo from './device-info';


class VideoLoader extends EventDispatcher {
  
  constructor(url) {
    
    super();
    
    this.url = url;
    this.videoNode = document.createElement("video");
    
    
    
    const autoPlayOnMobile = true;
    
    // Add attribute for mobile auto-play
    if (autoPlayOnMobile === true && DeviceInfo.IsMobileDevice() === true) {
      this.videoNode.setAttribute('muted', 'true');
      this.videoNode.setAttribute('playsinline', 'true');
      this.videoNode.setAttribute('webkit-playsinline', 'true');
    }
    
    
    // Bind
    this.onMetaDataCompleteHandler = this.onMetaDataCompleteHandler.bind(this);
    this.onLoadCompleteHandler = this.onLoadCompleteHandler.bind(this);
    this.onLoadProgressHandler = this.onLoadProgressHandler.bind(this);
    this.onLoadErrorHandler = this.onLoadErrorHandler.bind(this);
    
    // listen
    this.videoNode.addEventListener("loadedmetadata", this.onMetaDataCompleteHandler); // can play the whole video (if download speed is constant)
    this.videoNode.addEventListener("progress", this.onLoadProgressHandler); // download progress
    this.videoNode.addEventListener("error", this.onLoadErrorHandler); // on Error
  }
  
  getHTML() {
    return this.videoNode;
  }
  
  setUrl(url) {
    this.url = url;
  }
  
  execute() {
    
    // Listen
    this.videoNode.addEventListener("canplaythrough", this.onLoadCompleteHandler); // can play the whole video (if download speed is constant)
    
    // set source
    this.videoNode.src = this.url;
    
    // starts loading
    this.videoNode.load();
  }
  
  
  onLoadProgressHandler(event) {
    
    if (this.videoNode.buffered.length !== 0) {
      var endTime = this.videoNode.buffered.end(0);
      var currentProgress = ((endTime / this.videoNode.duration) * 100);
      
      // console.log("currentProgress: ", currentProgress);
    }
    
  }
  
  onMetaDataCompleteHandler(event) {
    
    this.dispatchEvent({type:"loadedmetadata", target:this});
  }
  
  onLoadCompleteHandler(event) {
    
    // console.log("video canPlayThrough");
    this.videoNode.removeEventListener("canplaythrough", this.onLoadCompleteHandler);
    // Dispatch event, this must be the last call
    this.dispatchEvent({type:'complete', target:this});
    
  }
  
  onLoadErrorHandler(event) {
    
    // TODO: ios7 fails here.
    console.log("video failed to load!");
    console.log(e);
    
    this.revert();// the revert func is taking care of the state..
    
    // Dispatch event, this must be the last call
    this.dispatchEvent({type:'Error', target:this});
    
  }
  
  revert() {
    
    this.videoNode.removeEventListener("loadedmetadata", this.onMetaDataCompleteHandler);
    this.videoNode.removeEventListener("canplaythrough", this.onLoadCompleteHandler);
    this.videoNode.removeEventListener("progress", this.onLoadProgressHandler);
    this.videoNode.removeEventListener("error", this.onLoadErrorHandler);
    
    // Cancel loading..
    this.videoNode.pause();
    this.videoNode.src = "";
    this.videoNode.load();
    this.videoNode.removeAttribute("src");
    this.videoNode = undefined;
  }
  
  
  destroy() {
    
    
    // Since the task is done when CanPlayThrough is fired, then we need cancel the loading at this point..
    if (this.videoNode !== undefined) {
      
      console.log("VideoLoader::Destroy video");
      
      // Cancel loading..
      this.videoNode.pause();
      this.videoNode.src = "";
      this.videoNode.load();
      this.videoNode.removeAttribute("src");
      this.videoNode = undefined;
    }
    
    this.url = null;
  }
  
  
}

export default VideoLoader;
