# GiantBomb Lurker

## Initial assumptions

The purpuse of this is to provide interactive web interface for simple operations over GiantBomb API.
I do not find a need to have any backend/server as most operations can happen directly over GiantBomb API (although we will need reverse proxy to bypass CORS).

### Dev build
- This project assumes typical x86 POSIX environment: `linux/macos/WSL2(windows)`
- Core dependency: `npm v8.1`
- Clone this repo using: `git clone`
- Change dir to root of this project: `cd giant-bomb-lurker/`

Install dependencies:
```
npm install
```
Run GiantBomb proxy as background process (todo: create docker-compose to coordinate proxy+app):
```
./node_modules/.bin/lcp --proxyUrl https://giantbomb.com &
```
*Info: Your proxy will be available at: http://localhost:8010/proxy*


Run Application, but first set GB_API_KEY value to one provided in the email. (Since it is public repo, protecting a private key seems reasonable :))
```
GB_API_KEY="value_provided_via_email" npm run dev
```

Project should be available via svelte development server (supporting auto reloads).
*Visit using your browser* http://localhost:5555/

**Remember to clean up proxy process after you are finished**
Make sure what your bg processes are, run: `jobs` and if lcp is first on the list: `kill -TERM %1`


### Details of implementation

I am building SPA using js frontend. I am assuming target device of user/customer will be desktop. 
Styling and visual polish is kept to a minimum. This application will offer:
  - navigation: title + interactive search bar + cart link with number of items
  - view showing search results, with possibility to add/remove item to/from cart 
  - checkout view which is a summary of the cart and button triggering alert of checkout "Processing not implemented"

Other remarks/notes:

- We need to have a reverse proxy to bypass cors, in a perfect scenario this proxy would be customizable to take care of authentication (appending query API key), however seeking this perfect condition would create a small project on its own, so application will handle authentication.

- Since this is frontend task with limited complexity and I have Svelte framwork familiarity. I am choosing it as base for my project. Normally I would study the paths forward a bit more, most likely react/reagent/re-frame/angular would be more viable choices for the customer/company in terms of maintanance and later modifications(depending on teams & traditions of the customer/company).

- The application runs with ephemeral persistence. After page reload the cart will reset. Since persistence was not required and there are several ways to prvoide it, I have chosen to skip it. Easiest path would be to keep cartState locally using browser's localStorage api.

- Another thing that seemed like really good idea is to add "more" button on search. I am skipping it due to time constraints + it was not defined in as requirement. I am just hinting here, that I would have consulted with the rest of team/product owner on this. I find it is important to provide access to remaining pages (search in API has limits for 10 items) and would recommend adding this.

- Elephant in the room. There is no tests. I also feel a bit uneasy about it, but the scope of the app is small, setting up comprehensive testing for frontend projects (so that tests offer useful data) is a bit more complicated and most likely to be coordinated with more robust CI/CD, dev/prod environment setup (docker et al).