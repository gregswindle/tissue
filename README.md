# `github-resource-converter` [![NPM version][npm-image]][npm-url]

> <img align="bottom" alt="issue-opened" height="50" width="50"  src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/desktop-download.svg"> Convert GitHub Issues and Pull Requests to JSON and CSV from a Terminal or Node.js app.

[![The MIT License][license-image]][license-url]
[![FOSSA Status][fossa-image]][fossa-url]<br>
[![NSP Status][nsp-image]][nsp-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Development Dependency Status][daviddm-dev-image]][daviddm-dev-url]<br>
[![MacOS and Ubuntu build statuses][travis-image]][travis-url]
[![Windows build status][appveyor-image]][appveyor-url]
[![Coverage percentage][codacy-coverage-image]][codacy-url]
[![Codacy code quality][codacy-image]][codacy-url]
[![NPMS score][npms-image]][npms-url]
[![NPM downloads per month][npm-downloads-month]][npm-url]

## Table of contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:excludeText=Table of contents) -->
- [1. Overview](#1-overview)
- [2. Installation](#2-installation)
  * [2.1. For Terminal/command-line usage](#21-for-terminalcommand-line-usage)
  * [2.2. As a application dependency](#22-as-a-application-dependency)
- [3. Usage](#3-usage)
  * [3.1. Formatting](#31-formatting)
  * [3.2. Resource types](#32-resource-types)
  * [3.3. Filtering](#33-filtering)
  * [3.4. Exporting](#34-exporting)
    + [3.4.1. Issues](#341-issues)
    + [3.4.2. Pull Requests](#342-pull-requests)
    + [3.4.3. All (open and closed issues and pull requests)](#343-all-open-and-closed-issues-and-pull-requests)
  * [3.5. Command-line flags](#35-command-line-flags)
  * [3.6. Errors](#36-errors)
  * [3.7. Info](#37-info)
- [4. API](#4-api)
  * [4.1. `grc.authenticate({token, type, key}): void`](#41-grcauthenticatetoken-type-key-void)
    + [4.1.1. Parameters](#411-parameters)
    + [4.1.2. Example](#412-example)
  * [4.2. `grc.getAll({owner, repo}): Promise`](#42-grcgetallowner-repo-promise)
  * [4.3. `grc.issues.getForRepo({owner, repo}): Promise`](#43-grcissuesgetforrepoowner-repo-promise)
    + [4.3.1. Parameters](#431-parameters)
    + [4.3.2. Examples](#432-examples)
  * [4.4. `grc.logger`](#44-grclogger)
  * [4.5. `grc.options`](#45-grcoptions)
  * [4.6. `grc.pullRequests.getForRepo({owner, repo}): Promise`](#46-grcpullrequestsgetforrepoowner-repo-promise)
    + [4.6.1. Parameters](#461-parameters)
    + [4.6.2. Examples](#462-examples)
  * [4.7. `grc.save({data, dest}): Promise`](#47-grcsavedata-dest-promise)
    + [4.7.1. Parameters](#471-parameters)
    + [4.7.2. Examples](#472-examples)
  * [4.8. `grc.toCsv({data=[]}): Promise`](#48-grctocsvdata-promise)
    + [4.8.1. Parameters](#481-parameters)
    + [4.8.2. Examples](#482-examples)
- [5. Version](#5-version)
- [6. Contributing](#6-contributing)
- [7. License](#7-license)
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## 1. Overview

`github-resource-converter` (alias `grc`) exports your GitHub and GitHub Enterprise repositories' Issues and Pull Requests to `CSV` and `JSON` file formats. It's helpful whenever you need to:

* **Use spreadsheets** to analyze, modify, print, or summarize large amounts of data with Pivot Tables and other important financial or statistical operations

  _Example:_

  > ```bash
  > # Convert all GitHub issues to CSV:
  > $ github-resource-converter \
  >   --owner foo \
  >   --repo  bar
  > # => Saved "foo-bar-issues-export.2018-03-20T02_11_04_356Z.csv".
  > ```

* **Share data** with other tools like GitLab and JIRA.

  _Example:_

  > ```bash
  > # Convert and save all GitHub Enterprise
  > # Pull Requests as JSON (using the grc alias):
  > $ grc \
  >   --owner gregswindle \
  >   --repo github-resource-converter \
  >   --resource-type pr \
  >   --dest './docs/reports/export.json'
  > # Saved "docs/reports/gregswindle-github-resource-converter-pr-export.2018-03-20T02_18_33_682Z.json".
  > ```

## 2. Installation

1.  **Required:** `github-resource-converter` is written in JavaScript (CommonJS) for [Node.js ![External link][icon-octicon-link-external]](https://nodejs.org/), which must be installed prior to use. Node.js requires **npm**, which is used for installing dependencies. (**npm** installs with Node.js.)

1.  **Recommended:** To avoid rate-limiting, you should [create a personal access token ![External link][icon-octicon-link-external]](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) and save your personal access token.

    * **MacOS and Unix**

      ```bash
      $ mkdir -p /usr/local/etc/github-resource-center/envvars/
      $ touch /usr/local/etc/github-resource-center/envvars/.env
      $ echo "GITHUB_ACCESS_TOKEN="{your-personal-access-token-value}" > \
        /usr/local/etc/github-resource-center/envvars/.env
      ```

    * **Windows**

      ```shell
      > md -p C:\usr\local\etc\github-resource-center\envvars\
      > touch C:\usr\local\etc\github-resource-center\envvars\.env
      > echo "GITHUB_ACCESS_TOKEN="{your-personal-access-token-value}" >>
        C:\usr\local\etc\github-resource-center\envvars\.env
      ```

### 2.1. For Terminal/command-line usage

```bash
# Install globally to execute from a Terminal/command-line
$ npm i -g github-resource-converter
```

### 2.2. As a application dependency

```bash
# Install as a dependency within a Node.js app
$ npm i --save github-resource-converter
```

## 3. Usage

> <img align="left" alt="terminal" height="30" width="30" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/terminal.svg"> The following examples assume that `github-resource-converter` is installed globally and invoked from a Terminal (command-line interface)

### 3.1. Formatting

`--dest export.[csv|json]`

> You can convert GitHub (Enterprise) Issues and Pull Requests into two file formats: `CSV` and `JSON`.

* CSV is the default format.
* JSON formatting requires a `--dest` value with a `.json` file extension.

### 3.2. Resource types

`--resource-type, -t`

> Convert and export GitHub (Enterprise) by `--resource-type`: `issues`, `pull_requests`, or both (`all`).

* `issues` is the default `resource-type`.
* `prs` require a `--resource-type` or `-t` value of

  * `pr`
  * `prs`
  * `pull_request`
  * `pull_requests`

* `--resource-type all` will export all `issues` and `prs` into a single file.

### 3.3. Filtering

> ![alert][icon-octicon-alert] **Filtering is currently unavailable.**
>
> If you're interested in [CONTRIBUTING](#contributing) to features like filters--e.g., only select
> "open" issues--we're happily accepting pull requests!

### 3.4. Exporting

#### 3.4.1. Issues

* **CSV**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/rrepos/:owner/:repo/issues
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --dest  './docs/reports/export.csv'
  > ```

  _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/issues
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin
  > ```

* **JSON**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/repos/:owner/:repo/issues
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --dest  './docs/reports/export.json'
  > ```

  _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/issues
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin
  >   --dest ./export.json
  > ```

#### 3.4.2. Pull Requests

* **CSV**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/repos/:owner/:repo/pulls
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --resource-type pr
  > ```

  _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/pulls
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin \
  >   --resource-type pr
  > ```

* **JSON**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/repos/:owner/:repo/pulls
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --resource-type pr
  >   --dest './export.json'
  > ```

  _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/pulls
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin \
  >   --resource-type pr
  >   --dest './export.json'
  > ```

#### 3.4.3. All (open and closed issues and pull requests)

* **CSV**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/repos/:owner/:repo/pulls
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --resource-type all
  > ```

* _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/pulls
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin \
  >   --resource-type all
  > ```

* **JSON**

  _GitHub:_

  > ```bash
  > # GET https://api.github.com/repos/:owner/:repo/pulls
  > $ github-resource-converter \
  >   --owner gregswindle \
  >   --repo  github-resource-converter \
  >   --resource-type all
  >   --dest './export.json'
  > ```

* _GitHub Enterprise:_

  > ```bash
  > # GET https://api.ecorp.com/api/v3/repos/:owner/:repo/pulls
  > $ grc --base-url https://api.ecorp.com/api/v3 \
  >   --owner evilcorp \
  >   --repo ecoin \
  >   --resource-type all
  >   --dest './export.json'
  > ```

### 3.5. Command-line flags

<dl>
  <dt><code>--owner, -o</code></dt>
  <dd><p><strong>Required.</strong> The GitHub account name or organization name.</p></dd>
  <dt><code>--repo, -r</code></dt>
  <dd><p><strong>Required.</strong> The name of the GitHub (or GitHub Enterprise) repository.</p></dd>
  <dt><code>--base-url</code></dt>
  <dd><p>The GitHub REST API v3 URL origin, or a GitHub Enterprise URL origin and path-prefix.</p>
    <table>
     <tbody><tr><th>Default value:</th><td><samp>https://api.github.com</samp></td></tr></tbody>
    </table>
  </dd>
  <dt><code>--dest, -d</code></dt>
  <dd><p>The destination path and file name of the CSV.</p>
    <table>
     <tbody><tr><th>Default value:</th><td><samp>./export.csv</samp></td></tr></tbody>
    </table>
  </dd>
  <dt><code>--no-auto-filename</code></dt>
  <dd><p>Disable automatic file naming.</p>
    <table>
     <tbody><tr><th>Default value:</th><td><samp>false</samp></td></tr></tbody>
    </table>
  </dd>
  <dt><code>--resource-type, -t</code></dt>
  <dd><p>Declares whether to convert and export Issues, Pull Requests, or All.</p>
    <table>
      <tr>
        <th>Default&nbsp;value:</th>
        <td><samp>issues</samp></td>
      </tr>
      <tr>
        <th>Valid values:</th>
        <td><samp>all</samp>, <samp>issue</samp>, <samp>issues</samp>, <samp>pr</samp>, <samp>prs</samp>, <samp>pull_request</samp>, <samp>pull_requests</samp></td>
      </tr>
    </table>
  </dd>
</dl>

### 3.6. Errors

Errors are written to the console (`stdout`) as JSON:

```bash
# Attempt to fetch issues from a repository that doesn't exist
$ grc --owner example --repo error
[2018-03-20T02:31:24.737Z] ERROR: github-resource-converter/48219 on User.router.home: {"message":"Not Found","documentation_url":"https://developer.github.com/v3/issues/#list-issues-for-a-repository"}
  HttpError: {"message":"Not Found","documentation_url":"https://developer.github.com/v3/issues/#list-issues-for-a-repository"}
      at response.text.then.message (/p/a/t/h/github-resource-converter/node_modules/@octokit/rest/lib/request/request.js:56:19)
      at <anonymous>
      at process._tickCallback (internal/process/next_tick.js:188:7)
```

### 3.7. Info

The `--help` flag displays all options:

```shell
$ grc --help

  Convert and export GitHub resources--Issues and Pull Requests--to CSV and JSON.

  Usage

    $ grc [options] [info]
    $ github-resource-converter [options] [info]

  Options

    --base-url           The GitHub REST API v3 URL origin, or a
                         GitHub Enterprise URL origin and path-prefix.
                         [Default: 'https://api.github.com']
    --dest,          -d  The CSV's destination path and file name.
                         [Default: './resources.csv']
    --no-auto-filename   Disable automatic file naming.
                         [Default: false]
    --owner,         -o  The GitHub account name or organization name.
    --repo,          -r  The name of the GitHub (or GitHub enterprise)
                         repository.
    --resource-type, -t  "issues", "prs", or "all".
                         [Default: 'issues']

  Info

    --help     Show this dialog.
    --version  Display the installed semantic version.

  Examples

    $ grc --owner github --repo hub
      // => Exported CSV to /path/of/cwd/issues.csv.

    $ grc --owner github --repo hub -dest './reports/issues/YYYY-MM-DD.csv'
      // => Exported CSV to /path/to/reports/issues/YYYY-MM-DD.csv.

    $ grc --owner example --repo error
      // =>
      [2018-03-19T08:04:06.596Z] ERROR: github-resource-converter/00000 on localhost: Cannot destructure property `data` of 'undefined' or 'null'.
        TypeError: Cannot destructure property `data` of 'undefined' or 'null'.
            at paginate (/p/a/t/h/github-resource-converter/lib/base-resource-converter.js:39:16)
            at <anonymous>
            at process._tickCallback (internal/process/next_tick.js:188:7
```

Use the `--version` flag to see which version you have installed:

```bash
$ github-resource-converter --version
# => 1.0.1
```

## 4. API

> [![beaker][icon-octicon-beaker] Test the `github-resource-converter (grc)` API in your Web browser][runkit-grc-url].

### 4.1. `grc.authenticate({token, type, key}): void`

> ![Info][icon-octicon-info] Most GitHub API calls don't require authentication. Rules of thumb:
>
> 1.  If you can see the information by visiting the site without being logged in, you don't have to be authenticated to retrieve the same information through the API.
> 1.  If you want to change data, you have to be authenticated.
>
> octokit/rest.js. (2018). GitHub. Retrieved 21 March 2018, from <https://github.com/octokit/rest.js#authentication>

#### 4.1.1. Parameters

| Name  | Type   | Description                                                      | Notes |
| :---- | :----- | :--------------------------------------------------------------- | :---- |
| key   | String |                                                                  |       |
| token | String |                                                                  |       |
| type  | Enum   | `basic`, `oauth`, `oauth-key-secret`, `token`, and `integration` |       |

#### 4.1.2. Example

```javascript
// Token (https://github.com/settings/tokens)
grc.authenticate({
  token: 'secrettoken123',
  type: 'token'
})
```

### 4.2. `grc.getAll({owner, repo}): Promise`

Retrieve all open and closed Issues and Pull Requests from a GitHub project.

![GET][rest-get-img]

```http
/repos/:owner/:repo/issues
/repos/:owner/:repo/pulls
```

> ![info][icon-octicon-info] See

### 4.3. `grc.issues.getForRepo({owner, repo}): Promise`

A proxy method for [`octokit.issues.getForRepo` ![link-external][icon-octicon-link-external]](https://octokit.github.io/rest.js/#api-Issues-getForRepo).

![GET][rest-get-img]

```http
/repos/:owner/:repo/issues
```

#### 4.3.1. Parameters

<table>
  <thead>
    <tr>
      <th style="width: 30%">Field</th>
      <th style="width: 10%">Type</th>
      <th style="width: 60%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><samp>owner</samp></td>
      <td>
        string
      </td>
      <td></td>
    </tr>
    <tr>
      <td><samp>repo</samp></td>
      <td>
        string
      </td>
      <td></td>
    </tr>
    <tr>
      <td><samp>milestone</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td></td>
    </tr>
    <tr>
      <td><samp>state</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>open, closed, or all</p>
        <p>Default value: <code>open</code></p>
        <p>Allowed values:
          <code>open</code>, 
          <code>closed</code>, 
          <code>all</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>assignee</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>String User login, <code>none</code> for Issues with no assigned User. <code>*</code> for Issues with any assigned User.</p>
      </td>
    </tr>
    <tr>
      <td><samp>creator</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>The user that created the issue.</p>
      </td>
    </tr>
    <tr>
      <td><samp>per_page</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        number
      </td>
      <td>
        <p>A custom page size up to 100. Default is 30.</p>
        <p>Default value: <code>30</code></p>
      </td>
    </tr>
    <tr>
      <td><samp>labels</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>String list of comma separated Label names. Example: bug,ui,@high</p>
      </td>
    </tr>
    <tr>
      <td><samp>sort</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>Default value: <code>created</code></p>
        <p>Allowed values:
          <code>created</code>,
          <code>updated</code>,
          <code>comments</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>direction</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>Default value: <code>desc</code></p>
        <p>Allowed values:
          <code>asc</code>, 
          <code>desc</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>since</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        date
      </td>
      <td>
        <p>Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ</p>
      </td>
    </tr>
    <tr>
      <td><samp>page</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        number
      </td>
      <td>
        <p>Page number of the results to fetch.</p>
      </td>
    </tr>
    <tr>
      <td><samp>mentioned</samp> <img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></td>
      <td>
        string
      </td>
      <td>
        <p>String User login.</p>
      </td>
    </tr>
  </tbody>
</table>

#### 4.3.2. Examples

* _**async/await**:_

  > ```javascript
  > const result = await grc.issues.getForRepo({
  >   owner: 'gregswindle',
  >   repo: 'eslint-plugin-crc'
  > })
  > ```

* _**Promise**:_

  > ```javascript
  > grc.issues
  >   .getForRepo({
  >     owner: 'gregswindle',
  >     repo: 'eslint-plugin-crc'
  >   })
  >   .then(result => {})
  >   .catch(err => {})
  > ```

### 4.4. `grc.logger`

A proxy for a [`trentm/node-bunyan` ![link-external][icon-octicon-link-external]][node-bunyan-url] logger instance,
using a `LONG` [`thlorenz/bunyan-format` ![link-external][icon-octicon-link-external]][bunyan-format-url] writeable
stream for output.

> ![info][icon-octicon-info] **`bunyan.INFO`** is the default log LEVEL.

```javascript
Logger {
  domain: null,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  _level: 30,
  streams:
    [{
      type: 'stream',
      stream: BunyanFormatWritable {
      },
      closeOnExit: false,
      level: 30,
      raw: false
    }],
  serializers: null,
  src: false,
  fields: {
    name: 'github-resource-converter',
     hostname: 'Gregorys-MBP-2.fios-router.home',
    pid: 76698
  },

  debug(): void,
  error(): void,
  fatal(): void,
  info(): void,
  trace(): void,
  warn(): void
}
```

### 4.5. `grc.options`

Contains default values for `api`, `cli`, and `meta`data.

---

<details>
  <summary><strong>Toggle view of <samp>grc.options</samp></strong>.</summary>
  <p>

```javascript
{
  "api": {
    "baseUrl": "https://api.github.com",
    "headers": {
      "Accept":
        "application/vnd.github.v3+json, application/vnd.github.symmetra-preview+json",
      "user-agent": "gregswindle/github-resource-converter v1.0.1"
    },
    "owner": null,
    "repo": null,
    "requestMedia": "application/vnd.github.v3+json",
    "timeout": 0
  },
  "cli": {
    "flags": {
      "baseUrl": {
        "default": "https://api.github.com",
        "type": "string"
      },
      "dest": {
        "alias": "d",
        "default": "./export.csv",
        "type": "string"
      },
      "no-auto-filename": {
        "default": false,
        "type": "boolean"
      },
      "owner": {
        "alias": "o",
        "type": "string"
      },
      "repo": {
        "alias": "r",
        "type": "string"
      },
      "resource-type": {
        "alias": "t",
        "default": "issues",
        "type": "string"
      }
    }
  },
  "meta": {
    "input": [],
    "flags": {
      "noAutoFilename": false,
      "baseUrl": "https://api.github.com",
      "dest": "./export.csv",
      "d": "./export.csv",
      "resourceType": "issues",
      "t": "issues"
    },
    "pkg": {
      "name": "github-resource-converter",
      "description":
        "Convert and export GitHub resources--Issues and Pull Requests--to CSV and JSON.",
      "version": "1.0.1",
      "author": {
        "name": "Greg Swindle",
        "email": "greg@swindle.net",
        "url": "https://github.com/gregswindle"
      },
      "bin": {
        "grc": "lib/cli.js"
      },
      "bugs": {
        "url": "https://github.com/gregswindle/github-resource-converter/issues"
      },
      "commitplease": {
        "style": "angular",
        "types": [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test"
        ],
        "scope": "\\S+.*"
      },
      "contributors": [],
      "dependencies": {
        "@octokit/rest": "15.2.6",
        "bunyan": "1.8.12",
        "bunyan-format": "0.2.1",
        "dotenv": "5.0.1",
        "fs-extra": "5.0.0",
        "insight": "0.10.1",
        "jsonexport": "2.0.11",
        "lodash": "4.17.5",
        "meow": "4.0.0"
      },
      "devDependencies": {
        "@semantic-release/changelog": "2.0.1",
        "@semantic-release/git": "4.0.1",
        "@semantic-release/npm": "3.2.4",
        "ajv": "6.4.0",
        "ajv-keywords": "3.1.0",
        "codacy-coverage": "2.1.1",
        "commitplease": "3.2.0",
        "coveralls": "3.0.0",
        "eslint": "4.19.1",
        "eslint-config-prettier": "^2.4.0",
        "eslint-config-scanjs": "1.0.0-beta4",
        "eslint-config-standard": "11.0.0",
        "eslint-config-xo": "0.20.1",
        "eslint-plugin-import": "2.10.0",
        "eslint-plugin-jsdoc": "3.5.0",
        "eslint-plugin-json": "1.2.0",
        "eslint-plugin-no-unsafe-innerhtml": "1.0.16",
        "eslint-plugin-node": "6.0.1",
        "eslint-plugin-prettier": "^2.2.0",
        "eslint-plugin-promise": "3.7.0",
        "eslint-plugin-security": "1.4.0",
        "eslint-plugin-standard": "3.0.1",
        "eslint-plugin-unicorn": "4.0.2",
        "eslint-plugin-xss": "0.1.9",
        "fixpack": "2.3.1",
        "husky": "^0.14.3",
        "jest": "22.4.3",
        "jest-runner-eslint": "0.4.0",
        "lec": "^1.0.1",
        "lint-staged": "7.0.3",
        "markdown-magic": "0.1.21",
        "markdown-magic-dependency-table": "1.3.2",
        "markdown-magic-install-command": "1.3.1",
        "markdown-magic-package-scripts": "1.2.1",
        "nsp": "^3.2.1",
        "prettier": "1.11.1",
        "semantic-release": "15.1.5"
      },
      "engines": {
        "node": ">=8.0.0"
      },
      "eslintIgnore": ["lib/__tests__/coverage/**"],
      "files": ["lib"],
      "homepage":
        "https://github.com/gregswindle/github-resource-converter/#readme",
      "jest": {
        "automock": false,
        "collectCoverage": true,
        "coverageDirectory": "lib/__tests__/coverage",
        "coverageThreshold": {
          "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
          }
        },
        "moduleDirectories": ["node_modules", "lib"],
        "testMatch": [
          "<rootDir>/lib/__tests__/**/*.test.js",
          "<rootDir>/lib/__tests__/*.test.js"
        ],
        "watchman": false
      },
      "jest-runner-eslint": {
        "cliOptions": {
          "config": ".github/config/jest-runner-eslint.config.json",
          "fix": true
        }
      },
      "keywords": [
        "QA",
        "convert",
        "converter",
        "converter",
        "csv",
        "export",
        "github",
        "google sheets",
        "issue",
        "json",
        "pr",
        "pull request",
        "pull-request",
        "quality assurance",
        "quality-assurance",
        "reporting",
        "reports",
        "save",
        "sheets",
        "spreadsheets",
        "testing"
      ],
      "license": "MIT",
      "lint-staged": {
        "*.js": ["npm run lint:js", "git add"],
        "*.json": ["npm run lint:json", "git add"],
        "*.md": ["npm run lint:md", "npm run docs", "git add"]
      },
      "main": "lib/index.js",
      "prettier": {
        "semi": false,
        "singleQuote": true
      },
      "release": {
        "generateNotes": {
          "preset": "angular"
        },
        "prepare": [
          "@semantic-release/changelog",
          "@semantic-release/npm",
          "@semantic-release/git"
        ],
        "verifyConditions": ["@semantic-release/npm", "@semantic-release/git"]
      },
      "repository": {
        "type": "git",
        "url":
          "git+https://github.com/gregswindle/github-resource-converter.git"
      },
      "scripts": {
        "docs": "npm run docs:toc",
        "docs:toc":
          "md-magic --config '.github/config/markdown.config.js' --path '**/*.md' --ignore 'node_modules'",
        "lint":
          "npm run lint:js && npm run lint:json && npm run lint:manifest && npm run lint:md",
        "lint:js":
          "node_modules/.bin/eslint -c .github/config/.eslintrc.yml --ext .js . --fix",
        "lint:json":
          "prettier ./**/*.json --ignore-path '.github/config/.prettierignore' --write",
        "lint:manifest": "fixpack",
        "lint:md": "prettier ./**/*.md -prose-wrap always --write",
        "posttest:ci:coverage:codacy":
          "cat ./lib/__tests__/coverage/lcov.info | codacy-coverage",
        "precommit": "lint-staged",
        "prepare": "npm run lint && npm run security",
        "prepublish":
          "lec lib/cli.js -c LF && npm run security && semantic-release -d",
        "prepublishOnly": "npm run prepare",
        "pretest": "npm run lint",
        "security": "npm run security:nsp:scan",
        "security:nsp:scan": "nsp check",
        "test": "jest",
        "test:config": "jest --showConfig",
        "test:watch": "jest ./lib/__tests__/*.test.js --watch",
        "test:watch:all": "jest ./lib/__tests__/*.test.js --watchAll"
      },
      "readme": "ERROR: No README data found!",
      "_id": "github-resource-converter@1.0.1"
    },
    "help":
      "\n  Convert and export GitHub resources--Issues and Pull Requests--to CSV and JSON.\n\n  Usage\n\n    $ grc [options] [info]\n    $ github-resource-converter [options] [info]\n\n  Options\n    --base-url           The GitHub REST API v3 URL origin, or a\n                         GitHub Enterprise URL origin and path-prefix.\n                         [Default: 'https://api.github.com']\n    --dest,          -d  The CSV's destination path and file name.\n                         [Default: './resources.csv']\n    --no-auto-filename       Don't append an ISO 8601-like timestamp to the\n         output file.\n                         [Default: false]\n    --owner,         -o  The GitHub account name or organization name.\n    --repo,          -r  The name of the GitHub (or GitHub enterprise)\n                         repository.\n    --resource-type, -t  \"issues\", \"prs\", or \"all\".\n                         [Default: 'issues']\n\n  Info\n\n    --help     Show this dialog.\n    --version  Display the installed semantic version.\n\n  Examples\n\n    $ grc --owner github --repo hub\n      // => Exported CSV to /path/of/cwd/issues.csv.\n\n    $ grc --owner github --repo hub -dest './reports/issues/YYYY-MM-DD.csv'\n      // => Exported CSV to /path/to/reports/issues/YYYY-MM-DD.csv.\n\n    $ grc --owner example --repo error\n      // =>\n      [2018-03-19T08:04:06.596Z] ERROR: github-resource-converter/00000 on localhost: Cannot destructure property `data` of 'undefined' or 'null'.\n        TypeError: Cannot destructure property `data` of 'undefined' or 'null'.\n            at paginate (/p/a/t/h/github-resource-converter/lib/base-resource-converter.js:39:16)\n            at <anonymous>\n            at process._tickCallback (internal/process/next_tick.js:188:7)\n"
  }
}
```

</p></details>

---

### 4.6. `grc.pullRequests.getForRepo({owner, repo}): Promise`

Retrieve an array of all open and closed pull requests for a GitHub or GitHub Enterprise repository.

![GET][rest-get-img]

```http
/repos/:owner/:repo/pulls
```

> ![info][icon-octicon-info] `getForRepo` is a proxy for
> [`octokit.pullRequests.getAll`](https://octokit.github.io/rest.js/#api-PullRequests-getAll).

#### 4.6.1. Parameters

<table>
  <thead>
    <tr>
      <th style="width: 30%">Field</th>
      <th style="width: 10%">Type</th>
      <th style="width: 60%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><samp>owner</samp></td>
      <td>
        string
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td><samp>repo</samp></td>
      <td>
        string
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td><samp>state</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Default value:
          <code>open</code>
        </p>
        <p>Allowed values:
          <code>open</code>,
          <code>closed</code>,
          <code>all</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>head</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Filter pulls by head user and branch name in the format of user:ref-name. Example: github:new-script-format.</p>
      </td>
    </tr>
    <tr>
      <td><samp>base</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Filter pulls by base branch name. Example: gh-pages.</p>
      </td>
    </tr>
    <tr>
      <td><samp>sort</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Possible values are:
          <code>created</code>,
          <code>updated</code>,
          <code>popularity</code>,
          <code>long-running</code>, Default:
          <code>created</code>
        </p>
        <p>Default value:
          <code>created</code>
        </p>
        <p>Allowed values:
          <code>created</code>,
          <code>updated</code>,
          <code>popularity</code>,
          <code>long-running</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>direction</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Default value:
          <code>desc</code>
        </p>
        <p>Allowed values:
          <code>asc</code>,
          <code>desc</code>
        </p>
      </td>
    </tr>
    <tr>
      <td><samp>page</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        number
      </td>
      <td>
        <p>Page number of the results to fetch.</p>
      </td>
    </tr>
    <tr>
      <td><samp>per_page</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        number
      </td>
      <td>
        <p>A custom page size up to 100. Default is 30.</p>
        <p>Default value:
          <code>30</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

#### 4.6.2. Examples

* _**async/await**:_

  > ```javascript
  > const grc = require('github-resource-coverter')
  >
  > const getAllPullRequests = async (params) = {
  >   try {
  >     const WHITESPACE = 2
  >     const prs = await grc.pullRequests.getForRepo(params)
  >     grc.logger.info(JSON.stringify(prs, null, WHITESPACE))
  >   } catch (err) {
  >     grc.logger.error(err)
  >   }
  > }
  >
  > await getAllPullRequests({
  >   owner: 'democracy-ia',
  >   repo: 'govinfo-link-js'
  > })
  > ```

* _**Promises**:_

  > ```javascript
  > const grc = require('github-resource-coverter')
  >
  > grc.pullRequests
  >   .getForRepo({
  >     owner: 'democracy-ia',
  >     repo: 'govinfo-link-js'
  >   })
  >   .then(prs => {
  >     const WHITESPACE = 2
  >     grc.logger.info(JSON.stringify(prs, null, WHITESPACE))
  >   })
  >   .catch(err => {
  >     grc.logger.error(err)
  >   })
  > ```

### 4.7. `grc.save({data, dest}): Promise`

Export a collection of Issues or Pull Requests to your local filesystem.

#### 4.7.1. Parameters

<table>
  <thead>
    <tr>
      <th style="width: 30%">Field</th>
      <th style="width: 10%">Type</th>
      <th style="width: 60%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><samp>data</samp></td>
      <td>
        JSON&nbsp;|&nbsp;object
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td><samp>dest</samp>
        <span class="label label-optional"><img align="right" alt="optional" height="22" width="60" src="https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16"></span>
      </td>
      <td>
        string
      </td>
      <td>
        <p>Default value:
          <code>./export.csv</code>
        </p>
        <p>Allowed values:
          <code>*.csv</code>,
          <code>*.json</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

#### 4.7.2. Examples

* _**async/await**:_

  > ```javascript
  > // Save as JSON
  > const result = await grc.save({
  >   data,
  >   dest: './export.json'
  > })
  > ```

* _**Promise**:_

  > ```javascript
  > // Save as CSV
  > grc
  >   .save({
  >     data,
  >     dest: './export.csv'
  >   })
  >   .then(result => {})
  >   .catch((err = {}))
  > ```

### 4.8. `grc.toCsv({data=[]}): Promise`

Converts (deeply) nested JSON into CSV format.

#### 4.8.1. Parameters

<table>
  <thead>
    <tr>
      <th style="width: 30%">Field</th>
      <th style="width: 10%">Type</th>
      <th style="width: 60%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><samp>data</samp></td>
      <td>
        JSON&nbsp;|&nbsp;object
      </td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

#### 4.8.2. Examples

* _**async/await**:_

  > ```javascript
  > const result = await grc.toCsv(data)
  > ```

* _**Promise**:_

  > ```javascript
  > grc
  >   .toCsv(data)
  >   .then(result => {})
  >   .catch((err = {}))
  > ```

## 5. Version

[![NPM version][npm-image]][npm-url]

## 6. Contributing

[![PRs Welcome][makeapullrequest-image] ![External link][icon-octicon-link-external]][makeapullrequest-url] We welcome contributions with GitHub **issues** and **pull requests**.

---

[![Request a feature][issues-new-feat-image]][issues-new-feat-url]
[![Report a defect][issues-new-defect-image]][issues-new-defect-url]

[![Read the CONTRIBUTING guidelines][contributing-image]][contributing-url]

---

Before embarking on a significant change, please adhere to the following guidelines:

1.  **[Create an issue][issues-url]**&mdash;e.g., a [defect ("bug") report][issues-new-defect-url] or a [feature request][issues-new-feat-url]&mdash;to propose changes.

    _Exceptions:_

    > If you're working on documentation and fixing something simple like a typo or an easy bug, go ahead and make a pull request.

1.  **[Follow the CONTRIBUTING guidelines][contributing-url].**

    _Why:_

    > Standards and guidelines make communication easier. If you're willing and able to program&mdash;or want to learn how&mdash; following the guidelines will increase the likelihood of adding your changes to the software product.

1.  **[Read the Code of Conduct][code-of-conduct-url].**

    _Why:_

    > It's more fun when everybody's friendly and respectful.

1.  **[Make a pull request][pr-url]** when you're ready for other to review your changes (or you get stuck somewhere).

    _PR novices:_

    > **🙋 Never created a pull request?** No problem. [🆓 Take this free online training ![External link][icon-octicon-link-external]][makeapullrequest-url]. (It even covers most of the conventions in the [CONTRIBUTING guidelines][contributing-url]!)

## 7. License

[MIT](./LICENSE) © [Greg Swindle](https://github.com/gregswindle).

Read the [NOTICE ![External link][icon-octicon-link-external]][notice-url] for all third-party software that `github-resource-converter` uses.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter?ref=badge_large)

---

[![Greenkeeper badge](https://badges.greenkeeper.io/gregswindle/github-resource-converter.svg)](https://greenkeeper.io/)
[![Readme Score](http://readme-score-api.herokuapp.com/score.svg?url=https://github.com/gregswindle/github-resource-converter)](http://clayallsopp.github.io/readme-score?url=https://github.com/gregswindle/github-resource-converter)

<!-- ⛔️ Link References ⛔️  -->

[bunyan-format-url]: https://github.com/thlorenz/bunyan-format/#readme
[node-bunyan-url]: https://github.com/trentm/node-bunyan/#readme
[optional-param-img]: https://fakeimg.pl/60x22/757575/FFF/?text=optional&font_size=16
[rest-get-img]: https://fakeimg.pl/40x40/0e8a16/FFF/?text=GET&font_size=20
[runkit-grc-url]: https://runkit.com/gregswindle/github-resource-converter
[toc]: #table-of-contents

<!-- ⛔️ CI Services ⛔️  -->

[notice-url]: https://app.fossa.io/reports/07123904-7d26-40a6-b6af-c74e82a53789
[appveyor-image]: https://img.shields.io/appveyor/ci/gregswindle/github-resource-converter.svg?style=flat-square&logo=appveyor&label=windows%20build
[appveyor-url]: https://ci.appveyor.com/project/gregswindle/github-resource-converter
[codacy-image]: https://img.shields.io/codacy/grade/b3ac6aaaa3cf41d0897959c1e5d732a3.svg?style=flat-square
[codacy-coverage-image]: https://img.shields.io/codacy/coverage/b3ac6aaaa3cf41d0897959c1e5d732a3.svg?style=flat-square
[codacy-url]: https://www.codacy.com/app/greg_7/github-resource-converter?utm_source=github.com&utm_medium=referral&utm_content=gregswindle/github-resource-converter&utm_campaign=Badge_Grade
[coveralls-image]: https://img.shields.io/coveralls/github/gregswindle/github-resource-converter/master.svg
[coveralls-url]: https://coveralls.io/r/gregswindle/github-resource-converter
[daviddm-dev-image]: https://david-dm.org/gregswindle/github-resource-converter/dev-status.svg?theme=shields.io&style=flat-square
[daviddm-dev-url]: https://david-dm.org/gregswindle/github-resource-converter?type=dev
[daviddm-image]: https://david-dm.org/gregswindle/github-resource-converter.svg?theme=shields.io&style=flat-square
[daviddm-url]: https://david-dm.org/gregswindle/github-resource-converter
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter.svg?type=shield&style=flat-square
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter?ref=badge_shield
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[npm-downloads-month]: https://img.shields.io/npm/dm/github-resource-converter.svg?style=social
[npm-image]: https://img.shields.io/npm/v/github-resource-converter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/github-resource-converter
[npms-image]: https://badges.npms.io/github-resource-converter.svg?style=flat-square
[npms-url]: https://npms.io/search?q=github-resource-converter
[nsp-image]: https://nodesecurity.io/orgs/gregswindle/projects/b0a38d7a-29c1-4607-a724-e283b44f1618/badge
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/b0a38d7a-29c1-4607-a724-e283b44f1618
[travis-image]: https://img.shields.io/travis/gregswindle/github-resource-converter.svg?branch=master&style=flat-square&label=macOS%20%7C%20ubuntu%20builds&logo=travis
[travis-url]: https://travis-ci.org/gregswindle/github-resource-converter

<!-- ⛔️ Contributing ⛔️  -->

[code-of-conduct-url]: https://github.com/gregswindle/github-resource-converter/blob/master/.github/CODE_OF_CONDUCT.md
[contributing-image]: https://img.shields.io/badge/read-CONTRIBUTING%20Guidelines-yellow.svg?style=for-the-badge&label=read+the
[contributing-url]: https://github.com/gregswindle/github-resource-converter/blob/master/.github/CONTRIBUTING.md
[issues-new-defect-image]: https://img.shields.io/badge/report-defect-lightgrey.svg?style=for-the-badge&label=report+a
[issues-new-defect-url]: https://github.com/gregswindle/github-resource-converter/issues/new?title=defect%28scope%29%3A+defect-summary&labels=priority%3a+medium%2cstatus%3a+review+needed%2ctype%3a+defect&template=defect-report.md
[issues-new-feat-image]: https://img.shields.io/badge/request-feature-blue.svg?style=for-the-badge&label=request+a
[issues-new-feat-url]: https://github.com/gregswindle/github-resource-converter/issues/new?title=feat%28scope%29%3A+change-proposal-summary&labels=priority%3a+medium%2cstatus%3a+review+needed%2ctype%3a+feature&template=feature-request.md
[issues-url]: https://github.com/gregswindle/github-resource-converter/issues
[makeapullrequest-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[makeapullrequest-url]: http://makeapullrequest.com
[pr-url]: https://github.com/gregswindle/github-resource-converter/pulls

<!-- ⛔️ Octicon img references ⛔️  -->

[icon-octicon-alert]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/alert.svg
[icon-octicon-arrow-down]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-down.svg
[icon-octicon-arrow-left]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-left.svg
[icon-octicon-arrow-right]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-right.svg
[icon-octicon-arrow-small-down]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-small-down.svg
[icon-octicon-arrow-small-left]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-small-left.svg
[icon-octicon-arrow-small-right]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-small-right.svg
[icon-octicon-arrow-small-up]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-small-up.svg
[icon-octicon-arrow-up]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/arrow-up.svg
[icon-octicon-beaker]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/beaker.svg
[icon-octicon-bell]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/bell.svg
[icon-octicon-bold]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/bold.svg
[icon-octicon-book]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/book.svg
[icon-octicon-bookmark]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/bookmark.svg
[icon-octicon-briefcase]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/briefcase.svg
[icon-octicon-broadcast]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/broadcast.svg
[icon-octicon-browser]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/browser.svg
[icon-octicon-bug]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/bug.svg
[icon-octicon-calendar]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/calendar.svg
[icon-octicon-check]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/check.svg
[icon-octicon-checklist]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/checklist.svg
[icon-octicon-chevron-down]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/chevron-down.svg
[icon-octicon-chevron-left]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/chevron-left.svg
[icon-octicon-chevron-right]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/chevron-right.svg
[icon-octicon-chevron-up]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/chevron-up.svg
[icon-octicon-circle-slash]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/circle-slash.svg
[icon-octicon-circuit-board]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/circuit-board.svg
[icon-octicon-clippy]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/clippy.svg
[icon-octicon-clock]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/clock.svg
[icon-octicon-cloud-download]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/cloud-download.svg
[icon-octicon-cloud-upload]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/cloud-upload.svg
[icon-octicon-code]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/code.svg
[icon-octicon-comment-discussion]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/comment-discussion.svg
[icon-octicon-comment]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/comment.svg
[icon-octicon-credit-card]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/credit-card.svg
[icon-octicon-dash]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/dash.svg
[icon-octicon-dashboard]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/dashboard.svg
[icon-octicon-database]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/database.svg
[icon-octicon-desktop-download]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/desktop-download.svg
[icon-octicon-device-camera-video]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/device-camera-video.svg
[icon-octicon-device-camera]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/device-camera.svg
[icon-octicon-device-desktop]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/device-desktop.svg
[icon-octicon-device-mobile]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/device-mobile.svg
[icon-octicon-diff-added]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff-added.svg
[icon-octicon-diff-ignored]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff-ignored.svg
[icon-octicon-diff-modified]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff-modified.svg
[icon-octicon-diff-removed]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff-removed.svg
[icon-octicon-diff-renamed]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff-renamed.svg
[icon-octicon-diff]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/diff.svg
[icon-octicon-ellipses]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/ellipses.svg
[icon-octicon-ellipsis]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/ellipsis.svg
[icon-octicon-eye]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/eye.svg
[icon-octicon-file-binary]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-binary.svg
[icon-octicon-file-code]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-code.svg
[icon-octicon-file-directory]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-directory.svg
[icon-octicon-file-media]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-media.svg
[icon-octicon-file-pdf]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-pdf.svg
[icon-octicon-file-submodule]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-submodule.svg
[icon-octicon-file-symlink-directory]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-symlink-directory.svg
[icon-octicon-file-symlink-file]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-symlink-file.svg
[icon-octicon-file-text]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-text.svg
[icon-octicon-file-zip]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file-zip.svg
[icon-octicon-file]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/file.svg
[icon-octicon-flame]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/flame.svg
[icon-octicon-fold]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/fold.svg
[icon-octicon-gear]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/gear.svg
[icon-octicon-gift]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/gift.svg
[icon-octicon-gist-secret]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/gist-secret.svg
[icon-octicon-gist]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/gist.svg
[icon-octicon-git-branch]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/git-branch.svg
[icon-octicon-git-commit]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/git-commit.svg
[icon-octicon-git-compare]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/git-compare.svg
[icon-octicon-git-merge]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/git-merge.svg
[icon-octicon-git-pull-request]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/git-pull-request.svg
[icon-octicon-globe]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/globe.svg
[icon-octicon-grabber]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/grabber.svg
[icon-octicon-graph]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/graph.svg
[icon-octicon-heart]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/heart.svg
[icon-octicon-history]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/history.svg
[icon-octicon-home]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/home.svg
[icon-octicon-horizontal-rule]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/horizontal-rule.svg
[icon-octicon-hubot]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/hubot.svg
[icon-octicon-inbox]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/inbox.svg
[icon-octicon-info]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/info.svg
[icon-octicon-issue-closed]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/issue-closed.svg
[icon-octicon-issue-opened]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/issue-opened.svg
[icon-octicon-issue-reopened]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/issue-reopened.svg
[icon-octicon-italic]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/italic.svg
[icon-octicon-jersey]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/jersey.svg
[icon-octicon-key]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/key.svg
[icon-octicon-keyboard]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/keyboard.svg
[icon-octicon-law]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/law.svg
[icon-octicon-light-bulb]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/light-bulb.svg
[icon-octicon-link-external]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/link-external.svg
[icon-octicon-link]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/link.svg
[icon-octicon-list-ordered]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/list-ordered.svg
[icon-octicon-list-unordered]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/list-unordered.svg
[icon-octicon-location]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/location.svg
[icon-octicon-lock]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/lock.svg
[icon-octicon-logo-gist]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/logo-gist.svg
[icon-octicon-logo-github]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/logo-github.svg
[icon-octicon-mail-read]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mail-read.svg
[icon-octicon-mail-reply]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mail-reply.svg
[icon-octicon-mail]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mail.svg
[icon-octicon-mark-github]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mark-github.svg
[icon-octicon-markdown]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/markdown.svg
[icon-octicon-megaphone]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/megaphone.svg
[icon-octicon-mention]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mention.svg
[icon-octicon-milestone]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/milestone.svg
[icon-octicon-mirror]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mirror.svg
[icon-octicon-mortar-board]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mortar-board.svg
[icon-octicon-mute]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mute.svg
[icon-octicon-no-newline]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/no-newline.svg
[icon-octicon-octoface]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/octoface.svg
[icon-octicon-organization]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/organization.svg
[icon-octicon-package]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/package.svg
[icon-octicon-paintcan]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/paintcan.svg
[icon-octicon-pencil]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/pencil.svg
[icon-octicon-person]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/person.svg
[icon-octicon-pin]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/pin.svg
[icon-octicon-plug]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/plug.svg
[icon-octicon-plus-small]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/plus-small.svg
[icon-octicon-plus]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/plus.svg
[icon-octicon-primitive-dot]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/primitive-dot.svg
[icon-octicon-primitive-square]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/primitive-square.svg
[icon-octicon-pulse]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/pulse.svg
[icon-octicon-question]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/question.svg
[icon-octicon-quote]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/quote.svg
[icon-octicon-radio-tower]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/radio-tower.svg
[icon-octicon-reply]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/reply.svg
[icon-octicon-repo-clone]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo-clone.svg
[icon-octicon-repo-force-push]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo-force-push.svg
[icon-octicon-repo-forked]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo-forked.svg
[icon-octicon-repo-pull]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo-pull.svg
[icon-octicon-repo-push]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo-push.svg
[icon-octicon-repo]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/repo.svg
[icon-octicon-rocket]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/rocket.svg
[icon-octicon-rss]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/rss.svg
[icon-octicon-ruby]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/ruby.svg
[icon-octicon-search]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/search.svg
[icon-octicon-server]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/server.svg
[icon-octicon-settings]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/settings.svg
[icon-octicon-shield]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/shield.svg
[icon-octicon-sign-in]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/sign-in.svg
[icon-octicon-sign-out]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/sign-out.svg
[icon-octicon-smiley]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/smiley.svg
[icon-octicon-squirrel]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/squirrel.svg
[icon-octicon-star]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/star.svg
[icon-octicon-stop]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/stop.svg
[icon-octicon-sync]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/sync.svg
[icon-octicon-tag]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/tag.svg
[icon-octicon-tasklist]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/tasklist.svg
[icon-octicon-telescope]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/telescope.svg
[icon-octicon-terminal]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/terminal.svg
[icon-octicon-text-size]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/text-size.svg
[icon-octicon-three-bars]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/three-bars.svg
[icon-octicon-thumbsdown]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/thumbsdown.svg
[icon-octicon-thumbsup]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/thumbsup.svg
[icon-octicon-tools]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/tools.svg
[icon-octicon-trashcan]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/trashcan.svg
[icon-octicon-triangle-down]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/triangle-down.svg
[icon-octicon-triangle-left]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/triangle-left.svg
[icon-octicon-triangle-right]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/triangle-right.svg
[icon-octicon-triangle-up]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/triangle-up.svg
[icon-octicon-unfold]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/unfold.svg
[icon-octicon-unmute]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/unmute.svg
[icon-octicon-unverified]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/unverified.svg
[icon-octicon-verified]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/verified.svg
[icon-octicon-versions]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/versions.svg
[icon-octicon-watch]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/watch.svg
[icon-octicon-x]: https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/x.svg
