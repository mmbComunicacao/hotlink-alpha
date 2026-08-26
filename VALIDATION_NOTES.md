# Notas de validação visual

## Referência observada

A página pública do WhatsApp apresenta o perfil em primeiro plano, um CTA principal para iniciar conversa, uma área de catálogo em cartões e uma coluna de informações comerciais. O hotlink implementado segue essa hierarquia, usando o WhatsApp como ação principal e mantendo os links externos em nova aba.

## Validação local

A rota `http://localhost:3000/?id=juniotosta` foi aberta com sucesso. O parâmetro `id` é aceito pela página, o perfil demonstrativo é renderizado, o CTA gera um link `wa.me` com mensagem pré-preenchida, o catálogo mostra seis cartões e os links de contato aparecem na lateral. O build de produção e o TypeScript foram concluídos sem erros.

## Observações

Enquanto `CONSULTANT_API_URL` não estiver definido, a página mostra dados demonstrativos e exibe a etiqueta `Perfil demonstrativo`. Quando a API for definida, a camada server-side fará um GET com `?id={código}`, normalizará campos comuns em português/inglês e cairá para o demonstrativo em caso de erro.

## Validação do banner de captação

O banner flutuante foi exibido no viewport após a abertura da página, inicialmente recolhido com a chamada `Quer que eu te ligue?`, sem cobrir o CTA principal. Ao expandir, apresenta campos obrigatórios de nome e telefone/WhatsApp, aviso de uso do contato, botão de solicitação e estados de envio/sucesso/erro. O formulário envia para `POST /api/leads`, que aceita o lead em modo demonstrativo quando `LEAD_API_URL` ainda não está configurada.

## Teste ponta a ponta

O formulário foi aberto, preenchido com nome e telefone de teste e enviado pelo navegador. A rota `POST /api/leads` respondeu com `{ "ok": true, "mode": "demo" }` sem endpoint externo configurado, e a interface exibiu `Solicitação enviada!`.
