// (function() {

//   var preload = document.getElementById("preload");
//   var loaded = false;

// ran after React-VR is loaded
const removeLoader =  () => {
    var body = document.getElementById("loader-id");
    var loaderWrapper = document.getElementById("loader-wrapper");

    var garbage = body.removeChild(loaderWrapper);

    // var element = document.getElementById("loader-wrapper");
    // if(element) {

    //   element.add


    // }
  };

// $(document).ready(function() {

// 	setTimeout(function(){
// 		$('body').addClass('loaded');
// 		$('h1').css('color','#222222');
// 	}, 3000);

// });
