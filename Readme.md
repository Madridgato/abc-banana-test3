Pre-requesites to run tests:

1. Install Node.js from https://nodejs.org/en/download/releases/ if this is not yet installed on your machine. Download
and install the latest LTS release for your platform.

2. Ensure Google Chrome is installed on your machine, if not download from 
https://www.google.com/chrome/browser/desktop/index.html

3. Ensure the Java 8 or later Runtime Environment (JRE) is installed, otherwise download from 
http://www.oracle.com/technetwork/java/javase/downloads/index.html

4. In Linux make sure node.js executables, such as node and npm are added to the user PATH, on Windows and OSX open the 
Node.js command prompt

5. Create a new  directory to install the test suite and go to this directory in the command prompt. 
Eg. create a new directory C:\temp\abc1

6. Download the test suite from github at https://github.com/Madridgato/abc-banana-test3  , either by downloading the
clone zip file (https://github.com/Madridgato/abc-banana-test3/archive/master.zip) or performing a git clone in the test
suite directory. Unzip the zip file in the test suite directory (in the example unzip it in the c:\temp\abc1 directory)
After unzipping, change to the abc-banana-test3 directory

7. Install/update the project's webdriver.io: Go to the Node.js command prompt, and at the prompt type:
npm install webdriverio --save-dev

eg: c:\temp\abc1>  npm install webdriverio --save-dev


8. In the test suite directory run the tests using the command:
npm test

eg: c:\temp\abc1> npm test

In regards to the JSON questions
2) To run the tests in many different environments, I have created a function JSONTestMultipleEnvironments, which takes
the URL and folder of the test environment as the first argument, the name of the JSON file on the server to be checked 
as the 2nd argument, and the name of the JSON file on the local machine you wish to compare it with as the 3rd argument
To compare multiple URLs / test environments, put in the different URLs and folder names in the 1st argument of the
JSONTestMultipleEnvironments function

3) To test JSON files arid key I have the the checkARID function which tests the value of arid key in the .json file
against the name of the file given. To traverse this same test against many programs, a list of the arid IDs would be 
required which could then be fed into the test suite, either by putting the arid IDs into a file or files that could be
read. This file or files could then be loaded by the test suite. If the arid can be accessed by public APIs, then the
test program could first call the APIs to receive the arid IDs, then iterate over each arid with the checkARID function.
If the tester wanted to check all the key/value pairs for particular files, they could store all the json files with the
expected values in a directory and run JSONTestMultipleEnvironments for each file in that directory.