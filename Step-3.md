# Step 3: Variable card views
In your original `index.html` file, you have 16 `<li>` tags that look like this:
```html
<li class="card">
  <div class="view front-view">
    <img src="images/que_icon.svg" alt="icon">
  </div>
  <div class="view back-view">
    <img src="images/img-1.png" alt="card-img">
  </div>
</li>
```
Since the `CardWrapper` component will present our `<li class="card">` tags in our Vue version of the game, and our `CardView` component will present the `<div class="view">` tags, open the `CardWrapper.vue` component file and change the contents of the `<template>` tag to this:
```html
<template>
  <li class="card">
    <p>I am the CardWrapper.vue component</p>
    <CardView />
    <CardView />
  </li>
</template>
```
Note that within this `<template>` tag we are no longer using a `<div>` element to wrap the contents inside - it has been replaced with the `<li class="card"> ... </li>` tag. Any valid HTML tag that is NOT a `template` should be a valid root element here. We don't want this to be a `<div>` anymore because we don't want our `<li>` tags to be wrapped inside of empty `<div>`s, as that would affect the HTML output of our `<li>` tags overall.

Now that you can see the `<li class="card">` rendering in the browser, remove this line from the component:
```html
<p>I am the CardWrapper.vue component</p>
```
In the browser you should now see the text *I am the GameBoard.vue component* once, and *I am the CardView.vue component* twice.

Why is it there twice? Because we will only be rendering ONE `<div class="view">` per component instance of `<CardView />`, but we need to have two card views; one for the back view, and one for the front.

Open the `CardView.vue` component and replace the contents of the `<template>` tag with this `<div>` code from your original `index.html` file:
```html
<template>
  <div class="view front-view">
    <img src="images/que_icon.svg" alt="icon" />
  </div>
</template>
```
When you save this and look at it in the browser, you should see a single blank card on the game board with a broken icon image.

When you inspect the card with your dev tools, you will see that there is one `<li class="card">...</li>` with two copies of the `<div class="view front-view">...</div>`. 

Since your CSS is setup to have these `<div class="view">...</div>` elements visually stack on top of one another, you only see one on the screen.

What about the second `<div class="view front-view">`? That needs to render with the class `back-view` instead of `front-view`. For this, we will use a *prop*.

In your `CardView.vue` file, find the line `export default {};` in the `<script>` tag.
Within the `export default` object, add a `props: {}` object with a *prop* named `viewType` like this:
```js
export default {
  props: {
    viewType: {
      type: String,
      required: true,
    },
  },
};
```
Here we are telling the Vue compiler that whenever the `CardView.vue` component is called as a _child component instance_ it is `required` to have a `viewType` prop in it. If you save this change to `CardView.vue`, in your dev tools console in the browser you will see an error message like this:
```
[Vue warn]: Missing required prop: "viewType" found in
---> <CardView> at...
```
This error should have shown twice in your console (or have the number `2` next to the error) because inside the `CardWrapper.vue` component, you are calling `<CardView />` twice, and neither instance is passing along a `viewType` prop.

To fix this, open your `CardWrapper.vue` file and add the `viewType` prop to each of the `<CardView />` component instances. Give the first instance a `viewType` value of `front` and the second instance a `viewType` value of `back`.

If you did this correctly, the `<template>` code in your `CardWrapper.vue` file should look like this:
```html
<template>
  <li class="card">
    <CardView viewType="front" />
    <CardView viewType="back" />
  </li>
</template>
```
Save this change and check your app in the browser. You won't see the `[Vue warn]` error message anymore.

Now you can put your new `viewType` prop to good use!
In your `CardView.vue` component, you will update the `<div>` class in a very special way. Right now the `<div>` tag in your component looks like this:
```html
<div class="view front-view">
```
Change that to:
```html
<div :class="`view ${viewType}-view`">
```

*What did that just do?*
When we add a colon `:` before the `class` attribute, we are *binding* the attribute to Vue. It's a shorthand for `v-bind:class`. With the binding in place, everything between the quotation marks in `:class="..."` will be evaluated as _JavaScript_! Thus inside the quotation marks we add backticks so that we have the option of *string interpolation*, and we can use the `viewType` prop as a *variable* within the string.

Save this change and view the app in your browser. Use the dev tools inspector to see the two `<div>`s that are compiled from the two component instances of `<CardView viewType="">` you will see that the first `<div>` has a class attribute of `"view front-view"` and the second `<div>` has a class attribute of `"view back-view"`.

Now that the classes for the divs are setup, you will need to address the variation of the `<img>` tag.

In your original `index.html` code, where the two `<div>`s are nested each of the `<li>` tags, there is an `<img>` tag inside each `<div>`, like this:
```html
<div class="view front-view">
  <img src="images/que_icon.svg" alt="icon">
</div>
<div class="view back-view">
  <img src="images/img-1.png" alt="card-img">
</div>
```

Now that you have a `CardView.vue` component, you're working with only one `<div>`, so you will need to work with only one `<img>` tag too!

In your `CardView.vue` component, your `<img>` tag is currently:
```html
<img src="images/que_icon.svg" alt="icon" />
```

Change that tag to this:
```html
<img :src="imageUrl" :alt="imageAltText" />
```

Save the file and check the app in the browser with the dev tools console open. You should see 4 errors that begin with `[Vue warn]`. There is one error for each of the two variables we just added: `imageUrl` and `imageAltText`, and that is doubled because the `CardView` component is called twice inside the `CardWrapper` component.

Now add those new variables into the `props` object in `CardView.vue` like this:
```js
props: {
  viewType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: `../static_site/images/que_icon.svg`,
  },
  imageAltText: {
    type: String,
    default: `hidden card`,
  },
},
```

Note that these new props are not `required: true`! When you have a `default` value here, calling this component inside another without specifying a value for either of these props:
```html
<CardView viewType="back" /> 
```
means that the component instance will render, but since it doesn't have values for these unrequired props from the parent component, it will fill in the prop values with their defaults:
```html
<img src="../static_site/images/que_icon.svg" alt="hidden card" />
```

Now your `CardView.vue` file should look like this:
```html
<script>
export default {
  props: {
    viewType: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: `../static_site/images/que_icon.svg`,
    },
    imageAltText: {
      type: String,
      default: `hidden card`,
    },
  },
};
</script>

<template>
  <div :class="`view ${viewType}-view`">
    <img :src="imageUrl" :alt="imageAltText" />
  </div>
</template>
```

Save your work and inspect it in the browser dev tools. Now both instances of `<CardView />` are rendering with the default values for `imageUrl` and `imageAltText`.

In the `CardWrapper.vue` file, change this line of code:
```html
<CardView viewType="back" />
```
to this:
```html
<CardView
  viewType="back"
  imageUrl="../static_site/images/img-1.png"
  imageAltText="An emerald cut into a diamond shape."
/>
```
The syntax looks different as the prop attributes are stacked instead of inline, but the component will render as expected. This is a stylistic formatting choice, which is enforced by the ESLint npm package in this project.

Save this and inspect the app in your browser dev tools.
The markup you see should mimic this block of HTML:
```html
<main>
  <div class="game-board">
    <p>I am the GameBoard.vue component</p>
    <ul class="cards">
      <li class="card">
        <div class="view front-view">
          <img src="images/que_icon.svg" alt="hidden card">
        </div>
        <div class="view back-view">
          <img src="images/img-1.png" alt="An emerald cut into a diamond shape.">
        </div>
      </li>
    </ul>
  </div>
</main>
```

If this is what you're seeing render in the browser, then you're ready to move on to [Step 4]().