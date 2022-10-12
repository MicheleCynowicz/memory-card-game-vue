# Step 1: Get to know your app
From within the project in a terminal window, run the `npm run dev` command.
You should be given a localhost URL which you can open in a browser and see the Vue boilerplate site.

In your code editor, open the `index.html` file. Update the `<title>` of your game to your preference.

Note that the `body` of this file contains two HTML elements: a `div` with an `id="app"` and a `script` tag with a `src="/src/main.js`. You won't edit this code, but notice that the script tag's `src` leads to a directory also named `src`. Open up the `src` directory in your file browser and you will see some more boilerplate Vue code.

Open the file `App.vue`. This is the top-level *Single File Component* (SFC, or a `.vue` file) of your new Vue app. When your project is running, `App.vue` will _mount_ to the DOM in your `index.html` file by attaching to `<div id="app"></div>`.

Notice inside of `App.vue` that there are 3 top-level HTML elements:
`<script setup>`, `<template>`, and `<style scoped>`. These 3 elements will work together within the SFC as if they were your standard `script.js`, `index.html`, and `style.css` files, only their content will be _scoped_ to the current component.

This means that the HTML that will render inside `<div id="app">` when the app is running is that which is seen inside the `<template>` tag within `App.vue`.

In the `<script>` tag of `App.vue`, you will see two file `import`s:
```js
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
```
This is telling the Vue compiler that within this `App.vue` SFC, you want to use two _child components_, `HelloWorld.vue` and `TheWelcome.vue`, which are both found in the `components` directory in the project.

You will see these child components used inside the `<template>` tag as if they were their own HTML element tags:
```html
<HelloWorld msg="You did it!" />
```
```html
<TheWelcome />
```

Notice the syntax here! The SFC filenames and the HTML tags that represent them are using *Pascal Casing* - each individual word in the name starts with a captial letter, and there are no spaces. This is a standard syntax styling for JavaScript frameworks that help you visually recognize what is a _child component instance_ rather than a standard HTML tag.

Look at the _component instance_ of `HelloWorld`:
```html
<HelloWorld msg="You did it!" />
```
This has an _attribute_ of `msg="You did it!"`. The attribute `msg` here is not an HTML attribute, but an attribute that is specific to the `HelloWorld.vue` SFC. We call these *props*. `msg` is a variable property that can be read inside of the `HelloWorld.vue` component. If you look at your app running in the browser (at localhost) you will see the `<h1>` tag that reads *You did it!*.

Open up the `HelloWorld.vue` file in your code editor. At the top of this file you will see a `script` tag:
```html
<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>
```
Note here that `msg` is a property of an object that is being passed as the argument to a `defineProps()` function, and that its value is an object:
```js
msg: {
  type: String,
  required: true,
},
```
This means that when the `HelloWorld.vue` component is `setup` by the Vue compiler, it is expecting that the component was called from a _parent component_ (in this case `App.vue`), with a `msg` property (which looks like an HTML attribute: `<HelloWorld msg="" />`). This expects that the value being passed as the `msg` will be a string (`type: String,`), and that this prop (`msg`) is a _required_ bit of data.

In your `App.vue` file, change the value of the `msg` prop inside the `<HelloWord>` tag, like this:
```html
<HelloWorld msg="I am learning Vue!" />
```
Save this change and preview the app now in your browser.
Thanks to _Hot Module Reloading_ (HMR), the change is instant in the browser once it is saved. You don't need to reload the page!
You should now see your app's `<h1>` tag as reading *I am learning Vue!*.

Look around in the code within the `src` directory. You will see that there are more, smaller SFCs in the file tree. Look at how different SFCs are being called by _parent components_, and use your browser's dev tools to inspect the HTML of the running app to see how the HTML structure has been output by compiling all these smaller components together.

Create a new directory (folder) in your project root called `static_site`.

In your computer's file browser, find your most up-to-date copy of your Memory Card Game project from the previous assignment. Copy the `index.html`, `style.css`, `script.js` files and the `images` directory from the previous assignment and paste these copies into the `static_site` directory in the vue project.

Save and commit all your changes.

Now create a new working branch in your vue project to use in [Step 2]().