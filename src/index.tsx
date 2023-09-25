import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { PrismaClient } from '@prisma/client'
import { html } from "@elysiajs/html";
import { BaseHtml } from './template';
import * as elements from "typed-html";

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
        >
          <p>oi</p>
        </body>
      </BaseHtml>
    )
  ))
  .listen(8080);

function Item({ content }: any) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
    </div>
  );
}

function List({ items }: { items: { id: string; bairro: string; celular: string | null; cep: string; cnae_fiscal: string; cnae_secundario: string | null; cnpj: string; complemento: string | null; contato_realizado: boolean; uf: string; }[] }) {
  return (
    <div>
      {items.map((i) => (
        <Item key={i.id} content={i.celular} /> 
      ))}
    </div>
  );
}

export type App = typeof app