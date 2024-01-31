# Codeworks code reviews

This repo is used to do code reviews for entire projects from students.

## Getting started

- Make sure you have a linter set up (e.g. [ESLint](https://eslint.org/)), otherwise please add one to your project and lint the code.
- Check that you have a `.gitignore` file in your repo, otherwise copy the one you find in this repo and add it to your project as a starting point.
- In case you have already forked this repo in the past, before continuing first delete your fork (any associated pull requests are not deleted, don’t worry).

## How it works

- Once your project is ready, fork this repo and clone the fork on your computer.
- Copy all the code from your project to that clone (without overwriting its `.git` folder), and include any dotfiles (which are hidden files starting with a dot, typically used for configuration purposes).
- Commit all your code and push it to your fork.
- Send a pull request (feel free to add a comment to your PR, in case it’s useful for the reviewer).
- You will receive a notification on GitHub once the code review is completed.

## Why we do it this way?

When a group of engineers is working on a software project, usually all team members have access to the code (sometimes with varying levels of privileges), and PRs are sent on the same repo. This is what happens for example when you work on group projects with other students.

On the other hand, in an educational context, we have found the workflow used here to be the simplest for students and instructors. This ensures that the reviewer assigned to you has access to your code and we can correctly track all incoming review requests.
