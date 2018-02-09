import DOM from './dom';
import DeviceInfo from './device-info';
import EventDispatcher from './event-dispatcher';
import VideoLoader from './video-loader';
import ResponsiveVideoLoader from './responsive-video-loader';
import ImageLoader from './image-loader';



class Video extends EventDispatcher {
  
  
  
  constructor(scopeNode, width, videoAspect, mediaAspect, isResponsive = false) {
    
    super();
    
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onCoverLoaded = this.onCoverLoaded.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);
    
    
    this.isResponsive = isResponsive;
    this.size = DeviceInfo.GetSize();
    this.videoAspect = videoAspect; // <container> size
    this.mediaAspect = (mediaAspect === undefined) ? this.videoAspect : mediaAspect; // <video> covers <container>
    this.width = width;
    this.height = this.width/this.videoAspect;
    
    // Container
    this.baseNode = DOM.Create('div', {"class":'video-container'});
    DOM.Style(this.baseNode, {width:this.width+'px', height:this.height+'px'});
    DOM.Add(scopeNode, this.baseNode);
    
    this.autoplay = false;
    this.isLooping = false;
  }
  
  
  load(url) {
    
    if (this.isResponsive === true) { 
      this.videoLoader = new ResponsiveVideoLoader(url);
    } else {
      this.videoLoader = new VideoLoader(url);
    }
    this.videoLoader.addEventListener('complete', this.onVideoLoaded);
    this.videoLoader.execute();
    
    // Loader
    this.videoNode = this.videoLoader.getHTML();
    DOM.Add(this.baseNode, this.videoNode);
    
    this.videoNode.volume = 1;
    
    if (this.isLooping === true) {
      this.videoNode.loop = true;
    }
    
    if (this.autoplay === true) {
      this.videoNode.autoplay = true;
    }
    
    this.videoNode.addEventListener('play', this.onPlay);
    this.videoNode.addEventListener('pause', this.onPause);
    this.videoNode.addEventListener('ended', this.onVideoEnded);
    this.videoNode.addEventListener('timeupdate', this.onUpdateTime);
  }
  
  loadCover(url) {
    
    this.coverUrl = url;
    
    // Cover
    this.coverNode = DOM.Create('div', {"class":'video-cover'});
    DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    DOM.Add(this.baseNode, this.coverNode);
    
    this.imageLoader = new ImageLoader(this.coverUrl);
    this.imageLoader.addEventListener('complete', this.onCoverLoaded);
    this.imageLoader.execute();
    // console.log('imageLoader: ', this.imageLoader)
  }
  
  
  
  
  
  
  // ---------------------------- Public functions ----------------------------
  
  getHTML() {
    return this.baseNode;
  }
  
  makeAutoplay() {
    this.autoplay = true;
    if (this.videoNode !== undefined) {
      this.videoNode.autoplay = true;
    }
    // if (DeviceInfo.IsMobileDevice === false) {
    //     this.videoNode.autoplay = true;
    // }
  }
  
  setLoop(isLooping) {
    this.isLooping = isLooping;
    if (this.videoNode !== undefined) {
      this.videoNode.loop = isLooping;
    }
  }
  
  
  
  play() {
    if (this.videoNode !== undefined) {
      this.videoNode.play();
    }
  }
  pause() {
    if (this.videoNode !== undefined) {
      this.videoNode.pause();
    }
  }
  
  togglePlayPause() {
    if (this.isPlaying() === true) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  stop() {
    // same as pause but seeks to '0'
    this.videoNode.pause();
    this.seekTo(0);
  }
  
  seekTo(value) {
    this.videoNode.currentTime = value;
  }
  
  isPlaying() {
    // console.log("isPaused: " + this.videoNode.paused);
    return this.videoNode.paused ? false : true;
  }
  
  getDuration() {
    return this.videoNode.duration;
  }
  
  getCurrentTime() {
    return this.videoNode.currentTime;
  }
  
  setVolume(volume) {
    this.volume = volume;
    if (this.videoNode !== undefined) {
      this.videoNode.volume = volume;
    }
  }
  getVolume() {
    //return this.videoNode.volume;
    return this.volume;
  }
  toggleVolume() {
    
    if (this.getVolume() > 0) {
      // mute
      this.setVolume(0);
    } else {
      // unmute
      this.setVolume(this.volume); // same as before muting?
    }
  }
  
  
  setAspectRatio(videoAspect, mediaAspect) {
    // this.videoAspect = videoAspect;
    // this.mediaAspect = mediaAspect;
    
    this.videoAspect = videoAspect; // <container> size
    this.mediaAspect = (mediaAspect === undefined) ? videoAspect : mediaAspect; // <video> covers <container>
    
  }
  
  
  
  setSize(width) {
    
    this.width = width;
    this.height = this.width/this.videoAspect;
    
    
    // Container
    DOM.Style(this.baseNode, {width:this.width+'px', height:this.height+'px'});
    
    // <video> 'covers' container
    // if (this.videoAspect !== this.mediaAspect) {
    //     
    //     // Portrait format
    // 	if (this.videoAspect < this.mediaAspect) {
    //         DOM.Style(this.videoNode, {
    //             width: this.height * this.mediaAspect+'px',
    //             height: this.height+'px',
    //             marginTop: 0,
    //             marginLeft: -(this.height * this.mediaAspect - this.width) / 2+'px'
    //         });
    //         
    // 	// Landscape format     
    // 	} else {
    //         DOM.Style(this.videoNode, {
    //             width: this.width+'px',
    //             height: this.width/this.mediaAspect+'px',
    //             marginTop: -(this.width * this.mediaAspect - this.height) / 2+'px',
    //             marginLeft: 0
    //         });
    // 	}
    // }
    
    // Video size
    if (this.isResponsive === true) { 
      this.videoLoader.updateSize();
    }
    
    
    
    // // Cover
    // if (cover) {
    //     DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    // }
  }
  
  
  
  // ------------------ Private functions ---------------------------
  onVideoLoaded(event) {
    
    this.setSize(this.width);
    this.dispatchEvent({type:'complete', target:this});
  }
  
  onCoverLoaded(event) {
    // console.log('onCoverLoaded ', event);
    DOM.Style(this.coverNode, {backgroundImage: 'url('+this.coverUrl+')'});
    this.dispatchEvent({type:'cover-complete', target:this});
  }
  
  
  onVideoEnded() {
    
    if (this.isLooping === true) {
      //this.seekTo(0);
      //this.play();
      return;
    }
    
    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'visible'});
    }
    this.dispatchEvent({type:'ended', target:this});
  }
  
  onUpdateTime() {
    this.dispatchEvent({type:'timeupdate', target:this});
  }
  
  
  onPlay() {
    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'hidden'});
    }
    
    this.dispatchEvent({type:'play', target:this});
  }
  
  onPause() {
    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'visible'});
    }
    this.dispatchEvent({type:'pause', target:this});
  }
  
  
  revert() {
    this.videoNode.removeEventListener('play', this.onPlay);
    this.videoNode.removeEventListener('pause', this.onPause);
    
    this.videoNode.removeEventListener('ended', this.onVideoEnded);
    this.videoNode.removeEventListener('timeupdate', this.onUpdateTime);
  }
  
  
  destroy() {
    
    console.log("VideoPlayback::destroy");
    
    this.revert();
    super.destroy(); 
    
  }
  
}
export default Video;
