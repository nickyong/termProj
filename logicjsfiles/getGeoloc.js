// gets the geolocation on click of that button and checks with db of event to see if geolocation is near
// for check in 

function onClickofCIButton() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        console.log('hi i am gettingpos');
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {

       	console.log(position.coords.latitude);
       	console.log(position.coords.longitude);
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }