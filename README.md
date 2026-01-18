# Product Viewer

Product Viewer built with `[React, TypeScript, Vite, MUI]`

## 🧰 Additional Tools

- **i18next** — for internationalization

## [Live demo](https://matsola-sv.github.io/product-viewer/)

## Run Locally

### 1. Install Dependencies

```sh
$ npm install
```

### 2. Create an `.env` file and add the following variables.

You can also set a project subdomain in .env. The default is '/'.
For example:
http://my-project.com/exhibit.dev

```
VITE_PUBLIC_URL=/exhibit.dev
```

### 3. Run development server

```sh
$ $ npm run dev
```

Runs the app in development mode using Vite.
Open http://localhost:5173 to view it in the browser (default Vite port).

In development, the app uses the `.env.local /.env.development` variable:

```sh
VITE_PUBLIC_URL=/
```

You can define it in a `.env` file

```sh
VITE_PUBLIC_URL=/exhibit.dev
```

---

## Build the project

```sh
$ npm run build
```

Builds the app for production to the dist folder using Vite.
It correctly bundles the app in production mode and optimizes the output for best performance.

You can define a production `VITE_PUBLIC_URL` in `.env.production`:

```sh
VITE_PUBLIC_URL=/exhibit.prod
```
