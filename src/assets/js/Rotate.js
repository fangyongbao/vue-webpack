var $ = window.jQuery = require('jquery');
var prefix,
	eventPrefix,
	vendors = {
		Webkit: 'webkit',
		Moz: '',
		O: 'o',
		M: 'm'
	},
	testEl = document.createElement('p')

/***
 * 获得浏览器前缀*
 * **/
$.each(vendors, function(vendor, event) {
	if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
		prefix = '-' + vendor.toLowerCase() + '-'
		eventPrefix = event
		return false
	}
})

function normalizeEvent(name) {
	return eventPrefix ? eventPrefix + name : name.toLowerCase()
}

var cssSupport = {
	speeds: {
		_default: 4,
		fast: 2,
		slow: 6
	},
	cssPrefix: prefix,
	transition: normalizeEvent('Transition'),
	transform: normalizeEvent('Transform'),
	transitionEnd: normalizeEvent('TransitionEnd'),
	animationEnd: normalizeEvent('AnimationEnd')
}

var transition = cssSupport.transition;
var transform = cssSupport.transform;
var transitionEnd = cssSupport.transitionEnd;

$.fn.rotate = function(options) {
    var config = {
		beginAngle: 0,
		time: 4,
		deg: 0,
		easing: 'ease-in-out',
		rotatingBegin: function() {},
		rotatingEnd: function() {}
	}
	var self = this;
	this.config = $.extend(config, options);
	this.$mainObj = $(this);
	this.mainObj = $(this).get(0);
	
	this.init = function() {
		this.config.rotatingBegin && this.config.rotatingBegin();
		this.mainObj.style[transition] = "all " + this.config.time + "s " + this.config.easing;
	}
	
	this.bindEndEvent = function() {
		if (this.config.time > 0) {
			this.bind(transitionEnd, endFun)
		}
	}
	this.rotateTo = function(deg) {
		self.config.deg = deg;
		self.init();
		self.bindEndEvent();
		self.mainObj.style[transform] = "rotate(" + deg + "deg)";	
	}
    function endFun() {
		self.config.rotatingEnd && self.config.rotatingEnd();
		self.$mainObj.unbind(transitionEnd, endFun)
		self.mainObj.style[transition] = "";
		self.mainObj.style[transform] = 'rotate('+self.config.deg % 360+'deg)';
	}
	return this;
};