//event Details page

$(document ).ready(function() {
    alert('this is where i check auth and set log in to logged in');
//event Details page
    window.eventDetails1=new window.eventDetails();
        
    //alert(window);
    $('#likeButt').on('click',function(){

        window.eventDetails1.likeFB();
    });
    $('#checkinButt').on('click',function(){

        onClickofCIButton();
    });
    // this is actually the comment button
    $('#commentButt').on('click',function(){

        window.eventDetails1.postcomment();
        
    });

//Disp all events page

    window.dispEventinfo1=new dispEventinfo();

    $('#dispFormId').on('click',window.dispEventinfo1.getandDisplayAllEvents);
    $('#loginPageContId').on('click',window.dispEventinfo1.getandDisplayAllEvents);
    $('#dispEventsTab').live('pageshow',window.dispEventinfo1.getandDisplayAllEvents);

    $('#addEventTab').live('pageshow',function(){
        console.log('cheking if the user is logged in. if not will display the login button');
        var callBackG=function(results){
            console.log('callingbackG');
            if(results.msg!=2){
                $('#facebooklogin').hide();

                }
            else if(results.msg===2){
                $('#infoFormWrapper').hide();
                alert('Please Log In');
                $.mobile.changePage( "#loginPage", { transition: "slideup"} );
                }
            }
        var args=0;
        console.log('on live - checking auth!');
        //get args from here and stuff in 
        window.eventInfo1.checkAuth(args,callBackG);
    });

//addeventinfo.js
    $('#dateId').on("click",function(){
        $('#dateId').datebox('open');
    });
    $('#timeId').on("click",function(){
        $('#timeId').datebox('open');
    });

    window.eventInfo1= new eventInfo();
    $('#subFormId').on('click',function(){
        window.eventInfo1.getInfo();
        });


    $('#getFormId').on('click',function(){
        var callBackD=function(results){
            console.log('callingbackd');
            console.log(results);
        }
        var args=0;
        //get args from here and stuff in 
        window.eventInfo1.getFromServerInfo(args,callBackD);
        });

    $('#delFormId').on('click',function(){
        window.eventInfo1.delServerInfo();
        });
    $('#presentMapId').on('click',function(){
        console.log('clicking presentMapId');
        window.gMaps1=new gMaps();
        window.gMaps1.initAddLoc();
        });

    $('#subLocId').on('click',function(){
        // get the event location and change page back
        window.gMaps1.updateLoc();
        });
    $('.dispEventsMap').on('click',function(){
        // get the event location and change page back
        
        window.gMaps1=new gMaps();
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        //window.dispEventinfo1.getandDisplayAllEvents();
        window.gMaps1.dispEventsMap(window.masterInfo1.dispAllCurrentEventObj);
        });

//masterinfo.js
    window.masterInfo1=new window.masterInfo();
    window.masterInfo1.retrieveFromLocalStorage();
    

    
    
    $('#loginPageContId').live('click',function(){
        console.log('loginPageContId1111111111111111111111111');
        window.masterInfo1.campusName=$('#collegeNameId').val();
        //alert($('#collegeNameId').val());
        window.masterInfo1.saveUserCampustoLocalStorage();
    // here i will query the user to see his info from the db by querying his username? 
    // 1)I check auth . if he is registered i take his username and user info and store locally
    // 2) querying the user only comes when i want to see if he 

    })


});