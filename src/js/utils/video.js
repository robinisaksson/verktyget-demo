import DOM from './dom';
import DeviceInfo from './device-info';
import EventDispatcher from './event-dispatcher';
import VideoLoader from './video-loader';
import ResponsiveVideoLoader from './responsive-video-loader';
import ImageLoader from './image-loader';



class Video extends EventDispatcher {


  constructor(node, urls, sizes, options) {

    super();
    /*
    node = outer container div
    urls = [small.mp4, medium.mp4, large.mp4]
    sizes = [320, 720, 1280]
    options = {
      autoplay:true,
      loop:true,
      videoAspect: 16/9,
      mediaAspect: 3/2,
      size: 'cover' || 'contain '
    }
    */
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onCoverLoaded = this.onCoverLoaded.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);


    this.size = DeviceInfo.GetSize();
    this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]
    this.node = node;
    this.width = this.node.offsetWidth;
    console.log('media? ', this.node);
    if (this.urls.length !== this.sizes.length) {
      console.log('! Amount of Urls does not match amount of Sizes');
    }

    // Options are used to tell where detection should START & STOP
    this.options = {
      autoplay: true,
      loop: true,
      videoAspect: 16/9,
      containerAspect: this.node.offsetWidth/this.node.offsetHeight, // this.size.x/this.size.y,
      size: 'cover', // cover, contain
      volume: 0,
    }
		this.options = Object.assign(this.options, options); // Merge


    // Container
    this.containerNode = DOM.Create('div', {'class':'video-container'});
    DOM.Style(this.containerNode, {overflow:'hidden'});
    DOM.Add(this.containerNode, this.node);

    // Video loader
    this.videoLoader = new ResponsiveVideoLoader(this.urls, this.sizes);
    this.videoLoader.addEventListener('complete', this.onVideoLoaded);

    // window.requestAnimationFrame(this.setSize);
    // this.setSize()
  }


  execute(nodeWidth, firstLoad = true) {


    this.videoLoader.execute();

    console.log('here: ', this.videoLoader);
    // Add video
    this.videoNode = this.videoLoader.getHTML();
    DOM.Add(this.containerNode, this.videoNode);

    this.videoNode.volume = this.options.volume;
    if (this.options.loop === true) this.videoNode.loop = true;
    if (this.autoplay === true) this.videoNode.autoplay = true;

    this.videoNode.addEventListener('play', this.onPlay);
    this.videoNode.addEventListener('pause', this.onPause);
    this.videoNode.addEventListener('ended', this.onVideoEnded);
    this.videoNode.addEventListener('timeupdate', this.onUpdateTime);
  }

  setCover(urls, sizes) {

    // this.coverUrl = url;
    //
    // // Cover
    // this.coverNode = DOM.Create('div', {"class":'video-cover'});
    // DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    // DOM.Add(this.containerNode, this.coverNode);
    //
    // this.imageLoader = new ImageLoader(this.coverUrl);
    // this.imageLoader.addEventListener('complete', this.onCoverLoaded);
    // this.imageLoader.execute();
    // // console.log('imageLoader: ', this.imageLoader)
  }

  executeCover() {

  }






  // ---------------------------- Public functions ----------------------------

  getHTML() {
    return this.containerNode;
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

    this.options.videoAspect = videoAspect;
    this.options.containerAspect = (mediaAspect === undefined) ? videoAspect : mediaAspect;
  }



  setSize() {

    this.width = this.node.offsetWidth;
    this.height = this.width/this.options.containerAspect;
    console.log(this.width, this.height, this.options.containerAspect);
    DOM.Style(this.containerNode, {width:this.width+'px', height:this.height+'px'});
    // this.width = width;
    // this.height = this.width/this.options.videoAspect;

    // Container
    //DOM.Style(this.containerNode, {width:this.width+'px', height:this.height+'px'});

    // <video> 'covers' container
    if (this.options.videoAspect !== this.options.containerAspect) {

      // Portrait format
      console.log(this.videoNode);
      if (this.options.videoAspect < this.options.containerAspect) {
        DOM.Style(this.videoNode, {
          width: this.height * this.options.containerAspect+'px',
          height: this.height+'px',
          marginTop: 0,
          marginLeft: -(this.height * this.options.containerAspect - this.width) / 2+'px'
      });

      // Landscape format
      } else {
        DOM.Style(this.videoNode, {
          width: this.width+'px',
          height: this.width/this.options.containerAspect+'px',
          marginTop: -(this.width * this.options.containerAspect - this.height) / 2+'px',
          marginLeft: 0
        });
      }
    }

    // Video size bajs
    this.videoLoader.setSize(this.width);

    // if (cover) {
    //   this.imageLoader.updateSize();
    //   DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    // }
  }



  // ------------------ Private functions ---------------------------
  onVideoLoaded(event) {
    console.log('onVideoLoaded');
    // this.setSize(this.width);
    this.dispatchEvent({type:'complete', target:this});
  }

  onCoverLoaded(event) {
    console.log('onCoverLoaded ');
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
