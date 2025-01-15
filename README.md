# Next.js Commerce

# Apresentação | Introduction

`PT`
Um aplicativo de comércio eletrônico Next.js App Router de alto desempenho e renderizado por servidor.

`EN`
A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

[![Demo Image](/public/demo.png)]

## Root Layout (Desktop)

# Image Gallery

## Desktop Views

<table>
  <tr>
    <td>
      <img src="/public/Desktop-home.png" alt="Home Page" width="300" />
      <p align="center">Home Page</p>
    </td>
    <td>
      <img src="/public/Desktop-cart.png" alt="Product Page" width="300" />
      <p align="center">Cart page</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="/public/Deskpot-product.png" alt="Checkout Page" width="300" />
      <p align="center">Product page</p>
    </td>
    <td>
      <img src="/public/Desktop-wishlist.png" alt="Profile Page" width="300" />
      <p align="center">Wishlist page</p>
    </td>
  </tr>
</table>

## Mobile Views

<table>
  <tr>
    <td>
      <img src="/public/Mobile-home-1.png" alt="Home Page Mobile" width="200" />
      <p align="center">Home page</p>
    </td>
    <td>
      <img src="/public/Mobile-profile-1.png" alt="Product Page Mobile" width="200" />
      <p align="center">Profile page</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="/public/Mobile-profile-2.png" alt="Checkout Page Mobile" width="200" />
      <p align="center">Profile page</p>
    </td>
    <td>
      <img src="/public/Mobile-profile-3.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Profile Page</p>
    </td>
    <td>
      <img src="/public/Mobile-profile-4.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Profile Page</p>
    </td>
    <td>
      <img src="/public/Mobile-product.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Product modal</p>
    </td>
    <td>
      <img src="/public/Mobile-cart.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Cart modal</p>
    </td>
    <td>
      <img src="/public/Mobile-search.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Search modal</p>
    </td>
    <td>
      <img src="/public/Mobile-search-2.png" alt="Profile Page Mobile" width="200" />
      <p align="center">Search modal</p>
    </td>
  </tr>
</table>

## Private Layout (Desktop)

`PT`
Esté projecto contém o seu dashbord(CMS) para gestão de contéudo. De momento apenas a rota do productos está disponivel para executar (CRUD)

`EN`
This project contains its own dashboard (CMS) for content management. At the moment only the product route is available to run (CRUD)

## Imagem do Painel

<table>
  <tr>
    <td>
      <img src="/red" alt="Home Page Mobile" width="200" />
      <p align="center">Home page</p>
    </td>
  </tr>
</table>

## Root Layout (Mobile)

`PT`
Neste projecto eu estou fazer com uma aplicação ajá e parece um aplicativo mobile native, com o poder CSS in JS quase que cheguei lá, estou começando sei não tão nativo assim mais vou chegar lá, me diz ochou da versão mobile abra no seu telefone

`EN`
In this project I'm making a web application that looks like a native mobile application, with the power of CSS in JS I've almost gotten there, I'm just starting out, I know it's not quite as native as that, but I'll get there, tell me what you think of the mobile version, open it on your phone

---

## Private Layout (Mobile)

---

## Core Features | Funcionalidades Principais

---

## Features | Funcionalidades

### Authentication | Autenticação

- [x] Layout
  - [x] Login
  - [x] Register | Registar
  - [x] Recover Password | Recuperar palavra-passe
  - [x] Send recovery email | Enviar email com código de recuperação
  - [x] Reset Password | Alterar palavra-passe
  - [x] Logout | Sair

### Root Layout

- [x] List Products | Listar produtos
- [x] Filter Products | Filtrar produtos
- [x] Product Preview | Previsualizar produto
- [x] Add to Cart | Adicionar ao carrinho
- [x] Add to Favorites | Adicionar aos favoritos
- [x] Checkout Page | Página de checkout
- [x] Search Products | Pesquisar produto
- [ ] Generate Receipt on Purchase | Gerar recibo ao comprar
- [ ] Evaluate product | Avaliar producto

### Private Layout

- [x] Profile Page | Página de perfil
- [x] Create Product | Criar produto
- [x] Edit Product | Editar produto
- [x] Delete Product | Excluir produto
- [x] View Product | Visualizar produto
- [x] List Products in Table | Listar produtos na tabela
- [ ] Create new user | Cadastrar útilizador
- [ ] Permition gard | Gerenciamento de permissõe
- [ ] Analiticys chart | Gráficos analiticos
- [ ] Add Coupon | Adicionar cupão
- [ ] Manage Categories, Coupons, etc. | Gerenciar categorias, cupões e outros
- [ ] List Orders in Table | Listar encomendas na tabela
- [ ] List Registered Users | Listar utilizadores registrados

### Manage Coupons | Gerenciar Cupões

- [ ] Create | Criar
- [ ] Edit | Editar
- [ ] Delete | Excluir

### User Interactions | Interações do Utilizador

- [x] Comment on a Product | Comentar em um produto
- [x] Select Sizes | Escolher tamanhos

---

## Futuras Funcionalidades e Páginas | Future Features and Pages

### Root Layout

- [ ] Blog Page | Página de blog
- [ ] Geo Location | Geolocalização
- [ ] Check Store on Map | Verificar loja no mapa
- [ ] Pick up Products in Nearby Store | Levantar produto na loja próxima
- [ ] Store Cart Items in Database | Armazenar os itens do carrinho no banco
- [ ] Store Favorites in Database | Armazenar os itens dos favoritos no banco
- [ ] Stripe Integration | Integração com Stripe

---

## Email Configuration | Configuração de Email

### Configuração com Mailtrap | Configuration with Mailtrap

Ainda estou mexendo na parte do google auth, mais podes com mailtrap

```
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT=2525
SMTP_USER=""
SMTP_PASS=""
SMTP_SECURE=false
SMTP_FROM=""
SMTP_TO=""
SMTP_SUBJECT=""
```

## Running locally | Execução local
<!-- 
1. Clona o repositorio: `git clone https://github.com/reinaldo-vombo/ecommerce-app.git`
2. Instale as dependencias: `npm install`
3. Adicione as variaveis de ambiente `crie um ficheiro .env na raiz do projecto`
4. Preencha o banco com as tabelas `npx prisma db push`
5. Preencha as tabelas com os dados padrão `npx prisma db seed`
6. Start the development server: `npm run dev` -->

## Contributing

If you'd like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
