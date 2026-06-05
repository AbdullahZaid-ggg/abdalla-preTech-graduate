import { shuffleArray, decodeHTMLEntities } from './utils'
import { CONFIG } from './config'

export const defaultQuestions = [
  { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, category: 'Science', difficulty: 'easy' },
  { question: 'What is the freezing point of water in Celsius?', options: ['0', '32', '100', '-10'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which gas makes up most of Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What type of blood cells fight infections?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What force keeps us on the ground?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'What is the pH of pure water?', options: ['5', '7', '9', '11'], correct: 1, category: 'Science', difficulty: 'hard' },
  { question: 'Which organ pumps blood in the human body?', options: ['Liver', 'Lungs', 'Heart', 'Brain'], correct: 2, category: 'Science', difficulty: 'hard' },
  { question: 'What is the approximate speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'], correct: 0, category: 'Science', difficulty: 'hard' },
  { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does "www" stand for?', options: ['World Wide Web', 'Web World Wide', 'World Web Wide', 'Wide World Web'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Coded Style Syntax'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Run Application Module', 'Real Application Memory'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'Which company developed Windows?', options: ['Apple', 'Google', 'Microsoft', 'IBM'], correct: 2, category: 'IT', difficulty: 'medium' },
  { question: 'What does the "http" in URLs stand for?', options: ['Hyper Text Transfer Protocol', 'High Tech Transfer Process', 'Hyper Text Transmission Process', 'High Transfer Text Protocol'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'What does GPU stand for?', options: ['Graphics Processing Unit', 'General Processing Unit', 'Graphical Program Utility', 'Graphics Power Unit'], correct: 0, category: 'IT', difficulty: 'hard' },
  { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'], correct: 0, category: 'IT', difficulty: 'hard' },
  { question: 'Which programming language is mainly used for iOS apps?', options: ['Java', 'Kotlin', 'Swift', 'C#'], correct: 2, category: 'IT', difficulty: 'hard' },
  { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'What is 7 x 8?', options: ['48', '54', '56', '64'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many sides does a hexagon have?', options: ['4', '5', '6', '8'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correct: 1, category: 'Math', difficulty: 'medium' },
  { question: 'What is 15% of 200?', options: ['15', '20', '25', '30'], correct: 3, category: 'Math', difficulty: 'medium' },
  { question: 'What is the value of Pi to two decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correct: 0, category: 'Math', difficulty: 'medium' },
  { question: 'What is the next prime number after 7?', options: ['9', '10', '11', '13'], correct: 2, category: 'Math', difficulty: 'hard' },
  { question: 'What is 2 raised to the power of 10?', options: ['512', '1024', '2048', '256'], correct: 1, category: 'Math', difficulty: 'hard' },
  { question: 'What is the area of a circle with radius 3?', options: ['9π', '6π', '12π', '3π'], correct: 0, category: 'Math', difficulty: 'hard' },
  { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correct: 3, category: 'General', difficulty: 'easy' },
  { question: 'How many continents are there?', options: ['5', '6', '7', '8'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'What color do you get by mixing red and blue?', options: ['Green', 'Purple', 'Orange', 'Yellow'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correct: 2, category: 'General', difficulty: 'medium' },
  { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2, category: 'General', difficulty: 'hard' },
  { question: 'Which instrument measures temperature?', options: ['Barometer', 'Thermometer', 'Hygrometer', 'Speedometer'], correct: 1, category: 'General', difficulty: 'hard' },
  { question: 'What is the tallest mountain in the world?', options: ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'], correct: 1, category: 'General', difficulty: 'hard' },
  { question: 'Which animal is known as the King of the Jungle?', options: ['Tiger', 'Lion', 'Elephant', 'Gorilla'], correct: 1, category: 'General', difficulty: 'easy' },
  { question: 'Which year did World War II end?', options: ['1944', '1945', '1946', '1947'], correct: 1, category: 'History', difficulty: 'easy' },
  { question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'], correct: 2, category: 'History', difficulty: 'easy' },
  { question: 'Which ancient civilization built the pyramids?', options: ['Romans', 'Greeks', 'Egyptians', 'Persians'], correct: 2, category: 'History', difficulty: 'easy' },
  { question: 'What was the Renaissance a rebirth of?', options: ['Science', 'Art and learning', 'Religion', 'Warfare'], correct: 1, category: 'History', difficulty: 'medium' },
  { question: 'Who discovered America in 1492?', options: ['Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Amerigo Vespucci'], correct: 2, category: 'History', difficulty: 'medium' },
  { question: 'Which empire was ruled by Genghis Khan?', options: ['Ottoman Empire', 'Roman Empire', 'Mongol Empire', 'Persian Empire'], correct: 2, category: 'History', difficulty: 'medium' },
  { question: 'What was the Cold War primarily between?', options: ['USA and China', 'USA and USSR', 'UK and Germany', 'France and Russia'], correct: 1, category: 'History', difficulty: 'medium' },
  { question: 'Which ancient wonder was located in Babylon?', options: ['Colossus of Rhodes', 'Hanging Gardens', 'Great Pyramid', 'Lighthouse of Alexandria'], correct: 1, category: 'History', difficulty: 'hard' },
  { question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'], correct: 1, category: 'History', difficulty: 'hard' },
  { question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correct: 2, category: 'History', difficulty: 'hard' },
  { question: 'What is the largest continent by area?', options: ['Africa', 'North America', 'Asia', 'Europe'], correct: 2, category: 'Geography', difficulty: 'easy' },
  { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correct: 1, category: 'Geography', difficulty: 'easy' },
  { question: 'Which country has the largest population?', options: ['India', 'USA', 'China', 'Indonesia'], correct: 0, category: 'Geography', difficulty: 'easy' },
  { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Bangkok', 'Tokyo'], correct: 3, category: 'Geography', difficulty: 'easy' },
  { question: 'Which desert is the largest hot desert?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], correct: 2, category: 'Geography', difficulty: 'medium' },
  { question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correct: 1, category: 'Geography', difficulty: 'medium' },
  { question: 'Which mountain range separates Europe from Asia?', options: ['Alps', 'Himalayas', 'Urals', 'Andes'], correct: 2, category: 'Geography', difficulty: 'medium' },
  { question: 'What is the deepest ocean trench?', options: ['Mariana Trench', 'Puerto Rico Trench', 'Tonga Trench', 'Java Trench'], correct: 0, category: 'Geography', difficulty: 'medium' },
  { question: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'South Korea', 'Japan', 'Thailand'], correct: 2, category: 'Geography', difficulty: 'hard' },
  { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correct: 2, category: 'Geography', difficulty: 'hard' },
  { question: 'Which strait separates Asia from North America?', options: ['Gibraltar', 'Bosphorus', 'Bering', 'Malacca'], correct: 2, category: 'Geography', difficulty: 'hard' },
  { question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, category: 'Nature', difficulty: 'easy' },
  { question: 'Which animal can change its color to blend in?', options: ['Lizard', 'Chameleon', 'Frog', 'Snake'], correct: 1, category: 'Nature', difficulty: 'easy' },
  { question: 'What is the largest mammal in the world?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], correct: 1, category: 'Nature', difficulty: 'easy' },
  { question: 'Which process do plants use to make food?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correct: 1, category: 'Nature', difficulty: 'easy' },
  { question: 'What is the fastest land animal?', options: ['Lion', 'Cheetah', 'Horse', 'Gazelle'], correct: 1, category: 'Nature', difficulty: 'medium' },
  { question: 'How many hearts does an octopus have?', options: ['1', '2', '3', '4'], correct: 2, category: 'Nature', difficulty: 'medium' },
  { question: 'Which bird is known for its ability to mimic human speech?', options: ['Eagle', 'Parrot', 'Penguin', 'Owl'], correct: 1, category: 'Nature', difficulty: 'medium' },
  { question: 'What is the tallest species of grass?', options: ['Sugarcane', 'Bamboo', 'Cactus', 'Fern'], correct: 1, category: 'Nature', difficulty: 'medium' },
  { question: 'Which animal has the longest lifespan?', options: ['Elephant', 'Bowhead Whale', 'Galapagos Tortoise', 'Koi Fish'], correct: 2, category: 'Nature', difficulty: 'hard' },
  { question: 'What is the only mammal capable of true flight?', options: ['Squirrel', 'Bat', 'Flying Fox', 'Bird'], correct: 1, category: 'Nature', difficulty: 'hard' },
  { question: 'Which sport is known as the beautiful game?', options: ['Basketball', 'Tennis', 'Football', 'Cricket'], correct: 2, category: 'Sports', difficulty: 'easy' },
  { question: 'How many players are on a basketball team?', options: ['5', '6', '7', '11'], correct: 0, category: 'Sports', difficulty: 'easy' },
  { question: 'In which sport do you use a racket and a shuttlecock?', options: ['Tennis', 'Badminton', 'Squash', 'Table Tennis'], correct: 1, category: 'Sports', difficulty: 'easy' },
  { question: 'What is the maximum score in a single frame of bowling?', options: ['10', '20', '30', '50'], correct: 2, category: 'Sports', difficulty: 'easy' },
  { question: 'Which country has won the most FIFA World Cups?', options: ['Germany', 'Argentina', 'Italy', 'Brazil'], correct: 3, category: 'Sports', difficulty: 'medium' },
  { question: 'How long is a marathon in miles?', options: ['24.2', '25.2', '26.2', '27.2'], correct: 2, category: 'Sports', difficulty: 'medium' },
  { question: 'Which Grand Slam tennis tournament is played on clay?', options: ['Wimbledon', 'US Open', 'Australian Open', 'French Open'], correct: 3, category: 'Sports', difficulty: 'medium' },
  { question: 'In which sport do players ride horses and hit a ball with a mallet?', options: ['Polo', 'Equestrian', 'Rodeo', 'Lacrosse'], correct: 0, category: 'Sports', difficulty: 'medium' },
  { question: 'Which Olympic sport is performed on a beam, floor, vault, and bars?', options: ['Rhythmic Gymnastics', 'Artistic Gymnastics', 'Ballet', 'Cheerleading'], correct: 1, category: 'Sports', difficulty: 'hard' },
  { question: 'What is the diameter of a basketball hoop in inches?', options: ['16', '18', '20', '22'], correct: 1, category: 'Sports', difficulty: 'hard' },
  { question: 'Which instrument has 88 keys?', options: ['Violin', 'Guitar', 'Piano', 'Organ'], correct: 2, category: 'Music', difficulty: 'easy' },
  { question: 'Who is known as the King of Pop?', options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'], correct: 1, category: 'Music', difficulty: 'easy' },
  { question: 'Which musical instrument is played by blowing air across a hole?', options: ['Trumpet', 'Flute', 'Clarinet', 'Saxophone'], correct: 1, category: 'Music', difficulty: 'easy' },
  { question: 'How many strings does a standard guitar have?', options: ['4', '5', '6', '7'], correct: 2, category: 'Music', difficulty: 'easy' },
  { question: 'Which composer wrote The Four Seasons?', options: ['Mozart', 'Bach', 'Vivaldi', 'Beethoven'], correct: 2, category: 'Music', difficulty: 'medium' },
  { question: 'What genre of music originated in New Orleans?', options: ['Rock', 'Jazz', 'Blues', 'Country'], correct: 1, category: 'Music', difficulty: 'medium' },
  { question: 'Which band performed Bohemian Rhapsody?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], correct: 2, category: 'Music', difficulty: 'medium' },
  { question: 'What is the highest female singing voice?', options: ['Alto', 'Mezzo-soprano', 'Soprano', 'Contralto'], correct: 2, category: 'Music', difficulty: 'medium' },
  { question: 'Which note is represented by a symbol resembling a hashtag?', options: ['Flat', 'Sharp', 'Natural', 'Rest'], correct: 1, category: 'Music', difficulty: 'hard' },
  { question: 'Which Italian term means gradually getting louder?', options: ['Decrescendo', 'Fortissimo', 'Crescendo', 'Pianissimo'], correct: 2, category: 'Music', difficulty: 'hard' },
  { question: 'Which movie won the first Academy Award for Best Picture?', options: ['Wings', 'Sunrise', 'The Broadway Melody', 'All Quiet on the Western Front'], correct: 0, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Who played the Joker in The Dark Knight?', options: ['Jack Nicholson', 'Heath Ledger', 'Joaquin Phoenix', 'Jared Leto'], correct: 1, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Which TV series is set in the fictional region of Westeros?', options: ['The Lord of the Rings', 'The Witcher', 'Game of Thrones', 'Vikings'], correct: 2, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'What is the highest-grossing film of all time?', options: ['Avengers: Endgame', 'Avatar', 'Titanic', 'Star Wars: The Force Awakens'], correct: 1, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Which animated film features a clownfish named Marlin?', options: ['Shark Tale', 'The Little Mermaid', 'Finding Nemo', 'SpongeBob'], correct: 2, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'Who directed Jurassic Park?', options: ['James Cameron', 'Steven Spielberg', 'Ridley Scott', 'Christopher Nolan'], correct: 1, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'Which TV show features characters named Ross, Rachel, and Chandler?', options: ['How I Met Your Mother', 'Seinfeld', 'Friends', 'The Office'], correct: 2, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'In which movie does the protagonist live in a world where dreams can be shared?', options: ['The Matrix', 'Inception', 'Interstellar', 'The Prestige'], correct: 1, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'Which actor has played James Bond the most times?', options: ['Sean Connery', 'Pierce Brosnan', 'Roger Moore', 'Daniel Craig'], correct: 2, category: 'Movies & TV', difficulty: 'hard' },
  { question: 'What is the name of the fictional metal in the Marvel universe associated with Wolverine?', options: ['Vibranium', 'Adamantium', 'Uru', 'Carbonadium'], correct: 1, category: 'Movies & TV', difficulty: 'hard' },
  { question: 'Which vitamin is produced when exposed to sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], correct: 3, category: 'Food & Health', difficulty: 'easy' },
  { question: 'How many calories does a typical adult need per day?', options: ['1000-1500', '2000-2500', '3000-3500', '4000-4500'], correct: 1, category: 'Food & Health', difficulty: 'easy' },
  { question: 'Which fruit is known for having high potassium content?', options: ['Apple', 'Orange', 'Banana', 'Grape'], correct: 2, category: 'Food & Health', difficulty: 'easy' },
  { question: 'What is the main source of energy for the body?', options: ['Fats', 'Proteins', 'Carbohydrates', 'Vitamins'], correct: 2, category: 'Food & Health', difficulty: 'easy' },
  { question: 'Which mineral is essential for strong bones?', options: ['Iron', 'Calcium', 'Potassium', 'Magnesium'], correct: 1, category: 'Food & Health', difficulty: 'medium' },
  { question: 'What type of diet excludes all animal products?', options: ['Vegetarian', 'Pescatarian', 'Vegan', 'Flexitarian'], correct: 2, category: 'Food & Health', difficulty: 'medium' },
  { question: 'Which organ is primarily responsible for detoxifying the body?', options: ['Kidney', 'Liver', 'Lungs', 'Spleen'], correct: 1, category: 'Food & Health', difficulty: 'medium' },
  { question: 'How much water does the average adult need daily?', options: ['1 liter', '2 liters', '3 liters', '4 liters'], correct: 1, category: 'Food & Health', difficulty: 'medium' },
  { question: 'Which spice is known for its anti-inflammatory properties?', options: ['Salt', 'Pepper', 'Turmeric', 'Cinnamon'], correct: 2, category: 'Food & Health', difficulty: 'hard' },
  { question: 'What is the most common nutrient deficiency in the world?', options: ['Vitamin D', 'Iron', 'Calcium', 'Iodine'], correct: 1, category: 'Food & Health', difficulty: 'hard' },
  { question: 'What is the closest planet to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2, category: 'Space', difficulty: 'easy' },
  { question: 'How many moons does Earth have?', options: ['0', '1', '2', '3'], correct: 1, category: 'Space', difficulty: 'easy' },
  { question: 'What is the name of our galaxy?', options: ['Andromeda', 'Milky Way', 'Whirlpool', 'Sombrero'], correct: 1, category: 'Space', difficulty: 'easy' },
  { question: 'Which planet has the Great Red Spot?', options: ['Saturn', 'Neptune', 'Mars', 'Jupiter'], correct: 3, category: 'Space', difficulty: 'easy' },
  { question: 'What is a shooting star actually called?', options: ['Asteroid', 'Comet', 'Meteor', 'Planetoid'], correct: 2, category: 'Space', difficulty: 'medium' },
  { question: 'Which planet is known as the Morning Star?', options: ['Mercury', 'Venus', 'Mars', 'Jupiter'], correct: 1, category: 'Space', difficulty: 'medium' },
  { question: 'How long does it take the Earth to orbit the Sun?', options: ['30 days', '365 days', '24 hours', '7 days'], correct: 1, category: 'Space', difficulty: 'medium' },
  { question: 'What causes a lunar eclipse?', options: ['Sun between Earth and Moon', 'Moon between Earth and Sun', 'Earth between Sun and Moon', 'Venus between Earth and Moon'], correct: 2, category: 'Space', difficulty: 'medium' },
  { question: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correct: 2, category: 'Space', difficulty: 'hard' },
  { question: 'What is the name of the first man on the Moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], correct: 1, category: 'Space', difficulty: 'hard' },
  { question: 'Who wrote the novel Pride and Prejudice?', options: ['Emily Brontë', 'Charles Dickens', 'Jane Austen', 'Mark Twain'], correct: 2, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Which artist painted the ceiling of the Sistine Chapel?', options: ['Leonardo da Vinci', 'Raphael', 'Donatello', 'Michelangelo'], correct: 3, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'What is the most translated book in the world?', options: ['The Quran', 'The Bible', 'Harry Potter', 'Don Quixote'], correct: 1, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Which art movement is known for works like The Persistence of Memory?', options: ['Cubism', 'Impressionism', 'Surrealism', 'Abstract'], correct: 2, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Who wrote Romeo and Juliet?', options: ['Christopher Marlowe', 'William Shakespeare', 'Ben Jonson', 'John Milton'], correct: 1, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'Which Dutch painter is famous for cutting off his ear?', options: ['Rembrandt', 'Vermeer', 'Van Gogh', 'Bosch'], correct: 2, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'What is the longest novel ever written?', options: ['War and Peace', 'In Search of Lost Time', 'Les Misérables', 'The Arabian Nights'], correct: 1, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'Which literary genre features detectives solving crimes?', options: ['Fantasy', 'Science Fiction', 'Mystery', 'Romance'], correct: 2, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'Who wrote The Odyssey?', options: ['Sophocles', 'Plato', 'Homer', 'Aristotle'], correct: 2, category: 'Art & Literature', difficulty: 'hard' },
  { question: 'Which statue is located in Rio de Janeiro, Brazil?', options: ['Statue of Liberty', 'Christ the Redeemer', 'David', 'The Thinker'], correct: 1, category: 'Art & Literature', difficulty: 'hard' },
]

export const CATEGORIES = [
  { id: 'Science', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2v8l-5 6h10l-5-6V2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="4" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: '#00e5ff' },
  { id: 'IT', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="7" y1="5" x2="7" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="13" y1="5" x2="13" y2="15" stroke="currentColor" stroke-width="0.5"/></svg>', color: '#7c3aed' },
  { id: 'Math', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><text x="10" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="currentColor">∑</text></svg>', color: '#ff00e5' },
  { id: 'General', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 000 14 14 14 0 000-14z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>', color: '#00e676' },
  { id: 'History', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 6v4l3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M3 4l3 3M17 4l-3 3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff9800' },
  { id: 'Geography', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><ellipse cx="10" cy="10" rx="7" ry="5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10a7 5 0 0014 0" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" stroke-width="1.5"/></svg>', color: '#2196f3' },
  { id: 'Nature', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2C7 2 5 5 5 8c0 4 5 10 5 10s5-6 5-10c0-3-2-6-5-6z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8c0 2 2 3 2 3s2-1 2-3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#4caf50' },
  { id: 'Sports', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 010 14" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>', color: '#ff5722' },
  { id: 'Music', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M8 4v9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="6" cy="14" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><line x1="8" y1="4" x2="16" y2="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 7l8-2v7" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#e91e63' },
  { id: 'Movies & TV', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="8" y1="4" x2="8" y2="16" stroke="currentColor" stroke-width="0.5"/><line x1="12" y1="4" x2="12" y2="16" stroke="currentColor" stroke-width="0.5"/><path d="M8 10l-4 3V7z" fill="currentColor"/></svg>', color: '#9c27b0' },
  { id: 'Food & Health', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M10 13v4" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff6f00' },
  { id: 'Space', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M6 14C3 11 3 7 6 4s8-2 10 1-2 9-5 9-5 0-5 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="9" r="1.5" fill="currentColor"/><path d="M3 7l4 2M17 7l-4 2M7 14L5 18M13 14l2 4" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>', color: '#03a9f4' },
  { id: 'Art & Literature', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 16V4h12v12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M4 16l4-4 3 2 5-5" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/></svg>', color: '#8d6e63' },
]

export function getCategoryCount(catId) {
  return defaultQuestions.filter(q => q.category === catId).length
}

export function getDifficultyCount(catId, diff) {
  return defaultQuestions.filter(q => q.category === catId && q.difficulty === diff).length
}

export function getTotalCount() {
  return defaultQuestions.length
}

export function loadLocalQuestions(category = 'All', difficulty = 'all') {
  let filtered = category === 'All'
    ? defaultQuestions
    : defaultQuestions.filter(q => q.category === category)
  if (difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty)
  }
  return { questions: filtered.map(q => ({ ...q })), category, difficulty }
}

export function convertToTrueFalse(questions) {
  return questions.map(q => {
    const wrongOptions = q.options.filter((_, i) => i !== q.correct)
    const wrongText = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
    const correctText = q.options[q.correct]
    const showCorrect = Math.random() > 0.5
    return {
      ...q,
      options: ['True', 'False'],
      correct: showCorrect ? 0 : 1,
      trueFalseStatement: showCorrect ? correctText : wrongText,
      trueFalseIsCorrect: showCorrect,
    }
  })
}

async function fetchWithTimeout(url, ms = 8000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

export async function loadApiQuestions(settings, retries = 1) {
  try {
    let token = localStorage.getItem(CONFIG.TOKEN_KEY)
    if (!token) {
      const res = await fetchWithTimeout('https://opentdb.com/api_token.php?command=request')
      const data = await res.json()
      if (data.response_code === 0 && data.token) {
        token = data.token
        localStorage.setItem(CONFIG.TOKEN_KEY, data.token)
      }
    }
    const tokenParam = token ? `&token=${token}` : ''
    const url = `${CONFIG.API_BASE}?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple${tokenParam}`
    const res = await fetchWithTimeout(url)
    const data = await res.json()

    if ((data.response_code === 3 || data.response_code === 4) && token) {
      localStorage.removeItem(CONFIG.TOKEN_KEY)
      if (retries > 0) {
        return loadApiQuestions(settings, retries - 1)
      }
      return null
    }

    if (data.response_code !== 0 || !data.results.length) {
      return null
    }

    const first = data.results[0]
    const category = first.category || 'General'
    const difficulty = first.difficulty || 'medium'
    const questions = data.results.map(q => {
      const options = shuffleArray([...q.incorrect_answers, q.correct_answer]).map(decodeHTMLEntities)
      const decodedCorrect = decodeHTMLEntities(q.correct_answer)
      return {
        question: decodeHTMLEntities(q.question),
        options,
        correct: options.indexOf(decodedCorrect),
        category,
        difficulty,
      }
    })
    if (settings.shuffle) shuffleArray(questions)
    return { questions, category, difficulty }
  } catch {
    return null
  }
}
