# Next.js Commerce

# Apresentação | Introduction

A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

[![Demo Image](/public/demo.png)](https://game-ten-zeta.vercel.app/)

## Root Layout (Desktop)

# Image Gallery

## Desktop Views

<table>
  <tr>
    <td>
      <img src="path/to/image1.png" alt="Home Page" width="300" />
      <p align="center">Home Page</p>
    </td>
    <td>
      <img src="path/to/image2.png" alt="Product Page" width="300" />
      <p align="center">Product Page</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="path/to/image3.png" alt="Checkout Page" width="300" />
      <p align="center">Checkout Page</p>
    </td>
    <td>
      <img src="path/to/image4.png" alt="Profile Page" width="300" />
      <p align="center">Profile Page</p>
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
  </tr>
</table>

## Private Layout (Desktop)

## Root Layout (Mobile)

Portanto, o layout de mobile é muito simples e fixo. Como tenho preguiça de aprender React Native, comecei a tentar com que os apps web fossem o mais próximo possível de um comportamento nativo. Experimente abrir no seu telefone!  
Therefore, the mobile layout is very simple and fixed. Since I'm reluctant to learn React Native, I started working to make web apps behave as natively as possible. Try opening it on your phone!

---

## Private Layout (Mobile)

---

## Core Features | Funcionalidades Principais

---

## Features | Funcionalidades

### Authentication | Autenticação

- [x] Layout
  - [x] Login
  - [ ] Register | Registar
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
- [ ] Checkout Page | Página de checkout
- [ ] Generate Receipt on Purchase | Gerar recibo ao comprar
- [x] Search Products | Pesquisar produto

### Private Layout

- [x] Profile Page | Página de perfil
- [x] Create Product | Criar produto
- [x] Edit Product | Editar produto
- [x] Delete Product | Excluir produto
- [ ] Add Coupon | Adicionar cupão
- [ ] Manage Categories, Coupons, etc. | Gerenciar categorias, cupões e outros
- [x] View Product | Visualizar produto
- [x] List Products in Table | Listar produtos na tabela
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

1. Clona o repositorio: `git clone https://github.com/reinaldo-vombo/ecommerce-app.git`
2. Instale as dependencias: `npm install`
3. Adicione as variaveis de ambiente
4. Preencha o banco com as tabelas `npx prisma db push`
5. Preencha as tabelas com os dados padrão `npx prisma db seed`
6. Start the development server: `npm run dev`

## Contributing

If you'd like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
