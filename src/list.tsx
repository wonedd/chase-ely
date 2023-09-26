import * as elements from "typed-html";

interface ListItem {
  id: string;
  bairro: string;
  celular: string | null;
  cep: string;
  cnae_fiscal: string;
  cnae_secundario: string | null;
  cnpj: string;
  complemento: string | null;
  contato_realizado: boolean;
  uf: string;
  nome_fantasia: string | null;
}

export function List({ items }: { items: ListItem[] }) {
  return (
    <div class="w-full flex">
      {items.map((i) => (
        <div>
          <h2 class="text-xl font-semibold mb-2">{i.nome_fantasia}</h2>
          <p class="mb-2"><strong>Celular:</strong> {i.celular || 'N/A'}</p>
          <p class="mb-2"><strong>CEP:</strong> {i.cep}</p>
          <p class="mb-2"><strong>CNAE Fiscal:</strong> {i.cnae_fiscal}</p>
          <p class="mb-2"><strong>CNPJ:</strong> {i.cnpj}</p>
          <p class="mb-2"><strong>Contato Realizado:</strong> {i.contato_realizado ? 'Sim' : 'Não'}</p>
          <p class="mb-2"><strong>UF:</strong> {i.uf}</p>
        </div>
      ))}
    </div>
  );
}


