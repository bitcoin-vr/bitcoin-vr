uniquelyNamedGlobalVariableUsedToRemoveReactVRLoader.removeLoader();
// Initialize the React VR application
ReactVR.init(
  // When you're ready to deploy your app, update this line to point to
  // your compiled index.bundle.js
  '../index.vr.bundle?platform=vr&dev=true',
  // Attach it to the body tag
  document.body
);
