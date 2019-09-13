<img 
    src="../../../assets/svg/pyze.svg" 
    alt="pyze analytics logo"
    height="100px"
    width="200px" />

# Pyze 

__homepage__: [pyze.com](https://www.pyze.com/)  
__docs__: [docs.pyze.com/web.html](https://docs.pyze.com/web.html)  
__import__: `import { Angulartics2Pyze } from 'angulartics2/pyze';`  

## Setup

1. Add [tracking code provided by Pyze](https://docs.pyze.com/web.html#add-code-in-your-web-or-saas-app-to-use-the-pyze-sdk) inside the header tag.

2. Remember to replace `YOUR_PYZE_APP_KEY` placeholder with the [Pyze App Key](https://docs.pyze.com/web.html#get-pyze-app-key) obtained from [growth.pyze.com](https://growth.pyze.com)

   Note: You don't have to use `Pyze.postPageView("PageTitle", "Page URL");` api separately as it is called by angulartics for each page transition. 

3. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/master#installation) using `Angulartics2Pyze`
