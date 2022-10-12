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
When you save this and look at it in the browser, you should see a single blank card on the game board with a broken icon image. When you inspect the card with your dev tools, you will see that there is one `<li class="card">...</li>` with two copies of the `<div class="view front-view">...</div>`. Since your CSS is setup to have these `<div class="view">...</div>` elements visually stack on top of one another, you only see one on the screen.

What about the second `<div class="view front-view">`? That needs to render with the class `back-view` instead of `front-view`. For this, we will use a *prop*.

In your `CardView.vue` file, add the `defineProps()` function to the `<script setup>` tag at the top of the file, with a *prop* named `viewType`:
```html
<script setup>
defineProps({
  viewType: {
    type: String,
    required: true,
  },
});
</script>
```
Here we are telling the Vue compiler that whenever the `CardView.vue` component is called as a _child component instance_ it is `required` to have a `viewType` prop in it. If you save this change to `CardView.vue`, in your dev tools console in the browser you will see an error message like this:
```
[Vue warn]: Missing required prop: "viewType" found in
---> <CardView> at...
```
This error should have shown twice in your console (or have the number `2` next to the error) because inside the `CardWrapper.vue` component, you are calling `<CardView />` twice, and neither instance is passing along a `viewType` prop.

To fix this, open your `CardWrapper.vue` file and the `viewType` prop to each `<CardView />` component instances. Give the first instance a `viewType` value of `front` and the second instance a `viewType` value of `back`.

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
When we add a colon `:` before the `class` attribute, we are *binding* the attribute to Vue. It's a shorthand for `v-bind:class`. With the binding in place, everything between the quotation marks in `:class="..."` will be evaluated as JavaScript! So inside the quotation marks we add backticks so that we have the option of *string interpolation*, and we can use the `viewType` prop as a *variable* within the string.

Save this change and view the app in your browser. Use the dev tools inspector to see the two `<div>`s that are compiled from the two component instances of `<CardView viewType="">` you will see that the first `<div>` has a class attribute of `"view front-view"` and the second `<div>` has a class attribute of `"view back-view"`.

Now that the view types for the divs are setup, you will need to address the variation of the `<img>` tag.

