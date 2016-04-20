import Ember from 'ember';


export function initialize(application){
	Array.prototype.rotate = function() {
		var result = this.slice(1, this.length);
		result.push(this[0]);
		return result;
	};

	// Return true if all values are the same
	Array.prototype.isUniform = function() {
		var result = this[0];
		for (var i = 1; i < this.length; i++) {
			if (!this[i].compare(result)) {
				return false;
			}
		}
		return true;
	};

	Array.prototype.compare = function(other) {
		// if the array or the other array is a falsy value, return
		if (!this || !other) {
			return false;
		}

		// compare lengths - can save a lot of time
		if (this.length != other.length) {
			return false;
		}

		for (var i = 0, l=this.length; i < l; i++) {
			// Check if we have nested arrays
			if (this[i] instanceof Array && other[i] instanceof Array) {
				// recurse into the nested arrays
				if (!this[i].compare(other[i])) {
					return false;
				}
			}
			else if (this[i] != other[i]) {
				// Warning - two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}
		return true;
	}


};


export default {
	name: 'extend-array',
	initialize: initialize
};