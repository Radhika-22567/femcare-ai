// ============================================
// FEMCARE AI - VANILLA JAVASCRIPT
// ============================================

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const heroCtaBtn = document.getElementById('heroCtaBtn');

// ============================================
// MENU TOGGLE FUNCTIONALITY
// ============================================

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

// Sample responses for the chatbot
const chatbotResponses = {
    menstrual: [
        "Menstrual cycles typically last 21-35 days. It's normal to experience variations, and tracking your cycle can help you understand your body better.",
        "Period pain, or dysmenorrhea, can be managed through exercise, heat therapy, and pain relief options. If severe, consult a healthcare provider.",
        "Irregular periods can be caused by stress, diet, exercise, hormonal changes, or medical conditions. Consider tracking your cycle and consulting a doctor if concerned.",
        "A typical period lasts 3-7 days and involves shedding the uterine lining. Flow typically decreases over the course of the period."
    ],
    pcos: [
        "PCOS (Polycystic Ovary Syndrome) affects hormone levels and ovulation. Management often includes lifestyle changes, medication, and regular monitoring.",
        "Common PCOS symptoms include irregular periods, acne, excess hair growth, and weight management challenges. Treatment depends on your specific symptoms.",
        "Lifestyle modifications like balanced diet, regular exercise, and stress management can help manage PCOS symptoms.",
        "If you suspect you have PCOS, consult with a healthcare provider for proper diagnosis and personalized treatment plan."
    ],
    pregnancy: [
        "Prenatal care is crucial during pregnancy. Regular check-ups help monitor your health and your baby's development.",
        "During pregnancy, you should focus on proper nutrition, regular exercise (as advised by your doctor), and prenatal vitamins.",
        "Common pregnancy symptoms include nausea, fatigue, breast tenderness, and mood changes due to hormonal shifts.",
        "It's important to avoid certain medications, alcohol, and smoking during pregnancy. Always consult your healthcare provider about what's safe."
    ],
    mental: [
        "Hormonal fluctuations during your cycle can affect mood and emotions. This is completely normal and manageable.",
        "Practices like meditation, exercise, journaling, and self-care can support emotional wellness throughout your cycle.",
        "PMS (Premenstrual Syndrome) can cause mood changes, irritability, and anxiety. Various coping strategies can help manage these symptoms.",
        "If you're experiencing persistent mood changes or depression, please reach out to a mental health professional for support."
    ],
    nutrition: [
        "Nutrition needs can vary throughout your menstrual cycle. Eating nutrient-dense foods supports overall health.",
        "Iron-rich foods are important, especially during your period, to replenish lost nutrients.",
        "Staying hydrated is essential for managing cramps and maintaining overall health throughout your cycle.",
        "A balanced diet with adequate protein, healthy fats, and complex carbohydrates supports hormonal health."
    ],
    default: [
        "I'm here to help! You can ask me about menstrual health, PCOS, pregnancy care, mental health, nutrition, or general feminine wellness.",
        "Feel free to ask me any questions about your health and wellness. Remember, I'm here to provide information, not medical advice.",
        "That's a great question! I'm designed to provide educational information about feminine health topics.",
        "Is there anything specific about feminine health you'd like to know more about?"
    ]
};

// Function to categorize user input and get appropriate response
function getChatbotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('period') || lowerMessage.includes('menstrual') || 
        lowerMessage.includes('cycle') || lowerMessage.includes('cramp')) {
        return getRandomResponse(chatbotResponses.menstrual);
    } else if (lowerMessage.includes('pcos')) {
        return getRandomResponse(chatbotResponses.pcos);
    } else if (lowerMessage.includes('pregnant') || lowerMessage.includes('pregnancy') || 
               lowerMessage.includes('prenatal') || lowerMessage.includes('baby')) {
        return getRandomResponse(chatbotResponses.pregnancy);
    } else if (lowerMessage.includes('mental') || lowerMessage.includes('mood') || 
               lowerMessage.includes('anxiety') || lowerMessage.includes('stress') ||
               lowerMessage.includes('emotion')) {
        return getRandomResponse(chatbotResponses.mental);
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || 
               lowerMessage.includes('food') || lowerMessage.includes('eat')) {
        return getRandomResponse(chatbotResponses.nutrition);
    } else {
        return getRandomResponse(chatbotResponses.default);
    }
}

// Helper function to get random response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle sending message
// PASTE this new function instead
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        addMessage(data.reply, false);
    } catch (error) {
        // Fallback to local responses if server is not running
        const botResponse = getChatbotResponse(message);
        addMessage(botResponse, false);
    }
}
// Event listeners for chat
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Hero CTA button scroll to chatbot
heroCtaBtn.addEventListener('click', () => {
    const chatbotSection = document.getElementById('chatbot');
    chatbotSection.scrollIntoView({ behavior: 'smooth' });
    messageInput.focus();
});

// ============================================
// SMOOTH SCROLLING ENHANCEMENT
// ============================================

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// MOBILE OPTIMIZATION
// ============================================

// Prevent zoom on input focus (iOS)
const metaViewport = document.querySelector('meta[name="viewport"]');
if (metaViewport) {
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, false);
}

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe topic cards for animation
document.querySelectorAll('.topic-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation for buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            btn.click();
        }
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to clear chat history
function clearChat() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        if (!msg.querySelector('.welcome-message')) {
            msg.remove();
        }
    });
}

// Expose to window for debugging if needed
window.femcareAI = {
    clearChat: clearChat
};

console.log('FemCare AI - Loaded and ready to help!');
