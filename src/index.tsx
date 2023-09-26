import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { PrismaClient } from '@prisma/client'
import { html } from "@elysiajs/html";
import { BaseHtml } from './template';
import * as elements from "typed-html";
import { List } from './list';

const setup = (app: Elysia) => app.decorate('db', new PrismaClient())

const app = new Elysia()
  .use(setup)
  .use(html())
  .use(swagger({
    documentation: {
      info: {
        title: "Chase api doc",
        version: "0.0.1",
        description: "Api piloto do chase para usando bun.js"
      }
    }
  }))
  
  .get('/search', async ({ db }) => {
    const data = await db.chaseio.findMany({ take: 10 });
    return <List items={data} />;
  })
  .get("/", ({ html }: any) => (
    html(
      <BaseHtml>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/search"
          hx-swap="innerHTML"
          hx-trigger="load"
        />
      </BaseHtml>
    )
  ))
  .listen(8080);






//Eu preciso
//Realizar a implementação da rota que chama a rota do venom pra ai sim o front chamar essa rota





export type App = typeof app