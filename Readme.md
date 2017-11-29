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

6. Install webdriver.io: Go to the Node.js command prompt, and at the prompt type:
npm install webdriver.io --save-dev

eg: c:\temp\abc1>  npm install webdriver.io --save-dev

7. Download the test suite from github at https://github.com/Madridgato/abc-banana-test3  , either by downloading the
clone zip file (https://github.com/Madridgato/abc-banana-test3/archive/master.zip) or performing a git clone in the test
suite directory. Unzip the zip file in the test suite directory (in the example unzip it in the c:\temp\abc1 directory)
Overwrite any files 

8. In the test suite directory run the tests using the command:
npm test

eg: c:\temp\abc1> npm test

