# `github-resource-converter`

> <img align="bottom" alt="issue-opened" height="50" width="50"  src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/desktop-download.svg"> Convert GitHub Issues and Pull Requests to JSON and CSV from a Terminal or within your Node.js app.

[![The MIT License][license-image]][license-url]
[![FOSSA Status][fossa-image]][fossa-url]
[![NPM version][npm-image]][npm-url]<br>

<!-- [![NPMS score][npms-image]][npms-url] -->

[![NSP Status][nsp-image]][nsp-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Development Dependency Status][daviddm-dev-image]][daviddm-dev-url]<br>
[![MacOS and Ubuntu build statuses][travis-image]][travis-url]
[![Windows build status][appveyor-image]][appveyor-url]
[![Coverage percentage][codacy-coverage-image]][codacy-url]
[![Codacy][codacy-image]][codacy-url]

## Table of contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:excludeText=Table of contents) -->
- [Overview](#overview)
- [Installation](#installation)
  * [For Terminal/command-line usage](#for-terminalcommand-line-usage)
  * [As a application dependency](#as-a-application-dependency)
- [Usage](#usage)
  * [Formatting (`--dest export.[csv|json]`)](#formatting---dest-exportcsvjson)
  * [Resource types (`--resource-type`)](#resource-types---resource-type)
  * [Filtering](#filtering)
  * [Exporting](#exporting)
    + [Issues](#issues)
    + [Pull Requests](#pull-requests)
    + [All (issues and pull requests)](#all-issues-and-pull-requests)
  * [Command-line flags](#command-line-flags)
  * [Errors](#errors)
  * [Info](#info)
- [Version](#version)
- [Contributing](#contributing)
- [License](#license)
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## Overview

`github-resource-converter` exports your GitHub (and GitHub Enterprise) repositories' Issues and Pull Requests to `CSV` and `JSON` file formats. It's useful whenever you need to:

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

## Installation

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

### For Terminal/command-line usage

```bash
# Install globally to execute from a Terminal/command-line
$ npm i -g github-resource-converter
```

### As a application dependency

```bash
# Install as a dependency within a Node.js app
$ npm i --save github-resource-converter
```

## Usage

> <img align="left" alt="terminal" height="30" width="30" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/terminal.svg"> The following examples assume that `github-resource-converter` is installed globally and invoked from a Terminal (command-line interface)

### Formatting (`--dest export.[csv|json]`)

> You can convert GitHub (Enterprise) Issues and Pull Requests into two file formats: `CSV` and `JSON`.

* CSV is the default format.
* JSON formatting requires a `--dest` value with a `.json` file extension.

### Resource types (`--resource-type`)

> Convert and export GitHub (Enterprise) by `--resource-type`: `issues`, `pull_requests`, or both (`all`).

* `issues` is the default `resource-type`.
* `prs` require a `--resource-type` or `-t` value of

  * `pr`
  * `prs`
  * `pull_request`
  * `pull_requests`

* `--resource-type all` will export all `issues` and `prs` into a single file.

### Filtering

> ![alert][icon-octicon-alert] **Filtering is currently unavailable.**
>
> If you're interested in [CONTRIBUTING](#contributing) to features like filters--e.g., only select
> "open" issues--we're happily accepting pull requests!

### Exporting

#### Issues

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

#### Pull Requests

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

#### All (issues and pull requests)

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

### Command-line flags

<dl>
  <dt><code>--owner, -o</code></dt>
  <dd><p><strong>Required.</strong> The GitHub account name or organization name.</p></dd>
  <dt><code>--repo, -r</code></dt>
  <dd><p><strong>Required.</strong> The name of the GitHub (or GitHub Enterprise) repository.</p></dd>
  <dt><code>--base-url</code></dt>
  <dd><p>The GitHub REST API v3 URL origin, or a GitHub Enterprise URL origin and path-prefix.</p>
    <p>Default value: <code>https://api.github.com</code>.</p>
  </dd>
  <dt><code>--dest, -d</code></dt>
  <dd><p>The destination path and file name of the CSV.</p>
    <p>Default value: <code>./export.csv</code>.</p>
  </dd>
  <dt><code>--no-auto-filename</code></dt>
  <dd><p>Disable automatic file naming.</p>
    <p>Default value: <code>false</code>.</p>
  </dd>
  <dt><code>--resource-type, -t</code></dt>
  <dd><p>Declares whether to convert and export Issues, Pull Requests, or All.</p>
    <table>
      <tr>
        <th>Default value</th>
        <th>Valid values</th>
      </tr>
      <tr>
        <td><sampl>issues</sampl></td>
        <td><sampl>all, issue, issues, pr, prs, pull_request, pull_requests</sampl></td>
      </tr>
    </table>
  </dd>
</dl>

### Errors

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

### Info

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
# => 1.0.0-alpha
```

## Version

The latest semantic version of `github-resource-converter` is 1.0.0-alpha.

## Contributing

[![PRs Welcome][makeapullrequest-image] ![External link][icon-octicon-link-external]][makeapullrequest-url] We welcome contributions with GitHub **issues** and **pull requests**.

---

[![Request a feature][issues-new-feat-image]][issues-new-feat-url]
[![Report a defect][issues-new-defect-image]][issues-new-defect-url]

[![Read the CONTRIBUTING guidelines][contributing-image]][contributing-url]

---

Contributions in the form of GitHub pull requests are welcome. Before embarking on a significant change, please adhere to the following guidelines:

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

## License

[MIT](./LICENSE) © [Greg Swindle](https://github.com/gregswindle).

Read the [NOTICE ![External link][icon-octicon-link-external]][notice-url] for all third-party software that `github-resource-converter` uses.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter?ref=badge_large)

---

[![Greenkeeper badge](https://badges.greenkeeper.io/gregswindle/github-resource-converter.svg)](https://greenkeeper.io/)

<!-- ⛔️ CI Services ⛔️  -->

[notice-url]: https://app.fossa.io/reports/07123904-7d26-40a6-b6af-c74e82a53789
[appveyor-image]: https://img.shields.io/appveyor/ci/gregswindle/github-resource-converter.svg?style=flat-square&logo=appveyor&label=Windows%20build
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
[npm-image]: https://badge.fury.io/js/github-resource-converter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/github-resource-converter
[npms-image]: https://badges.npms.io/github-resource-converter.svg?style=flat-square
[npms-url]: https://npms.io/search?q=github-resource-converter
[nsp-image]: https://nodesecurity.io/orgs/gregswindle/projects/b0a38d7a-29c1-4607-a724-e283b44f1618/badge
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/b0a38d7a-29c1-4607-a724-e283b44f1618
[travis-image]: https://img.shields.io/travis/gregswindle/github-resource-converter.svg?branch=master&style=flat-square&label=MacOS%20%26%20Ubuntu%20builds&logo=travis
[travis-url]: https://travis-ci.org/gregswindle/github-resource-converter

<!-- ⛔️ Contributing ⛔️  -->

[code-of-conduct-url]: https://github.com/gregswindle/github-resource-converter/blob/master/.github/CODE_OF_CONDUCT.md
[contributing-image]: https://img.shields.io/badge/read-CONTRIBUTING%20Guidelines-yellow.svg?style=for-the-badge&label=read+the
[contributing-url]: https://github.com/gregswindle/github-resource-converter/blob/master/.github/CONTRIBUTING.md
[issues-new-defect-image]: https://img.shields.io/badge/report-defect-lightgrey.svg?style=for-the-badge&label=report+a
[issues-new-defect-url]: https://github.com/gregswindle/github-resource-converter/issues/new?title=fix%28affected-scope%29%3A+50-character-defect-summary&labels=Priority%3A+Medium%2CStatus%3A+Review+Needed%2CType%3A+Defect&template=defect-report.md
[issues-new-feat-image]: https://img.shields.io/badge/request-feature-blue.svg?style=for-the-badge&label=request+a
[issues-new-feat-url]: https://github.com/gregswindle/github-resource-converter/issues/new?title=feat%28affected-scope%29%3A+50-character-change-proposal-summary&labels=Priority%3A+Medium%2CStatus%3A+Review+Needed%2CType%3A+Feature&template=feature-request.md
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
