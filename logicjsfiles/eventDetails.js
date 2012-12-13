// here i will register a click event and take that id and go back to the server and get details and then display facebook comments also

// pics + details + comments
// here i will register a click event and take that id and go back to the server and get details and then display facebook comments also

// pics + details + comments
/*
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1&appId=119563781536927";
  fjs.parentNode.insertBefore(js, fjs);


}(document, 'script', 'facebook-jssdk'));*/

//takes in an object and uploads it here . 
window.eventDetails=function(){
	// maybe i should store the event _id in this page in this object whenever i get spec event details? because the first time 
	// is always from the main menu or the map? by the time they comment the _id is already stored here? 

};
/*
eventDetails.prototype.getFromServerEventofId=function(eventId){
		var callBackCal=function(results){
			console.log('callingbackd');
			//dispEventinfo1.makeList('#dispEventBoardbelowCalId',results);
			eventDetails1.updateDetailsBoard
		}
		var args={date:dateAsString};
		console.log('clickin');
		//get args from here and stuff in 
		window.eventInfo1.getFromServerInfo(args,callBackCal);
}
*/

eventDetails.prototype.getSpecificEventDetails=function(eventId){
	//where v is the object. so here i query the database to get the update info.

	if(eventId!=undefined){
		window.masterInfo1.eventId=eventId;
	}

	var eventId1=window.masterInfo1.eventId;
	//alert(eventId1);
	var callingbackgetbyId=function(results){
		alert('got back in getSpecificEventDetails');
		console.log('callingbackgetbyId');
		console.log(results[0]);

		eventDetails1.updateDetailsBoard(results[0]);
		$.mobile.changePage( "#dispDetailsTab", { transition: "slidefade"} );
	}
	/*
	if(this.eventId===undefined){
		var eventId=v['_id'];
	}
	else{
		var eventId=this.eventId;
	}
	*/
	var args={'_id':eventId1};
	args['campusName']=window.masterInfo1.campusName;
	args['queryType']='specificEvent';
	window.eventInfo1.getFromServerInfo(args,callingbackgetbyId);

}




eventDetails.prototype.updateDetailsBoard=function(v){
	

	$('#picBoardId').css('display','none');
	var day=v['dateobj'].slice(0,3);
	console.log(day);
	console.log(day.length);
	day=window.dispEventinfo1.toDay(day);
	var headerDMonthYear=v['dateobj'].slice(3,15);


	this.title=v['title'];
	this.date=v['date'];
	this.time=window.dispEventinfo1.formatTime(v['time']);


	this.loc=v['loc'];
	this.eventId=v['_id'];
	this.fbId=v['creatorFBid'];
	this.fbName=v['creatorName'];
	this.comments=v['comments'];
	this.descrip=v['descrip']

	var imageData=v['picInfo'];
	//console.log(imageData);
	

    //console.log(smallImage.src);
    
    if(imageData!=0){
    	var picWrapper=$('<div id="picWrapper" ></div>')
    	var newPic=$('<img class="picky">')
		newPic.attr('src',"data:image/jpeg;base64," +imageData);
		
		picWrapper.append(newPic);
		$('#picBoardId').css('display','block');
    }
    

    //var ctx = newCanvas.getContext('2d');
	

	console.log('with this is am good!@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');	
	console.log(this.comments);
	console.log(typeof(this.comments));
	$('#eventDetailsBoardId').empty();
	$('#comment_box').empty();
	$('#picBoardId').empty();
	


	$('#picBoardId').append(picWrapper);
	
	$('#eventDetailsBoardId').append('<div class="Etitle" id="Etitle">'+this.title+'</div>');
	$('#eventDetailsBoardId').append('<div  id="hotButt" class="hotButtGrey"></div>');

	var dateDiv=$('<div class="Epower">');
	dateDiv.append('<div class="Epower1">Date:</div>');

	dateDiv.append('<div class="Epower2">'+day+headerDMonthYear+'</div>')


	var locDiv=$('<div class="Epower">');
	locDiv.append('<div class="Epower1">Location:</div>');
	locDiv.append('<div class="Epower2">'+this.loc+'</div>');

	var descripDiv=$('<div class="Epower">');
	descripDiv.append('<div class="Epower1">Descrip:</div>');
	descripDiv.append('<div class="Epower2">'+this.descrip+'</div>');

	var timeDiv=$('<div class="Epower">');
	timeDiv.append('<div class="Epower1">Time:</div>');
	timeDiv.append('<div class="Epower2">'+this.time+'</div>');


	$('#eventDetailsBoardId').append(dateDiv);
	$('#eventDetailsBoardId').append(timeDiv);
	$('#eventDetailsBoardId').append(locDiv);
	$('#eventDetailsBoardId').append(descripDiv);
	//$('#eventDetailsBoardId').append(picWrapper);

	//$('#eventDetailsBoardId').append(newCanvas);


	//$('#eventDetailsBoardId').append('<div class="eventId" id="eventId">Event Id:'+this.eventId+'</div>');
	//$('#eventDetailsBoardId').append('<div class="fbId" id="fbId">Facebook id:'+this.fbId+'</div>');
	//$('#eventDetailsBoardId').append('<div class="commentfbName" id="fbName">Creator Name:'+this.fbName+'</div>');
	//$('#eventDetailsBoardId').append('<div id="Eid">'+title+'</div>');
	if(typeof(this.comments)==='object'){
				$.each(this.comments,function(key,value){
					// so i have the key of the comment and the _id of the event. i look for the _id and delete the spec comment inside. How?
					//also i only display the iconolink if the facebook id matches the masterInfo1.facebookid
					console.log('inloop');
					
					newdiv=$('<div id="innerCBox"></div>');	

					var commenterName=this.commenterName;
					var commenterFBid=this.commenterFBid;	
				
					var date=this.date;
					var comment=this.newCommentMsg;
					if(comment==='deleted'){
						console.log('skipping');
					}
					else{
						var userpic="https://graph.facebook.com/"
			                +commenterFBid+
			                "/picture/";
				        var useridurl="https://facebook.com/"
				                +commenterFBid;
				         
						var fbc=$('<div class="tweet"></div>');
						var fbtweetleft=$('<div class="tweet-left"></div>');

						var fbuseridurl=$('<a target="_blank" href="'+useridurl+'"><img width="55" height="55" alt="'+useridurl+' on FB" src="'+userpic+'" /></a>');
						var fbCommentnameandC=$('<div class="tweet-right"><a href="'+useridurl+'" class="commenterName">'+commenterName+'</a><div class="commenterCommentEvent">'+comment+'</div></div><br style="clear: both;" />');
						//fbc.attr('id',key);

						fbtweetleft.append(fbuseridurl);
						fbc.append(fbtweetleft);

						//console.log('please detlete me ');
						//console.log(window.masterInfo1);
						//console.log(commenterFBid);
							if(commenterFBid===window.masterInfo1.currentUserFbId){
								var iconLink=$('<a href ="#" class="deleteCommentId"></a>')
								iconLink.click(function(){
									console.log(key);
									console.log('deleting');
									console.log(v['_id']);
									console.log(v['creatorFBid']);
									console.log('meeehhh');
									window.delEvent1.delComment(v['_id'],key);
									});

								fbc.append(iconLink);

							}
						fbc.append(fbCommentnameandC);
						}		

						
					

				
					
					/*
					var fbUpdate='<div class="tweet"><div class="tweet-left"><a target="_blank" href="'+useridurl+'"><img width="48" height="48" alt="'+useridurl+' on FB" src="'+userpic+'" /></a></div>'
			        fbUpdate+='<div class="tweet-right"><div class="commenterName">'+commenterName+'</div><div class="commenterComment">'+comment+'</div></div><br style="clear: both;" /></div>';
			        //$("#outputFb").append(fbUpdate);
			        */
					$('#comment_box').append(fbc);

					console.log(v['creatorFBid']);
					console.log(window.masterInfo1.currentUserFbId);
					console.log('wahooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

				})
			};
				
			
	// End of Comments
	// For delete button;
	$('#testing').empty();
	if(v['creatorFBid']===window.masterInfo1.currentUserFbId){
				
						var newDel=$('<div>Delete</div>');
						//alert(v['creatorFBid']);
						newDel.attr('href','#');
						newDel.attr('val','Delete');
						newDel.attr('text','Delete');
						newDel.attr('id','deleteButtId');
						newDel.click(function(){
							var campusName1=window.masterInfo1.campusName;
							window.eventInfo1.delEreq({'campusName':campusName1,'eventId':v['_id']});
							$.mobile.changePage( "#dispEventsTab", { transition: "slideup"} );
							//alert(v['_id']);
						});


						$('#testing').append(newDel);
		}
	// here i will add a on click to the hot button . 
	//console.log('how many times adding');
	$("#hotButt").unbind('click');

	$('#hotButt').click(function(){
		console.log('hotbutt clickewd');
		var callBackG=function(results){
			console.log('callingbackG');
			if(results.msg!=2&&window.masterInfo1.currentUserFbId!=0){
				// user is logged in can send details of event id and fb id over.
				if (window.masterInfo1.isCommented(v['_id'])===0){
					//alert('Commented already');
					//alert('Hotted Already');
					window.toasty('Liked Already!');
                
				}
				else{
					//alert('Sending Hot');
					console.log('user is auth and has not liked before. now i do stuff')
					window.eventDetails1.adminAddHot(v);
				} 
			}

				
			else if(results.msg===2){
				$('#infoFormWrapper').hide();
				window.toasty('Please do Log In');
                setTimeout(function(){$.mobile.changePage( "#loginPage", { transition: "slideup"} );},1500);
			
				}
		}	


		var args=0;
		console.log('on live - checking auth!');
		//get args from here and stuff in 
		window.eventInfo1.checkAuth(args,callBackG);
	});	
	
	// here i change icon color to red or grey
	if (window.masterInfo1.isCommented(v['_id'])===0){
		$('#hotButt').attr('class','hotButtRed');
		//alert('Hotted Already1');
		}
	else{
		$('#hotButt').attr('class','hotButtGrey');
	}


}


eventDetails.prototype.adminAddHot=function(v){
	var eventID=v['_id'];
				//var likerId=window.masterInfo1.currentUserFbId;

	function callback(result){
		console.log(typeof(window.masterInfo1.isCommentedList));
		window.masterInfo1.isCommentedList.push(result.msg);

		window.masterInfo1.saveUserInfotoLocalStorage();
						//alert('change icon');
		$('#hotButt').attr('class','hotButtRed');

		console.log(window.masterInfo1.isCommentedList);
		console.log('very nice');
		}
	var args={};
	args['eventId']=v['_id'];
	args['campusName']=v['campusName'];
	window.eventInfo1.addHot(args,callback);	

}
//$('eventDetailsBoardId')
eventDetails.prototype.postcomment=function(){
	var callingbackPCuponCheckAuth=function(results){
		// here i call post comment only if msg = 1 where user is verified

		if(results['msg']===2){
			//console.log('Posting Comment After Checking auth')
			window.toasty('Please do Log In');
            setTimeout(function(){$.mobile.changePage( "#loginPage", { transition: "slideup"} );},1500);
			
		}
		else {
			window.eventDetails1.postcommentafterAuth();
		}
	}
	args=0;

	window.eventInfo1.checkAuth(args,callingbackPCuponCheckAuth);
}

eventDetails.prototype.postcommentafterAuth=function(){
	// should i tag it to the event or the person - the event defo
	var comment1=$('#CommentTextId').val();

	var date= new Date();
	console.log(date);
	if (comment1===''){
		 window.toasty('Please do say something:)');
        
	}
	else{
		//post comment to event details obj and to fb afterthat.
		var commentObj={comments:comment1,date:new Date(),eventId:this.eventId};
		commentObj['campusName']=window.masterInfo1.campusName;
		var callBackComment=function(){
			console.log('Posted to the DB!$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			window.eventDetails1.getSpecificEventDetails();

		}
		var onErrCB=function(){
			console.log('failed');
		}
		window.eventInfo1.addComment(commentObj,callBackComment,onErrCB);
		//window.eventDetails1.postcommentFB(comment1);
	}
}	



eventDetails.prototype.likeFB=function(){
	console.log('likeFB');
        FB.api("/me",
                function (response) {
                    alert('Name is ' + response.name);
                });
        
    }


eventDetails.prototype.postcommentFB=function(body){
	
	FB.api('/me/feed', 'post', { message: body }, function(response) {
	  if (!response || response.error) {
	    window.toasty('Could not Post to FB');
	  } else {
	    window.toasty('Posted to FB')
	  }
	});
}



/*
	jQuery OneFBLike v1.1 - http://onerutter.com/open-source/jquery-facebook-like-plugin.html
	Copyright (c) 2010 Jake Rutter
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/
