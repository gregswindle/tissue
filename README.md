# github-resource-converter

> <img align="bottom" alt="issue-opened" height="50" width="50"  src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/issue-opened.svg"> Convert GitHub resources (Issues) into CSV, etc.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![Codacy](https://img.shields.io/codacy/id.svg?style=flat-square)][![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter?ref=badge_shield)
()
[![David](https://img.shields.io/david/dev/user/repository.svg?style=flat-square)](https://david-dm.org/user/repository?type=dev)
[![Libscore](https://img.shields.io/libscore/s/project.svg?style=flat-square)]()
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![AppVeyor](https://img.shields.io/appveyor/ci/user/repository.svg?style=flat-square)]()

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:excludeText=Table of contents) -->

* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Required command-line flags](#required-command-line-flags)
    * [Example: generate a CSV of issues from a GitHub SaaS (github.com) repository](#example-generate-a-csv-of-issues-from-a-github-saas-githubcom-repository)
    * [Example: generate a CSV of issues from a GitHub Enterprise repository](#example-generate-a-csv-of-issues-from-a-github-enterprise-repository)
  * [Optional command-line flags](#optional-command-line-flags)
  * [Errors](#errors)
  * [Info](#info)
* [License](#license)
  <!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## Getting started

### Prerequisites

1.  `github-resource-converter` requires [Node.js](https://nodejs.org/), and `npm`, which installs with Node.js.

1.  To avoid rate-limiting, you should [create a personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) and save your personal access token:

* **MacOS and Unix:**

  ```bash
  $ mkdir -p /usr/local/etc/github-resource-center/envvars/
  $ touch /usr/local/etc/github-resource-center/envvars/.env
  $ echo "GITHUB_ACCESS_TOKEN="{your-personal-access-token-value}" > \
     /usr/local/etc/github-resource-center/envvars/.env
  ```

* **Windows:**

  ```shell
  > md -p C:\usr\local\etc\github-resource-center\envvars\
  > touch C:\usr\local\etc\github-resource-center\envvars\.env
  > echo "GITHUB_ACCESS_TOKEN="{your-personal-access-token-value}" >>
     C:\usr\local\etc\github-resource-center\envvars\.env
  ```

### Installation

```bash
# Install globally to execute from a Terminal/command-line
$ npm i -g github-resource-converter
```

```bash
# Install as a dependency within a Node.js app
$ npm i --save github-resource-converter
```

## Usage

> ![info][icon-octicon-info] The following examples assume that `github-resource-converter` is:
>
> 1.  Installed globally, and
> 1.  Invoked from a Terminal (command-line interface)

Open a terminal and run:

```bash
$ github-resource-converter \
  --owner gregswindle \
  --repo eslint-plugin-crc \
  --dest './docs/gregswindle-eslint-plugin-crc-issues.csv'

# Or use the grc alias:
$ grc --owner gregswindle --repo eslint-plugin-crc --dest './docs/gregswindle-eslint-plugin-crc-issues.csv'
```

### Required command-line flags

<dl>
  <dt><code>--owner</code></dt>
  <dd>The GitHub account name or organization name.</dd>
  <dt><code>--repo</code></dt>
  <dd>The name of the GitHub (or GitHub Enterprise) repository.</dd>
</dl>

---

#### Example: generate a CSV of issues from a GitHub SaaS (github.com) repository

Given the URL for `github-resource-converter` (this project):

```HTTP
https://github.com/gregswindle/github-resource-converter.git
#                  ⬆️          ⬆️
#                  owner      repo
```

The minium amount of CLI flags for _all_ issues at
`https://github.com/gregswindle/github-resource-converter.git` would therefore be:

```bash
# Invoke https://api.github.com/repos/gregswindle/eslint-plugin-crc/issues
$ grc --owner gregswindle --repo eslint-plugin-crc
```

---

#### Example: generate a CSV of issues from a GitHub Enterprise repository

Export all issues from a private, on-premise GitHub Enterprise repoository to CSV:

```bash
# Invoke https://api.github.com/repos/gregswindle/eslint-plugin-crc/issues
$ grc --host api.ecorp.com \
  --owner evilcorp \
  --path-prefix 'api/v3'
  --repo ecoin \
```

---

### Optional command-line flags

<dl>
  <dt><code>--dest</code></dt>
  <dd>The destination path and file name of the CSV.
    <br><br>Default value: <code>./issues.csv</code>.
  </dd>
  <dt><code>--host</code></dt>
  <dd>The name of the GitHub (or GitHub Enterprise) repository.
    <br><br>Default value: <code>api.github.com</code>.
  </dd>
  <dt><code>--path-prefix</code></dt>
  <dd>For GitHub Enterprise instances, the value that must occur to fulfill a REST API v3 request, e.g., <code>api/v3/</code>.
    <br><br>Default value: "" (an empty <code>string</code>).
  </dd>
  <dt><code>--protocol</code></dt>
  <dd>The access mechanism for the requested repository.
    <br><br>Default value: <code>https:</code>.
  </dd>
</dl>

### Errors

Errors are written to the console (`stdout`) as JSON:

```bash
# Attempt to fetch issues from a repository that doesn't exist
$ grc --owner repo --repo foobar
[github-resource-converter] 2018-03-12T07:44:36.727Z ERROR HttpError: {
  "name": "github-resource-converter",
  "hostname": "localhost",
  "pid": 32036,
  "level": 50,
  "err": {
    "message": {
      "message": "Not Found",
      "documentation_url": "https://developer.github.com/v3"
    },
    "name": "HttpError",
    "stack": "HttpError: {\"message\":\"Not Found\",\"documentation_url\":\"https://developer.github.com/v3\"}\n    at response.text.then.message (/Users/swindle/Projects/github/gregswindle/github-resource-converter/node_modules/@octokit/rest/lib/request/request.js:56:19)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)",
    "code": 404
  },
  "msg": {
    "message": "Not Found",
    "documentation_url": "https://developer.github.com/v3"
  },
  "time": "2018-03-12T07:44:36.727Z",
  "v": 0
}
```

### Info

The `--help` flag displays all options:

```text
$ grc --help
Convert GitHub resources (Issues) into CSV, etc.

  Usage
    $ grc [options] [info]
    $ github-resource-converter [options] [info]
  Options
    --dest, -o       The CSV's destination path and file name.
                      [Default: './issues.csv']
    --host, -h        The domain name of the server. Set this value
                      for GitHub Enterprise instances.
                      [Default: 'api.github.com']
    --owner, -o       The GitHub account name or organization name.
    --path-prefix, -p For GitHub Enterprise instances, the value that
                      must occur to fulfill a REST API v3 request, e.g.,
                      'api/v3/'.
                      [Default: '']
    --protocol, -s    The access mechanism for the requested repository.
                      [Default: 'https:']
    --repo, -r        The name of the GitHub (or GitHub enterprise)
                      repository.
  Info
    --help            Show this dialog.
    --version         Display the installed semantic version.
  Examples
    $ grc --owner github --repo hub
    // => Exported CSV to /path/of/cwd/issues.csv.

    $ grc --owner github --repo hub -dest './reports/issues/YYYY-MM-DD.csv'
    // => Exported CSV to /path/to/reports/issues/2018-05-10.csv.

    $ grc --owner repo --repo foobar
      [github-resource-converter] 2018-03-12T07:36:31.681Z ERROR HttpError: {
      'name': 'github-resource-converter',
      'hostname': 'localhost',
      'pid': 30937,
      'level': 50,
      'err': {
        'message': {
          'message': 'Not Found',
          'documentation_url': 'https://developer.github.com/v3'
        },
        'name': 'HttpError',
        'stack': 'HttpError: {"message":"Not Found","documentation_url":"https://developer.github.com/v3"}
      at response.text.then.message (/Users/swindle/Projects/github/gregswindle/github-resource-converter/node_modules/@octokit/rest/lib/request/request.js:56:19)
      at <anonymous>
      at process._tickCallback (internal/process/next_tick.js:188:7)',
        'code': 404
      },
      'msg': {
        'message': 'Not Found',
        'documentation_url': 'https://developer.github.com/v3'
      },
      'time': '2018-03-12T07:36:31.681Z',
      'v': 0
    }
```

Use the `--version` flag to see which version you have installed:

```bash
$ github-resource-converter --version
# => 1.0.0-alpha
```

## License

MIT © [Greg Swindle](https://github.com/gregswindle)

[npm-image]: https://badge.fury.io/js/github-resource-converter.svg
[npm-url]: https://npmjs.org/package/github-resource-converter
[travis-image]: https://travis-ci.org/gregswindle/github-resource-converter.svg?branch=master
[travis-url]: https://travis-ci.org/gregswindle/github-resource-converter
[daviddm-image]: https://david-dm.org/gregswindle/github-resource-converter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gregswindle/github-resource-converter
[coveralls-image]: https://coveralls.io/repos/gregswindle/github-resource-converter/badge.svg
[coveralls-url]: https://coveralls.io/r/gregswindle/github-resource-converter

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


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgregswindle%2Fgithub-resource-converter?ref=badge_large)