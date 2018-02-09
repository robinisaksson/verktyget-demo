
const DOM = {


  // querySelector
  Qs (selector, scopeNode) {
    return scopeNode.querySelector(selector);
  },

  // querySelectorAll
  QsAll (selector, scopeNode) {
    scopeNode = scopeNode ? scopeNode : document;
    return scopeNode.querySelectorAll(selector);
  },


  // Recursive find parent
  // Go up the tree to find matching tag
  FindParentTag(el, tag) {
    // console.log('FindParentTag');
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName === tag)
        return el;
    }
    return null;
  },


  // createElement
  Create (nodeType, attributes) {

    var node = document.createElement(nodeType);

    // add attributes
    if(attributes) {
      var k;
      for(k in attributes) {
        if(k == "html") {
          node.innerHTML = attributes[k];
        } else {
          node.setAttribute(k, attributes[k]);
        }
      }
    }

    return node;
  },


  /*
  * AppendChild
  * node, parent
  */
  Add (node, parent) {
    parent.appendChild(node);
  },

  // insertBefore
  AddAt (node, parent, index) {
    parent.insertBefore(node, parent.childNodes[index]);
  },


  AddAfter (node, refNode) {
    refNode.parentNode.insertBefore(node, refNode.nextSibling);
  },


  // Wrap node, returns wrapper
  WrapNode(node, node_type) {

    var wrapperNode = document.createElement(node_type);

    while(node.childNodes.length) {
      wrapperNode.appendChild(node.childNodes[0]);
    }

    node.appendChild(wrapperNode);
    return wrapperNode;
  },


  // Remove or Kill - choose name!!
  Remove (parent, child) {
    this.Kill(parent, child);
  },

  Kill (parent, child) {
    parent.removeChild(child);
  },

  // node.style
  Style (node, styles, dom_update) {

    var s;
    for(s in styles) {
      node.style[s] = styles[s];
    }

    dom_update === false ? false : node.offsetTop;
    // node.offsetTop; // force dom update :)
  },

  AbsoluteY(node) {

    if(node.offsetParent) {
      return node.offsetTop + this.AbsoluteY(node.offsetParent);
    }
    return node.offsetTop;
  },

  AddClass(node, classname) {
    if(!(new RegExp("(^|\\s)" + classname + "(\\s|$)")).test(node.className)) {
      node.className += node.className ? " " + classname : classname;
    }
  },

  // Remove all instances of the parsed classname from element
  RemoveClass(node, classname) {
    node.className = node.className.replace(new RegExp("(\\b)" + classname + "(\\s|$)", "g"), " ").trim().replace(/[\s]{2}/g, " ");
  },

  // Remove all instances of the parsed classname from element
  ReplaceClasses(node, className) {
    node.className = className;
  },

  HasClass(node, classname) {

    var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
    if(regexp.test(node.className)) {
      return true;
    }
    return false;
  },

  // Toggle classname on element
  // if class is applied, then remove
  // if not applied, then apply
  // if _classname is given as parameter, switch between to two classnames
  ToggleClass(node, classname, _classname = undefined) {

    var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
    if(regexp.test(node.className)) {
      HTML.RemoveClass(node, classname);
      if(_classname !== undefined) {
        HTML.AddClass(node, _classname);
      }
    }
    else {
      HTML.AddClass(node, classname);
      if(_classname) {
        HTML.RemoveClass(node, _classname);
      }
    }
  },

	// Nodelist to array
	NodelistToArray(nodelist) {
		return Array.prototype.slice.call(nodelist);
	}






  // GetVendorPrefix(name) {
  //
  //   var prefixes = [ "Khtml", "O", "ms", "Moz", "Webkit"]; // we loop backwards in this one.. therefore the most important in the back..
  //   testStyle = document.getElementsByTagName('html')[0].style;
  //
  //   // make sure that the first letter isent capitalized
  //   name = name.charAt(0).toLowerCase() + name.slice(1);
  //   // shortcut for names that are not vendor prefixed
  //   if ( name in testStyle ) {
  //     return name;
  //   }
  //
  //   // check for vendor prefixed names
  //   var capName = name.charAt(0).toUpperCase() + name.slice(1),
  //   fixedName,
  //   i = prefixes.length;
  //
  //   while ( i-- ) {
  //     fixedName = prefixes[ i ] + capName;
  //     if ( fixedName in testStyle ) {
  //       return fixedName;
  //     }
  //   }
  //
	// },
  //
  //
  // /*
  // *   USAGE:
  // *   CSS.SetTransition(node, 'all 1s ease-in', functionName, boolean);
  // */
  // SetTransition(node, transition, callback, autoDestroy) {
  //
  //   DOM.OPACITY = StyleUtility.GetVendorPrefix("opacity");// TODO: investigate wether this is needed..
	// 	DOM.TRANSFORM = StyleUtility.GetVendorPrefix("transform");
	// 	DOM.TRANSFORMORIGIN = StyleUtility.GetVendorPrefix("transformOrigin");
  //   DOM.TRANSITION = StyleUtility.GetVendorPrefix("transition");
	// 	DOM.ANIMATION = StyleUtility.GetVendorPrefix("animation");
	// 	DOM.ANIMATIONNAME = StyleUtility.GetVendorPrefix("animationName");
  //
  //   // node.style[StyleName.TRANSITION] = transition;
  // 	//
  //   // var transitions = {
  // 	// 	"transition": "transitionend",
  // 	// 	"MozTransition": "transitionend",
  // 	// 	"msTransition": "transitionend",
  // 	// 	"webkitTransition": "webkitTransitionEnd",
  // 	// 	"OTransition": "otransitionend"
  // 	// };
  //
  //   DOM.GetVendorPrefix("TransformOrigin")
  //
  //   node.style[DOM.GetVendorPrefix("transition")] = transition;
  //
  // 	if (typeof callback === "function" || autoDestroy !== false) {
  //
  // 		// Destroy + callback
  // 		var _destroyAndCallback = function(event) {
  //
  // 			if (event.target !== node) {
  // 				return null;
  // 			}
  // 			node.removeEventListener("transitionend", _destroyAndCallback);
  //
  //
  // 			// Clear transition from node
  // 			if (autoDestroy !== undefined && autoDestroy !== false) {
  // 				CSS.SetTransition(node, "", null, false);
  // 			}
  //
  // 			// Callback
  // 			if (typeof callback === "function") {
  // 				callback();
  // 			}
  //
  // 			event.stopPropagation();
  //
  // 		}
  //
  // 		node.addEventListener("transitionend", _destroyAndCallback);
  //
  // 		return _destroyAndCallback;
  // 	}
  //
  // 	return null;
  // },
  //
  //
  // RemoveTransition(node) {
  // 	node.style[StyleName.TRANSITION] = "none";
  // },
  // RemoveTransitionCallback(node, callback) {
  // 	node.removeEventListener("transitionend", callback);
  // },
  //
  // SetOrigin(node, x, y) {
  // 	node.style[DOM.TRANSFORMORIGIN] = x +"px "+ y +"px";
  // },
  // SetTranslate(node, x, y) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y);
  // },
  // SetTranslateRotate(node, x, y, deg) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " rotate("+deg+"deg)";
  // },
  // SetTranslateScale(node, x, y, scale) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " scale("+scale+")";;
  // },
  // SetTranslateScaleRotate(node, x, y, scale, deg) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " scale("+scale+") rotate("+deg+"deg)";
  // },
  //
  // SetRotate(node, deg) {
  // 	node.style[DOM.TRANSFORM] = "rotate("+deg+"deg)";
  // },
  // SetRotateScale(node, deg, scale) {
  // 	node.style[DOM.TRANSFORM] = "rotate("+deg+"deg) scale("+scale+")";
  // },
  //
  // SetScale(node, scale) {
  // 	node.style[DOM.TRANSFORM] = "scale("+scale+")";
  // },
  // SetScaleXY(node, scaleX, scaleY) {
  // 	node.style[DOM.TRANSFORM] = "scaleX("+scaleX+") scaleY("+scaleY+")";
  // },
  //
  // SetTransformMatrix(node, matrix) {
  // 	node.style[DOM.TRANSFORM] = matrix.toString();
  // },
  //
  // SetOpacity(node, opacity) {
  // 	node.style[StyleName.OPACITY] = opacity;
  // },
  //
  // ForceUpdate(node) {
  // 	node.offsetHeight;
  // }
}

export default DOM;
