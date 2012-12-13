//event Details page

$(document ).ready(function() {
    
    //alert('this is where i check auth and set log in to logged in');
//event Details page
    window.Util1=new Util();    
    window.Util1.patchFnBind();
    window.eventDetails1=new window.eventDetails();
    window.delEvent1=new window.delEvent();    
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

//Disp all events pageshow

     
    window.dispEventinfo1=new dispEventinfo();

    $('#dispFormId').on('click',window.dispEventinfo1.getandDisplayAllEvents);
    $('#loginPageContId').on('click',window.dispEventinfo1.getandDisplayAllEvents);
    $('#dispEventsTab').live('pageshow',window.dispEventinfo1.getandDisplayAllEvents);

    $('#addEventTab').live('pageshow',function(){

        console.log('cheking if the user is logged in. if not will display the login button');
        var callBackG=function(results){
            console.log('callingbackG');

            //alert(results.msg);
            if(results.msg!=2){
                $('#facebooklogin').hide();

                }
            else if(results.msg===2){
                //$('#infoFormWrapper').hide();
                //$.mobile.showToast("dfgf",2000,function(){alert("toast end")});

                window.toasty('Please do Log In');
                setTimeout(function(){$.mobile.changePage( "#loginPage", { transition: "slideup"} );},1500);
               // $.mobile.changePage( "#loginPage", { transition: "slideup"} );
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
    $('#gMapsPosId').on("click",function(){

        console.log('clicking presentMapId');
        $.mobile.changePage( "#mapTab", { transition: "slideup"} )
        window.gMaps1=new gMaps();
        window.gMaps1.initAddLoc();
        
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

    $('#subLocId').on('click',function(){
        // get the event location and change page back
        window.gMaps1.updateLoc();
        });
    $('.dispEventsMap').on('click',function(){
        // get the event location and change page back
        
        window.gMaps1=new gMaps();
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
        //window.dispEventinfo1.getandDisplayAllEvents();
        $.mobile.changePage( "#mapTab", { transition: "slideup"} );
        window.gMaps1.dispEventsMap(window.masterInfo1.dispAllCurrentEventObj);
        

        });




//masterinfo.js
    
    window.masterInfo1=new window.masterInfo();
    window.masterInfo1.retrieveFromLocalStorage();
    window.masterInfo1.checkAuthandStoreDBifSo();

    $('#facebooklogin1').live('click',function(){
        //alert('here is when i check auth and set to log in pleaase');

        window.eventInfo1.logOut();
        $('.facebooklogin1').hide();
        $('.facebooklogin').show();
        $.mobile.changePage( "#loginPage", { transition: "slideup"} )
    })

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


window.toasty=function(msg){
     $("<div class='raleway ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
     .css({ display: "inline", 
      "border-radius": 0,
      border:'3px solid #ff0000',
      opacity: 0.97, 
      position: "fixed",
      background: "#ffffff",
      "font-family": "'Raleway', sans-serif",
      'font-size':'125%',
      "font-weight":'lighter',
      padding: "7px",
      "text-align": "center",
      width: "270px",
      left: ($(window).width() - 284)/2,
      top: $(window).height()/5 })
     .appendTo( $.mobile.pageContainer ).delay( 2000 )
     .fadeOut( 500, function(){
      $(this).remove();
    });
}