var assert = require('assert');

/*
the URL and folder of the test environment as the first argument, the name of the JSON file on the server to be checked
as the 2nd argument, and the name of the JSON file on the local machine you wish to compare it with as the 3rd argument
 */
var JSONTestMultipleEnvironments = function(urlAddress, compareFile, localFile){
    var fs = require('fs');
    var jsCompare = false;
    debugger;

    if(urlAddress.length > 1 && compareFile.length > 1 && localFile.length > 1) {


        browser.url(urlAddress + compareFile);
        var c1JSON = JSON.parse(browser.getText("//body"));

        var c1compareJSON = JSON.parse(fs.readFileSync(localFile, 'utf8'));

        try{
            assert.deepStrictEqual(c1JSON, c1compareJSON);
            jsCompare = true;
        }
        catch (ae){
            jsCompare = false;
        }
    }
    return(jsCompare);
};

/*
Checks if the value in the arid key is the same as the json file name
 */
var checkARID = function(testendURL, arid){
    var arCompare = false;
    if(testendURL.length > 1 && arid.length > 1) {
        try{
            browser.url(testendURL + arid+".json");
            var caJSON = JSON.parse(browser.getText("//body"));
            if (caJSON.arid === arid){
                arCompare = true;
            }
        }
        catch (ae){
            arCompare = false;
        }
    }
    return arCompare;
};


describe('ABC news page', function(){
    it('should load successfully', function() {

        browser.url('/news/');
//        console.log(pageOK.toString());

        var title = browser.getTitle();

        assert.equal(title,'ABC News (Australian Broadcasting Corporation)');
    });

    it('should have the News banner load successfully', function(){
        browser.url('/news/');
        var bundleHeader = browser.waitForVisible('#abcHeader');
        var abcTopNavHomeLink = browser.getText('.abcLink*=ABC Home');
        var abcTopNavSearch = browser.isVisible('.abcLink*=Search');
        var abcTopNavSites = browser.isExisting('#abcNavSites');
        var abcNewsImageElement = browser.element('#container_header');
        var abcNewsIcon = abcNewsImageElement.getAttribute('img','alt');
        var abcNewsIconCount = 0;

        console.log(abcTopNavHomeLink);
        console.log(abcTopNavSearch);
        console.log(abcTopNavSites);
        console.log(abcNewsIcon);

        if ((bundleHeader === false) || (abcTopNavHomeLink.length === 0) || !abcTopNavSearch || !abcTopNavSites) {
            assert(false);
            return;
        }
        var newsIconCount;
        for(newsIconCount = 0; newsIconCount < abcNewsIcon.length; newsIconCount++){
            if (abcNewsIcon[newsIconCount] === 'ABC News') {
                abcNewsIconCount++;
            }
        }
        console.log(abcNewsIconCount);
        if (abcNewsIconCount === 0) {  // If no images in the container header are tagged with 'ABC News', assume news banner is not appearing
            assert(false);
            return;
        }
        assert(bundleHeader);

    });
    it("should be able to navigate to the 'Just In' page via the link in the primary navigation", function() {
        browser.url('/news/');
        var primaryNavBar = browser.waitForVisible('#primary-nav');
        console.log(primaryNavBar);
        var abcNewsPrimaryNavElement = browser.element('#primary-nav');
        var abcNewsJustInLink = abcNewsPrimaryNavElement.element('a=Just In');
        console.log(abcNewsJustInLink.getAttribute('href'));
        abcNewsJustInLink.click();

        var justInHeaderVisible = browser.waitForVisible('h1=Just In');
        assert(justInHeaderVisible);

    });
    it("on the 'Just In' page (http://www.abc.net.au/news/justin/) the content per article loads correctly, containing \n" +
        "1. Title \n" +
        "2. Timestamp \n"+
        "3. Text \n", function() {

        browser.url('/news/justin/');

        var titleOK = true;
        var TimestampOK = true;
        var TextOK = true;

        var justInHeaderVisible1 = browser.waitForVisible('h1=Just In');
        var articleIndexVisible = browser.waitForVisible('.article-index');
        var articleIndexElements = browser.element('.article-index').elements('<li>');
        var articleIndexElementTitle = browser.elements("//ul[@class='article-index']/li/h3/a");
        var articleIndexElementTimestamp = browser.elements("//ul[@class='article-index']/li/p[@class='published']/span[@class='timestamp']");
        var articleIndexElementText = browser.elements("//ul[@class='article-index']/li/p[2]");



        var articleIndexCounter;
//        browser.debug();
        for(articleIndexCounter = 0; articleIndexCounter < articleIndexElements.value.length; articleIndexCounter++) {

//            console.log(articleIndexElements.value[articleIndexCounter].value);


//            console.log("title "+articleIndexElementTitle.value[articleIndexCounter].getText());
//            console.log("timestamp "+articleIndexElementTimestamp.value[articleIndexCounter].getText());
//            console.log("text "+articleIndexElementText.value[articleIndexCounter].getText());

            if( articleIndexElementTitle.value[articleIndexCounter].getText().length == 0){
                titleOK = false;
                assert(titleOK);
                return;
            }
            if( articleIndexElementTimestamp.value[articleIndexCounter].getText().length == 0){
                TimestampOK = false;
                assert(TimestampOK);
                return;
            }
            if( articleIndexElementText.value[articleIndexCounter].getText().length == 0){
                TextOK = false;
                assert(TextOK);
                return;
            }


        }
        assert(true);

    });
    it(" Verify that a video (NOLb_WeatherillPresser_0902_1000k.mp4 ) loads and appears successfully ", function() {

        browser.url('/news/2017-02-09/weatherill-promises-to-intervene-dramatically/8254908');

        var videoOK = true;

        var videoElement = browser.element("//video[@class='jw-video jw-reset' and @src='http://mpegmedia.abc.net.au/news/video/201702/NOLb_WeatherillPresser_0902_1000k.mp4']");


        console.log("this video is visible "+ videoElement.isVisible());

        if(videoElement.isVisible() === false) {
            videoOK = false;
        }

        assert(videoOK);

    });
    it(" Verify that the Image Gallery successfully loads and images appear correctly ", function() {

        browser.url('/news/2017-02-10/abc-open-pic-of-the-week/8256256');

        var imageGallery = false;

        var imageGalleryElements = browser.elements("//div[@class='section media-article media-article-gallery media-article-gallery-ssp']//img");



        for(var imageGalleryCounter = 0; imageGalleryCounter < imageGalleryElements.value.length; imageGalleryCounter++) {

            if(imageGalleryElements.value[imageGalleryCounter].isVisible() === true) {
                console.log(imageGalleryElements.value[imageGalleryCounter].getAttribute("src"));
                imageGallery = true;
            }
        }

        assert(imageGallery);

    });

});

describe('ABC Radio National page', function(){
    it(" can navigate to a Program from the Programs sub-menu", function() {
       browser.url('/radionational/');
       var programVisible = browser.moveToObject("//div[@id='rn-navigation']//a[text()='Programs']");


       var rnProgramNameVisible = browser.waitForVisible("//ul[@id='rn-programindex']/li[3]/a");


       var rnProgramNameclick = browser.click("//ul[@id='rn-programindex']/li[3]/a");
       console.log(browser.getTitle());
       assert(rnProgramNameVisible);

    });
    it("can navigate to the last item in the ‘Program guide’ banner ", function() {
        browser.url('/radionational/');
        var rnOnAirProgramElements = browser.elements("//div[@class='on-air-wrapper']/div[@class='on-air']/ul[@class='at-a-glance']/li");
        var epochLastShow = "";
        var rnOnAirLastProgramElementVisible = false;


        for(var rnOnAirCounter = rnOnAirProgramElements.value.length; rnOnAirCounter > 0; rnOnAirCounter--) {
            epochLastShow = rnOnAirProgramElements.value[rnOnAirCounter-1].getAttribute("epoch");
            if (epochLastShow != null) {
                break;
            }

        }

        rnOnAirLastProgramElementVisible = browser.isVisible("//div[@class='on-air-wrapper']/div[@class='on-air']/ul[@class='at-a-glance']/li[@epoch="+epochLastShow+"]");

        while(rnOnAirLastProgramElementVisible === false){
            browser.click("//div[@class='on-air-wrapper']/div[@id='right-arrow']");
            rnOnAirLastProgramElementVisible = browser.isVisible("//div[@class='on-air-wrapper']/div[@class='on-air']/ul[@class='at-a-glance']/li[@epoch="+epochLastShow+"]");
        }
        browser.click("//div[@class='on-air-wrapper']/div[@class='on-air']/ul[@class='at-a-glance']/li[@epoch="+epochLastShow+"]");
        console.log(browser.getTitle());
        assert(rnOnAirLastProgramElementVisible);

    });
    it("can search for content in the search bar and that content is returned", function(){
        browser.url('/radionational/');
        var rnSearchBox = browser.setValue("//div[@id='search-simple']//input[@id='search-simple-input-query' and @class='text']", "RBA");
        var rnSearchBoxSubmit = browser.click("//div[@id='search-simple']//input[@id='search-simple-input-submit' and @class='submit']");

        var rnSearchResultHeader = browser.waitForVisible("//div[@class='ct-search-header']");
        console.log(browser.getText("//div[@class='ct-search-header']/p"));
        assert(rnSearchResultHeader);

    });
    it("you can click on Social media ‘Share’ icon and the correct pop-up appears", function(){
        browser.url('/radionational/programs/bigideas/a-fortunate-universe/8076406');
        var fbShareVisible = browser.waitForVisible("//div[@class='fb-share-button fb_iframe_widget']");
        var facebookShare = browser.click("//div[@class='fb-share-button fb_iframe_widget']");
        var fbPopupOK = false;
        var fbBrowserWindows;

        fbShareVisible = browser.waitUntil((function() {
            fbBrowserWindows = browser.getTabIds();
            return fbBrowserWindows.length > 1;
        } ));

        for (var fbBrowserWindowsCounter = 0; fbBrowserWindowsCounter < fbBrowserWindows.length;fbBrowserWindowsCounter++ ){
            browser.switchTab(fbBrowserWindows[fbBrowserWindowsCounter]);
            console.log(fbBrowserWindows[fbBrowserWindowsCounter] +": "+ browser.getTitle()+"; "+ browser.getUrl());
            if(browser.getUrl().includes("facebook.com")){
                fbPopupOK = true;
                browser.close();
                break;
            }
        }
        assert(fbPopupOK);
    });
    it("when you click on ‘Download audio’ you are directed to the mp3 file", function(){
        browser.url('/radionational/programs/bigideas/a-fortunate-universe/8076406');
        var bigIdeasAudioVisible =  browser.waitForVisible("//a[text()='Download audio']");
        var bigIdeasAudio =  browser.click("//a[text()='Download audio']");
        var bigIdeasAudioOK = false;
        browser.waitUntil((function(){
            bigIdeasAudioOK = (browser.getUrl()).endsWith("bia_20170208_2005.mp3");
            return bigIdeasAudioOK;
        }));

        assert(bigIdeasAudioOK);
    });
    it("when you click on ‘Listen now’ (from previous url) you are re-directed to the following url", function(){
        browser.url('/radionational/programs/bigideas/a-fortunate-universe/8076406');
        var bigIdeasListenOK = false;
        var bigIdeasListenVisible =  browser.waitForVisible("//a[text()='Listen Now']");
        if(bigIdeasListenVisible === false){
            assert(bigIdeasListenVisible);
            return;
        }

        var bigIdeasListen =  browser.click("//a[text()='Listen Now']");

        browser.waitUntil((function(){
            bigIdeasListenOK = (browser.getUrl() === "https://radio.abc.net.au/programitem/pg1aGbWlx6?play=true");
            return bigIdeasListenOK;
        }));

        assert(bigIdeasListenOK);
    });

    it("audio player loads successfully when you load url: https://radio.abc.net.au/programitem/pg1aGbWlx6?play=true ", function(){
        browser.url('https://radio.abc.net.au/programitem/pg1aGbWlx6?play=true');

        var bigIdeasAudioPlayerVisible =  browser.waitForVisible("//div[@id='player']");


        assert(bigIdeasAudioPlayerVisible);
    });

});
describe('JSON integration tests', function(){
    it("Verify the key/value pairs from the following jSon output http://program.abcradio.net.au/api/v1/programs/ppJj0E8g2R.json", function(){
        assert(JSONTestMultipleEnvironments("http://program.abcradio.net.au/api/v1/programs/","ppJj0E8g2R.json", "ppJj0E8g2R.json"));
    });
    it("Verify the key/value pairs from the following JSON output using test environment http://test-program.abcradio.net.au/api/v1/programs/", function (){
        assert(JSONTestMultipleEnvironments("http://test-program.abcradio.net.au/api/v1/programs/","ppJj0E8g2R.json","ppJj0E8g2R.json"));
    });
    it("Verify the key/value pairs from the following JSON output using Staging environment http://staging-program.abcradio.net.au/api/v1/programs/", function (){
        assert(JSONTestMultipleEnvironments("http://staging-program.abcradio.net.au/api/v1/programs/","ppJj0E8g2R.json","ppJj0E8g2R.json"));
    });
    it("Verify the key/value pairs from the following JSON output using different files ppxa2Amj2b.json", function(){
        assert(JSONTestMultipleEnvironments("http://program.abcradio.net.au/api/v1/programs/","ppxa2Amj2b.json","ppxa2Amj2b.json"));
    });
    it("Verify the arid key/value pair is correct for key ppJj0E8g2R", function(){
        assert(checkARID("http://program.abcradio.net.au/api/v1/programs/","ppJj0E8g2R"));
    });
    it("Verify the arid key/value pair is correct for key ppxa2Amj2b", function(){
        assert(checkARID("http://program.abcradio.net.au/api/v1/programs/","ppxa2Amj2b"));
    });

});
