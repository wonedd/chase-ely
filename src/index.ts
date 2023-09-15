// server.ts
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { PrismaClient } from '@prisma/client'

const setup = (app: Elysia) => app.decorate('db', new PrismaClient())

const app = new Elysia()
    .use(setup)
    .use(swagger({
        documentation:{
            info:{
                title:"Chase api doc",
                version:"0.0.1",
                description:"Api piloto do chase para usando bun.js"
            }
        }
    }))
    .get('/search', ({ db }) => db.chaseio.findMany({ take:10000 }))
    .listen(8080)

export type App = typeof app