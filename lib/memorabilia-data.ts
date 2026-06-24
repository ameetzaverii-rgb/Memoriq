export type Rarity = "legendary" | "epic" | "rare";
export type Category = "cricket" | "football" | "tennis" | "film" | "music";

export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface MemorabiliaItem {
  id: string;
  title: string;
  celebrity: string;
  category: Category;
  rarity: Rarity;
  image: string;
  estimatedValue: number;
  xpReward: number;
  winnersCount: number;
  spotsUsed: number;
  totalSpots: number;
  endsAt: string;
  story: string;
  tags: string[];
  challenge: {
    title: string;
    description: string;
    minScoreToQualify: number;
    questions: Question[];
  };
}

export const memorabiliaItems: MemorabiliaItem[] = [
  {
    id: "sachin-test-pads",
    title: "Sachin Tendulkar's Signed Test Match Pads",
    celebrity: "Sachin Tendulkar",
    category: "cricket",
    rarity: "legendary",
    image: "🏘",
    estimatedValue: 45000,
    xpReward: 500,
    winnersCount: 1,
    spotsUsed: 847,
    totalSpots: 1000,
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    story: "These pads were worn by the Master Blaster during his 51st Test century in 2010 against South Africa at Cape Town — a knock that cemented his status as cricket's greatest. Hand-signed with a personal dedication by Sachin himself.",
    tags: ["Test Cricket", "India", "Signed", "2010"],
    challenge: {
      title: "The Master Blaster Quiz",
      description: "Prove your knowledge of Sachin Tendulkar's legendary career",
      minScoreToQualify: 70,
      questions: [
        { question: "How many international centuries did Sachin Tendulkar score in his career?", options: ["89", "100", "94", "107"], correct: 1, explanation: "Sachin Tendulkar scored exactly 100 international centuries — 51 in Tests and 49 in ODIs." },
        { question: "In which year did Sachin Tendulkar make his Test debut?", options: ["1987", "1989", "1991", "1993"], correct: 1, explanation: "Sachin debuted in Test cricket in 1989 against Pakistan in Karachi, aged just 16." },
        { question: "What is Sachin Tendulkar's highest Test score?", options: ["214", "248*", "241*", "200*"], correct: 1, explanation: "Sachin's highest Test score is 248* scored against Bangladesh in Dhaka in 2004." },
        { question: "Which team did Sachin Tendulkar play for in the IPL?", options: ["Mumbai Indians", "Delhi Capitals", "Chennai Super Kings", "Kolkata Knight Riders"], correct: 0, explanation: "Sachin Tendulkar was the iconic captain of the Mumbai Indians in the IPL." },
        { question: "Sachin Tendulkar was the first batsman to score a double century in ODIs. Against whom?", options: ["Pakistan", "South Africa", "Sri Lanka", "England"], correct: 1, explanation: "Sachin scored 200* against South Africa in 2010 in Gwalior — the first ever ODI double century." },
        { question: "What is Sachin Tendulkar's nickname among fans?", options: ["The Wall", "Master Blaster", "Little Master", "Both B and C"], correct: 3, explanation: "Sachin is known as both 'Master Blaster' for his aggressive batting and 'Little Master' for his stature and mastery." },
        { question: "How many World Cups did Sachin Tendulkar participate in?", options: ["4", "5", "6", "3"], correct: 2, explanation: "Sachin participated in 6 Cricket World Cups: 1992, 1996, 1999, 2003, 2007, and 2011." },
        { question: "Which award did Sachin Tendulkar receive from the Government of India in 2014?", options: ["Bharat Ratna", "Padma Vibhushan", "Arjuna Award", "Rajiv Gandhi Khel Ratna"], correct: 0, explanation: "Sachin received the Bharat Ratna in 2014, becoming the first sportsperson to receive India's highest civilian honour." },
        { question: "In which city was the IPL team Mumbai Indians' home ground?", options: ["Pune", "Mumbai", "Nagpur", "Ahmedabad"], correct: 1, explanation: "Mumbai Indians play at Wankhede Stadium in Mumbai — also one of Sachin's favourite home grounds." },
        { question: "What was Sachin Tendulkar's batting average in Test cricket?", options: ["53.78", "58.67", "51.26", "56.34"], correct: 0, explanation: "Sachin Tendulkar's Test batting average was 53.78 across 200 Test matches." },
      ],
    },
  },
  {
    id: "fifa-2022-match-ball",
    title: "2022 FIFA World Cup Final Match Ball",
    celebrity: "FIFA World Cup",
    category: "football",
    rarity: "epic",
    image: "⚽",
    estimatedValue: 28000,
    xpReward: 350,
    winnersCount: 1,
    spotsUsed: 612,
    totalSpots: 800,
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    story: "The official Adidas Al Hilm match ball used in the 2022 FIFA World Cup Final between Argentina and France in Lusail, Qatar — the greatest World Cup final in history. Signed by key players from both teams and authenticated by FIFA.",
    tags: ["World Cup", "Qatar 2022", "Argentina", "France", "Final"],
    challenge: {
      title: "Qatar 2022 World Cup Trivia",
      description: "Test your knowledge of the greatest World Cup final ever played",
      minScoreToQualify: 70,
      questions: [
        { question: "Which country won the 2022 FIFA World Cup?", options: ["France", "Argentina", "Brazil", "Morocco"], correct: 1, explanation: "Argentina won the 2022 FIFA World Cup, defeating France in a penalty shootout after a 3-3 draw." },
        { question: "Who won the Golden Ball award at the 2022 World Cup?", options: ["Kylian Mbappé", "Luka Modrić", "Lionel Messi", "Antoine Griezmann"], correct: 2, explanation: "Lionel Messi won the Golden Ball award for best player at the 2022 FIFA World Cup." },
        { question: "Who was the top scorer at the 2022 World Cup?", options: ["Lionel Messi", "Kylian Mbappé", "Olivier Giroud", "Enner Valencia"], correct: 1, explanation: "Kylian Mbappé won the Golden Boot with 8 goals, including a hat-trick in the final." },
        { question: "In which city was the 2022 FIFA World Cup Final held?", options: ["Doha", "Al Khor", "Lusail", "Al Rayyan"], correct: 2, explanation: "The final was held at Lusail Stadium in Lusail, Qatar." },
        { question: "How many goals were scored in the 2022 World Cup Final including extra time?", options: ["4", "5", "6", "7"], correct: 2, explanation: "6 goals were scored — Argentina led 2-0, France equalized to 2-2, then Messi made it 3-2, before Mbappé made it 3-3 with a penalty." },
        { question: "Which team surprisingly reached the semi-finals of the 2022 World Cup for the first time?", options: ["Senegal", "Australia", "Morocco", "South Korea"], correct: 2, explanation: "Morocco made history by becoming the first African and Arab nation to reach the World Cup semi-finals." },
        { question: "What was the name of the official match ball at the 2022 FIFA World Cup?", options: ["Al Rihla", "Jabulani", "Brazuca", "Telstar"], correct: 0, explanation: "The official ball was the Adidas Al Rihla (meaning 'the journey' in Arabic), with the final ball named Al Hilm." },
        { question: "How many World Cup titles did Argentina win before 2022?", options: ["1", "2", "3", "0"], correct: 1, explanation: "Argentina had previously won the World Cup in 1978 and 1986, making 2022 their third title." },
        { question: "Lionel Messi's 2022 World Cup win meant he matched which legendary player's record of winning both a World Cup and a Ballon d'Or?", options: ["Ronaldo", "Pelé", "Zidane", "Maradona"], correct: 1, explanation: "By winning the World Cup, Messi joined the very short list of players like Pelé who won both the World Cup and multiple Ballon d'Or awards." },
        { question: "What was the format of the 2022 FIFA World Cup penalty shootout in the final?", options: ["Best of 5", "Sudden death from 3", "Best of 5 then sudden death", "First to miss"], correct: 2, explanation: "The standard penalty shootout format: each team takes 5 penalties, then sudden death if still level. Argentina won 4-2 on penalties." },
      ],
    },
  },
  {
    id: "federer-wimbledon-racket",
    title: "Roger Federer's Wimbledon Match Racket",
    celebrity: "Roger Federer",
    category: "tennis",
    rarity: "legendary",
    image: "🎾",
    estimatedValue: 62000,
    xpReward: 500,
    winnersCount: 1,
    spotsUsed: 423,
    totalSpots: 500,
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    story: "The Wilson Pro Staff RF97 racket used by Roger Federer during his record-breaking 8th Wimbledon title in 2017, defeating Marin Cilic in the final. Strung with natural gut at 27kg, bearing the wear of Centre Court glory. Authenticated by Wilson and Federer Foundation.",
    tags: ["Wimbledon", "2017", "Grand Slam", "Wilson", "Signed"],
    challenge: {
      title: "The GOAT of Grass: Federer Quiz",
      description: "How well do you know the Swiss Maestro's legendary career?",
      minScoreToQualify: 70,
      questions: [
        { question: "How many Grand Slam singles titles did Roger Federer win?", options: ["17", "18", "20", "22"], correct: 2, explanation: "Roger Federer won 20 Grand Slam singles titles during his career." },
        { question: "How many times did Roger Federer win Wimbledon?", options: ["6", "7", "8", "9"], correct: 2, explanation: "Roger Federer won Wimbledon a record 8 times: 2003-2007, 2009, 2012, and 2017." },
        { question: "What is the name of Roger Federer's charity foundation?", options: ["Federer Future Fund", "Roger Federer Foundation", "Swiss Tennis Fund", "RF Foundation"], correct: 1, explanation: "The Roger Federer Foundation focuses on education for children in sub-Saharan Africa and Switzerland." },
        { question: "Which racket brand has Roger Federer used throughout most of his professional career?", options: ["Head", "Babolat", "Wilson", "Dunlop"], correct: 2, explanation: "Roger Federer has been a Wilson ambassador throughout his career, using the Pro Staff series." },
        { question: "In which year did Roger Federer make his professional tennis debut?", options: ["1996", "1998", "2000", "2002"], correct: 1, explanation: "Roger Federer turned professional in 1998 at age 16." },
        { question: "What is the longest winning streak Roger Federer had on grass courts?", options: ["48", "65", "65", "82"], correct: 1, explanation: "Roger Federer won 65 consecutive matches on grass courts — one of the most dominant streaks in tennis history." },
        { question: "Which player did Federer defeat to win his first Wimbledon title in 2003?", options: ["Andre Agassi", "Mark Philippoussis", "Andy Roddick", "Pete Sampras"], correct: 1, explanation: "Federer won his first Wimbledon title in 2003, defeating Australian Mark Philippoussis 7-6, 6-2, 7-6 in the final." },
        { question: "Roger Federer announced his retirement in which year?", options: ["2021", "2022", "2023", "2024"], correct: 1, explanation: "Roger Federer announced his retirement from professional tennis in September 2022." },
        { question: "What rivalry is widely considered the greatest in tennis history?", options: ["Federer-Sampras", "Federer-Djokovic", "Federer-Nadal", "Federer-Agassi"], correct: 2, explanation: "The Federer-Nadal rivalry is widely considered the greatest in tennis history, with Nadal leading 24-16 in their head-to-head." },
        { question: "How many consecutive Wimbledon titles did Federer win from 2003?", options: ["3", "4", "5", "6"], correct: 2, explanation: "Federer won 5 consecutive Wimbledon titles from 2003 to 2007, an extraordinary feat in the Open Era." },
      ],
    },
  },
];

export interface RarityConfig {
  label: string;
  color: string;
  glow: string;
  barClass: string;
  textClass: string;
  borderColor: string;
}

export function getRarityConfig(rarity: Rarity): RarityConfig {
  switch (rarity) {
    case "legendary": return { label: "LEGENDARY", color: "#F5A623", glow: "rgba(245,166,35,0.2)", barClass: "rarity-bar-legendary", textClass: "text-yellow-400", borderColor: "rgba(245,166,35,0.3)" };
    case "epic": return { label: "EPIC", color: "#A78BFA", glow: "rgba(167,139,250,0.2)", barClass: "rarity-bar-epic", textClass: "text-purple-400", borderColor: "rgba(167,139,250,0.3)" };
    case "rare": return { label: "RARE", color: "#60A5FA", glow: "rgba(96,165,250,0.2)", barClass: "rarity-bar-rare", textClass: "text-blue-400", borderColor: "rgba(96,165,250,0.3)" };
  }
}

export function getTimeRemaining(endsAt: string) {
  const total = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total, isUrgent: total < 24 * 60 * 60 * 1000 };
}

export function formatValue(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
