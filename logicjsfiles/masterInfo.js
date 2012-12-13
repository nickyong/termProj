
// so i check with the local storage whether these exist and i update them on any click of pulling or whatever
// this is the first shit that is created on window onload.


var masterInfo=function(){
	

}


masterInfo.prototype.initClean=function(){
	this.dispAllCurrentEventObj=0;
	this.currentUserFbId=0;
	this.currentUserFbName=0;
	this.campusName=0;
	this.isCommentedList=[];

}

masterInfo.prototype.isCommented=function(commentEventId){
	var indicator=1;
	for(var i=0;i<masterInfo1.isCommentedList.length;i++){
		if (masterInfo1.isCommentedList[i]===commentEventId){
			

			indicator=0;
		}
	
	}
	
	return indicator;
}
masterInfo.prototype.saveUserInfotoInstance=function(){
		var callBack=function(results){
			console.log(results);
// if deos not exist in local storage yet i save it into it. 
			if(results['msg']===2){
				console.log('cannot save since the user is not logged int ');
			}
			else{
				window.masterInfo1.currentUserFbId=results.user.id;
				window.masterInfo1.currentUserFbName=results.user.displayName;
				console.log(this);
				masterInfo1.saveUserInfotoLocalStorage();
			
				console.log('saveUserInfoLocal11111');
			}
			
			}
		var args=0;
		console.log('on live - checking auth!');
		//get args from here and stuff in 
	window.eventInfo1.checkAuth(args,callBack);



}
masterInfo.prototype.saveUserEventstoLocalStorage=function(){
	if(typeof(Storage)!="undefined"){
		window.localStorage.eventsList=window.masterInfo1.dispAllCurrentEventObj;
		window.localStorage.isCommentedList=window.masterInfo1.isCommentedList;


		console.log('stored all events in localo yes i am storing campusName too! ');
	}	
}


masterInfo.prototype.saveUserCampustoLocalStorage=function(){

	window.localStorage.campusName=window.masterInfo1.campusName;
	//alert(window.masterInfo1.campusName);
}
masterInfo.prototype.saveUserInfotoLocalStorage=function(){
	if(typeof(Storage)!="undefined"){
	  		if (window.localStorage.userId===window.masterInfo1.currentUserFbId){
	    		//don't need to store already 
	    		}

	    	else
	    		window.localStorage.userId=window.masterInfo1.currentUserFbId;

	    	if(window.localStorage.currentUserFbName===window.masterInfo1.currentUserFbName){

	    	}
	    	else
	    		window.localStorage.userName=window.masterInfo1.currentUserFbName;

	    }

	
}

masterInfo.prototype.checkAuthandStoreDBifSo=function(){
	//$('#facebooklogin1').hide();
	var callBack1=function(results){
			console.log(results.msg);
            console.log('callingbackG1');
            if(results.msg!=2){
                $('.facebooklogin').hide();
                $('.facebooklogin1').show();
                }
            else if(results.msg===2){
            	$('.facebooklogin').show();
                $('.facebooklogin1').hide();
                //$('#infoFormWrapper').hide();
                //alert('Please Log In');
                //$.mobile.changePage( "#loginPage", { transition: "slideup"} );
                }
            }
    var args=0;
    //console.log('on live - checking auth!');
        //get args from here and stuff in 
    window.eventInfo1.checkAuth(args,callBack1);
}

masterInfo.prototype.retrieveFromLocalStorage=function(){
	if (window.localStorage.campusName!=undefined) {
		//window.localStorage.isCommentedList=undefined;
		//alert('retrieving');
		//alert(window.masterInfo1.isCommentedList);
		if(window.localStorage.currentUserFbName!=undefined){
			//alert(window.localStorage.currentUserFbName);
			window.masterInfo1.currentUserFbName=window.localStorage.currentUserFbName;
			window.masterInfo1.currentUserFbId=window.localStorage.currentUserFbId;
			//window.masterInfo1.isCommentedList=window.localStorage.isCommentedList;

		}
		if(window.localStorage.dispAllCurrentEventObj){
			window.masterInfo1.dispAllCurrentEventObj=window.localStorage.dispAllCurrentEventObj;
		}
		
		if(window.localStorage.isCommentedList===undefined){
			window.masterInfo1.isCommentedList=[];
			//alert(window.masterInfo1.isCommentedList);
		}
		else{
			window.masterInfo1.isCommentedList=[];
		}

		if(window.localStorage.campusName!=undefined){
			window.masterInfo1.campusName=window.localStorage.campusName;
		}


	}
	else{
		
		window.masterInfo1.initClean();
		$.mobile.changePage('#loginPage');
	}
}

