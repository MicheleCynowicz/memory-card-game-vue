# Step 2: Breaking up the game
When you created the memory card game in [the original assignment](https://github.com/MicheleCynowicz/memory-card-game), you started by creating an HTML file with an empty game board. Then you proceeded to add a `<ul>` tag with 16 `<li>` tags inside of it, to represent each card. Inside each `<li class="card">` you had 2 `<div>` tags to represent the front and the back of each card.

There's a LOT of repetitive code in that `index.html` file. In programming we use the term DRY, which is an acronym for *Don't Repeat Yourself*. We will use individual Vue components to break apart the HTML from the `index.html` file, so that we can have less code hard-coded, and thus our app will adhere to the DRY principle.

Once we have small, separate components, the compiler can build our game board for us, by stacking components as if they were LEGO bricks.

Now you'll create two single file components (SFCs, or `.vue` files) to represent parts of the game's original markup, based on this breakdown:
- card view (back or front, to represent the `<div>` tags inside each `<li>`)
- game board to hold the cards markup (as in the `<li class="card">` tags)

In your `src/components` directory, create two new SFC files: `GameBoard.vue`, and  `CardView.vue`.

*NOTE* that the name `CardView.vue` is a tad wordy, we might have preferred to call this simply `Card.vue`. However, Vue's styleguide and linting recommendations dictate that component names that are not `App.vue` should always be multi-word names. If you tried to name the file `Card.vue`, you might see a syntax error in your code editor because the filename is too short.

In each of your 2 new files, add the following code:
```html
<script>
  export default {};
</script>

<template>
</template>

```

Within each `<template></template>` tag in each file, add a `<p>` tag to name the current component, such as:
```html
<template>
  <p>I am the GameBoard.vue component</p>
</template>
```
This way you will be able to see how they are output by the compiler once they each are being called by a component instance within the app.

In order to see these components in the browser, they need to be called upon within the app.

In your `App.vue` file, within the `<script setup> ... </script>` tag, remove the 2 default component import statements and add:
```js
import GameBoard from "./components/GameBoard.vue";
```

Next, inside of `App.vue`, remove the `<header></header>` tag and all of its contents. Change the content of the `<main></main>` tag to a component instance of the game board, like this:
```html
<main>
  <GameBoard />
</main>
```

The whole `<template>` tag in your `App.vue` file should look like this:
```html
<template>
  <div id="app">
    <main>
      <GameBoard />
    </main>
  </div>
</template>
```

Now look at the app as it is running at localhost (if it is not running, you will need to use the terminal command `npm run dev` to start it). The only content you should see on the screen now is the `<p>` tag from inside of your `GameBoard.vue` component, such as *I am the GameBoard.vue component*.

Inside of the `GameBoard.vue` component, add an `import` statement to the `<script>` tag to import the `CardView.vue` component, above the `export default {};` line like this:
```html
<script>
import CardView from "./CardView.vue";

export default {};
</script>
```
Within the `export default {};` object, add a `components: {},` property, and call the `CardView` component within the `components` object, like this:
```js
export default {
  components: {
    CardView,
  },
};
```
This is how you register the child component `CardView` inside the parent component, `GameBoard`.

Next you'll call an instance of the `CardView` component inside the `<template>` tag, below your `<p>` tag, using the component instance syntax `<CardView />`.

Your `GameBoard.vue` file's `<template>` tag should now look something like this:
```html
<template>
  <p>I am the GameBoard.vue component</p>
  <CardView />
</template>
```
*Oh Noes! A syntax error!* Due to the way in which VueJS 2.0 compiles components, it requires that there is only _one single HTML element in the template root_. The `<template>` tag will not actually render in the compiled code, so VueJS 2.0 is looking for all the content within the `<template>` tag to be wrapped in a tag that _will_ render. (This has been changed in VueJS 3.0)

Update the `<template>` tag code in your `GameBoard.vue` file to include a `<div>` to wrap the content, like this:
```html
<template>
  <div>
    <p>I am the GameBoard.vue component</p>
    <CardView />
  </div>
</template>
```
When you look at this in your browser at localhost, you should now see the text *I am the GameBoard.vue component* followed by *I am the CardView.vue component*.

Now you want to make the HTML render in a way that looks like the HTML from your original Memory Game project's `index.html`. This means you need to add the `game-board` class to the `<div>` tag in your `GameBoard.vue` component, and wrap `<ul class="cards">` and `<li class="card">` tags around the `<CardView />` component instance:
```html
<template>
  <div class="game-board">
    <p>I am the GameBoard.vue component</p>
    <ul class="cards">
      <li class="card">
        <CardView />
      </li>
    </ul>
  </div>
</template>
```
This doesn't change much in the app when viewed in the browser, but upon inspecting the page with dev tools, you will see the added class name `game-board` and the added `<ul class="cards">` and `<li class="card">` tags.

Speaking of what you see in the browser, you've got some lingering styles from the boilerplate of the VueJS setup, so go into your `App.vue` component and remove the entire `<style scoped> ... </style>` tag. Once you save this and look at it in the browser, there are still boilerplate styles present! *Where do they come from?*

Open the file `main.js` from the `src` directory. At line 4 you should see:
```js
import "./assets/main.css";
```
Change this import to directly reference your `style.css` file copy in your `static_site` directory, like this:
```js
import "../static_site/style.css";
```
Now you should see your app in the browser starting to take shape!

Go on to [Step 3]() to continue...