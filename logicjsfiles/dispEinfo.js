//dispEventinfo.js


// displays in like on a stockchart list

var dispEventinfo=function(){
	
};

dispEventinfo.prototype.formatTime=function(time){
	//console.log(typeof(time));
	var length=time.length;
	var minutes=time.slice(length-2,length);
	//console.log(minutes);
	var hour=time.slice(0,length-2);
	//console.log(hour);
	console.log('here');
	if(hour<12){
		var ampm='AM';
	}
	else 
		var ampm='PM';
	var timeString=hour.toString()+':'+minutes.toString();

	return timeString;
};


dispEventinfo.prototype.sortList=function(data){
	// value is the object.
	function compare(a, b){
	var dateobja = a['dateobj'];
	var dateobja=new Date(dateobja);
	var timesincea= dateobja.getTime();

	var dateobjb = b['dateobj'];
	var dateobjb=new Date(dateobjb);
	var timesinceb= dateobjb.getTime();

	
	if (timesincea > timesinceb)
	{
		return 1
	}
	else if (timesincea < timesinceb)
	{
		return -1
	}
	else
	{
		return 0
	}
}
	var newDatelist=[];

	$.each(data,function(i,v){
		newDatelist.push(v);
	});

	newDatelist.sort(compare);


	return newDatelist;

	console.log('sssssssssssssssssssssss');
}

dispEventinfo.prototype.countCom=function(commObj){
	var counter=0;
	$.each(commObj,function(key,value){
		if (value!='deleted'){
			counter+=1
		}
	
	});
	return counter;
}

dispEventinfo.prototype.makeList=function(targId,data){
	var newList=window.dispEventinfo1.sortList(data);
	console.log(newList);
	try{
		console.log('makinglist'+data);
		}
	catch(err){
		console.log('could not get queries');
		
		}


		//$('#dispEventBoardId')
	//$('#stockBox ul').remove();
	console.log('sadasddd');

	//var eventUl=$('<ul data-role="listview" data-theme="d" data-divider-theme="d" id="stockList">');
	var eventUl=$('<ul class=dispEventUl>');

		// go through data and find stock with same symbol;
	$(targId+' ul').remove();
	var oldDate=0;
	for(var i=0;i<newList.length;i++){

		v=newList[i];
		//console.log(v);
		var title=v['title'];
		var date=v['date'];
		var time=v['time'];
		var loc=v['loc'];
		var id=v['_id'];
		var descrip=v['descrip'];
		var newDate=date;
		var hots=v['hot'];

		if(v['comments']!=undefined){
			var commentNo=window.dispEventinfo1.countCom(v['comments']);
		}
		else{
			var commentNo='';
		}

		if (hots===0||hots===undefined){
			hots='';
		}
		if (commentNo===0||commentNo===undefined){
			commentNo='';
		}

		time=dispEventinfo1.formatTime(time);

		var eventLi=$('<li class= "eventRow" ></li>');
		var leftdiv=$('<div class="leftdiv"></div>')
		var tit=$('<div class="titleC">'+title+'</div>');
		var descPart=$('<div class="descC">'+descrip+'</div>');
		//eventLi.append('<div class="titleC">'+title+'</div>');
		//tit.append('<div class="locC">'+loc+'</div>');
		//eventLi.append('<div class="locC">'+loc+'</div>');
		
		tit.append(descPart);
		leftdiv.append(tit);
		
		var eventLink=$('<a href="#" id="'+v['_id']+'" data-transition="slidefade"</a>');
		eventLink.css('z-index',' 999 !important;');
		eventLi.css('z-index',' 1000 !important;');
		eventLi.on('tap',function(){
			//window.eventDetails1.updateDetailsBoard(v);
			//var eventId=v['_id'];			
			alert(eventLi.css('z-index'));
			var eventId1=$(this).children().attr('id');
			alert('hey taped');
			//$.mobile.loading( 'show', { theme: "b", text: "Page Loading...",textVisible: true });
			window.eventDetails1.getSpecificEventDetails(eventId1);
			console.log('put the function to upload event screen here')
			console.log(eventId1);
			
			//
		});	
		//console.log(v['_id']);
		//eventLink.id=v['_id'];
		//console.log(eventLink.id);
	
		eventLink.append(leftdiv);



		var eventTimeDate=$('<div  class="rightinfo"></div>');
		
	
		eventTimeDate.append('<div class="eventTime">'+time+'</div>');
		
		var Chillidiv=$('<div class="chilliNo" style="text-decoration:none !important;">'+hots+'</div>');
		Chillidiv.append($('<div class="chilliPic"></div>'));

		var CommDiv=$('<div class="commentNo" style="text-decoration:none !important;">'+commentNo+'</div>');
		CommDiv.append($('<div class="commentPic"></div>'));

		eventLink.append(eventTimeDate);
		eventLink.append(Chillidiv);
		eventLink.append(CommDiv);


		var day=v['dateobj'].slice(0,3);
		console.log(day);
		console.log(day.length);
		day=window.dispEventinfo1.toDay(day);
		var headerDMonthYear=v['dateobj'].slice(3,10);
		//console.log((v['dateobj'].toDateString()).slice(0,10));
		eventLi.append(eventLink);
		if (newDate!=oldDate){

		// for date
			var dateobj=v['dateobj'];
			dateobj.getdA
			var dateHeader=$('<li class="dateHeader">'+day+headerDMonthYear+'</li>')
			eventUl.append(dateHeader);
		}
		eventUl.append(eventLi);

		oldDate=newDate;
	}
	

	$(targId).append(eventUl);

	$(targId).trigger('create');

	$(targId).css('height',$('.dispEventUl').height());
	
	$(Chillidiv).trigger('refresh');
};


dispEventinfo.prototype.getandDisplayAllEvents=function(){

		var callBackD=function(results){
			// when else do i display the info? on page load of course.
			console.log('callingbackddddddddddddddddddddddddddddddd');
			
			window.dispEventinfo1.makeList('#dispEventBoardId',results);
			window.masterInfo1.dispAllCurrentEventObj=results;
			window.masterInfo1.saveUserInfotoInstance();
			window.masterInfo1.saveUserEventstoLocalStorage();
			console.log('storing dispEventinfo.currentEventsObj')
			
		}
		var args={};	
		args['queryType']='all';
		args['campusName']=window.masterInfo1.campusName;
		console.log('getandDisplayAllEvents');
		//get args from here and stuff in 
		window.eventInfo1.getFromServerInfo(args,callBackD);

		
}


dispEventinfo.prototype.toDay=function(day){
	//console.log(day);
	//console.log(day==='Thu');
	if(day==='Mon'){
		day='Monday,'
	}
	else if (day==='Tue'){
		day='Tuesday,'
	}
	else if (day==='Wed'){
		day='Wednesday,'
	}
	else if (day==='Thu'){
		day='Thursday,'
	}
	else if (day==='Fri'){
		day='Friday,'
	}
	else if (day==='Sat'){
		day='Saturday,'
	}
	else if (day==='Sun'){
		day='Sunday,'
	}
	return day
}
/////////////////////////////////////////////////////////////////hi i am using this to calenders tab/////////

