## Pre-Setup

### Install Git

Check if Git is installed by running the below command
If it isn't installed the command will install it

### `git --version`

Make sure git ignores cases:

### `git config --global core.ignorecase false`

### Install node 18

download and install node 18 from here:
https://nodejs.org/en/download

### Brew

### `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Install yarn

### `brew install yarn`

### Enable prettier and reformatCode

1. go to the settings
2. search for `Prettier`
3. Select `Automatic prettier configuration`
4. Enable `Run on save`
5. search for `Actions on save`
6. Enable `Reformat Code`
7. Apply the new settings

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs dependencies

### `yarn start`

Runs the app in the production mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn dev:start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles the server and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your server is ready to be deployed!
