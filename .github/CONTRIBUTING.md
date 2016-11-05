## Read and contribute to the Wiki

Make sure you read the [Wiki](https://github.com/angulartics/angulartics2/wiki).

## Submitting Pull Requests

If you're changing the structure of the repository please create an issue first.

The release process is automated using [semantic-release](https://github.com/semantic-release/semantic-release), for best release result follow these simple steps:

```
git add --all
npm run commit
git push origin master
```

* Do not add/change the package.json version field.
* Create unit test for any new functionality you add in your commits.

## Submitting bug reports

Make sure you are on latest changes and that you ran this command `npm run clean:install` after updating your local repository. If you can, please provide more information about your environment such as browser, operating system, node version, and npm version.

## Project Structure

The configuration files are devided in config/, config/advance/ and config/custom
- src/core 
- src/providers/ This folder contains one folder per provider