# ipl-dashboard
> A Vue.js Application

### Libraries Used:
  - Vue.js (JavaScript framework)
  - Vuex (Store management)
  - Vue-router (routing in the app)
  - Bootstrap-vue (Styling)
  - Vue-Charts (Vue plugin for Google charts)
  - jQuery (async data read from static csv's)

### Features (and Description)

  - App created in vue.js
  - Optimized loading time
  -- Data once loaded is stored in *localStorage* and is used to render pages on subsequent loads while it is being updated in the background.
- App is mobile responsive to an extent
-- Menu bar collapses to the top in mobile devices, charts are scaled based on screen size during loading.
- App is offline usable
-- Server is hit only when the app is first loading, after which, the state is kept on client's browser and components do not need to request data.
-- App works even if connectivity is lost after or even during (if data from previous load was present in *localStorage*) the initial load of the application.

### Installation

```sh
clone repo
$ npm install
$ npm start
```

To see the application, visit https://aayush123.github.io
