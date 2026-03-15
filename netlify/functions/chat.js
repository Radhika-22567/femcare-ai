exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { message } = JSON.parse(event.body);

    if (!message || message.trim() === "") {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Message is required." })
        };
    }

    const reply = getRuleBasedReply(message.trim());
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply })
    };
};

function getRuleBasedReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes("period pain") || msg.includes("menstrual cramp") || msg.includes("dysmenorrhea"))
        return "Period pain is very common:\n• Apply a heating pad to your lower abdomen.\n• Ibuprofen can reduce cramping.\n• Gentle exercise like walking or yoga helps.\n• Stay hydrated and avoid caffeine.\n• See a doctor if pain is severe.";
    if (msg.includes("pcos") || msg.includes("polycystic"))
        return "PCOS is a hormonal condition:\n• Symptoms include irregular periods, weight gain, and acne.\n• A low-glycemic diet and exercise help manage symptoms.\n• Speak with a doctor about hormonal therapy.\n• PCOS can affect fertility — consult a specialist if needed.";
    if (msg.includes("pregnant") || msg.includes("pregnancy") || msg.includes("prenatal"))
        return "Pregnancy tips:\n• Take prenatal vitamins with folic acid.\n• Attend all prenatal check-ups.\n• Eat a balanced diet and avoid alcohol and smoking.\n• Contact your doctor if you experience unusual symptoms.";
    if (msg.includes("hygiene") || msg.includes("discharge") || msg.includes("uti") || msg.includes("yeast"))
        return "Feminine hygiene tips:\n• The vagina is self-cleaning — never douche.\n• Use gentle unscented wash on external area only.\n• Wear breathable cotton underwear.\n• Wipe front to back always.\n• See a doctor for unusual discharge or odor.";
    if (msg.includes("period") || msg.includes("menstrual") || msg.includes("cycle"))
        return "Menstrual health:\n• A typical cycle lasts 21–35 days.\n• Irregular periods can be caused by stress or hormonal changes.\n• Track your cycle to understand your patterns.\n• See a doctor for very heavy or painful periods.";
    if (msg.includes("mood") || msg.includes("anxiety") || msg.includes("stress"))
        return "Mental wellness during your cycle:\n• Hormonal changes cause mood swings — this is normal.\n• Exercise releases endorphins that stabilize mood.\n• Mindfulness and journaling can help.\n• Speak with a professional if changes are severe.";
    if (msg.includes("hello") || msg.includes("hi"))
        return "Hello! I am your FemCare AI assistant. Ask me about period pain, PCOS, pregnancy, hygiene, or mental wellness!";
    return "I specialize in feminine health topics like period pain, PCOS, pregnancy, and hygiene. Please describe your concern and I will help!";
}