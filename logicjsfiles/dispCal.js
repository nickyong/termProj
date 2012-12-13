//dispCal.js
$(document ).ready(function() {
 $(function() {
        
        $("#datepicker").datepicker({
	   		onSelect: function(dateText, inst) { 
			      var dateAsString = dateText; //the first parameter of this function
			      var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
				

		     	console.log(dateAsString);
				var newDateString1=$.datepicker.parseDate('yy-mm-dd', '2012-05-11');
				console.log(newDateString1.getDay());


				dateAsString=dateAsString.slice(6,10)+'-'+dateAsString.slice(0,2)+'-'+dateAsString.slice(3,5);
				
				getFromServerEventofCalDate(dateAsString);
   				}
			});
        
    	});
	});

// now i will go into the db and look for events that have that date. and display them below in the div


getFromServerEventofCalDate=function(dateAsString){
		var callBackCal=function(results){
			console.log('callingbackd');
			dispEventinfo1.makeList('#dispEventBoardbelowCalId',results);
			console.log(results);
		}
		var args={date:dateAsString};
		console.log('clickin');
		//get args from here and stuff in 
		window.eventInfo1.getFromServerInfo(args,callBackCal);
}