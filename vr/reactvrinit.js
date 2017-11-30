ReactVR.removeLoader();

// remove warning ribbon if viewing on mobile
if (document.mobile) {
  var ribbonWrapper = document.getElementById('ribbon-wrapper');
  var ribbon = document.getElementById('ribbon');
  ribbonWrapper.removeChild(ribbon);
} // Firefox Nightly change #ribbon content to "Browser is compatible to use VR headset. Best experience in VR headset."

// Initialize the React VR application
ReactVR.init(
  // When you're ready to deploy your app, update this line to point to
  // your compiled index.bundle.js
  '../index.vr.bundle?platform=vr&dev=true',
  // Attach it to the body tag
  document.body
);
