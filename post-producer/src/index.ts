import { Hono } from 'hono'
import { init } from './start.services'
import { zValidator } from '@hono/zod-validator'

import { z } from 'zod'
import kafkaConfig from './config/kafka.config'

const app = new Hono()

init();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/create', 
  zValidator("json", z.object({
    title: z.string(),
    content: z.string()
  })), 
  async (c) => {
    const { title, content } = c.req.valid("json")

    try {
      await kafkaConfig.sentToTopic('post', JSON.stringify({title, content}))
      return c.json({message: 'POST Created'})
    } catch (error) {
      console.error('Error sending message: ', error)
      return c.json({error: 'Error sending message'}, 500)
    }
  }
)

export default app
