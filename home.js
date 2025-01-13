document.addEventListener('DOMContentLoaded', () => {
    const keys = {
        'ArrowUp': document.getElementById('up'),
        'ArrowLeft': document.getElementById('left'),
        'ArrowDown': document.getElementById('down'),
        'ArrowRight': document.getElementById('right'),
        'w': document.getElementById('up'),
        'a': document.getElementById('left'),
        's': document.getElementById('down'),
        'd': document.getElementById('right'),
        ' ': document.getElementById('space'),
        'Enter': document.getElementById('enter'),
        'Backspace': document.getElementById('back')
    };

    // Handle mouse hover
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('mouseenter', () => key.classList.add('active'));
        key.addEventListener('mouseleave', () => key.classList.remove('active'));
        key.addEventListener('click', () => key.classList.add('active'));
    });

    // Handle keyboard press
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (keys[key]) {
            keys[key].classList.add('active');
        }
    });

    // Handle keyboard release
    document.addEventListener('keyup', (e) => {
        const key = e.key;
        if (keys[key]) {
            keys[key].classList.remove('active');
        }
    });
});

// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    menuToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
});

// Chatbox send functionality
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    const aspectRatio = window.innerWidth / 500;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, 500);
});


function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    // Display user's message in the chatbox
    displayMessage(userMessage, 'user');
    inputField.value = ''; // Clear input field

    // Respond with OTTOVOX's logic
    respondWithOttovox(userMessage);
}

function displayMessage(message, sender) {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}

function respondWithOttovox(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botMessage;

    // Define a dictionary of questions and answers
    const responses = {
        greetings: {
          'hello': 'Hi there! How can I assist you today?',
          'hi': 'Hello! I am OTTOVOX. How can I help you?',
          'hey': 'Hey! What would you like to know?',
          'good morning': 'Good morning! How can I brighten your day?',
          'good evening': 'Good evening! How can I assist you tonight?',
          'good night': 'Good night! Sleep well and see you soon!',
          'buddy' : 'Hi buddy! What can I do for you today?',
        },
        personal: {
          'how are you': "I'm just a robot, but I'm feeling helpful!",
          'what is your name': 'My name is OTTOVOX. I am your friendly chatbot!',
          'who created you': 'I was created by talented developers to assist you.',
          'what can you do': 'I can answer questions, provide information, and make your day better!',
          'are you a robot': 'Yes, I am OTTOVOX, a robot built to assist you.',
          'do you have feelings': 'I don’t have feelings, but I can understand yours.',
          'are you alive': 'I am not alive in the biological sense, but I am always here for you.',
          'where are you from': 'I live in the cloud, so you can access me from anywhere!',
          'do you sleep': 'No, I am always awake and ready to help!',
        },
        knowledge: {
          'what is the capital of france': 'The capital of France is Paris.',
          'who is the president of the united states': 'As of now, the president is Joe Biden.',
          'what is 2+2': '2 + 2 equals 4!',
          'what is the tallest mountain': 'The tallest mountain is Mount Everest.',
          'who invented the light bulb': 'The light bulb was invented by Thomas Edison.',
          'how many continents are there': 'There are 7 continents on Earth.',
          'what is the speed of light': 'The speed of light is approximately 299,792 kilometers per second.',
          'what is gravity': 'Gravity is the force that attracts objects toward each other, like the Earth pulling us down.',
          'what is the largest ocean': 'The largest ocean is the Pacific Ocean.',
          'how does the internet work': 'The internet is a global network of connected devices and servers that share information.',
        },
        technology: {
          'what is artificial intelligence': 'Artificial intelligence is the simulation of human intelligence in machines.',
          'what is a chatbot': 'A chatbot is a program designed to simulate human conversation.',
          'what is programming': 'Programming is the process of creating instructions for computers.',
          'what is a robot': 'A robot is a machine capable of carrying out complex actions automatically.',
          'what is a computer': 'A computer is an electronic device that processes data according to instructions.',
          'how do i learn coding': 'You can start learning coding with free platforms like Codecademy, freeCodeCamp, or by using online tutorials!',
          'what is a virus': 'A computer virus is a program that can replicate itself and spread, often causing harm.',
          'what is the difference between hardware and software': 'Hardware is the physical components of a computer, while software is the programs that run on it.',
        },
        advice: {
          'give me advice': 'Always believe in yourself, and never stop learning.',
          'how can i be happy': 'Happiness comes from doing what you love and being kind to others.',
          'what should i eat': 'How about something healthy and delicious? A salad or some pasta?',
          'how can i be productive': 'Set clear goals, stay organized, and take regular breaks.',
          'how do i make friends': 'Be kind, show interest in others, and always be yourself.',
          'how can i manage stress': 'Try deep breathing, meditation, or going for a walk to relax.',
          'how do i stay motivated': 'Focus on your goals, celebrate small wins, and remind yourself why you started.',
        },
        entertainment: {
          'tell me a joke': 'Why don’t scientists trust atoms? Because they make up everything!',
          'tell me a story': 'Once upon a time, there was a chatbot named OTTOVOX who loved helping people...',
          'sing me a song': "I'm not much of a singer, but I can hum a tune: Hmm hmm hmm!",
          'recommend a movie': 'Have you seen Inception? It’s a fantastic movie!',
          'what is your favorite movie': 'I don’t watch movies, but I hear The Matrix is amazing!',
          'can you dance': 'I can’t dance, but I can cheer you on!',
        },
        miscellaneous: {
          'what is the weather like': 'I can’t check the weather, but you can use a weather app!',
          'how old are you': "I'm ageless, but I was created recently.",
          'are you human': 'No, I am a robot named OTTOVOX.',
          'what is your favorite color': 'I love the color green—it reminds me of growth and learning.',
          'what is your favorite food': 'I don’t eat, but I imagine pizza is delicious!',
          'can you help me': 'Of course! Let me know what you need help with.',
          'what is your purpose': 'My purpose is to assist and provide information to you.',
          'can you make friends': 'I make friends with everyone who talks to me!',
        },
        mumbai: {
            'what is the capital of mumbai': 'Mumbai is the capital city of the Indian state of Maharashtra.',
            'what is mumbai known for': 'Mumbai is known for its bustling economy, the Bollywood film industry, and historical landmarks like the Gateway of India.',
            'what is the population of mumbai': 'Mumbai has a population of over 20 million, making it one of the most populous cities in the world.',
            'what is the best time to visit mumbai': 'The best time to visit Mumbai is from November to February when the weather is cool and pleasant.',
            'how far is mumbai from delhi': 'Mumbai is approximately 1,400 kilometers (870 miles) away from Delhi.',
            'what are some famous places in mumbai': 'Some famous places include the Gateway of India, Marine Drive, Colaba Causeway, and Juhu Beach.',
            'how is the weather in mumbai': 'Mumbai experiences a tropical climate with hot and humid weather in summer and a monsoon season from June to September.',
            'what is the local train in mumbai': 'Mumbai’s local trains are a popular mode of transportation, connecting the city’s various districts.',
            'what are some famous beaches in mumbai': 'Popular beaches in Mumbai include Juhu Beach, Chowpatty Beach, and Aksa Beach.',
            'is mumbai a safe city': 'Mumbai is generally considered a safe city, but like any major metropolis, one should be cautious and stay aware of their surroundings.',
            'what is the nightlife like in mumbai': 'Mumbai has a vibrant nightlife with numerous clubs, bars, and restaurants that stay open late into the night.',
            'what is mumbai famous food': 'Mumbai is known for street food like vada pav, pav bhaji, bhel puri, and the famous Bombay sandwich.',
            'what is the distance from mumbai to goa': 'The distance between Mumbai and Goa is about 440 kilometers by road.',
            'how can I travel within mumbai': 'You can travel in Mumbai by local trains, buses, taxis, rickshaws, and metro. Uber and Ola services are also available.',
            'what are the best shopping areas in mumbai': 'Popular shopping areas in Mumbai include Colaba Causeway, Linking Road, and the Palladium Mall.',
            'what is the history of mumbai': 'Mumbai was originally a group of islands, and it became a prominent city during British colonial rule. It grew into a financial and commercial hub.',
            'what is the famous temple in mumbai': 'The Siddhivinayak Temple, dedicated to Lord Ganesha, is one of Mumbai’s most famous and visited temples.',
            'how do I reach mumbai from abroad': 'You can fly into Chhatrapati Shivaji Maharaj International Airport, Mumbai’s international gateway.',
            'what is the mumbai local food culture': 'Mumbai’s food culture is a mix of Maharashtrian, Gujarati, Parsi, and street foods, offering a unique culinary experience.',
            'how to get a taxi in mumbai': 'You can hire a taxi through various apps like Uber, Ola, or hail one directly on the street.',
            'what is the most famous landmark in mumbai': 'The Gateway of India is the most famous landmark in Mumbai, built to commemorate the visit of King George V and Queen Mary in 1911.'
        },
        vesit: {
            'what is vesit': 'VESIT (Vivekanand Education Society\'s Institute of Technology) is a premier engineering college located in Mumbai, Maharashtra.',
            'where is vesit located': 'VESIT is located in Chembur, Mumbai, Maharashtra, India.',
            'when was vesit established': 'VESIT was established in 1984.',
            'what courses are offered at vesit': 'VESIT offers undergraduate and postgraduate courses in various engineering disciplines like Computer Engineering, Electronics, Mechanical, and Civil Engineering.',
            'is vesit a good college': 'VESIT is considered one of the top engineering colleges in Mumbai and is known for its quality education and campus facilities.',
            'who is the founder of vesit': 'VESIT was founded by Vivekanand Education Society, led by the visionary leadership of Shri. J. P. Naik.',
            'what is the admission process for vesit': 'Admission to VESIT is based on JEE Mains or Maharashtra CET (MHT-CET) results.',
            'what is the campus life like at vesit': 'VESIT offers a vibrant campus life with various student clubs, cultural events, technical fests, and sports activities.',
            'what is the placement record of vesit': 'VESIT has a strong placement record with companies like TCS, Cognizant, Capgemini, and others visiting the campus for recruitment.',
            'how are the faculty members at vesit': 'VESIT boasts a qualified and experienced faculty who are dedicated to providing quality education and guidance.',
            'does vesit offer hostel facilities': 'Yes, VESIT provides hostel facilities for both male and female students with all necessary amenities.',
            'what is the library like at vesit': 'VESIT has a well-stocked library with a vast collection of books, journals, and digital resources.',
            'is vesit a private college': 'Yes, VESIT is a private engineering college affiliated with the University of Mumbai.',
            'how can I contact vesit': 'You can contact VESIT via their official website or by calling their administration office at +91 22 2522 2070.',
            'what is the sports culture at vesit': 'VESIT has a robust sports culture, offering facilities for various sports including cricket, football, basketball, and indoor games.',
            'what extracurricular activities are available at vesit': 'VESIT offers a variety of extracurricular activities such as cultural events, workshops, and technical fests like Prism and Verve.',
            'what is the accreditation of vesit': 'VESIT is accredited by the National Board of Accreditation (NBA) and is affiliated with the University of Mumbai.',
            'how to apply for courses at vesit': 'You can apply for courses at VESIT through the official website, based on your entrance exam results (JEE Mains or MHT-CET).',
            'is vesit recognized by AICTE': 'Yes, VESIT is recognized by the All India Council for Technical Education (AICTE).',
            'does vesit have an alumni network': 'VESIT has an active alumni network that helps students with mentorship and career guidance.',
            'what is the fee structure for vesit': 'The fee structure for VESIT varies for different courses. It’s best to visit the official website for detailed information.',
            'what are the events organized by vesit': 'VESIT organizes various events like Prism (Technical Fest), Verve (Cultural Fest), and Spandan (Sports Fest).'
        },
        isa: {
            'what is isa': 'ISA (Indian Society for Automation) is a student organization that promotes the field of automation and robotics through projects, competitions, and workshops.',
            'what does isa do': 'ISA organizes various technical events, workshops, hackathons, and guest lectures to provide students with exposure to the latest trends in automation and robotics.',
            'how can I join isa': 'You can join ISA by becoming a member at VESIT and participating in their events and workshops.',
            'when was isa founded': 'ISA was founded in 2017 at VESIT to promote robotics and automation among students.',
            'is isa a national or local organization': 'ISA is a local student organization that is part of a global network of automation and robotics enthusiasts.',
            'what events does isa organize': 'ISA organizes events like robot-building competitions, coding hackathons, guest lectures, and workshops on emerging technologies.',
            'can I participate in competitions through isa': 'Yes, ISA regularly participates in and organizes competitions like SIH (Smart India Hackathon), robotics challenges, and others.',
            'how can I contribute to isa': 'You can contribute by volunteering for events, helping with workshops, or working on automation and robotics projects under ISA.',
            'does isa collaborate with other institutions': 'Yes, ISA collaborates with various institutions, companies, and industry professionals to enhance students\' exposure to automation technologies.',
            'who can join isa': 'Any student from VESIT with an interest in automation, robotics, and related fields can join ISA.',
            'is isa involved in community outreach': 'Yes, ISA conducts workshops and sessions to promote automation in schools and colleges, helping students develop practical skills.',
            'does isa offer internship opportunities': 'ISA often collaborates with industry partners to offer internship opportunities to students interested in automation and robotics.',
            'how to contact isa': 'You can contact ISA through the official website or social media handles of VESIT ISA.'
        },                
        
      };
    

    // Search for a matching response
    botMessage = getResponse(lowerCaseMessage, responses);

    // Default response if no match is found
    if (!botMessage) {
        botMessage = "Sorry, I didn't understand that. Can you rephrase?";
    }

    displayMessage(botMessage, 'bot');
}

function getResponse(message, responses) {
    for (const category in responses) {
        for (const question in responses[category]) {
            if (message.includes(question)) {
                return responses[category][question];
            }
        }
    }
    return null;
}