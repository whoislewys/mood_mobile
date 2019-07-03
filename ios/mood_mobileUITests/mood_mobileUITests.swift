//
//  mood_mobileUITests.swift
//  mood_mobileUITests
//
//  Created by Luis Gomez on 7/1/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import XCTest

class mood_mobileUITests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = true

        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
      
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
      
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        
        let app = XCUIApplication()
        
        // Mood
        Thread.sleep(forTimeInterval:20) // let splash screen fade away + mood tiles load
        snapshot("Discover")
        
        // Leaderboard
        app/*@START_MENU_TOKEN@*/.otherElements["TabBarButton-Leaderboard"].children(matching: .image).element.tap()/*[[".otherElements.matching(identifier: \"Discover Happy Angry Romantic Sad Song of the Week\")",".otherElements[\"BottomBarsContainer\"]",".otherElements[\"TabBar\"].otherElements[\"TabBarButton-Leaderboard\"].children(matching: .image).element",".tap()",".press(forDuration: 0.6);",".otherElements[\"TabBarButton-Leaderboard\"].children(matching: .image).element"],[[[-1,5,3],[-1,2,3],[-1,1,2],[-1,0,1]],[[-1,5,3],[-1,2,3],[-1,1,2]],[[-1,5,3],[-1,2,3]],[[-1,4],[-1,3]]],[0,1]]@END_MENU_TOKEN@*/
        Thread.sleep(forTimeInterval:60) // let assets load & render
        snapshot("Rank")

        // My Music
        XCUIApplication()/*@START_MENU_TOKEN@*/.otherElements["TabBarButton-MyMusic"]/*[[".otherElements.matching(identifier: \"Discover Happy Angry Romantic Sad Song of the Week\")",".otherElements[\"BottomBarsContainer\"]",".otherElements[\"TabBar\"].otherElements[\"TabBarButton-MyMusic\"]",".otherElements[\"TabBarButton-MyMusic\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.children(matching: .image).element.tap()
        Thread.sleep(forTimeInterval:60)
        snapshot("Share")

        // Play
        app/*@START_MENU_TOKEN@*/.otherElements["TabBarButton-Mood"]/*[[".otherElements.matching(identifier: \"Daily Weekly Monthly All Time 1 Ponte Sata (Ft Sou El Flotador) Ink El Lejendario 25 2 old friends (w\/ SHKEEM and lucas was 11) flameson 0 3 Best Friend Christian Kameron 0 4 key Pop Malcolm 0 5 ollie Pop Malcolm 0 6 Origami GANGES 0 7 Best Side LOVER 0 8 LSD (ft GRAMthart) JayKristo 0 9 Wholesome Room 4 0 10 Eagle To The Prey LOVER 0 1 Ponte Sata (Ft Sou El Flotador) Ink El Lejendario 25 2 old friends (w\/ SHKEEM and lucas was 11) flameson 0 3 Best Friend Christian Kameron 0 4 key Pop Malcolm 0 5 ollie Pop Malcolm 0 6 Origami GANGES 0 7 Best Side LOVER 0 8 LSD (ft GRAMthart) JayKristo 0 9 Wholesome Room 4 0 10 Eagle To The Prey LOVER 0 1 Ponte Sata (Ft Sou El Flotador) Ink El Lejendario 25 2 old friends (w\/ SHKEEM and lucas was 11) flameson 0 3 Best Friend Christian Kameron 0 4 key Pop Malcolm 0 5 ollie Pop Malcolm 0 6 Origami GANGES 0 7 Best Side LOVER 0 8 LSD (ft GRAMthart) JayKristo 0 9 Wholesome Room 4 0 10 Eagle To The Prey LOVER 0 11 trophy\/\/move on ♡❀lilbearshawty❀♡ 0 12 By Any Means Jataun 0 13 Kiddo ft. Decco - Drunk & I miss u (Bastwist remix) Bastwist  0 14 Wild Souls BASTWIST  0 15 Crazy Little Things Bastwist  0 16 Fortnite and Chill ft. $hayBreezy & UCLA Pipedown (prod. by Wavflix) Brad$haw 0 17 Jaq Dnls (prod. by KenKen) 4STRO F4ME (Ft. Revert) 0 18 High Noon (Prod. IceRocks) Madhattan Mayor 0 19 Dark Reality feat. Jack James and Droopz (prod. JonBoy) Jack James 0 20 Visions Rafiel Davi & Mxrc Clxrk 0 1 Ponte Sata (Ft Sou El Flotador) Ink El Lejendario 25 2 old friends (w\/ SHKEEM and lucas was 11) flameson 0 3 Best Friend Christian Kameron 0 4 key Pop Malcolm 0 5 ollie Pop Malcolm 0 6 Origami GANGES 0 7 Best Side LOVER 0 8 LSD (ft GRAMthart) JayKristo 0 9 Wholesome Room 4 0 10 Eagle To The Prey LOVER 0 Leaderboard\")",".otherElements[\"BottomBarsContainer\"]",".otherElements[\"TabBar\"].otherElements[\"TabBarButton-Mood\"]",".otherElements[\"TabBarButton-Mood\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.children(matching: .image).element.tap()
        Thread.sleep(forTimeInterval:5)
        app.otherElements["MoodTile-99"].tap() // Tap the featured song tile (has a hardcoded id of 99)
        Thread.sleep(forTimeInterval:300) // Let playscreen assets load & render (takes a long ass time sometimes)
        snapshot("Listen")
    }

}
