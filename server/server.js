import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// app config
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cors())

// API Endpoints
app.get('/' , (req,res) => res.send("API Working fine"))


app.listen(port , () => console.log('Server running on ' + port))
