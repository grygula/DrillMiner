# Drill Miner
## Abstract
Chrome extension to extract quizzes from Academy in [Drill 2](https://github.com/gronostajo/drill2) friendly format

## Description
Drill miner is a Chrome Extension allowing to extract Academy questions and answers from training quizzes and prep exams.

Results are stored in Clipboard and are ready to be append to text file later used by [Drill 2](https://github.com/gronostajo/drill2) 

## Installation
1. Download zip file, 
2. Unzip in any location
3. Visit [chrome://extensions](chrome://extensions) in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox:   and select Extensions under the Tools menu to get to the same place).
4. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
5. Click Load unpacked extension� to pop up a file-selection dialog.
6. Navigate to the directory in which your extension files live, and select it.


Alternatively, you can drag and drop the directory where your extension files live onto [chrome://extensions](chrome://extensions) in your browser to load it.
If the extension is valid, it'll be loaded up and active right away!


## Limitations
* Prep exam page detection can be tricky, code will look for Re-Submit button, if missing then go to review page and retake one of exam topics_
* Extension is in developer mode, it cannot be obtain from Google Store - Chrome can complain about it if extension is enabled

## FAQ
* I see ~~dead people~~ error

    Report it via: https://github.com/grygula/DrillMiner/issues

* Why Extension is in development mode and not official

    Because it costs money :-) not a lot but still

* Can I contribute to the project?

    Sure, just let me know or fork the project on [GitHub](https://github.com/grygula/DrillMiner)


## Technology 
* [Vanilla JS](http://vanilla-js.com/)
* CSS
* HTML

Source code can be found here:
https://github.com/grygula/DrillMiner

If you want to add new feature or fix bugs you are welcome to contribute.

## Future development
For this moment there are NO plans for future development. But tool can be extended in _following directions_ :
* better detection of quiz on prep exam pages
* adding info regarding chapter for quizzes
* managing Drill test files 