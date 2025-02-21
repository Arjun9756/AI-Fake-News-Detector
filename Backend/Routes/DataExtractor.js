const express = require('express')
const router = express.Router()
const tokenVerify = require('../MiddleWares/TokenVerify')
const multer = require('multer')
const path = require('path')
const ExifReader = require('exifreader');
const AINewsDetect = require('./AINewsDetect')

// function retirveImageData(image){
//     let imageData 
// }

// const upload = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null , 'uploads/')
//         },
//         filename:function(req,file,cb){
//             cb(null , Date.now() + '-' + file.originalname)
//         }
//     })
// })

function extractNewsLink(text) {
    if (!text) return [];
    
    const urlRegex = /(https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)))/gi;
    
    let links = text.match(urlRegex) || [];
    
    links = links.map(link => {
        return link.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+$/, '');
    }).filter(link => {
        return link && link.length > 0;
    });
    
    return [...new Set(links)];
}

router.get('/' , (req , res)=>{
    res.status(200).json({
        message:"This is GET Request Make Post Request",
        status:true
    })
})

router.post('/' , tokenVerify  , async (req,res)=>{
    let text = req.body.text
    if(!text){
        return res.status(400).json({
            message:"News Text is Required",
            status:false
        })
    }

    let newsLinks = extractNewsLink(text)
    let textwithoutLink = text
    
    newsLinks.forEach(link => {
        textwithoutLink = textwithoutLink.replace(link, '').trim()
    })

    let response = await fetch('http://localhost:5000/ai-news-detect',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${req.user.token}`
        },
        body:JSON.stringify({
            newsText:textwithoutLink,
            newsLink:newsLinks
        })
    })

    let result = await response.json()

    if(!result){
        return res.status(500).json({
            message:"Error in detecting news",
            status:false,
            advice:"Please Contact Backend Developer Its an Server Error",
            AI_RESPONSE:"Failed to Detect News AI Error"
        })
    }

    return res.status(200).json({
        message:"News Detection Success",
        status:true,
        data:result
    })
})

module.exports = router