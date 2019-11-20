# Style Guide Para React!

Decidi escrever esse guia para simplificar a padronização de código em projetos
*React*.

Neste guia você vai configurar toda a estrutura de um projeto em *REACT*, e toda
a configuração do guia de Estilo de código.

## 1º Passo

Vamos utilizar a `cli` do próprio _Facebook_ para configurar toda noss estrutura
inicial do nosso projeto *React*.

No terminal execute:

```bash
 yarn create react-app projeto-react
```
> Utilize o `yarn`, ele é mais rápido, fácil e já configura tudo certinho
> pra gente, uma verdadeira **mão na roda**.

## 2º Passo

Agora vamos apagar alguns arquivos desnecessários, abra a pasta do seu projeto
no seu editor favorito e vamos fazer algumas configurações.

1. Na raiz do projeto, apague o arquivo `README.md`

2. Na pasta `src` apague os seguites arquivos:
   `App.css`, `App.test.js`, `index.css`, `serviceWorker.js`, `logo.svg`

Agora, dentro da pasta `src`, edite o arquivo `index.js`, deixe-o dessa forma:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));
```
Agora, dentro da mesma pasta edite o arquivo `App.js`, deixe-o dessa forma:

```jsx
import React from 'react';

function App() {
  return (
     <h1>Olá Mundo!</h1>
  );
}

export default App;
```
## 3º Passo

Agora, abra seu arquivo `package.json`, e remova as seguintes linhas:

```json
  "eslintConfig": {
    "extends": "react-app"
  },
```

Agora vamos instalar o `ESLint`, uma ferramenta que vai nos ajudar a padrionizar
o nosso código, no seu terminal, execute o comando abaixo:

```bash
yarn add eslint -D
```
> Note que eu utilizei a flag `-D` que sinaliza que essa dependência, é uma
> dependência de desenvolvimento.

Logo após a instalação do `ESLint`, execute no terminal o seguinte comando:

```bash
yarn eslint --init
```

Algumas perguntas irão aparecer no terminal agora.

Para a primeira pergunta *How would you like to use ESLint?*
selecione a opção:
`To check syntax, find problems, and enforce code style`
e pressione <code>ENTER</code> para continuar.

Para a segunda pergunta: *What type of modules does your project use?*,
selecione a opção: `JavaScript modules (import/export)`

Para a terceira pergunta: *Which framework does your project use?*

Como estamos configuranso o `ESLint` para o **REACT**, selecione a opção:
`React`.

Agora, o terminal está perguntando: *Does your project use TypeScript?*, como
não estamos utilizando `TYPESCRIPT`, pressione a tecla <code>N</code> e em
seguida tecle <code>ENTER</code>.

Agora ele nos pergunta: *Where does your code run?*, onde nosso código está
rodando, como é uma palicação `React`, ela vai rodar no `Browser`, marque a
opção `Browser` com o teclado, e tecle <code>ENTER</code> para continuar.


Agora ele nos pergunta: *How would you like to define a style for your project?*
selecione a opção: `Use a popular style guide`, e tecle <code>ENTER</code>, para
continuar.

Para a pergunta: *Which style guide do you want to follow?*, Eu optei por
escolher a opção `Airbnb (https://github.com/airbnb/javascript)`, que é o padrão
de código que utilizo em 100% dos meus projetos `React`, e é com ela que vamos
configurar todos os `snnipets` de padronização de código.

Para a pergunta: *What format do you want your config file to be in?*, selecione
a opção `Javascript`.

Agora ele nos pergunta: *Would you like to install them now with npm?*, presssione
<code>Y</code> e tecle <code>ENTER</code> para continuar, e aguarde o processo
finalizar.

## 4º Passo

Observe a raiz do seu proejeto, e apague o seguinte arquivo, `package-lock.json`,
e em seguida, execute no terminal:

```bash
yarn
```
> O que acabamos de fazer foi registrar as dependências que o `ESLint` instalou,
> no `package-lock.json`, no nosso `yarn.lock`.

Agora na raiz do seu projeto crie o arquivo `.editorconfig`, deixe-o exatamente
asssim:

```editorconfig
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

Agora vamos instalar masi algumas dependências para finalizar a configuração do
nosso Style Guide.

execute no terminal:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```
Agora vamos editar o arquivo `.eslintrc.js`, deixe-o exatamente assim:

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser:'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {extensions: ['.jsx', '.js']}
    ],
    'import/prefer-default-export': 'off'
  },
};
```

Você deve estar se perguntando, ok, por que isso tudo ?

Bem, não é necessário entender todas essas regras, e configurações deste arquivo,
mas algumas coisas são interessantes de ter conhecimento, as partes desse arquivo
de configuração que nós editamos.

1. `extends`
```js
extends: [
    'airbnb',
    'prettier',// new
    'prettier/react'// new
  ],
```
Aqui nós estamos dizendo pro `ESLint` que vamos utilizar mais algumas configurações,
além do padrão de código da `Airbnb`, são elas o `prettier`, e o `prettier/react`.

Nós tambem adicionamos isso no arquivo:

```js
 parser:'babel-eslint',// new
```
Isso serve pra dizer pro `ESLint` que nós vamos utilizar as últimas features do
javascript.


Nós também configuramos a parte de plugins:

```js
plugins: [
    'react',
    'prettier' // new
  ],
```
Adicionamos o `prettier` como um plugin.

Agora vamos configurar algumas regras:

```js
rules: {
  'prettier/prettier': 'error', // Primeira regra
  'react/jsx-filename-extension': [
    'warn',
    {extensions: ['.jsx', '.js']}
  ], // Segunda regra
  'import/prefer-default-export': 'off' // terceira regra
},
```
A primeira regra, nós estamos dizendo pro `ESLint` que queremos que o `prettier`
informe como `erro`, todas as regras que ele encontrar e não estiver de
acordo com o nosso código.

A segunda regra, sobrescreve uma regra do padrão da `Airbnb`, essa regra consiste
em somente escrevermos código `JSX`(**Javascript** misturado com **HTML**), em arquivos
que terminem com a estenção `.jsx`, com essa regra que configuramos, podemos escrever
código `JSX`, tanto em arquivos `.jsx` quanto em arquivos  com a extenção `.js`.

A terceira regra também é uma regra de sobreposiçã á uma regra do padrão de código
da `Airbnb`, essa regra consiste que em arquivos que temos somente um `export`,
esse `export` seja um `export default`.


## 4º Passo

Agora na raiz do seu projeto crie um arquivo chamado `.prettierrc`.

Deixe o arquivo exatamente assim:

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}

```
Essa configuração, faz com que o `prettier` e a `style-guide` da `Airbnb` tenham
uma, digamos assim, **Harmonia**.


# Beleza, agora temos nosso padrão de código configurado e pronto pra codar :D.

## 5º Roteamento

Agora vamos configurar a parte de rotas da nossa aplicação, no terminal execute
o seguinte comando:

```bash
yarn add react-router-dom
```
> Note que eu não estou utilizando a flag `-D`, significa que essa lib não é
> só uma dependência de desenvolvimento.

Agora, dentro da pasta `src`, crie um arquivo chamado `routes.js`, e também uma
pasta chamada `pages`, onde serão armazendas as páginas da nossa aplicação.


Agora dentro da pasta `pages`, crie uma pasta chamada `About`, e dentro dela um
arquivo chamado `index.js`, e também crie uma pasta chamada `Main`, e dentro dessa
pasta crie um arquivo chamado `index.js`.

Agora edite esse arquivo `Main/index.js` que você acabou de criar, vamos criar um
componente bem simples:

```jsx
import React from 'react';

function Main() {
  return <h1>Página Main</h1>;
}

export default Main;

```
Faça o mesmo para o arquivo `About/index.js`:

```jsx
import React from 'react';

function About() {
  return <h1>Página About</h1>;
}

export default About;

```

Agora edite o arquivo `routes.js`, deixe-o exatamente assim:

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}
```
Aqui nós configuramos o esquema de roteamento da nossa aplicação, importamos
algumas funções da lib `react-router-dom`, `BrowserRouter`, ele nos permite utilizar
rotas simples, ex: `/about`, `Switch`, ele é responsável por restringir o carregamento
dá página á somente 1 componente por rota, e por fim o `Route`, que é o componente
que recebe a variável do componente importado, e define sua rota com o atributo `path`.

> É importante salientar que, a rota raiz, `Main`, deve ter o atributo `exact`,
> para que a rota seja exatamente essa, e não seja confundida, porque o `BrowserRouter`,
> comprrende que rota da `URL` deve começar com o `path` escolhido, não ser exato,
> por esse motivo colocamos o atributo `exact` na rota do component `Main`.


Agora vamos editar o arquivo `App.js`, deixe-o exatamente assim:

```jsx
import React from 'react';
import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;

```
Aqui nós importamos nosso arquivo de rotas, e exportamos como como nosso componente
principal.

> Bem, a partir desse ponto acredito que você já tem a base para uma aplicação
> React, com padrão de código e configuração de rotas.
