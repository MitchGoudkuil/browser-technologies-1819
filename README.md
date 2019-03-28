#Browser technologies

### My Club
Add your favorite club to the dashboard and receive notifications when they're playing. A project focussed on Progressive enhancement, fallbacks and feature detection.

##### Use case
I want to get a notification if my favorite team scores.
![Image from the interface](/img/app.png)

### Live Demo
[What to watch live link](https://mitchgoudkuil.github.io/web-app-from-scratch-18-19/week2)  

### Table of contents

* [Installation](#install)
* [Feature research](#Feature-research)
   * Assignment 1A - Break the internet
   * Assignment 1B - Fork the OBA
* [My Club](#My-club)
* [Progressive enhancement](#Progressive-enhancement)
* [Features and progressive enhancement](#Features-and-progressive-enhancement)
* [Feature detection](#Feature-detection)

### Installation
   ```bash
   # git clone
   git clone https://github.com/MitchGoudkuil/browser-technologies-1819.git

   cd browser-technologies-1819

   # dependencies
   npm install

   # start server
   npm run dev
   ```

### Feature research
<details><summary>Show research</summary>

## Assignment 1A
We had to do research to two features that websites use, remove them, to see how the websites will work after removing them.

I did the research on cookies and custom fonts.

###### Cookies
Since the new privacy law, cookies are a must have on most of the websites that store data from their users. The user has to have the ability to accept or decline the cookies used by the website. But how do those website's work if you just turn the cookies off?

###### Dorhoutmees.nl
Is the website of my old workplace. I never actually looked at the website before so it was nice to give it a test.

Things that stand out:
The cookie-bar that was installed on the website didn't have a decline option. The only option was an "oke" button so you would automatically accept.

After turning off the cookies the online chat was no longer there. The rest of the website was still working correctly and you could still navigate through the pages. After checking the cookies again I saw that still after reloading the website there were still new cookies installed. These were from an external web analytics website.

Solution:
Actually give the user the possibility to decline the cookies and then actually don't still force the cookies to the user.  

###### Bol.com
One of the biggest webshop's in the netherlands with a lot of products.

Things that stand out:
The things that stood out the most was that, after turning off the cookies, a big message appeared at the top of the page. The message tells the user that you can browse through the products but can't add or buy them because then the cookies are needed. I think that is kind of strange because what information is that important that a user MUST have them turned on. The only data I can think of is the products that you put in your basket.

Solution:
Maybe add the products that the user wants to the local storage so it is still possible to buy stuff without accepting the cookies.

## Assignment 1B - Fork the OBA
I cloned the oba project to this weeks folder and started to look at the 8 features from Assignment 1A. We had to take a look at our project and see what we can improve our progressive enchancement.

###### Turning off images
After turning the images off i found out that the application is still usable. The only problem was that the booklist, which showed images of the books only, was no longer visible. I also found out that I mostly forget to insert something in the alt tag. Because of this if a blind person would use the website with a screenreader he would get no explanation at all, which is especially bad in the book list.

Fix:
To solve the problem it would be better to fill in the alt tags and to include the title under the books in the book list.

![booklist](/img/lijst.png)

###### Turn off Custom fonts
Nothing really happened when I turned the custom fonts off. Some of the parts shifted a bit on the screen but not in a big screw-up way.

###### Checking for color blindness
I found out that the contrast is actually not that bad in the application. I think this is because of the limited colors I used which were mostly black white and red. After checking it with all of the possible types of color blindness the contrast stayed the same. Something that could get fixed is that the action buttons are the same as the answer buttons. We could fix this by changing the shape of the buttons.

![colorblindness](/img/eyesight.png)

###### Muis/Trackpad not working
This a feature I did'nt think about making the application. I used a button tag for the action buttons which could get reached by using "tab" which was good but sadly I used list items as the answers which did not have a tab index. So it's impossible to "tab" through the application if you don't have a mouse or trackpad.

Fix: To fix this I will have to generate the answers with a tags or button tags. This way it would be possible to use the tab button to go through the application.

###### Turning off Javascript
This feature would be really hard to change if the application stayed Clientside rendered. After turning javascript off the whole application would stop working after the first question. This is because the whole application is build around an Api which does a "get" request after the first question.

Fix: To fix this the application would need to be rebuild but this time server side rendered. This way I can let the server do the get request and not the client itself.

###### Cookies and local storage
I combined these two features together because after turning the cookies off the localstorage would also not work anymore.

I only used the local storage to store the data from the api. The moment I turn the localstorage off it's no longer possible to manipulate the data after the first question. This automatically makes the application unusable.

fix: I think it would be better to store the data not only in the localstorage but also in a global variable. This way if the localstorage is turned off we can still use the data gathered from the api.  
</details>

## My club
My club is a website in which a user can add his favorite eredivisie soccer team to the dashboard and will receive notifications when a game starts, his team scores and a game is finished. Using the notification Api the user has to accept notifications to also get notifications when the browser is not used.

![sketch of the dashboard](/img/sketch.png)

## Progressive enhancement
Functional:
Because the application is server side rendered its possible to add a team using a post request. And because of the auto reload a notification would show when a game started

Usable:
With css I did the styling so the website would actually look like a dashboard with some nice images and colors on them/

Pleasureable:
With javascript turned on the notifications on the page itself would turn-up. These notifications have a nicer appeal to the website and actually fit with the styling

## Features and progressive enhancement
The basic function and feature that I wanted to accomplish was to be able to send the user an notification with javascript enabled and disabled.

##### No javascript
With javascript disabled the website will reload every 10 seconds so if a new game starts the user will still get a notification on the page.

![dashboard with start notification](/img/start-notification.png)

##### No images and mouse and trackpad
The website is also able to use for blind people. The code is semantically coded so screen readers will still be able to read it perfectly. This also makes it possible to go through the website using the tab button.  The images have Alt tags filled in so if the images would get turned off there would still be a explanation of the image.

![dashboard with images](/img/images.png)| ![dashboard without images](/img/noimages.png)
---|---

## Feature detection
With HTML I didn't use tags that were not supported in older browsers. So most of the feature detection was for the Css part.

##### Css
Looking at the feature detection of css I found out that display grid and display flex were not supported in most browsers. I made a fallback with "@support not" with the classes that used it, so it would turn back to display: inline-block.

![dashboard with start notification](/img/cssfallback.png)

##### Js
To use the push notifications in the browser I had to install a service worker. Some of the older browsers do not support service workers so before registering I checked if the browser supported service workers.
![dashboard with start notification](/img/service.png)

I wrote down the check in javascript so now the push notification works in all supported brosers.
![dashboard with start notification](/img/ifservice.png)

I wanted to make a few more modifications to my application but the whole concept of working with node and express was really new to me so I was not able to actually code some of the features. Anyhow, I still wrote one down so if I ever wanted to add it I could automatically start with writing a fallback.

I wanted to add something extra to the form in which the user selects a team. If javascript was turned on I wanted to remove the submit button and when a team was chosen it would automatically add it to the dashboard, and when javascript was turned off the submit button would appear

###After running audits
![dashboard with start notification](/img/auditi.png)
After running de audit I was surprised and happy because of the high score.

## To do list
I wanted to do a lot more to the app, but sadly I did not have enough time to actually do them.

* [ ] Add an actual detail page
* [ ] Add autocomplete to the team form if javascript is disabled.
