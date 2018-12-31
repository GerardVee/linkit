## Open source link aggregator

linkit is an open source link aggregator. The app is built with Next.js, React and Redux.
It also includes the following third party APIs: Facebook Login, AWS Gateway, and Lambda.

See the site [here](https://www.linkitproject.com/).

<br>

## Use cases

Use this app to see useful links!

<br>

## Guide
- [Open source link aggregator](#open-source-link-aggregator)
- [Use cases](#use-cases)
- [Guide](#guide)
- [Develop locally](#develop-locally)
- [Deploy site](#deploy-site)
- [Configuration](#configuration)
  - [.env variables](#env-variables)
  - [API endpoints](#api-endpoints)
- [Team](#team)
  - [Hire](#hire)
  - [Members](#members)
  - [Contributing](#contributing)
- [Project information](#project-information)
  - [Built with](#built-with)
  - [License](#license)
- [Issues](#issues)
  - [Posting issues](#posting-issues)
  - [Resolving issues](#resolving-issues)
  
<br>

## Develop locally

***Note***

The voting features won't work on an insecure server due to Facebook Login. Please run on a certified site to utilize all features.

[Configure](#configuration). Run `yarn install` then run `yarn run dev`.

<br>

## Deploy site

***Note***

Make sure the site is certified so that Facebook Login works. Also have pm2 installed globally.

[Configure](#configuration). Run `yarn install`, then `yarn run build`. Your production files will be in `dist/`.

<br>

## Configuration

### .env variables

Save these key, value pairs to an .env file, using this syntax:

```
VARIABLE_NAME=VALUE
VARIABLE_NAME_2=VALUE
```
<br>

| variable name  | datatype  | description |
|---|---|---|
| NODE_ENV  | String  | Either `production` or `development`. |
| FB_APP_ID | String | Facebook API id. |
| API | String | API, no trailing /. |

<br><br>

### API endpoints

***Note***

Enable CORS.

<br>

| end point  | authorized | body | return type  | description |
|---|---|---|---|---|
| *GET* linkit/posts?order={ ORDER? }&accessToken={ TOKEN? }  | Yes (via token) | `QUERY: String (queryParameter), TOKEN: String (queryParameter)` | `[Object]`  | A lit of search objects. |
| *POST* linkit/upvote  | Yes (via token) | `post_id: String, accessToken: String` | `{ upvoted: Boolean, downvoted: Boolean }`  | After voting, it returns What voing a post has. |
| *POST* linkit/downvote  | Yes (via token) | `post_id: String, accessToken: String` | `{ upvoted: Boolean, downvoted: Boolean }`  | After voting, it returns What voing a post has. |

<br><br>

## Team

`linkit` was built using various technologies, and having to deploy for production on S3's website hosting was a learning experience. Various issues came up, but it was fun to work through all that!


### Hire

`linkit` was remade alongside [bookshelf](https://github.com/GerardVee/bookshelf), my newest and toughest project yet. [Contact me](https://gerardvee.com/contact) if you're interested in my skills.


### Members

- [gerardvee](https://github.com/GerardVee)


### Contributing

Please post an issue if you believe you've found one. I'll get right to work on it. Additionally, you can post features under issues. Just make sure to clarify that it is a feature!

<br>

## Project information

Specifics of the project. Technologies and licensing are displayed here.

### Built with

**Base**

- [Next.js](https://github.com/zeit/next.js)
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)

**Supported by**

- Facebook Login
- AWS Gateway
- AWS Lambda

### License

All code in this repository is provided under the [MIT License](https://github.com/GerardVee/linkit/blob/master/LICENSE.md).

<br>

## Issues

Issues are a part of life. That doesn't mean we have to live with them though! If you encounter an issue, make sure it hasn't been [resolved](https://github.com/GerardVee/linkit/issues?utf8=%E2%9C%93&q=is%3Aresolved) yet.


### Posting issues

New issue structure:

```
## Reproduce

How this issue can be reproduced.

## Work Around

(Potential work arounds), not necessary.

Potential Solutions

1. (Potential solution)
2. (Potential solution)
not necessary.

Extra information.
```

<br>

### Resolving issues

Issue resolved structure:

```
## What caused this

The specifics of what caused this.

## What was done

What was done to help resolve this.

## What technology was used

What extra technology if any was implemented/imported to help resolved this issue.

### Before

The code core to the issue before the change.

### After

The fixed code.

```
