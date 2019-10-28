#React-Mouse-Action-Indicator
Component for indicating where your pointer / touch points are when an action is being taken!
This is especially useful if you have fat fingers and/or can't see very well.


## How to build as component

If for some reason you want to edit this and rebuild it as a component to drop into a project,

### `yarn build-as-package`

This can also be useful if for some reason it's not built and / or ready to be dropped into a project.

## How to use as Component

In your project that you want to include this in, run

### `npm install /path/to/this/directory`

This will create a dependency in your project's package.json :)

Then include it in your project like this:
```
// Import Component
import MouseActionIndicator from "react-mouse-action-indicator"

...

render(){
  <MouseActionIndicator>
    {...children}
  </MouseActionIndicator>
}
```
Use this as a Higher Order Component. Anything you wrap with this component will indicate where the pointer / touch is on mousedown / on touch.

## How to run examples

### `yarn start`

This starts the example in src/example for local development for you to play around with.

## How to contact me

In the event you want to send me an angry death threat or funny meme, feel free to reach me at:

### `toby@tobygu.com`
