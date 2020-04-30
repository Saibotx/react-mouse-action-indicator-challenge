# React-Mouse-Action-Indicator
Component for indicating where your pointer / touch points are when an action is being taken!
This is especially useful if you have fat fingers and/or can't see very well.

## The Challenge
*Assignment: React JS component (estimate completion time ~ 1 hour)*
Watch the video https://streamable.com/ulyfr (linked below), observe that for all tap and drag events, there is a blue dot ripple showing the event action.
Write a React component that replicates the touch / drag ripple for Touch as well as Mouse events (meaning it should work both on mobile and desktop devices). This component should be able to handle multiple touches on a touch device. It should also reject emulated mouse events. The component should be able to be used directly by any React project.

## Getting Started

Install all dev dependencies first!

### `yarn` or `npm install`

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

## About

I tried to make this with as minimal dependencies as possible. This means i freaking wrote the animation wrapper (AnimateList) myself!!!
This actually was more effort than i thought it would be going in lol... Normally i'd probably just drop in some pre-made package to do this animation.

Anyways - In the event you want to send me an angry death threat or funny meme, feel free to reach me at:

### `toby@tobygu.com`
