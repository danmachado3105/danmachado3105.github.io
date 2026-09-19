# Danilo Machado — Portfólio Pessoal

Site pessoal desenvolvido para reunir meus projetos, tecnologias, formação e contato em um só lugar, enquanto busco minha primeira oportunidade de estágio em desenvolvimento.

🔗 **Site no ar:** [danmachado3105.github.io](https://danmachado3105.github.io)

## Sobre o projeto

Construído com HTML, CSS e JavaScript puro — sem frameworks ou dependências de build — como um portfólio profissional e um laboratório prático de front-end. O projeto reúne apresentação pessoal, stack, formação, projetos e canais de contato em uma experiência responsiva.

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS, animações e transformações 3D)
- JavaScript (vanilla)
- Hospedagem via GitHub Pages

## Estrutura do projeto

```
├── index.html                        # Estrutura da página
├── style.css                         # Entrada única dos estilos
├── css/
│   ├── legacy.css                    # Estilos dos componentes e seções existentes
│   ├── variables.css                 # Tokens de cor, tipografia, medidas e movimento
│   ├── reset.css                     # Normalização mínima entre navegadores
│   ├── base.css                      # Base tipográfica, seleção e foco
│   ├── layout.css                    # Regras de composição e containers
│   ├── components.css                # Refinamentos compartilhados de componentes
│   └── responsive.css                # Ajustes responsivos adicionais
├── js/
│   └── main.js                       # Interações (carrossel, cards 3D, scroll reveal, etc.)
└── assets/
    ├── perfil.jpg                    # Foto de perfil
    ├── danilomachado.png             # Foto da seção Sobre Mim
    ├── curriculo_danilo_machado.pdf  # Currículo em PDF (botão de download)
    ├── fp-sellection.png             # Preview do projeto FP Sellection
    ├── Redify.png                    # Preview do projeto Redify
    ├── velun-ai.png                  # Preview do projeto Velun AI
    ├── Velun-tech.png                # Preview do projeto Velun Tech
    ├── Velun-zap.png                 # Preview do projeto Velun ZAP
    ├── Taskflow.png                  # Preview do projeto Taskflow
    └── workzen.png                   # Preview do projeto Workzen
```

O favicon principal é um SVG inline no `<head>` do `index.html`. O arquivo `style.css` funciona como ponto de entrada e importa os módulos na ordem necessária para manter a compatibilidade com o visual existente.

## Seções do site

- **Início / Sobre mim** — apresentação, foto com efeito de destaque, botão de download do currículo e links para GitHub, LinkedIn e e-mail
- **Tecnologias** — cards organizados por desenvolvimento, ferramentas e integrações
- **Formação** — Bacharelado em Engenharia de Software (UVA) e Técnico em Desenvolvimento de Sistemas (UniCesumar), com cards interativos
- **Projetos** — carrossel horizontal com rolagem automática e infinita, apresentando 5 projetos:
  - [Redify](https://github.com/danmachado3105) — SaaS de correção de redações do ENEM com IA
  - [Velun AI](https://github.com/danmachado3105) — assistente de IA local com busca semântica
  - [Velun Tech](https://veluntech.netlify.app) — site institucional de uma agência de desenvolvimento web
  - [Velun ZAP](https://velunzap.netlify.app) — landing page de assistente de IA para WhatsApp
  - [Taskflow](https://task-flow-six-topaz.vercel.app) — gerenciador de tarefas moderno
- **Contato** — cards com ícone, valor e link direto para e-mail, LinkedIn e GitHub

## Detalhes de interação

- Fundo com brilhos azuis sutis e grade técnica no modo claro
- Animações de entrada (fade + subida) conforme o usuário rola a página
- Barra de progresso de leitura fixa no topo
- Carrossel de projetos com loop infinito, velocidade automática lenta e setas para navegação manual mais rápida
- Efeito de leve inclinação 3D nos cards de projeto ao passar o mouse
- Alternância entre tema escuro e claro com preferência persistida no navegador
- Dock de navegação que destaca a seção visível
- Todas as animações respeitam a preferência do sistema por movimento reduzido (`prefers-reduced-motion`)

## SEO e acessibilidade

- Título, descrição, canonical, Open Graph e Twitter Cards configurados no `<head>`
- Dados estruturados `Person` em JSON-LD para mecanismos de busca
- Foco visível para navegação por teclado
- Textos alternativos nas imagens e rótulos acessíveis nos controles
- Layout responsivo para desktop, tablet e mobile

## Rodando localmente

Não há dependências ou build — basta abrir o `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Contato

- 📧 danilomachado1227@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/danilomachado3105)
- 💻 [GitHub](https://github.com/danmachado3105)