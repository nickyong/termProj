// add events information
// assuming login information has already been received.



$(document ).ready(function() {
	createAct1=new createAct();
	$('#subFormId').click(window.createAct1.getInfo);
	});


var createAct=function(){

};


createAct.prototype.getInfo=function(){
	alert('ruunning');	
	var title=$('#titId').val();
	var loc=$("#locId").val();
	var date=$('#dateId').val();
	var time=$('#timeId').val();
	console.log(title);
	console.log(date);
	console.log(time);
	console.log(loc);




	
}