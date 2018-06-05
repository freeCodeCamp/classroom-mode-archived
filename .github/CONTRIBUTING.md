# Contributor's Guide

Follow these steps to contribute.

1. Find an issue that needs assistance by searching for the [Help Wanted](https://github.com/freeCodeCamp/classroom-mode/labels/help%20wanted) tag.

2. Let us know you are working on it by posting a comment on the issue.

Working on your first Pull Request? You can learn how from this free series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Quick Reference

| command | description |
| ---- | ---- | 
| `npm setup` | install all dependencies |
| `npm run dev` | start application in development |
| `npm test` | run all tests |
| `npm commit` | this is an interactive tool to help build a commit message |

## Setup

### Prerequisites

| Prerequisites | version |
| ---- | ---- | 
| npm | 5.8.0 |
| node | 8.11.2 |

### Forking the Project

#### Setting Up Your System

1. Install [Git](https://git-scm.com/) or your favorite Git client.
2. (Optional) [Setup an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.
3. Install Node
4. Install npm

#### Forking classroom-mode

1. Go to the top level classroom-mode repository: <https://github.com/freeCodeCamp/classroom-mode>
2. Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3. After the repository (repo) has been forked, you will be taken to your copy of the classroom-mode repo at <https://github.com/yourUsername/classroom-mode>

#### Cloning Your Fork

1. Open a Terminal / Command Line / Bash Shell in your projects directory (_i.e.: `/yourprojectdirectory/`_)
2. Clone your fork of classroom-mode

```shell
$ git clone https://github.com/yourUsername/classroom-mode.git
```

**(make sure to replace `yourUsername` with your GitHub username)**

This will download the entire classroom-mode repo to your projects directory.

#### Setup Your Upstream

1. Change directory to the new classroom-mode directory (`cd classroom-mode`)
2. Add a remote to the official classroom-mode repo:

```shell
$ git remote add upstream https://github.com/freeCodeCamp/classroom-mode.git
```

Congratulations, you now have a local copy of the classroom-mode repo!

#### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

##### Rebasing from Upstream

Do this prior to every time you create a branch for a PR:

1. Make sure you are on the `master` branch

```shell
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
```
If your aren't on `master`, resolve outstanding files / commits and checkout the `master` branch

```shell
$ git checkout master
```

2. Do a pull with rebase against `upstream`

```shell
$ git pull --rebase upstream master
```

This will pull down all of the changes to the official master branch, without making an additional commit in your local repo.

3. (_Optional_) Force push your updated master branch to your GitHub fork

```shell
$ git push origin master --force
```

This will overwrite the master branch of your fork.

### Create a Branch

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

**If you need more help with branching, take a look at [this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).**

### Set Up

Once you have classroom-mode cloned, before you start the application, you first need to install all of the dependencies:

```bash
# Install dependencies
npm install
```

Then you need to add the private environment variables 

```bash
# Create a copy of the "variables.sample.env" and name it as "variables.env".

# Populate it with the necessary secrets:

# macOS / Linux
cp variables.env.sample variables.env

# Windows
copy variables.env.sample variables.env
```

Then edit the `variables.env` file and modify the keys only for parts that you will use.

