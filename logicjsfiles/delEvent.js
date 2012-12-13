//delete eventdetails.js

var delEvent=function(){}


delEvent.prototype.delComment=function(delEventId,commentKey){
	//now i have to go into the fucking db and find that event - update and return it 
	var callback=function(reply){
		console.log('reply');
		console.log('great succe');
		window.toasty('Comment Deleted');
		window.eventDetails1.getSpecificEventDetails();
	}
	var args={};
	args['commentKey']=commentKey;
	args['eventId']=delEventId;
	args['campusName']=window.masterInfo1.campusName;
	window.eventInfo1.delComment(args,callback)
	console.log('delComment!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	console.log(commentKey);
}

