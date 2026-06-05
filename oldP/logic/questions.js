let apiLoading = false

const defaultQuestions = [
  // Science (10) — 3 easy, 4 medium, 3 hard
  { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, category: 'Science', difficulty: 'easy' },
  { question: 'What is the freezing point of water in Celsius?', options: ['0', '32', '100', '-10'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which gas makes up most of Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What type of blood cells fight infections?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What force keeps us on the ground?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2, category: 'Science', difficulty: 'hard' },
  { question: 'Which organ pumps blood in the human body?', options: ['Liver', 'Lungs', 'Heart', 'Brain'], correct: 2, category: 'Science', difficulty: 'hard' },
  { question: 'What is the approximate speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'], correct: 0, category: 'Science', difficulty: 'hard' },

  // IT (10) — 3 easy, 4 medium, 3 hard
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

  // Math (8) — 3 easy, 3 medium, 2 hard
  { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'What is 7 x 8?', options: ['48', '54', '56', '64'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many sides does a hexagon have?', options: ['4', '5', '6', '8'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correct: 1, category: 'Math', difficulty: 'medium' },
  { question: 'What is 15% of 200?', options: ['15', '20', '25', '30'], correct: 3, category: 'Math', difficulty: 'medium' },
  { question: 'What is the value of Pi to two decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correct: 0, category: 'Math', difficulty: 'medium' },
  { question: 'What is the next prime number after 7?', options: ['9', '10', '11', '13'], correct: 2, category: 'Math', difficulty: 'hard' },
  { question: 'What is 2 raised to the power of 10?', options: ['512', '1024', '2048', '256'], correct: 1, category: 'Math', difficulty: 'hard' },

  // General (8) — 3 easy, 3 medium, 2 hard
  { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correct: 3, category: 'General', difficulty: 'easy' },
  { question: 'How many continents are there?', options: ['5', '6', '7', '8'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'What color do you get by mixing red and blue?', options: ['Green', 'Purple', 'Orange', 'Yellow'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correct: 2, category: 'General', difficulty: 'medium' },
  { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2, category: 'General', difficulty: 'hard' },
  { question: 'Which instrument measures temperature?', options: ['Barometer', 'Thermometer', 'Hygrometer', 'Speedometer'], correct: 1, category: 'General', difficulty: 'hard' },

  // History (8) — 3 easy, 3 medium, 2 hard
  { question: 'Who was the first president of the United States?', options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'], correct: 1, category: 'History', difficulty: 'easy' },
  { question: 'Which ancient civilization built the pyramids?', options: ['Romans', 'Greeks', 'Egyptians', 'Persians'], correct: 2, category: 'History', difficulty: 'easy' },
  { question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2, category: 'History', difficulty: 'easy' },
  { question: 'Who discovered America in 1492?', options: ['Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Amerigo Vespucci'], correct: 2, category: 'History', difficulty: 'medium' },
  { question: 'Which ship sank on its maiden voyage in 1912?', options: ['Lusitania', 'Titanic', 'Bismarck', 'Andrea Doria'], correct: 1, category: 'History', difficulty: 'medium' },
  { question: 'What wall divided Berlin during the Cold War?', options: ['Great Wall', 'Berlin Wall', 'Hadrian\'s Wall', 'Western Wall'], correct: 1, category: 'History', difficulty: 'medium' },
  { question: 'Which empire was ruled by Genghis Khan?', options: ['Ottoman Empire', 'Roman Empire', 'Mongol Empire', 'Persian Empire'], correct: 2, category: 'History', difficulty: 'hard' },
  { question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Van Gogh'], correct: 2, category: 'History', difficulty: 'hard' },

  // Geography (8) — 3 easy, 3 medium, 2 hard
  { question: 'Which mountain is the tallest on Earth?', options: ['K2', 'Mount Everest', 'Denali', 'Kilimanjaro'], correct: 1, category: 'Geography', difficulty: 'easy' },
  { question: 'What is the largest continent?', options: ['Africa', 'Asia', 'North America', 'Europe'], correct: 1, category: 'Geography', difficulty: 'easy' },
  { question: 'Which country has the largest population?', options: ['China', 'USA', 'India', 'Indonesia'], correct: 2, category: 'Geography', difficulty: 'easy' },
  { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correct: 1, category: 'Geography', difficulty: 'medium' },
  { question: 'What is the smallest country in the world?', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], correct: 2, category: 'Geography', difficulty: 'medium' },
  { question: 'Which desert is the largest hot desert?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], correct: 2, category: 'Geography', difficulty: 'medium' },
  { question: 'Which country has the most natural lakes?', options: ['USA', 'Russia', 'Canada', 'Finland'], correct: 2, category: 'Geography', difficulty: 'hard' },
  { question: 'Which river flows through London?', options: ['Seine', 'Danube', 'Thames', 'Rhine'], correct: 2, category: 'Geography', difficulty: 'hard' },

  // Nature (8) — 3 easy, 3 medium, 2 hard
  { question: 'What is the largest mammal on Earth?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], correct: 1, category: 'Nature', difficulty: 'easy' },
  { question: 'Which animal is known as the King of the Jungle?', options: ['Tiger', 'Lion', 'Bear', 'Wolf'], correct: 1, category: 'Nature', difficulty: 'easy' },
  { question: 'Which bear lives at the North Pole?', options: ['Brown Bear', 'Black Bear', 'Polar Bear', 'Grizzly Bear'], correct: 2, category: 'Nature', difficulty: 'easy' },
  { question: 'Which tree produces acorns?', options: ['Maple', 'Oak', 'Pine', 'Birch'], correct: 1, category: 'Nature', difficulty: 'medium' },
  { question: 'What is the fastest land animal?', options: ['Lion', 'Cheetah', 'Horse', 'Gazelle'], correct: 1, category: 'Nature', difficulty: 'medium' },
  { question: 'Which plant turns to face the sun?', options: ['Rose', 'Tulip', 'Sunflower', 'Daisy'], correct: 2, category: 'Nature', difficulty: 'medium' },
  { question: 'How many hearts does an octopus have?', options: ['1', '2', '3', '4'], correct: 2, category: 'Nature', difficulty: 'hard' },
  { question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correct: 1, category: 'Nature', difficulty: 'hard' },

  // Sports (8) — 3 easy, 3 medium, 2 hard
  { question: 'How many players are on a soccer team?', options: ['9', '10', '11', '12'], correct: 2, category: 'Sports', difficulty: 'easy' },
  { question: 'In which sport is a "dunk" performed?', options: ['Football', 'Basketball', 'Tennis', 'Baseball'], correct: 1, category: 'Sports', difficulty: 'easy' },
  { question: 'What sport uses a shuttlecock?', options: ['Tennis', 'Badminton', 'Squash', 'Racquetball'], correct: 1, category: 'Sports', difficulty: 'easy' },
  { question: 'Which country is credited with inventing tennis?', options: ['France', 'England', 'USA', 'Australia'], correct: 1, category: 'Sports', difficulty: 'medium' },
  { question: 'Which Grand Slam tournament is played on grass?', options: ['French Open', 'Wimbledon', 'US Open', 'Australian Open'], correct: 1, category: 'Sports', difficulty: 'medium' },
  { question: 'How long is a marathon approximately?', options: ['42.2 km', '26.2 km', '10 km', '50 km'], correct: 0, category: 'Sports', difficulty: 'medium' },
  { question: 'In which sport do players use a bat and ball on a pitch?', options: ['Baseball', 'Cricket', 'Hockey', 'Softball'], correct: 1, category: 'Sports', difficulty: 'hard' },
  { question: 'In which sport are the terms "love" and "deuce" used?', options: ['Badminton', 'Table Tennis', 'Squash', 'Tennis'], correct: 3, category: 'Sports', difficulty: 'hard' },

  // Music (8) — 3 easy, 3 medium, 2 hard
  { question: 'Which band released the album "Abbey Road"?', options: ['The Rolling Stones', 'The Beatles', 'Led Zeppelin', 'Queen'], correct: 1, category: 'Music', difficulty: 'easy' },
  { question: 'Who is known as the King of Pop?', options: ['Prince', 'Elvis Presley', 'Michael Jackson', 'Madonna'], correct: 2, category: 'Music', difficulty: 'easy' },
  { question: 'What type of instrument is a guitar?', options: ['Wind', 'Percussion', 'String', 'Brass'], correct: 2, category: 'Music', difficulty: 'easy' },
  { question: 'How many keys does a standard piano have?', options: ['76', '88', '61', '108'], correct: 1, category: 'Music', difficulty: 'medium' },
  { question: 'Which country is known for originating reggae music?', options: ['Brazil', 'Cuba', 'Jamaica', 'Nigeria'], correct: 2, category: 'Music', difficulty: 'medium' },
  { question: 'What is the highest female singing voice?', options: ['Alto', 'Mezzo-soprano', 'Soprano', 'Tenor'], correct: 2, category: 'Music', difficulty: 'medium' },
  { question: 'Which Italian term means "gradually getting louder"?', options: ['Allegro', 'Crescendo', 'Fortissimo', 'Andante'], correct: 1, category: 'Music', difficulty: 'hard' },
  { question: 'Who composed "Fur Elise"?', options: ['Mozart', 'Bach', 'Beethoven', 'Chopin'], correct: 2, category: 'Music', difficulty: 'hard' },

  // Movies & TV (8) — 3 easy, 3 medium, 2 hard
  { question: 'Which actor played Iron Man in the Marvel movies?', options: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'], correct: 2, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Which TV series features dragons and an Iron Throne?', options: ['The Witcher', 'Lord of the Rings', 'Game of Thrones', 'Vikings'], correct: 2, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Which 1994 film features a box of chocolates and a feather?', options: ['The Shawshank Redemption', 'Pulp Fiction', 'Forrest Gump', 'The Lion King'], correct: 2, category: 'Movies & TV', difficulty: 'easy' },
  { question: 'Who directed "Jurassic Park"?', options: ['James Cameron', 'Steven Spielberg', 'Ridley Scott', 'George Lucas'], correct: 1, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'In "Star Wars", what is Luke Skywalker\'s home planet?', options: ['Tatooine', 'Endor', 'Hoth', 'Naboo'], correct: 0, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'What is the name of the fictional continent in "Game of Thrones"?', options: ['Narnia', 'Westeros', 'Middle-earth', 'Azeroth'], correct: 1, category: 'Movies & TV', difficulty: 'medium' },
  { question: 'Which movie won the first Oscar for Best Animated Feature?', options: ['Toy Story', 'Shrek', 'Finding Nemo', 'The Incredibles'], correct: 1, category: 'Movies & TV', difficulty: 'hard' },
  { question: 'What is the highest-grossing film of all time (not adjusted for inflation)?', options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars'], correct: 1, category: 'Movies & TV', difficulty: 'hard' },

  // Food & Health (8) — 3 easy, 3 medium, 2 hard
  { question: 'What is the main ingredient in guacamole?', options: ['Tomato', 'Avocado', 'Onion', 'Pepper'], correct: 1, category: 'Food & Health', difficulty: 'easy' },
  { question: 'Which spice gives curry its yellow color?', options: ['Paprika', 'Turmeric', 'Saffron', 'Cumin'], correct: 1, category: 'Food & Health', difficulty: 'easy' },
  { question: 'Which vitamin is produced when skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin B12'], correct: 2, category: 'Food & Health', difficulty: 'easy' },
  { question: 'How many bones are in the adult human body?', options: ['106', '206', '306', '160'], correct: 1, category: 'Food & Health', difficulty: 'medium' },
  { question: 'Which acid is found in citrus fruits?', options: ['Acetic acid', 'Hydrochloric acid', 'Citric acid', 'Sulfuric acid'], correct: 2, category: 'Food & Health', difficulty: 'medium' },
  { question: 'Which organ is responsible for detoxifying the body?', options: ['Kidneys', 'Liver', 'Lungs', 'Heart'], correct: 1, category: 'Food & Health', difficulty: 'medium' },
  { question: 'What substance makes chili peppers spicy?', options: ['Caffeine', 'Capsaicin', 'Menthol', 'Tannin'], correct: 1, category: 'Food & Health', difficulty: 'hard' },
  { question: 'Which mineral is commonly added to table salt?', options: ['Calcium', 'Iron', 'Iodine', 'Zinc'], correct: 2, category: 'Food & Health', difficulty: 'hard' },

  // Space (8) — 3 easy, 3 medium, 2 hard
  { question: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correct: 2, category: 'Space', difficulty: 'easy' },
  { question: 'How many moons does Earth have?', options: ['0', '1', '2', '3'], correct: 1, category: 'Space', difficulty: 'easy' },
  { question: 'Which planet has the most visible rings?', options: ['Jupiter', 'Uranus', 'Saturn', 'Neptune'], correct: 2, category: 'Space', difficulty: 'easy' },
  { question: 'What is a group of stars called?', options: ['Galaxy', 'Constellation', 'Cluster', 'Nebula'], correct: 1, category: 'Space', difficulty: 'medium' },
  { question: 'What is the name of our galaxy?', options: ['Andromeda', 'Milky Way', 'Triangulum', 'Sombrero'], correct: 1, category: 'Space', difficulty: 'medium' },
  { question: 'What is a "shooting star" actually called?', options: ['Comet', 'Asteroid', 'Meteor', 'Planet'], correct: 2, category: 'Space', difficulty: 'medium' },
  { question: 'Which Apollo mission first landed humans on the Moon?', options: ['Apollo 11', 'Apollo 13', 'Apollo 8', 'Apollo 17'], correct: 0, category: 'Space', difficulty: 'hard' },
  { question: 'What is the Sun primarily made of?', options: ['Helium', 'Hydrogen', 'Carbon', 'Oxygen'], correct: 1, category: 'Space', difficulty: 'hard' },

  // Art & Literature (8) — 3 easy, 3 medium, 2 hard
  { question: 'Who wrote the play "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correct: 1, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Which Dutch artist painted "The Starry Night"?', options: ['Rembrandt', 'Vermeer', 'Van Gogh', 'Mondrian'], correct: 2, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Who wrote "The Great Gatsby"?', options: ['Ernest Hemingway', 'F. Scott Fitzgerald', 'John Steinbeck', 'William Faulkner'], correct: 1, category: 'Art & Literature', difficulty: 'easy' },
  { question: 'Which museum in Paris houses the Mona Lisa?', options: ['Musee d\'Orsay', 'Louvre Museum', 'Pompidou Centre', 'Rodin Museum'], correct: 1, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'What ancient writing system did the Egyptians use?', options: ['Cuneiform', 'Hieroglyphics', 'Alphabet', 'Sanskrit'], correct: 1, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'What art movement is Salvador Dali associated with?', options: ['Impressionism', 'Cubism', 'Surrealism', 'Expressionism'], correct: 2, category: 'Art & Literature', difficulty: 'medium' },
  { question: 'Who painted the ceiling of the Sistine Chapel?', options: ['Da Vinci', 'Raphael', 'Michelangelo', 'Donatello'], correct: 2, category: 'Art & Literature', difficulty: 'hard' },
  { question: 'Who wrote the dystopian novel "1984"?', options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'H.G. Wells'], correct: 1, category: 'Art & Literature', difficulty: 'hard' },
]

const CATEGORIES = [
  { id: 'Science',          icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2v8l-5 6h10l-5-6V2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="4" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: '#00e5ff' },
  { id: 'IT',               icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="7" y1="5" x2="7" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="13" y1="5" x2="13" y2="15" stroke="currentColor" stroke-width="0.5"/></svg>', color: '#7c3aed' },
  { id: 'Math',             icon: '<svg viewBox="0 0 20 20" width="20" height="20"><text x="10" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="currentColor">∑</text></svg>', color: '#ff00e5' },
  { id: 'General',          icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 000 14 14 14 0 000-14z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>', color: '#00e676' },
  { id: 'History',          icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 6v4l3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M3 4l3 3M17 4l-3 3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff9800' },
  { id: 'Geography',        icon: '<svg viewBox="0 0 20 20" width="20" height="20"><ellipse cx="10" cy="10" rx="7" ry="5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10a7 5 0 0014 0" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" stroke-width="1.5"/></svg>', color: '#2196f3' },
  { id: 'Nature',           icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2C7 2 5 5 5 8c0 4 5 10 5 10s5-6 5-10c0-3-2-6-5-6z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8c0 2 2 3 2 3s2-1 2-3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#4caf50' },
  { id: 'Sports',           icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 010 14" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>', color: '#ff5722' },
  { id: 'Music',            icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M8 4v9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="6" cy="14" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><line x1="8" y1="4" x2="16" y2="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 7l8-2v7" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#e91e63' },
  { id: 'Movies & TV',      icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="8" y1="4" x2="8" y2="16" stroke="currentColor" stroke-width="0.5"/><line x1="12" y1="4" x2="12" y2="16" stroke="currentColor" stroke-width="0.5"/><path d="M8 10l-4 3V7z" fill="currentColor"/></svg>', color: '#9c27b0' },
  { id: 'Food & Health',    icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M10 13v4" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff6f00' },
  { id: 'Space',            icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M6 14C3 11 3 7 6 4s8-2 10 1-2 9-5 9-5 0-5 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="9" r="1.5" fill="currentColor"/><path d="M3 7l4 2M17 7l-4 2M7 14L5 18M13 14l2 4" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>', color: '#03a9f4' },
  { id: 'Art & Literature', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 16V4h12v12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M4 16l4-4 3 2 5-5" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/></svg>', color: '#8d6e63' },
]

function getCategoryCount(catId) {
  return defaultQuestions.filter(q => q.category === catId).length
}

function getDifficultyCount(catId, diff) {
  return defaultQuestions.filter(q => q.category === catId && q.difficulty === diff).length
}

function getActiveCategory() {
  const active = document.querySelector('#category-chips .chip.active')
  return active ? active.dataset.category : 'All'
}

function loadLocalQuestions(category = 'All', difficulty = 'all') {
  let filtered = category === 'All'
    ? defaultQuestions
    : defaultQuestions.filter(q => q.category === category)
  if (difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty)
  }
  QuizApp.quizQuestions = filtered.map(q => ({ ...q }))
  QuizApp.isApiMode = false
  QuizApp.localCategory = category
  QuizApp.localDifficulty = difficulty
}

function getApiSettings() {
  const cat = document.getElementById('api-category')?.value || 18
  const diff = document.querySelector('#difficulty-group .toggle-btn.active')?.dataset?.value || 'medium'
  const count = document.querySelector('#count-group .toggle-btn.active')?.dataset?.value || 10
  const shuffle = document.getElementById('shuffle-toggle')?.checked || false
  return { category: cat, difficulty: diff, amount: count, shuffle }
}

async function getApiToken() {
  let token = localStorage.getItem(CONFIG.TOKEN_KEY)
  if (token) return token
  try {
    const res = await fetch('https://opentdb.com/api_token.php?command=request')
    const data = await res.json()
    if (data.response_code === 0 && data.token) {
      localStorage.setItem(CONFIG.TOKEN_KEY, data.token)
      return data.token
    }
  } catch {}
  return null
}

async function resetApiToken(token) {
  try {
    await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
  } catch {}
}

async function loadApiQuestions(retries = 2) {
  if (apiLoading || retries <= 0) return
  apiLoading = true

  const settings = getApiSettings()

  try {
    const token = await getApiToken()
    const tokenParam = token ? `&token=${token}` : ''
    const url = `${CONFIG.API_BASE}?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple${tokenParam}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.response_code === 4 && token) {
      await resetApiToken(token)
      localStorage.removeItem(CONFIG.TOKEN_KEY)
      apiLoading = false
      return loadApiQuestions(retries - 1)
    }

    if (data.response_code !== 0 || !data.results.length) {
      alert('Could not reach the question server. Using local questions instead.')
      loadLocalQuestions()
      apiLoading = false
      return
    }

    QuizApp.quizQuestions = data.results.map(q => {
      const options = shuffleArray([...q.incorrect_answers, q.correct_answer]).map(decodeHTMLEntities)
      const decodedCorrect = decodeHTMLEntities(q.correct_answer)
      return {
        question: decodeHTMLEntities(q.question),
        options,
        correct: options.indexOf(decodedCorrect),
      }
    })

    if (settings.shuffle) {
      QuizApp.quizQuestions = shuffleArray(QuizApp.quizQuestions)
    }

    QuizApp.isApiMode = true
  } catch {
    alert('Could not reach the question server. Using local questions instead.')
    loadLocalQuestions()
  }

  apiLoading = false
}
