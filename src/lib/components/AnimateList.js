import React from "react";
class AnimateList extends React.Component {
  constructor(props) {
    super(props);
    this._getChildrenMapFromArray = this._getChildrenMapFromArray.bind(this);
    this._getChildrenArrayFromMap = this._getChildrenArrayFromMap.bind(this);

    this.state = {
      children: this._getChildrenMapFromArray(
        React.Children.toArray(props.children)
      ),
      mountingChildren: {},
      unmountingChildren: {}
    };
    this.timers = {};
  }

  componentWillReceiveProps(props) {
    let existingChildren = {
      ...this.state.children,
      ...this.state.unmountingChildren,
      ...this.state.mountingChildren
    };

    let nextChildren = React.Children.toArray(props.children);
    let nextChildrenKeys = nextChildren.map(child => child.key);
    let existingChildrenKeys = Object.keys(existingChildren);

    let removedChildrenKeys = existingChildrenKeys.filter(
      key => nextChildrenKeys.indexOf(key) === -1
    );

    let addedChildrenKeys = nextChildrenKeys.filter(
      nextChildKey => existingChildrenKeys.indexOf(nextChildKey) === -1
    );

    //get changedNodes
    let changedChildren = nextChildren.filter(nextChild => {
      let potentialChangedChild = existingChildren[nextChild.key];
      if (potentialChangedChild) {
        let nextPosition = (nextChild.props || {}).position;
        let oldPosition = (potentialChangedChild.props || {}).position;
        if (nextPosition && oldPosition) {
          return (
            oldPosition.x !== nextPosition.x && oldPosition.y !== nextPosition.y
          );
        }
      }
      return false;
    });

    //handle removing children
    if (removedChildrenKeys.length > 0) {
      let removedChildren = this._getChildrenArrayFromMap(
        existingChildren
      ).filter(child => removedChildrenKeys.includes(child.key));
      this._unmountChildrenNodes(removedChildren);
      // console.log("unmounting", removedChildrenKeys)
    }

    //handle adding children
    if (addedChildrenKeys.length > 0) {
      let addedChildren = nextChildren.filter(nextChild =>
        addedChildrenKeys.includes(nextChild.key)
      );
      this._mountChildrenNodes(addedChildren);
      // console.log("mounting", addedChildrenKeys)
    }

    if (changedChildren.length > 0) {
      let existingChildrenMap = { ...this.state.children };
      changedChildren.forEach(Child => {
        existingChildrenMap[Child.key] = React.cloneElement(Child, {
          state: "mounted"
        });
      });
      this.setState({ children: existingChildrenMap });
    }
  }

  _unmountChildrenNodes(removedChildren) {
    let existingChildrenMap = { ...this.state.children };
    let unmountDelay = 0;
    let unmountingChildren = { ...this.state.unmountingChildren };
    removedChildren.forEach(Child => {
      unmountingChildren[Child.key] = React.cloneElement(Child, {
        state: "unmounting"
      });
      //check if still being mounted. If so, delay unmount animation.
      unmountDelay = this.state.mountingChildren[Child.key] ? 100 : 0;
      delete existingChildrenMap[Child.key];
    });
    //Perform unmount animation async.
    setTimeout(() => {
      this.setState({
        unmountingChildren,
        children: existingChildrenMap
      });
    }, unmountDelay);
    //Actually perform unmount
    setTimeout(() => {
      let futureUnmountingChildren = { ...this.state.unmountingChildren };
      let futureChildren = { ...this.state.children };
      removedChildren.forEach(Child => {
        delete futureUnmountingChildren[Child.key];
        // delete futureChildren[Child.key];
      });
      this.setState({
        unmountingChildren: futureUnmountingChildren,
        children: futureChildren
      });
    }, unmountDelay + 100);
  }

  _mountChildrenNodes(addedChildren) {
    let mountingChildren = { ...this.state.mountingChildren };
    addedChildren.forEach((Child, i) => {
      mountingChildren[Child.key] = { ...Child };
    }, addedChildren);
    //mount node and prepare for animation.
    this.setState({
      mountingChildren
    });
    //setTimeout to make async perform animation.
    setTimeout(() => {
      let futureMountingChildren = { ...this.state.mountingChildren };
      let futureChildren = { ...this.state.children };
      addedChildren.forEach(Child => {
        //need to make sure this is still not unmounting.
        futureChildren[Child.key] = React.cloneElement(Child, {
          state: "mounted"
        });
        delete futureMountingChildren[Child.key];
      });
      this.setState({
        mountingChildren: futureMountingChildren,
        children: futureChildren
      });
    }, 0);
  }

  _getChildrenMapFromArray(childrenArray = []) {
    let childrenMap = {};
    for (let child in childrenArray) {
      childrenMap[child.key] = child;
    }
    return childrenMap;
  }

  _getChildrenArrayFromMap(childrenMap = {}) {
    let childrenArray = [];
    for (let childKey in childrenMap) {
      childrenArray.push(childrenMap[childKey]);
    }
    return childrenArray;
  }

  render() {
    let toRender = this._getChildrenArrayFromMap({
      ...this.state.mountingChildren,
      ...this.state.unmountingChildren,
      ...this.state.children
    });
    return toRender;
  }
}
export default AnimateList;
