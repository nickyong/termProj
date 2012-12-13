// add events information
// assuming login information has already been received.

var eventInfo=function(){
	this.gMapsloc=0;
	this.picString=0;
};

eventInfo.prototype.delServerInfo=function(){
	//process details into url string
	this.delEreq()

}

eventInfo.prototype.getFromServerInfo=function(args,callBackgetinfo){

	//process details into url string
	this.getEreq(args,callBackgetinfo)

}
eventInfo.prototype.checkInputs=function(){
	var title1=$('#titId').val();
	var loc1=$("#searchTextField").val();
	var date1=$('#dateId').val();
	var time1=$('#timeId').val();
	var eventType1=$('#eventTypeId').val();
	var descrip1=$('#descripId').val();

	var message=1;

	if(title1.length===0){
		message='Title';
	}
	else if(descrip1.length===0){
		message='Description';
	}
	else if(date1.length===0){
		message='Date';
	}
	else if(time1.length===0){
		message='Time';
	}
	else if(loc1.length===0){
		message='Location';
	}
	
	else if(eventType1.length===0){
		message='Event Type';
	}
	
	if(message!=1){
		window.toasty('Please do key in a '+message);
	}
	
	return message;
}

eventInfo.prototype.getInfo=function(){


	var title1=$('#titId').val();
	var loc1=$("#searchTextField").val();
	var date1=$('#dateId').val();
	var time1=$('#timeId').val();
	var eventType1=$('#eventTypeId').val();

	var gMapsloc=this.gMapsloc;
	var picInfo1=this.picString;

	//alert(picInfo1.slice(0,5));
	//alert('sss');

	var descrip1=$('#descripId').val();
	
	var hasKeyedin=eventInfo1.checkInputs();
	if(hasKeyedin!=1){
		return;
	}
	
	///console.log(title);
	//console.log(date);
	//console.log(time);
	//console.log(loc);
	//console.log(typeof(time));
	time1= window.eventInfo1.formatTime(time1);

	var year=date1.slice(0,4);
	var month=date1.slice(5,7);
	var day=date1.slice(8,10);


	time1=String(time1);

	var hour=time1.slice(0,2);
	var min=time1.slice(2,4);

	var d = new Date(year,month-1,day,hour,min,00,00);
	console.log(d);
	if(window.masterInfo1.campusName===0||window.masterInfo1.campusName===undefined){
		alert('Please do Choose College Name first');
		//redirect 
	}
	else{
		//alert('Resent');
		//alert(window.masterInfo1.campusName);
	}

	//alert('sss1');
	var campusName1=window.masterInfo1.campusName;
	infoObj={campusName:campusName1,title:title1,loc:loc1,date:date1,time:time1,picInfo:picInfo1,dateobj:d,descrip:descrip1,eventType:eventType1,lat:gMapsloc.lat(),lng:gMapsloc.lng(),hot:'empty',comments:''};

	console.log(infoObj)
	//alert('sss1');


	window.eventInfo1.sendEreq(infoObj);
	//alert('sss');

}
//eventInfo1.prototype.checkInput=
eventInfo.prototype.formatTime=function(time){
	//console.log(time.length);
	var hours=time.slice(0,2);
	var minutes=time.slice(3,5);
	var ampm=time.slice(6,8);


	hours=parseInt(hours);
	minutes=parseInt(minutes);
	console.log(hours);
	console.log(minutes);
	console.log(ampm);

	if(ampm==='PM'){
		if(hours===12){
			hours=0;
		}
		var timearmy=1200+hours*100+minutes;

	}
	else
		var timearmy=hours*100+minutes;

	console.log(timearmy);
	return timearmy;
}

eventInfo.prototype.sendEreq=function(args){
	var cmd='saveEinfo';


	function onSuccessFn(result) {
	
		window.toasty('Saved Event!');
        console.log("getMsg: result = " + result);
		$('#titId').val('');
		$("#searchTextField").val('');
		$('#dateId').val('');
		$('#timeId').val('');
		$('#eventTypeId').val('');
		$('#descripId').val('');
        setTimeout(function(){ $.mobile.changePage( "#dispEventsTab", { transition: "slideup"} );},1500);
        

                }
    function onErrFn(err) {
        console.log("getMsg: err = " + err);
        
                }
    window.toasty('Sending to Server!')

    	
    var req = $.ajax({
    url: '/db/me/saveEinfo',
    type: 'POST',
    data: args});
   	req.done(onSuccessFn);

    
    

    req.fail(function(jqXHR, status, err){
        alert(err);
    });
}

eventInfo.prototype.getEreq=function(args,callBackgetinfo){
	var cmd='getEinfo'
	console.log('getEreq');
	console.log('args below:');
	console.log(args);
	//alert('getting stuff')
    var req = $.ajax({
        url: 'http://192.168.1.147:5757/getInfo',
        type: 'POST',
        data: args,
        dataType:"jsonp"
    });
    req.done(callBackgetinfo);

    req.fail(function(jqXHR, status, err){
        alert(err);
    });

    //this.callCmd(cmd, args, callBackgetinfo, onErrFn);
}

eventInfo.prototype.delEreq=function(args){
	var cmd='delEinfo'
	  var req = $.ajax({
        url: '/db/me/delEinfo',
        type: 'POST',
        data: args});
    req.done(window.toasty('Deleted!'));

    req.fail(function(jqXHR, status, err){
        alert(err);
    });  
}

eventInfo.prototype.checkAuth=function(args,onSuccessFn){
	 var cmd='checkAuth';
	//alert('am i checking auth');
    function onErrFn(err) {
        console.log("getMsg: err = " + err);
        window.toasty('Please Sign in First');
        
                }
	
    var req = $.ajax({
        url: '/checkAuth',
        type: 'POST',
        data: args});
    req.done(onSuccessFn);

    req.fail(function(jqXHR, status, err){
        alert(err);
    });            

    //this.callCmd(cmd, args, onSuccessFn, onErrFn);
}

// i add it into an object of comments
eventInfo.prototype.addComment=function(args,onSuccessFn,onErrFn){
	
    var req = $.ajax({
        url: '/db/me/addComment',
        type: 'POST',
        data: args});
    req.done(onSuccessFn);

    req.fail(function(jqXHR, status, err){
        alert(err);
    });  
}

eventInfo.prototype.delComment=function(args,onSuccessFn,onErrFn){
	 var req = $.ajax({	
        url: '/db/me/delComment',
        type: 'POST',
        data: args});
    req.done(onSuccessFn);

    req.fail(function(jqXHR, status, err){
        alert(err);
    });  
}


// gets the event id and adds 1 to the score. so the event id is the only arg.
eventInfo.prototype.addHot=function(args,callback){
	var cmd='addHot'
	  var req = $.ajax({
        url: '/db/me/addHot',
        type: 'POST',
        data: args});
    req.done(callback);

    req.fail(function(jqXHR, status, err){
        alert(err);
    });  
}


eventInfo.prototype.logOut=function(){
	
	var req = $.ajax({
        url: '/logout',
        type: 'GET'
        });
    alert('LOGING	OUT');
}
