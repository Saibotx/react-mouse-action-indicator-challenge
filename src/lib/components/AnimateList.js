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
      mounting: {},
      unmounting:{}
    };
  }
  componentWillReceiveProps(props) {
    let existingChildren = this._getChildrenArrayFromMap(this.state.children);
    let nextChildren = React.Children.toArray(props.children);

    //get removedNodes
    let removedChildren = existingChildren.filter(
      child => nextChildren.indexOf(child) == -1
    );

    //get addedNodes - will be dealt with with a timer.
    let addedChildren = nextChildren.filter(
      child => existingChildren.indexOf(child) == -1
    );

    //handle removing children
    removedChildren = removedChildren.map(Child => {
      return React.cloneElement(Child, { state: "unmounting" });
    });
    let existingChildrenMap = this.state.children;

    removedChildren.forEach(Child => {
      existingChildrenMap[Child.key] = Child;
    });

    //handle addedChildren
    addedChildren.forEach(Child => {
      existingChildrenMap[Child.key] = Child;
    });

    console.log("regular setting")
    this.setState({ children: existingChildrenMap }, ()=>{
      if (addedChildren.length > 0){
        addedChildren = addedChildren.map(Child =>
          React.cloneElement(Child, { state: "mounted" })
        );
        addedChildren.forEach(Child => {
          existingChildrenMap[Child.key] = Child;
        });
        setTimeout(()=>{
          this.setState({
            children: existingChildrenMap
          });
        }, 10)

      }
      if (removedChildren.length > 0){
        setTimeout(() => {
          let futureChildrenState = this.state.children;
          removedChildren.forEach(removedChild => {
            delete futureChildrenState[removedChild.key];
          });
          this.setState({
            children: futureChildrenState
          });
        }, 200);
      }

    });
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
    let children = this._getChildrenArrayFromMap(this.state.children);
    console.log("children are ", children);
    return children;
  }
}
export default AnimateList;
