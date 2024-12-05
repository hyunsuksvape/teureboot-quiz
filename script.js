const form = document.getElementById("quiz-form");
const submitButton = document.getElementById("submit-btn");
const loadingScreen = document.getElementById("loadingScreen");
const resultSection = document.getElementById("quiz-result");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");
const retakeButton = document.getElementById("retake-quiz");

// Member descriptions and images
const memberDescriptions = {
    Hyunsuk: "Hyunsuk: You're a natural leader with a bold sense of style and a vision for success. You inspire others with your creativity and confidence, always pushing boundaries and staying ahead of the curve.",
    Jihoon: "Jihoon: You're full of energy and charm, lighting up every room you walk into. Your love for life and ability to connect with others makes you the ultimate people person and a born entertainer.",
    Yoshi: "Yoshi: You're thoughtful, artistic, and deeply grounded. You have a creative soul and a calm demeanor that draws people to you, and your unique perspective always stands out.",
    Junkyu: "Junkyu: You're warm, caring, and effortlessly charming. People feel at ease around you, and your positive energy makes you the kind of person everyone loves to have in their life.",
    Jaehyuk: "Jaehyuk: You're kind-hearted and dependable, always putting others first. Your thoughful nature and dedication makes you a true friend and someone people can always count on.",
    Asahi: "Asahi: You're a quiet, creative force with a unique way of seeing the world. You express yourself though your art and actions, making a big impact with just who you are.",
    Doyoung: "Doyoung: You're intelligent, resourceful, and always ready to take on a challenge. Your curiosity and drive push you to keep growing and learning, and you inspire others with your dedication.",
    Haruto: "Haruto: You're effortlessly cool and confident, with a strong presence that's impossible to ignore. You're not afraid to take risks, and your laid-back attitude inspires other to do the same.",
    Jeongwoo: "Jeongwoo: You're level-headed, full of humor and life. Your sense of humor and big personality make you the life of the party and someone who brings joy wherever you go.",
    Junghwan: "Junghwan: You're down-to-earth, with a deep appreciation for life's simple pleasures. Your warm and approachable nature makes you someone everyone feels comfortable with."
};

const resultImages = {
    Hyunsuk: "hyunsuk-image.jpg",
    Jihoon: "jihoon-image.jpg",
    Yoshi: "yoshi-image.jpg",
    Junkyu: "junkyu-image.jpg",
    Jaehyuk: "jaehyuk-image.jpg",
    Asahi: "asahi-image.jpg",
    Doyoung: "doyoung-image.jpg",
    Haruto: "haruto-image.jpg",
    Jeongwoo: "jeongwoo-image.jpg",
    Junghwan: "junghwan-image.jpg"
};

// Question-answer mapping
const mapping = {
    q1: { a: "Jihoon", b: "Yoshi", c: "Junkyu", d: "Asahi", e: "Haruto" },
    q2: { a: "Haruto", b: "Junghwan", c: "Asahi", d: "Doyoung", e: "Jeongwoo" },
    q3: { a: "Jihoon", b: "Haruto", c: "Junkyu", d: "Asahi", e: "Doyoung" },
    q4: { a: "Hyunsuk", b: "Doyoung", c: "Jeongwoo", d: "Asahi", e: "Jaehyuk" },
    q5: { a: "Haruto", b: "Jaehyuk", c: "Jihoon", d: "Yoshi", e: "Junkyu" },
    q6: { a: "Doyoung", b: "Jihoon", c: "Jaehyuk", d: "Junghwan", e: "Jeongwoo" },
    q7: { a: "Hyunsuk", b: "Asahi", c: "Junkyu", d: "Yoshi", e: "Jihoon" },
    q8: { a: "Hyunsuk", b: "Junghwan", c: "Jaehyuk", d: "Haruto", e: "Jeongwoo" },
    q9: { a: "Jaehyuk", b: "Junghwan", c: "Haruto", d: "Yoshi", e: "Asahi" },
    q10: { a: "Hyunsuk", b: "Asahi", c: "Junkyu", d: "Doyoung", e: "Yoshi" },
    q11: { a: "Jeongwoo", b: "Junghwan", c: "Yoshi", d: "Jihoon", e: "Jaehyuk" },
    q12: { a: "Hyunsuk", b: "Junghwan", c: "Junkyu", d: "Doyoung", e: "Jeongwoo" },
    q13: { a: "Hyunsuk", b: "Jeongwoo", c: "Junkyu", d: "Junghwan", e: "Doyoung" },
    q14: { a: "Hyunsuk", b: "Jaehyuk", c: "Doyoung", d: "Haruto", e: "Junkyu" },
    q15: { a: "Jihoon", b: "Jeongwoo", c: "Yoshi", d: "Haruto", e: "Jaehyuk" },
    q16: { a: "Hyunsuk", b: "Jihoon", c: "Jeongwoo", d: "Haruto", e: "Asahi" },
    q17: { a: "Hyunsuk", b: "Junkyu", c: "Asahi", d: "Yoshi", e: "Junghwan" },
    q18: { a: "Doyoung", b: "Jihoon", c: "Jaehyuk", d: "Haruto", e: "Jeongwoo" },
    q19: { a: "Jaehyuk", b: "Junghwan", c: "Junkyu", d: "Doyoung", e: "Yoshi" },
    q20: { a: "Hyunsuk", b: "Junghwan", c: "Jihoon", d: "Yoshi", e: "Asahi" }
};

// Submit handler
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Show loading screen
    loadingScreen.classList.remove("hidden");

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add("hidden");

        // Calculate result
        const answers = {};
        new FormData(form).forEach((value, key) => {
            answers[key] = value;
        });

        const tally = {};
        for (const [question, answer] of Object.entries(answers)) {
            const member = mapping[question][answer];
            if (member) {
                tally[member] = (tally[member] || 0) + 1;
            }
        }

        // Find the top member
        const maxScore = Math.max(...Object.values(tally));
        const topMembers = Object.keys(tally).filter(member => tally[member] === maxScore);
        const topMember = topMembers[Math.floor(Math.random() * topMembers.length)];

        // Update result section
        resultText.textContent = memberDescriptions[topMember];
        resultImage.src = resultImages[topMember];
        resultSection.classList.remove("hidden");
        form.classList.add("hidden");
    }, 2000);
});

// Retake quiz handler
retakeButton.addEventListener("click", () => {
    resultSection.classList.add("hidden");
    form.classList.remove("hidden");
    form.reset();
});