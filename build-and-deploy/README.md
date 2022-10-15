# Build and deploy
1. Make a copy of the `images` directory from `static_site` and paste it into the `public` directory.

2. Make a copy of the `styles.css` file from the `static_site` directory and paste it into the `src` directory.

3. In `main.js` change the reference to `../static_site/style.css` to `./style.css`

4. In `CardView.vue` change the reference to `../static_site/images/que_icon.svg` to `./images/que_icon.svg`

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

7. Save, test, commit, and push all of the changes above.

8. Create and switch to a new branch named `gh-pages`

9. In your terminal, input the command `npm run build`

10. The build process will generate a compiled set of `html`, `js`, and `css` files in the `dist` folder.

>The `dist` directory is in the `.gitignore` file, so the changes from the build will not light up in your VS Code source control panel. Nevertheless you will want to add the `dist` directory's content to this new branch specifically for the purposes of deploying.

11. In your terminal input: `git add dist -f`
>That will stage all the changes from the `dist` directory, as the `-f` flag forces the project to see it, despite the `.gitignore` file's contents.

12. Commit the staged changes from the `dist` folder, but DO NOT PUSH them yet.

13. Now you will do a special type of `push` to your repository, it's called a `subtree`. The command to input to your terminal is:
```
git subtree push --prefix dist origin gh-pages
```

>What this command will do is push your local `gh-pages` branch up to your remote GitHub repository, but it will ONLY push the contents of the `dist` folder. So the root directory in the `gh-pages` branch in your repository will see the `dist` directory as the *_root_* of the project.

14. In the `Settings` tab of your repository in GitHub, navigate to the `Pages` section (from the navigation at the left) and you should see a subheader that reads *Build and deployment*. Under this header is a select field labeled *Source*. Make sure the source that's selected is `Deploy from a branch`. Below this will be another select field labeled *Branch*. Select the `gh-pages` branch from the first select field, and leave the second select field as `/ (root)`. Click the `Save` button.

15. Upon saving this change, a static pages deployment should automatically begin. Go to the `Actions` tab of your repository and you should see it running. When the deployment process is complete, you should be able to see your app at `https://{username}.github.io/{repository-name}`.

If you make any changes to your project after all this, make them in a fresh working branch that you will commit and push to the repo normally.

When you want to _*deploy*_ the project, follow the steps 8-13 above.
