![image](https://user-images.githubusercontent.com/3879613/125519551-d46b63ee-50c5-4ead-be19-a911043df2a6.png)


# MCE - Case 1 - CRUD de cadastros de usuários - Frontend Web

[![wakatime](https://wakatime.com/badge/github/savio591/mce-onboarding-web.svg)](https://wakatime.com/badge/github/savio591/mce-onboarding-web)
[![codeinspector](https://www.code-inspector.com/project/24069/status/svg)](https://frontend.code-inspector.com/public/project/24069/mce-onboarding-web/dashboard)

Primeiro case do programa [Mind Coding Experience(MCE)](https://conteudos.provi.com.br/mind-coding-experience/), feito pela [Mind Consulting](https://mindconsulting.com.br/) em parceria com a fintech [Provi](https://provi.com.br), com o intuito de evoluir as habilidades técnicas participando de projetos e recebendo acompanhamento de profissionais sêniores do mercado.

## A proposta do case 1: Full-Stack CRUD

Os alunos devem criar uma plataforma simples, onde o usuário deverá criar sua conta de usuário e, posteriormente, modificar ou adicionar mais dados na sua conta. Também existira uma conta de administração da plataforma, este poderá ter acesso à lista de todos os usuários cadastrados, além de alterar quaisquer dados. A proposta é que o aluno possa entender o máximo sobre os dados em cadastros, seja a forma de requisição ao no frontend, backend, banco de dados, segurança e afins.

## Links do projeto:

* Front-end web: [Página](https://mce-onboarding.vercel.app) - [Repositório](https://github.com/savio591/mce-onboarding-web)
* Front-end mobile: [Repositório](https://github.com/savio591/mce-onboarding-mobile)
* Backend: [Servidor](https://agile-hollows-01374.herokuapp.com) - [Repositório](https://github.com/savio591/mce-onboarding-node)

## Requisitos para o desenvolvimento:
* **Node:** v12+

## Como rodar o projeto na máquina local:

* Primeiro, adicione as seguintes variáveis(para ser executada na máquina local):
```.env
// mce-onboarding-web/.env.local/

IS_LOCALHOST=true

NEXT_PUBLIC_VERCEL_URL=localhost:3000
NEXT_PUBLIC_BACKEND_URL= (LINK DO SERVIDOR BACKEND)

FAUNA_ADMIN_KEY= (CHAVE DO ADMIN DO BANCO DE DADOS)
FAUNADB_KEY= (CHAVE SECRETA DO NEXT PARA O FAUNA)
FAUNADB_CLIENT_KEY= (CHAVE DO USUÁRIO FINAL PARA O FAUNA)

GITHUB_CLIENT_ID= (OPCIONAL = ID PARA OAUTH DO GITHUB)
GITHUB_CLIENT_SECRET= (OPCIONAL = ID MESTRE PARA OAUTH DO GITHUB)

EMAIL_SERVER= (smtp://email@email.com:asenha@smtp.email.com:587) (O SEU SERVIDOR DE EMAIL)
EMAIL_FROM=(REMETENTE DO EMAIL)

BACKEND_ADMIN_TOKEN= (TOKEN DE ACESSO ADMIN DO BANCO DE DADOS DO EXPRESS)
```

* Instale as dependências utilizando ``yarn`` ou ``npm`` na pasta do repositório,
* Para iniciar no modo "desenvolvimento", inicie com ``yarn dev`` ou `npm run dev`. O Next/Webpack servirá o ambiente Next na rede local na porta ``3000``,
* Para iniciar uma `production`, build da aplicação Next.js com node, basta ``yarn build``, após a build for criada, execute ``yarn start`` para iniciar, depois disso, é só copiar o link da aplicação que aparecerá no terminal e pronto!

## Tecnologias utilizadas:

### Front-end web:

- Typescript,
- Server-Side-Rendering com Next.js/React.js,
- Static Site Generation com Next.js/React.js,
- FaunaDB(banco de dados serveless),
- Axios,
- Next-auth,
- SCSS(SASS),
- React-icons,
- Input-mask

### Front-end mobile:

- React-native
- Typescript
- Axios
- Styled-components
- Yup(validação de entradas)

### Back-end:

- Node.js(javascript),
- Typescript,
- PostgreSQL - Banco de Dados,
- Sequelize(ORM),
- Rotas da api com Express.js,
- Autenticação com JSON Web Tokens

---

**Agradecimentos à PROVI por todo o suporte e motivação e a Mind Consulting pelo programa, a oportunidade dada e especialmente às mentorias! <3**
