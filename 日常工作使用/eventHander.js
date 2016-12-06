var eventUtil = {
	addHandle : function(ele, type, handle){
		if(ele.addEventListener){
			ele.addEventListener(type, handle, false);
		} if else(ele.attachEvent){
			ele.attachEvent('on' + type, handle);
		} else{
			ele['on' + type] = handle;
		}
	},
	removeHandle : function(ele, typpe, handle){
		if(ele.removeEventListener){
			ele.removeEventListener(type, handle, false);
		} if else(ele.detachEvent){
			ele.detachEvent('on' + type, handle);
		} else{
			ele['on' + type] = null;
		}
	}
}