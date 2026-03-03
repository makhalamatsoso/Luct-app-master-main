import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const questions = [
  {
    id: 1,
    text: "When working on a project, what excites you most?",
    options: [
      { text: "Creating beautiful visuals, designs, or art", score: { design: 3, media: 2 } },
      { text: "Telling stories, communicating ideas, or working with media", score: { media: 3, design: 1 } },
      { text: "Building, planning structures, or solving spatial/technical problems", score: { architecture: 3 } },
      { text: "Managing people, money, strategies, or starting ventures", score: { business: 3 } },
      { text: "Helping people enjoy experiences, travel, events, or hospitality", score: { tourism: 3 } },
      { text: "Coding, technology, apps, software, or digital systems", score: { ict: 3 } },
    ],
  },
  {
    id: 2,
    text: "How do you prefer to spend your free time creatively?",
    options: [
      { text: "Drawing, designing clothes/graphics, photography", score: { design: 3 } },
      { text: "Making videos, podcasts, writing stories, social media content", score: { media: 3 } },
      { text: "Sketching buildings, models, or planning spaces", score: { architecture: 2 } },
      { text: "Organizing events, selling ideas, leading groups", score: { business: 2, tourism: 2 } },
      { text: "Planning trips, hosting friends, creating experiences", score: { tourism: 3 } },
      { text: "Building apps/websites, gaming, experimenting with tech", score: { ict: 3 } },
    ],
  },
  {
    id: 3,
    text: "Which subject/activity did you enjoy most in school?",
    options: [
      { text: "Art, Design & Technology, Fashion/Needlework", score: { design: 3 } },
      { text: "English, Drama, Literature, Public Speaking", score: { media: 3 } },
      { text: "Mathematics, Technical Drawing, Woodwork", score: { architecture: 3 } },
      { text: "Commerce, Business Studies, Accounting", score: { business: 3 } },
      { text: "Geography, Home Economics, Hospitality/Catering", score: { tourism: 3 } },
      { text: "Computer Studies, Maths, Science", score: { ict: 3 } },
    ],
  },
  {
    id: 4,
    text: "In a group project, what role do you naturally take?",
    options: [
      { text: "The visual designer or creative concept developer", score: { design: 2, media: 1 } },
      { text: "The presenter, communicator, or content creator", score: { media: 3 } },
      { text: "The planner or technical/structural expert", score: { architecture: 3 } },
      { text: "The organizer, leader, or strategist", score: { business: 3 } },
      { text: "The host, experience designer, or people coordinator", score: { tourism: 3 } },
      { text: "The coder, problem-solver, or tech fixer", score: { ict: 3 } },
    ],
  },
  {
    id: 5,
    text: "What kind of work environment appeals to you most?",
    options: [
      { text: "Studio with art supplies, mannequins, computers for design", score: { design: 3 } },
      { text: "Media lab, cameras, editing suites, microphones", score: { media: 3 } },
      { text: "Workshop with models, drawing boards, measuring tools", score: { architecture: 3 } },
      { text: "Office with meetings, strategies, client presentations", score: { business: 3 } },
      { text: "Hotels, events venues, travel planning spaces", score: { tourism: 3 } },
      { text: "Tech lab, computers, servers, coding environment", score: { ict: 3 } },
    ],
  },
  {
    id: 6,
    text: "How important is working with people vs technology/tools?",
    options: [
      { text: "I love working closely with people and teams", score: { tourism: 2, business: 2, media: 1 } },
      { text: "I prefer focusing on tools, software, or individual creative work", score: { design: 2, ict: 2, architecture: 1 } },
      { text: "A balanced mix of both", score: { media: 2, business: 1 } },
    ],
  },
  {
    id: 7,
    text: "Which future excites you more?",
    options: [
      { text: "Seeing my designs, fashion, or ads in the world", score: { design: 3 } },
      { text: "Creating content that reaches/influences many people", score: { media: 3 } },
      { text: "Designing buildings or spaces people live/work in", score: { architecture: 3 } },
      { text: "Running a business, managing teams, or growing brands", score: { business: 3 } },
      { text: "Creating memorable experiences for travelers/guests", score: { tourism: 3 } },
      { text: "Building apps, software, or digital innovations", score: { ict: 3 } },
    ],
  },
  {
    id: 8,
    text: "How do you feel about portfolios or presentations?",
    options: [
      { text: "I love creating and showing visual work (portfolio essential)", score: { design: 3, media: 2 } },
      { text: "I enjoy presenting ideas or speaking to groups", score: { media: 2, business: 1, tourism: 1 } },
      { text: "I prefer technical drawings/plans over artistic portfolios", score: { architecture: 2 } },
      { text: "I'm more comfortable with numbers/strategies than visuals", score: { business: 2, ict: 1 } },
    ],
  },
];

export default function Quizzes({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    design: 0,
    media: 0,
    architecture: 0,
    business: 0,
    tourism: 0,
    ict: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => setQuizStarted(true);

  const handleAnswer = (optionScores) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + (optionScores[key] || 0);
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getTopFaculty = () => {
    const facultyMap = {
      design: "Faculty of Design Innovation",
      media: "Faculty of Communication, Media & Broadcasting",
      architecture: "Faculty of Architecture & the Built Environment",
      business: "Faculty of Business & Globalization",
      tourism: "Faculty of Creativity in Tourism & Hospitality",
      ict: "Faculty of Information & Communication Technology",
    };

    let maxScore = -Infinity;
    let topKey = 'design'; // fallback

    Object.entries(scores).forEach(([key, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topKey = key;
      }
    });

    return {
      faculty: facultyMap[topKey] || "Explore All Faculties",
      description: getSuggestionDescription(topKey),
    };
  };

  const getSuggestionDescription = (key) => {
    const descriptions = {
      design: "You appear to have strong creative and visual talents! Fields like Graphic Design, Fashion & Apparel Design or Creative Advertising could be an excellent match.",
      media: "You enjoy communication, storytelling and media. Broadcasting & Journalism, Television & Film Production or Public Relations might suit you very well.",
      architecture: "You seem drawn to structure, planning and technical creativity. Architectural Technology would likely be a great fit.",
      business: "You have a strategic, people-oriented and entrepreneurial mindset. International Business, Entrepreneurship, Human Resource Management or Marketing could be ideal.",
      tourism: "You thrive on creating experiences and working with people. Tourism Management, Hotel Management or Events Management looks very promising.",
      ict: "You're tech-savvy and love digital innovation. Software Engineering with Multimedia, Business Information Technology or Information Technology aligns well with your interests.",
    };
    return descriptions[key] || "Your interests are versatile — consider exploring multiple faculties!";
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScores({ design: 0, media: 0, architecture: 0, business: 0, tourism: 0, ict: 0 });
    setShowResults(false);
  };

  const { faculty, description } = showResults ? getTopFaculty() : {};

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#f8fafc' }]}
      contentContainerStyle={styles.contentContainer}
    >
      {!quizStarted && !showResults ? (
        // Welcome / Landing screen before quiz starts
        <View style={styles.welcome}>
          <Text style={[styles.heroTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            BE THE BEST{'\n'}BE A LIMKOKWING GRADUATE
          </Text>

          <Image
            source={{ uri: 'https://www.gov.ls/wp-content/uploads/2022/05/limkokwing.jpeg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <Text style={[styles.welcomeText, { color: isDark ? '#cbd5e1' : '#334155' }]}>
            Be the Best in your sphere of studies — design, business or architecture{'\n\n'}
            Be the Best in digital & creative skills — AR, 3D printers, touchscreen consoles{'\n\n'}
            Be the Best in making global connections — over 30,000 creative minds from 150+ countries{'\n\n'}
            Join Lesotho's most award-winning creative university!
          </Text>

          <Image
            source={{ uri: 'https://media.proprofs.com/images/QM/user_images/2648979/1592945112.PNG' }}
            style={styles.inlineImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: isDark ? '#1e40af' : '#3b82f6' }]}
            onPress={startQuiz}
          >
            <Text style={styles.buttonText}>Take the Career Quiz</Text>
          </TouchableOpacity>

          <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>
            Answer a few questions to discover which faculty and programme might suit you best
          </Text>
        </View>
      ) : !showResults ? (
        // Quiz in progress
        <View style={styles.quizContainer}>
          <Text style={[styles.progress, { color: isDark ? '#94a3b8' : '#64748b' }]}>
            Question {currentQuestion + 1} / {questions.length}
          </Text>

          <Text style={[styles.questionText, { color: isDark ? '#e2e8f0' : '#1e293b' }]}>
            {questions[currentQuestion].text}
          </Text>

          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor: isDark ? '#1e293b' : '#e0f2fe' }]}
              onPress={() => handleAnswer(option.score)}
            >
              <Text style={[styles.optionText, { color: isDark ? '#60a5fa' : '#2563eb' }]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Results screen
        <View style={styles.results}>
          <Text style={[styles.resultTitle, { color: isDark ? '#60a5fa' : '#2563eb' }]}>
            Your Suggested Faculty
          </Text>

          <Text style={[styles.facultyName, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            {faculty}
          </Text>

          <Text style={[styles.description, { color: isDark ? '#cbd5e1' : '#334155' }]}>
            {description}
          </Text>

          <TouchableOpacity
            style={[styles.requirementsButton, { backgroundColor: isDark ? '#1e40af' : '#3b82f6' }]}
            onPress={() => navigation.navigate('Requirements')}
          >
            <Text style={styles.buttonText}>View Entry Requirements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.restartButton, { backgroundColor: isDark ? '#475569' : '#cbd5e1' }]}
            onPress={restartQuiz}
          >
            <Text style={[styles.buttonText, { color: isDark ? '#ffffff' : '#0f172a' }]}>
              Take the Quiz Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 24, paddingBottom: 60, alignItems: 'center' },

  welcome: { alignItems: 'center' },
  heroTitle: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  heroImage: { width: '100%', height: 220, borderRadius: 16, marginVertical: 16 },
  welcomeText: { fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 24 },
  inlineImage: { width: '100%', height: 200, borderRadius: 16, marginVertical: 16 },
  startButton: { width: '90%', paddingVertical: 18, borderRadius: 12, marginVertical: 24 },
  subtitle: { fontSize: 15, textAlign: 'center', marginTop: 12 },

  quizContainer: { width: '100%' },
  progress: { fontSize: 14, marginBottom: 16, textAlign: 'center' },
  questionText: { fontSize: 18, fontWeight: '600', marginBottom: 24, lineHeight: 26 },
  optionButton: { padding: 18, borderRadius: 12, marginBottom: 12, elevation: 2 },
  optionText: { fontSize: 16, fontWeight: '500', textAlign: 'center' },

  results: { alignItems: 'center', marginTop: 40, width: '100%' },
  resultTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  facultyName: { fontSize: 26, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  description: { fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 32 },
  requirementsButton: { width: '90%', paddingVertical: 16, borderRadius: 12, marginVertical: 12 },
  restartButton: { width: '90%', paddingVertical: 16, borderRadius: 12, marginTop: 16 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
})