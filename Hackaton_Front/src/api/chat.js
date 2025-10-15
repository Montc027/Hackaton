export async function fakeChat(message) {
    
    await new Promise(r => setTimeout(r, 700));

    const replies = [
        "L'EIXAMPLE, SANTS-MONTJUÏC, SANT MARTI.",
        "L'EIXAMPLE, SANTS-MONTJUÏC, SANT MARTI.",
        "L'EIXAMPLE, SANTS-MONTJUÏC, SANT MARTI.",
        "L'EIXAMPLE, SANTS-MONTJUÏC, SANT MARTI.",
        "L'EIXAMPLE, SANTS-MONTJUÏC, SANT MARTI.",
    ];


    return replies[Math.floor(Math.random() * replies.length)];
}