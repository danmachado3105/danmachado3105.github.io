# Danilo Machado — Portfólio Pessoal

Site pessoal desenvolvido para reunir meus projetos, tecnologias, formação e contato em um só lugar, enquanto busco minha primeira oportunidade de estágio em desenvolvimento.

🔗 **Site no ar:** [danmachado3105.github.io](https://danmachado3105.github.io)

## Sobre o projeto

Construído com HTML, CSS e JavaScript puro — sem frameworks — como exercício prático enquanto aprendo front-end. O objetivo foi ter controle total sobre cada linha de código, entender de verdade o que estava sendo escrito e usar o próprio site como campo de treino para efeitos e interações mais avançadas (animações, carrossel, cards 3D).

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS, transformações 3D)
- JavaScript (vanilla)
- Hospedagem via GitHub Pages

## Estrutura do projeto

```
├── index.html                        # Estrutura da página
├── style.css                         # Estilos, responsividade e animações
├── script.js                         # Interações (carrossel, cards 3D, scroll reveal, etc.)
└── assets/
    ├── perfil.jpg                    # Foto de perfil
    ├── curriculo_danilo_machado.pdf  # Currículo em PDF (botão de download)
    ├── Redify.png                    # Preview do projeto Redify
    ├── velun-ai.png                  # Preview do projeto Velun AI
    ├── Velun-tech.png                # Preview do projeto Velun Tech
    ├── Velun-zap.png                 # Preview do projeto Velun ZAP
    ├── Taskflow.png                  # Preview do projeto Taskflow
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── favicon-48x48.png
    └── apple-touch-icon.png
```

## Seções do site

- **Início / Sobre mim** — apresentação, foto com efeito de destaque, botão de download do currículo e links para GitHub, LinkedIn e e-mail
- **Tecnologias** — cards com efeito de flip 3D (viram ao passar o mouse ou tocar): Front-end, Ferramentas e Inteligência Artificial, essa última marcada como diferencial
- **Formação** — Bacharelado em Engenharia de Software (UVA) e Técnico em Desenvolvimento de Sistemas (UniCesumar), com cards interativos
- **Projetos** — carrossel horizontal com rolagem automática e infinita, apresentando 5 projetos:
  - [Redify](https://github.com/danmachado3105) — SaaS de correção de redações do ENEM com IA
  - [Velun AI](https://github.com/danmachado3105) — assistente de IA local com busca semântica
  - [Velun Tech](https://veluntech.netlify.app) — site institucional de uma agência de desenvolvimento web
  - [Velun ZAP](https://velunzap.netlify.app) — landing page de assistente de IA para WhatsApp
  - [Taskflow](https://task-flow-six-topaz.vercel.app) — gerenciador de tarefas moderno
- **Contato** — cards com ícone, valor e link direto para e-mail, LinkedIn e GitHub

## Detalhes de interação

- Fundo com brilhos verdes sutis e em movimento constante
- Animações de entrada (fade + subida) conforme o usuário rola a página
- Barra de progresso de leitura fixa no topo
- Carrossel de projetos com loop infinito, velocidade automática lenta e setas para navegação manual mais rápida
- Cards de tecnologia com flip 3D no hover (ou toque, no celular)
- Efeito de leve inclinação 3D nos cards de projeto ao passar o mouse
- Todas as animações respeitam a preferência do sistema por movimento reduzido (`prefers-reduced-motion`)

## Rodando localmente

Não há dependências ou build — basta abrir o `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Contato

- 📧 danilomachado1227@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/danilomachado3105)
- 💻 [GitHub](https://github.com/danmachado3105)