const express = require('express')
const router = express.Router()
const tokenVerify = require('../MiddleWares/TokenVerify')
const { Groq } = require('groq-sdk')
const groq = new Groq({apiKey:"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"});

async function detectNews(newsText, newsLink) {
    const prompt = `You are a professional fact-checker and news authenticity analyzer. Analyze the following news content and URL carefully:

    News Content: "${newsText}"
    News URL: "${newsLink}"
    
    Please provide a detailed analysis in the following format:
    1. Authenticity Score (0-100%): Rate how authentic this news appears
    2. Red Flags: List any suspicious elements
    3. URL Credibility: Analyze if the source URL appears legitimate
    4. Final Verdict: Clearly state if this appears to be "REAL" or "FAKE" news
    5. Confidence Level: How confident are you in this assessment (0-100%)
    6. Summary: Provide a brief summary of the analysis
    `
    
    try{
        const completion = await groq.chat.completions.create({
            messages:[{role:"user" , content:prompt}],
            model:"mixtral-8x7b-32768",
            temperature:0.5,
            max_tokens:4096,
        })
        return completion.choices[0].message.content
    }catch(error){
        console.error("Error in detecting news:",error)
        return null
    }
}

router.post('/' , async (req, res) => {
    let newsText = req.body.newsText
    let newsLink = req.body.newsLink

    let result = await detectNews(newsText , newsLink)
    console.log(result)
    if(!result){
        return res.status(500).json({
            message:"Error in detecting news",
            status:false,
            advice:"Please Contact Backend Developer Its an Server Error",
            AI_RESPONSE:"Failed to Detect News AI Error"
        })
    }
    console.log(result)
    return res.status(200).json({
        message:"News Detection Success",
        status:true,
        data:result
    })
})

module.exports = router