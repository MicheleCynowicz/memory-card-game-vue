# Step 4: v-for
Now that you've come this far, it's time for some cleanup. In your `src/components` directory, delete the boilerplate components that came with the VueJS installation. Those files are:
- `HelloWorld.vue`
- `TheWelcome.vue`
- `WelcomeItem.vue`
- the entire `icons` directory

Now you'll address the `<li class="card">` element. It needs to be called 16 times, and there is some variable data needed for the nested `<CardView />` components (`imageUrl`s and `imageAltText`s).

Create a new directory inside of your `src` directory and name it `data`.
Inside the `data` directory create a new file named `memoryCards8.js`.
It will be named like this because it will be a file to contain the data of 8 memory cards.

Add this code to the `memoryCards8.js` file:
```js
export default [
  {
    url: "../static_site/images/img-1.png",
    altText: "An emerald cut into a diamond shape.",
  },
  {
    url: "../static_site/images/img-2.png",
    altText: "A ruby cut into a pentagon shape.",
  },
  {
    url: "../static_site/images/img-3.png",
    altText: "An amethyst in a princess cut.",
  },
  {
    url: "../static_site/images/img-4.png",
    altText: "A rose quartz stone cut into a pentagon shape.",
  },
  {
    url: "../static_site/images/img-5.png",
    altText: "A sapphire cut into a hexagon shape.",
  },
  {
    url: "../static_site/images/img-6.png",
    altText: "An amethyst cut into a diamond shape.",
  },
  {
    url: "../static_site/images/img-7.png",
    altText: "A topaz cut into a hexagon shape.",
  },
  {
    url: "../static_site/images/img-8.png",
    altText: "An emerald cut into a hexagon shape.",
  },
];
```

This data provides an array of objects, where each object contains one image path (`url`) and an alt text string associated with the image (`altText`).

This data needs to be used in the `GameBoard` component, so open the `GameBoard.vue` file and import the data just below the import statement for the `CardView` component, like this:
```js
import CardView from "./CardView.vue";
import cardData from "../data/memoryCards8.js";
```
Just below the import statements, within the `export default {...}` object, add a property *after* the `components` object, called `computed`. That should look like this:
```js
export default {
  components: {
    CardView,
  },
  computed: {

  },
};
```
Inside the `computed` object, VueJS will expect a specific method type that will `return` reactive values.
Within the `computed: {}` object, add a *computed property* called `cardsData`:
```js
computed: {
  cardsData() {}
},
```
Look at the syntax of `cardsData() {}` - this is following function definition syntax, without the `function` keyword. VueJS will treat `computed` properties as functions, but will run those functions at key points within the *component lifecycle*. The value that is _returned_ by a computed property can be used as a variable indside other code inside the given component.

All that is to say that if you add a `return` value to `cardsData() {}`, then that value is carried by the variable `cardsData`. See this in action by adding a return statement to the computed property:
```js
computed: {
  cardsData() {
    return cardData;
  }
},
```
and then find the `<p>` tag in `GameBoard.vue` and change it to output the `cardsData` variable, like this:
```html
<p>{{ cardsData }}</p>
```

Save this work and look at it in your browser. You should see the full content of the `memoryCards8.js` data file as text on your game board, followed by the single card markup.

Now you can remove the `<p>{{ cardsData }}</p>` entirely. You want that data to be put into your _cards_ markup, not to display as text in the app.

You can access this data and make a whole collection of `<li class="card">` tags with a _*for loop*_. This won't be your typical JavaScript for loop, as you will use Vue syntax in the SFC to make a loop out of the `<li>` tag itself.

In `GameBoard.vue`, find the `<li class="card">` line and change it to:
```html
<li v-for="(cardInfo, index) in cardsData" :key="index" class="card">
```
To read this in plain language, this `v-for` syntax states:
> For each object in the array named `cardsData`, call the object `cardInfo` and count its `index` in the array. Give each `<li>` tag a `key` attribute that will carry the value of the current `index`.

Save this change and look at it in the browser. You should now have 8 `<li>` tags, each containing 2 `<div>` tags. *Wait!* There are only 8, but you need 16!

In the `computed` object of the `GameBoard.vue` component, use the JavaScript array method `.concat()` to add a second copy of the `cardData` array to the output of the `cardsData` computed property, like this:
```js
computed: {
  cardsData() {
    return cardData.concat(cardData);
  },
},
```
Save this and check your app in the browser. You should now see 16 cards!
However, upon inspecting the game board with your browser dev tools, it seems all the back-view card divs have the same image.

Looking again at the `GameBoard.vue` component, within the `<template>` tag, find this block of code:
```html
<CardView
  viewType="back"
  imageUrl="../static_site/images/img-1.png"
  imageAltText="An emerald cut into a diamond shape."
/>
```
and change it to:
```html
<CardView
  viewType="back"
  :imageUrl="cardInfo.url"
  :imageAltText="cardInfo.altText"
/>
```
Now the `imageUrl` and `imageAltText` prop attributes have *bindings* (because of the `:`), and what is inside the quotations for each of these is evaluated as JavaScript.
The variable `cardInfo` is inherited from the wrapping `<li>` tag's `v-for` loop, where each instance of `cardInfo` represents the next object in the `cardsData` array. For example:
```js
cardInfo = {
  url: "../static_site/images/img-8.png",
  altText: "An emerald cut into a hexagon shape.",
}
```
Therefore, `cardInfo.url` evaluates to the string `../static_site/images/img-8.png` and `cardInfo.altText` evaluates to the string `An emerald cut into a hexagon shape.`.

Your `GameBoard.vue` component should now look like this:
```html
<script>
import CardView from "./CardView.vue";
import cardData from "../data/memoryCards8.js";

export default {
  components: {
    CardView,
  },
  computed: {
    cardsData() {
      return cardData.concat(cardData);
    },
  },
};
</script>

<template>
  <div class="game-board">
    <ul class="cards">
      <li v-for="(cardInfo, index) in cardsData" :key="index" class="card">
        <CardView viewType="front" />
        <CardView
          viewType="back"
          :imageUrl="cardInfo.url"
          :imageAltText="cardInfo.altText"
        />
      </li>
    </ul>
  </div>
</template>
```

In the browser, the app should display 16 _cards_, and the `back-view` of these cards should have the correct image file paths with matching alt text.
To get a visual for how this is working, add the `flip` class to the `<li>` tag in the `GameBoard.vue` component, and preview it in the browser. You should now see 8 pairs of matching images on the 16 cards.

Remove the `flip` class and save your work before moving on to [Step 5]().