### Install Dependencies

We have two kinds of dependencies in this project: tools, database and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need for the server
* `public/assets` - contains the all bower packages for the tools we need for the application

*Note that the `assets` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Settings & configuration
* Add [settings.js](settings_example.js) file in the root using the example as a template
* Add [config.js] (public/app/config_example.js) in `public/app` and include your [MapboxGL](https://www.mapbox.com/mapbox-gl-js/api/) access token

#### Authentication
* GitHub authentication is turned off by default. To enable this feature, set the `authentication` 
property in the [settings file](settings_example.js) to true. This feature also requires your GitHub
`clientId`, `clientSecret`, and `callbackURL`. By default, the `callbackURL` points to the our local port, 4000, also configurable in
[settings.js](settings_example.js). With this feature turned on, users are required to login into GitHub to enter the map application

### Serve & Build the application & watch for changes
* `grunt build watch`
* `node server.js`

The app is now running @ http://127.0.0.1:4000 !!!!