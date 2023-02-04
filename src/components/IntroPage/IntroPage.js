import React, { useEffect } from 'react'
import "./IntroPage.css"

const IntroPage = () => {
    const textDisplay = document.getElementById("text");
    let i = 0;
    let j = 0;
    const phrase = ["Coding", "Programming", "Networking"]
    let currentPhrase = []
    let isDeleting = false;
    function loop() {
        if (textDisplay) {
            textDisplay.innerHTML = currentPhrase.join("");
        }
        if (i < phrase.length) {
            if (!isDeleting && j <= phrase[i].length) {
                currentPhrase.push(phrase[i][j])
                j++
            }
            if (isDeleting && j <= phrase[i].length) {
                currentPhrase.pop(phrase[i][j])
                j--;
            }
            if (j === phrase[i].length) {
                isDeleting = true;
            }
            if (isDeleting && j === 0) {
                isDeleting = false;
                currentPhrase = [];
                i++;
                if (i === phrase.length) {
                    i = 0;
                }
            }
        }
        setTimeout(loop, 200)
    }
    useEffect(() => {
        loop()
    })

    return (
        <div className='IntroPage'>
            <div className="IntroContent">
                <div className="heading">Welcome to <span className='NetWiz'>Network Wizards</span></div>
                <div className="changeContainer">
                    <div className="changeCourses">
                        <span className='Learn'>Learn <span id='text' className='NetWiz'></span></span>

                    </div>
                </div>
                <div className="para">
                    NetworkWizards is a comprehensive resource for individuals interested in coding, computer networking, and cyber security. Our aim is to provide accessible and informative content to help you expand your skills in these exciting fields. From tutorials and how-to guides to the latest advancements, our website has everything you need to become a coding, networking, or security expert. Join our community of like-minded individuals and stay updated with our newsletter. NetworkWizards - your one-stop-shop for all things technology.
                </div>
            </div>
            <div className="box box1">
                <img src="data:image/png;base64,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" alt='nothing'></img>
            </div>
            <div className="box box2">
                <img alt='nothing' src="data:image/png;base64,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" />
            </div>
            <div className="box box3">
                <img alt='nothing' src="data:image/png;base64,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"></img>
            </div>
        </div>
    )

}

export default IntroPage


