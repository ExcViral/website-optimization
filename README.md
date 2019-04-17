## Website Performance Optimization portfolio project

### [Click this link to open website](https://excviral.github.io/Project-Website-Optimization-Udacity/).

### [Check Google PageSpeed Insights Score](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fexcviral.github.io%2FProject-Website-Optimization-Udacity%2F&tab=desktop).


This Project is a part of the [Udacity Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) programme.


The original github repository for this project can be found [here](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)

The objective of this project was to optimize a provided website so that it achieves a target PageSpeed score of atleast 90 and renders at around 60 frames per second, so that user has a jank free experience.

The project folder contains two main folders:
* **dist /** _contains the production code_
* **src /** _contains the source code_

Gulp has been used in this project for optimizing the source code. If you are unfamiliar to Gulp, I recommend going through [this guide of CSSTricks](https://css-tricks.com/gulp-for-beginners/).

### Getting started
### How to run the website ?
##### Run locally using python server
 1. Clone or Download this repository to your computer:
 ```
 # Run the following commands in Terminal :
 $ git clone https://github.com/ExcViral/Project-Website-Optimization-Udacity.git
 ```
 2. Navigate to the dist/ directory inside the the project folder and start the python webserver:
 ```
 # Run the following commands in Terminal :

 $ cd Project-Website-Optimization-Udacity
 $ cd dist

 # I am using port 8000 to run the server. To change port number substitute 8000 in the command below with your desired port number.
 # now start the python webserver using the following command :

 $ python -m http.server 8000
 ```
 3. Now open browser and type the following address in the address bar :
 ```
 127.0.0.1:8000
 ```

##### Tunneling your website using Ngrok
 1. Download Ngrok from the [official website](https://ngrok.com/). Save it inside the project folder.
 2. Unzip it inside the folder dist /
 ```
  # Open Terminal inside the dist folder and run the following command :
  $ unzip ../ngrok*
 ```
 3. Now start a local python server using the instructions given above.
 4. Now start Ngrok tunnel :
 ```
 # Open Terminal inside the dist folder and run the following command :
$ ./ngrok http 8000
 ```
 5. Now the Ngrok tunnel must have started. Your Terminal will display information about the tunnel. You will find a link in the _Forwarding_ label, copy and paste that link in your browser. If you have done everything correctly, you will see the website load in the browser window.

### How to make changes to website ?
As mentioned above, the source code is located inside the _src /_ folder and the production code (minified and opimized) is located inside _dist /_ folder.<br>
Make the changes you want to the files inside the _src /_ folder.<br>
 To automatically generate production code, you will need to set up Gulp. Follow the instructions below :

##### Setting up Gulp
  1. Make sure you have _Node Js_ installed on your system. If not, you can find the installation guide [here](https://nodejs.org/en/download/package-manager/).
  2. Install Gulp (_Skip this step if you have gulp installed on your system_)
  ```
  # Run the command below in your Terminal :
  $ sudo npm install gulp -g
  ```
  3. Navigate to the root of project folder and follow these instructions :
  ```
  # Open Terminal inside the root of project folder and run the following commands :

  $ npm i
  $ npm install --save-dev gulp-uglify gulp-minify-css gulp-htmlmin gulp-image-optimization gulp-webserver

  # Type the following command to check if Gulp has been set up properly :

  $ gulp

  # If you have followed the steps correctly, You should now see gulp starting and running specified tasks in the gulpfile.js
  ```
  4. Now you have finished setting up Gulp inside the project folder. Whenever you make changes, and you want to generate production code, just open Terminal inside root of project folder and run `$ gulp `, The production code will be automatically generated and saved inside dist folder.


#### Part 1: Optimize PageSpeed Insights score for index.html

* ###### Successfully achieved a PageSpeed Insights score of **93** for mobile devices and **95** for desktop devices. [Check out on Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fexcviral.github.io%2FProject-Website-Optimization-Udacity%2F&tab=desktop)
* Eliminated render blocking CSS by **embedding** the main CSS stylesheet into index.html and adding media attribute to print stylesheet.
* Used JavaScript to load google font 'Open Sans' asynchronously.
* Added **async** attribute to all the scripts, and shifted all the scripts from head to just above closing body tag, so that it won't block parsing.
* **Optimized** all the images, which saved more than 2 MegaBytes of data.
* **Minified** HTML, CSS, and JavaScript files using Gulp Tasks, which saved a lot of data.

#### Part 2: Optimize Frames per Second in pizza.html

* ###### Successfully optimized 'views/js/main.js' and 'views/pizza.html' so that it renders with a consistent frame-rate at 60fps when scrolling.
* ###### Successfully reduced time to resize pizzas to less than 5 ms. Resize time is shown in the browser developer tools.
* To achieve the frame rate of 60 fps, I took a few calculations out of the loops they were in, and shifted them to top of the function so they will be assigned only once. I also made the number of pizzas dynamic, it changes with respect to screen height.
See the comments below for more details.

```
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");
  var topPosition = document.body.scrollTop / 1250;
  var phases = [];

  for (var i = 0; i < 5; i++) {
    phases.push(Math.sin(topPosition + i));
  }

  for (var i = 0; i < items.length; i++) {
    /* moved the Math.sin calc above out of the loop so it just gets called
     * once, when the function is called */
    items[i].style.left = items[i].basicLeft + 100 * phases[i % 5] + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  var pizzasToDisplay = Math.ceil(screen.height / s) * 8
  console.log(pizzasToDisplay);
  var movingPizzas = document.getElementById('movingPizzas1');

  /* moved the reference above out of the loop below so it only needs to getAdj
   * initialized once - at page load. Also replace query selector with
   * getElementById, which is supposed to be faster. */

  for (var i = 0; i < pizzasToDisplay; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas.appendChild(elem);
  }

  /* move the items variable out of the loop above. It's initialized in the
   * global scope, and then assigned a value once, on page load. */

  items = document.getElementsByClassName('mover');
  updatePositions();
});

```

* I made the following changes for reducing time to resize pizzas. See the comments in the code :

```
/* Eliminated the determineDx function and extracted this function */
function sizeSwitcher (size) {
  switch(size) {
    case "1":
      return 0.25;
    case "2":
      return 0.3333;
    case "3":
      return 0.5;
    default:
      console.log("bug in sizeSwitcher");
  }
}

var windowWidth = document.getElementById("randomPizzas").offsetWidth;

function changePizzaSizes(size) {
  var randomPizzas = document.getElementsByClassName("randomPizzaContainer");

  for (var i = 0; i < randomPizzas.length; i++) {
    // var dx = determineDx(randomPizzas[i], size);
    // var newwidth = (randomPizzas[i].offsetWidth + dx) + 'px';
    // var newwidth = sizeSwitcher(size) * windowWidth + 'px';
    randomPizzas[i].style.width = (sizeSwitcher(size) * windowWidth) + 'px';
  }
}
```
