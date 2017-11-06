// (function() {

//   var preload = document.getElementById("preload");
//   var loaded = false;

// ran after React-VR is loaded
const removeLoader =  () => {
    var loaderId = document.getElementById("loader-id");
    var loaderWrapper = document.getElementById("loader-wrapper");
    console.log('Added FADE!');

    loaderWrapper.className += "fade-out";
    setTimeout(() => {
      var garbage = loaderId.removeChild(loaderWrapper);
    }, 2000);

    //loaderId.addEventListener("fade", , false);
    //prefixedEvent(heart, "AnimationIteration", AnimationListener);




    // var element = document.getElementById("loader-wrapper");
    // if(element) {

    //   element.add


    // }
  };

//   function AnimationListener() {
//     if(hovered)
//     {
//       heart.classList.remove('animated');
//       heart.style.webkitTransform = 'scale(2)';
//       heart.style.MozTransform = 'scale(2)';
//       heart.style.msTransform = 'scale(2)';
//       heart.style.OTransform = 'scale(2)';
//       heart.style.transform = 'scale(2)';
//     }
// }


//   function prefixedEvent(element, type, callback) {
//     for (var p = 0; p < pfx.length; p++) {
//         if (!pfx[p]) type = type.toLowerCase();
//         element.addEventListener(pfx[p]+type, callback, false);
//     }
// }
// $(document).ready(function() {

// 	setTimeout(function(){
// 		$('body').addClass('loaded');
// 		$('h1').css('color','#222222');
// 	}, 3000);

// });
