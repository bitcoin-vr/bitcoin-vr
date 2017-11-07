// ran after React-VR is loaded
const uniquelyNamedGlobalVariableUsedToRemoveReactVRLoader = {
  removeLoader: () => {
    var loaderId = document.getElementById('loader-id');
    var loaderWrapper = document.getElementById('loader-wrapper');

    loaderWrapper.className += 'fade-out';
    setTimeout(() => {
      loaderId.removeChild(loaderWrapper);
    }, 2000);
  }
};
