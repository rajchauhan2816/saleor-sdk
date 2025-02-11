<div align="center">
  <h1>Saleor SDK</h1>
</div>

This package contains methods providing Saleor business logic for a storefront and apps. It handles Saleor GraphQL queries and mutations, manages Apollo cache, and provides an internal state to manage popular storefront use cases, like user authentication.

> :warning: **Note: Saleor SDK is still under heavy development, and its API may change.**

## Table of Contents

- [Setup](#setup)
- [Features](#features)
- [Local development](#local-development)

## Setup

There are two ways to use SDK - making custom implementation or using React components and hooks, which already has that implementation ready.

### Using React

First install SDK as dependency to your project

```bash
npm install @saleor/sdk
```

Use `SaleorProvider` with passed Saleor's client created by `createSaleorClient` in a prop. Then use React hooks in any component passed as child to `SaleorProvider`.

```tsx
import {
  SaleorProvider,
  createSaleorClient,
  useAuth,
  useAuthState,
} from "@saleor/sdk";

const client = createSaleorClient({
  apiUrl: "<SALEOR_GRAPHQL_URL>",
  channel: "<CHANNEL>",
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <SaleorProvider client={client}>
    <App />
  </SaleorProvider>,
  rootElement
);

const App = () => {
  const { login } = useAuth();
  const { authenticated, user } = useAuthState();

  const handleSignIn = async () => {
    const { data } = await login({
      email: "admin@example.com",
      password: "admin",
    });

    if (data.tokenCreate.errors.length > 0) {
      /**
       * Unable to sign in.
       **/
    } else if (data) {
      /**
       * User signed in successfully.
       **/
    }
  };

  if (authenticated && user) {
    return <span>Signed in as {user.firstName}</span>;
  }

  return <button onClick={handleSignIn}>Sign in</button>;
};
```

### Using with NodeJS and other frameworks

```bash
npm install @saleor/sdk
```

Then use `createSaleorClient` to get Saleor api methods and internal config variables like channel and Apollo client.

```tsx
import { createSaleorClient } from "@saleor/sdk";

const client = createSaleorClient({
  apiUrl: "<SALEOR_GRAPHQL_URL>",
  channel: "<CHANNEL>",
});

const { auth, config, _internal } = client;
```

Finally, API methods can be used:

```tsx
const { data } = await auth.login({
  email: "admin@example.com",
  password: "admin",
});

if (data.tokenCreate.errors.length > 0) {
  /**
   * Unable to sign in.
   **/
} else if (data) {
  /**
   * User signed in successfully.
   **/
  const userData = api.auth.tokenCreate.user;
}
```

## Features

We provide an API with methods and fields, performing one, scoped type of work. You may access them straight from `createSaleorClient()` or use React hooks:

| API object | React hook                    | Description                                                                      |
| :--------- | :---------------------------- | :------------------------------------------------------------------------------- |
| `getState()`| `useAuthState()`             | Returns current SDK state: `user`, `authenticated` and `token`.                  |
| `auth`      | `useAuth()`                  | Handles user authentication methods.                                             |
| `user`      | `useUser()`                  | Handles user account methods.                                                    |

## Local development

Our aim it to build SDK, highly configurable, as a separate package, which you will not require modifications. Although if you want to alter the project, especially if you want to contribute, it is possible to develop storefront and SDK simultaneously. To do this, you need
to link it to the storefront's project.

```bash
$ cd lib
$ npm link
$ cd <your storefront path>
$ npm link @saleor/sdk
```

Notice that in [our example storefront](https://github.com/mirumee/saleor-storefront)
webpack is configured to always resolve `react` to `./node_modules/react`. It may
seem redundant for the most use cases, but helps in sdk's local development, because
it overcomes `npm`'s limitations regarding peer dependencies hoisting, explicitly
telling webpack to always have one and only copy of `react`.

### Configuration

Set environment variables:

```bash
export API_URI=https://your.saleor.instance.com/graphql/
export TEST_AUTH_EMAIL=admin@example.com
export TEST_AUTH_PASSWORD=admin
```

### Development

1. Download repository
2. Install dependencies: `npm i`
3. Now you can start files watcher with: `npm run start`

### Production build

```bash
npm run build
```

### Tests

Tests are located at `/test` directory. To start the test suite:

```bash
npm run test
```

All communication with API is prerecorded using [Polly.JS](https://netflix.github.io/pollyjs/#/README). Unless requests changed or code executes new ones, no requests to API will be made.

Changes in `/recordings` directory should be reviewed before committing to make sure that changes in communication are intentional.

### Code quality

The project has configured Prettier and ESLint. To check your code:

```bash
npm run lint
```

### Fetch current GraphQL schema

```bash
npm run download-schema
```

Command will overwrite `introspection.json` with server schema, based on `API_URL` variable.

### Updating TS types

GraphQL Code Generator is an automatic tool that converts schema to TS types. After changing schema file run:

```bash
npm run build-types
```
