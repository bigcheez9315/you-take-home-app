# You.com Backend Takehome Challenge

We're going to be integrating with a JSON API that returns image URLs.
It's hosted [here](https://youdotcom-interview-api.azurewebsites.net/api/HttpAPI).

# Requirements

* Build a CI/CD pipeline in Github Actions to deploy an API in Kubernetes in AWS at a url of your choice.
*  The API should expose a few routes:
    - `GET /metadata/{image_index}` return the URL and title of the image with that index.
    - `GET /image/{image_index}` download the image from its URL and return it base64 encoded.
    - `GET /images` this should return all of the images base64 encoded.
    - `GET /images?filter=<PROP>` add a query parameter that allows you to filter by an image property to remove any duplicates. If the property doesn't exist, you should return the proper HTTP status code
* The API should be accessible remotely and only with HTTPS
* the entire submission (code/scripts) must be checked into this repository
* include clear instructions to run any code/scripts/commands
* No restriction on use of any open source tools or libraries. But, you should be prepared to explain in detail how these libraries/tools work internally. If you are unsure about their internals, it is better to avoid using them and go with a simpler, more understandable approach instead.

The assignment is open ended and the point of the exercise is to assess code modularity, usability, extensibility and debuggability. We do not expect you to spend more than 5 hours on this. Instead, we expect a working solution with scope/ideas for improvement and their pros/cons which will be discussed in a follow up meeting.

Bonus points:
- Add caching so that you don't need to hit our API everytime


## Your instructions:
Below, include instructions on how to run your code, build  and how to send requests to your API.

...
