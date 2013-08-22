/*
 * ItemContainerGenerator manages containers for items. It reuses exisiting
 * containers to avoid DOM manipulations.
 */
var ItemContainerGenerator = function(root) {
  var _root = root;
  var _containerMap = {};
  var _recycledContainers = [];

  // Recycle a container.
  var _recycleContainer = function(container, itemIndex) {
    _containerMap[itemIndex] = null;
    _recycledContainers.push(container);
    container.style.display = 'none';
  };

  // Retrun a container for a specific index
  // If there are recycled containers, return one. If not, create one.
  var _getContainerForIndex = function(itemIndex) {
    var container;

    if (_recycledContainers.length > 0) {
      container = _recycledContainers.pop();
    } else {
      container = document.createElement('div');
      container.classList.add('container');
      _root.appendChild(container);
    }

    container.style.display = 'block';
    _containerMap[itemIndex] = container;
    return container;
  };

  var _getContainerFromIndex = function(itemIndex) {
    return _containerMap[itemIndex];
  };

  return {
    recycleContainer: _recycleContainer,
    getContainerForIndex: _getContainerForIndex,
    getContainerFromIndex: _getContainerFromIndex
  };
};
