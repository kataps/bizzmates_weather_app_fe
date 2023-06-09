### Details

* It's simple and user-friendly. It includes a search bar that allows users to input a city within Japan, along with validation functions.
* In the weather section, you can see a blurry card glass that indicates the active weather, followed by small white cards. Users can select these small cards to set them as active.
* The Venues section displays historic places within the searched city. Users can view the name, address, postcode, and region, which serve as guides if they want to visit those places.
* In the Top Cities section, users can simply select a city and it will be automatically searched.
* I have also included a loading indicator to inform users that an action is in progress.

Package used:

+ Bootstrap 5: A powerful library that will help me create responsive designs due to its powerful grids and stylish design.
+ vue-loader: Used as a loader.
+ jQuery: I only use this package because it's a requirement, but I prefer using axios for HTTP requests due to its advantages in API integration (e.g., automatic CSRF token inclusion in the header).
+ AOS: Used for card animations, but I temporarily removed it due to compatibility issues.
+ I have created separate components for the weather and venues. They are dynamic and uncluttered, making them easy to read and understand.

### Project setup
```
npm install
```
### setup environment variable
Setup your VUE_APP_WEATHER_API in your invironment. It should be the ip and port of the backend.
```
mv .env.example .env
```

### Compiles and hot-reloads for development
```
npm run serve
```


