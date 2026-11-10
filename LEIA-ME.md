# Lucas Expresso — Site Institucional

Site institucional completo da **Lucas Expresso**, desenvolvido com HTML5, CSS3 e
JavaScript puro (sem bibliotecas externas).

> **IMPORTANTE:** todos os textos, fotos, contatos, cidades e serviços são
> **conteúdos provisórios**, marcados visualmente no site e comentados no código.
> Nenhuma informação real da empresa foi inventada — tudo deve ser substituído
> pelos dados oficiais antes da publicação.

---

## 1. Estrutura do projeto

```
lucas-expresso/
├── index.html          ← Página única com todas as seções
├── style.css           ← Estilos, identidade visual e responsividade
├── script.js           ← Interações e animações (JavaScript puro)
├── LEIA-ME.md          ← Este arquivo de instruções
└── img/                ← Imagens do site
    ├── logo.svg              ← Logotipo provisório (versão colorida)
    ├── logo-branco.svg       ← Logotipo provisório (versão branca, topo do site)
    ├── favicon.svg           ← Ícone da aba do navegador
    ├── hero-fundo.svg         ← Arte vetorial de fundo do hero (moto/motoboy)
    ├── hero.svg              ← Imagem de destaque da Home (pode ser foto real)
    ├── mapa-cobertura.svg    ← Mapa ilustrativo da área de cobertura
    ├── sobre-01.svg ... 03   ← Fotos da seção "Sobre" (linha do tempo)
    ├── evolucao-01.svg ... 04← Fotos da seção "Nossa evolução"
    └── galeria-01.svg ... 08 ← Fotos da galeria
```

## 2. Como executar o site localmente

**Opção 1 — abrir direto (mais simples):**
dê dois cliques em `index.html`. O site abre no navegador padrão.

**Opção 2 — servidor local (recomendado):**
abra o terminal dentro da pasta do projeto e rode um dos comandos abaixo.

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

Depois acesse `http://localhost:8000` no navegador.

## 3. Como publicar na internet

Envie todos os arquivos e pastas para o seu hospedagem/registro de domínios,
mantendo a mesma estrutura. Locais comuns: Hostinger, Registro.br, Vercel,
Netlify, GitHub Pages. Não há etapa de compilação: é só subir os arquivos.

## 4. Como substituir as fotos

As imagens atuais são **placeholders** (arquivos `.svg` com o aviso
"SUBSTITUIR PELA FOTO OFICIAL").

1. Escolha a foto oficial e salve-a na pasta `img/`.
2. Para não mexer no código: **use o mesmo nome do arquivo** (ex.: substitua
   `img/galeria-01.svg` por `img/galeria-01.jpg`).
3. Se usar outro nome/extensão, atualize o caminho no `index.html`
   (ex.: `<img src="img/galeria-01.jpg" ...>`).

Dicas de qualidade:
- Fotografia de capa (`hero.svg`): use imagem horizontal, mínimo **1600 × 900 px**.
  O fundo atual do hero é a arte vetorial `img/hero-fundo.svg` (criada a partir da
  identidade da empresa). Para usar uma foto real no lugar, altere a propriedade
  `background` de `.hero__bg` no `style.css`.
- Galeria: formato próximo de **900 × 700 px**.
- Otimize as imagens (TinyPNG, Squoosh) para o site carregar rápido.
- Atualize também a meta `og:image` no `<head>` do `index.html` para a foto real.

## 5. Como editar as informações

Procure no `index.html` pelos marcadores abaixo (um editor com "Localizar"
ajuda bastante):

| O que editar                   | Onde procurar no `index.html`            |
| ------------------------------ | ---------------------------------------- |
| Frase de destaque e textos Home| Seção `id="home"`                        |
| História e linha do tempo      | Seção `id="sobre"` (classe `timeline`)   |
| Serviços (nome e descrição)    | Seção `id="servicos"` (classe `card`)    |
| Cidades e regiões atendidas    | Seção `id="cidades"` (classe `region`)   |
| Legendas da galeria            | Seção `id="galeria"` (classe `gallery__item`) |
| Diferenciais                   | Seção `id="diferenciais"` (classe `feature`)  |
| Marcos da evolução             | Seção `id="evolucao"` (classe `evolution__item`) |
| Telefone, WhatsApp, e-mail...  | Comentário **`DADOS DE CONTATO`**        |
| Textos do rodapé               | Tag `<footer>`                           |

Observações:
- Conteúdos provisórios aparecem no site com **borda tracejada laranja** (classe
  CSS `placeholder`) e têm comentários `CONTEÚDO PROVISÓRIO` no código.
  Ao substituir pelo conteúdo real, **remova a classe `placeholder`** da tag.
- Números de telefone/WhatsApp aparecem em vários lugares: menu, seção de
  contato, rodapé e botões flutuantes. Use "Localizar e substituir" para
  atualizar todos de uma vez (procure por `5500000000000`).
- Formato do link de WhatsApp: `https://wa.me/55` + DDD + número
  (ex.: `https://wa.me/5511999998888`).

## 6. Como ativar o envio do formulário

O formulário **valida os campos**, mas não envia mensagens sozinho (de
propósito, para não criar uma falsa sensação de envio). Para ativar, escolha
uma opção:

**Opção A — serviço externo (ex.: Formspree):**
edite o `index.html`, no `<form id="form-contato">`:

```html
<form id="form-contato" action="https://formspree.io/f/SEU-ID" method="post">
```

**Opção B — backend próprio:**
abra o `script.js`, preencha a configuração no topo do arquivo:

```js
const CONFIG = {
  ...
  formularioEndpoint: '/api/contato'
};
```

Enquanto isso não for feito, ao enviar o formulário aparece um aviso claro de
que a integração ainda não está configurada.

## 7. Configurações rápidas no JavaScript

No topo do `script.js`, o objeto `CONFIG` controla:

| Opção                  | Função                                             |
| ---------------------- | -------------------------------------------------- |
| `formularioEndpoint`   | Endereço que recebe o envio do formulário           |
| `mascaraTelefone`      | Liga/desliga a máscara `(00) 00000-0000`           |
| `telefoneDigitosMin`   | Quantidade mínima de dígitos no telefone            |
| `topoVisivelApos`      | Scroll (em px) para o botão "voltar ao topo" aparecer |

## 8. Identidade visual

As cores do site ficam no início do `style.css`, na seção `:root`:

| Variável               | Cor sugerida | Uso                              |
| ---------------------- | ------------ | -------------------------------- |
| `--cor-primaria`       | `#2E7CF6`    | Azul institucional (confiança)   |
| `--cor-secundaria`     | `#0A2240`    | Azul-marinho (fundos escuros)    |
| `--cor-acento`         | `#F5A524`    | Âmbar (destaques e velocidade)   |
| `--cor-whats`          | `#25D366`    | Botão de WhatsApp                |

Tipografia: **Manrope** (títulos) e **Inter** (texto), carregadas do Google
Fonts. Para usar fontes locais, substitua as tags `<link>` do `<head>`.

## 9. SEO — o que ajustar antes de publicar

- Título e descrição: tags `<title>` e `<meta name="description">`.
- Endereço do site: `<link rel="canonical">` e os metadados `og:*`.
- Dados estruturados: bloco `<script type="application/ld+json">` (preencha
  telefone, e-mail, endereço e redes sociais reais).
- Substitua as imagens provisórias (melhora o visual nos compartilhamentos).

## 10. Acessibilidade e desempenho (já implementados)

- Contraste adequado, foco visível no teclado e `aria-labels` nos botões.
- Menu navegável por teclado (tecla `Escape` fecha o menu mobile).
- Lightbox com setas do teclado, `Home`, `End`, `Escape` e gestos de deslize.
- Imagens com `loading="lazy"` (carregamento otimizado) e textos alternativos.
- Animações respeitam `prefers-reduced-motion` (quem tem sensibilidade a
  movimento vê o site sem animações).
- Layout responsivo: desktop, tablet e celular.

---

Dúvidas ou ajustes? Todos os arquivos estão comentados em português para
facilitar a edição futura.
