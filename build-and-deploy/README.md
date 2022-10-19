# Build and deploy
The final step of this project is to `build` and *deploy* your game.

## How the Vite / Vue build process works
[Vite](https://vitejs.dev/) is a *bundler* or a *compiler* (depending on who you talk to - I say "compiler") which provides a local development server with [Hot Module Replacement (HMR)](https://vitejs.dev/guide/features.html#hot-module-replacement).

It also will bundle/compile your project for *static output*.

This kind of package (bundler/compiler) is used so you can work quickly as you are developing a project with a framework (React, Vue, Angular, Svelte, etc), because your code is being developed in separate component files and not in static HTML.

A web browser cannot read your individual components so the way to view the project in the browser is to have a local development server running to compile the components (and re-compile them - HMR - as you work).

When you want to put your project into *production* (the live world wide web), you will want to build the project, and output some compiled files, which will be HTML, CSS and JS files.

To build the project, you run a script that's been automatically written for you, by your original installation, inside your `package.json` file. The command to input to your terminal (in your project root directory) is `npm run build`.

The build script will scrape through your whole project - and compile everything; all the components as they are referenced inside the project with variables, all the data that your are looping over, etc. will be captured by the build process. This will create an `index.html` file for you, in the fashion needed for your reactive frontend to work. This `index.html` file will be output to a `dist` directory.

All the `<script>` tags from your components, and all the javascript being referenced and/or imported inside the individual component files will be extracted, combined, and minified into static JS file(s).

All the `<style>` tags from inside components (you don't have any of these in this particular assignment) and all the imported CSS files will ALSO be extracted, combined, and minified into static CSS file(s).

All of the bundled/compiled files will be output to a directory called `dist` which is listed in your `.gitignore` file. If you are using VS Code as your IDE, then the `dist` folder will appear _grayed-out_ in your file explorer panel, because by default the `dist` directory is not tracked by git.

The asset files (CSS & JS in this case) that are ultimately created will have some strange filenames, which include unique identifying numbers.
Compiled JS and CSS files will output to `dist/assets`.

Vite will also look for, and make copies of your project's images for locally-referencing images within the `dist` directory, but in order for that to work, those images you were using for development need to exist in the `public` directory.

### Follow these steps to prepare, build, and deploy the project:

1. Make a copy of the `images` directory from `static_site` and paste it into the `public` directory.

2. Make a copy of the `styles.css` file from the `static_site` directory and paste it into the `src` directory.

3. In `main.js` change the reference `../static_site/style.css` to `./style.css`

4. In `CardView.vue` change the reference `../static_site/images/que_icon.svg` to `./images/que_icon.svg`

5. In `memoryCards8.js` use find-and-replace to replace all instances of `../static_site/images` with `./images`

>*Optional:* if your custom game features added any image assets in other directories besides `images`, they also need to be moved to the `public` directory and their references in the code will need to be updated. For any extra script or style files, they will need to be copied into the `src` directory, and their references in the code updated as well.

6. In your `vite.config.js` file, in the `export default defineConfig({ ... })` object, add the line `base: "",` as the first line inside the object, like this:
```js
export default defineConfig({
  base: "",
  plugins: [
```
Inside the empty string value of the `base` property you've just added, put your repository name between two `/`s. So if your repo name is `memory-card-game-vue` then the line you would see is:
```js
base: "/memory-card-game-vue/",
```

7. Save, test, commit, and push all of the changes above to your remote repository.

8. Create and switch to a new branch named `gh-pages`.

9. In your terminal, input the command `npm run build`.

10. The build process will generate a compiled set of `html`, `js`, and `css` files in the `dist` folder.

>The `dist` directory is in the `.gitignore` file, so the changes from the build will not light up in your VS Code source control panel. Nevertheless you will want to add the `dist` directory's content to this new branch specifically for the purposes of deploying.

11. In your terminal input: `git add dist -f`.
>That will stage all the changes from the `dist` directory, as the `-f` flag forces the project to see it, despite the `.gitignore` file's contents.

12. Commit the staged changes from the `dist` folder locally, but DO NOT PUSH them yet.

13. Now you will do a special type of *push* to your repository, it's called a `subtree`. The command to input to your terminal is:
```
git subtree push --prefix dist origin gh-pages
```
>What this command will do is push your local `gh-pages` branch up to your remote GitHub repository, but it will ONLY push the contents of the `dist` folder. As a result, the `gh-pages` branch in your repository will use the `dist` directory as the *_root_* of the project. None of the other project files will exist in the `gh-pages` branch.

14. In the `Settings` tab of your repository in GitHub, navigate to the *Pages* section (from the navigation at the left) and you should see a subheader that reads *Build and deployment*. Under this header is a select field labeled *Source*. Make sure the source that's selected is `Deploy from a branch`. Below this will be another select field labeled *Branch*. Select the `gh-pages` branch from the first select field, and leave the second select field as `/ (root)`. Click the `Save` button.

15. Upon saving this change, a static pages deployment should automatically begin. Go to the *Actions* tab of your repository and you should see it running. When the deployment process is complete, you should be able to see your app at `https://{username}.github.io/{repository-name}`.

If you need to make any changes to your project after all this, make them in a fresh working branch that you will commit, and push to the remote repository (and even `merge` to your `main` branch) normally.

### When you want to _*deploy*_ the project again, follow the steps 8-13 above.
