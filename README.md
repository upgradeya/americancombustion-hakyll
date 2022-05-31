# American Combustion site generator

Instructions for building American Combustion static site.

- Install Stack and Hakyll
- Install npm

Specific instructions are included for Arch Linux.

## npm

Several frontend files need to be generated using gulp as a runner. These files include css, fonts and javascript files. Use `npm install` to install all the requirements.
Then the command `npx -- gulp` will generate all the files managed by gulp. The `npx --gulp watch` command can be used to watch for changes and rebuild.

## Hakyll

Run `stack build` to build hakyll binary for building and watching content related changes.
These files mostly include html files but also all frontend files which have been changed by gulp.
Use the command `stack exec -- site build` to build the project.
Use `stack exec -- site watch` to watch for changes and automatically rebuild.

The `watch` command should also provide a preview of the site most likely available at `http://127.0.0.1:8000`.
