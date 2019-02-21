# @spraoi/auth

> Container components for making authentication a breeze.

## Installation

```bash
yarn add @spraoi/auth
```

## Usage

### AuthProvider

`AuthProvider` is a container component that provides context to its children.
Check the source for details.

```javascript
import React from 'react';
import { AuthProvider } from '@spraoi/auth';

const amplifyConfig = {
  // ...
};

const AuthenticatedApp = (
  <AuthProvider amplifyConfig={amplifyConfig}>
    {/* your app goes here... */}
  </AuthProvider>
);
```

#### Amplify Config Documentation

- https://aws-amplify.github.io/docs/js/authentication#manual-setup
- https://aws-amplify.github.io/docs/js/api#manual-setup
- https://aws-amplify.github.io/docs/js/storage#manual-setup

### AuthConsumer

`AuthConsumer` is just the
[context consumer](https://reactjs.org/docs/context.html#contextconsumer) for
the above `AuthProvider`.

```javascript
import React from 'react';
import { AuthConsumer } from '@spraoi/auth';

const Component = (
  <AuthConsumer>
    {authContext => {
      // use the context here...
    }}
  </AuthConsumer>
);
```

### Page

`Page` is a simple authenticated/unauthenticated route container
component/helper.

#### Props

##### `isPrivate`: bool

If `true` and the user _isn&rsquo;t_ authenticated, they are redirected to the
login page or the `redirect` path. The current pathname is set to the `redirect`
query param. This is useful for redirecting back to the page that was originally
requested (once authenticated).

##### `isPublic`: bool

If `true` and the user _is_ authenticated, they are redirected to the home page
or the `redirect` path.

##### `redirect`: string

The path to redirect to in the cases above.

##### `renderLoading`: node

The component to render if `waitForAuth` is true.

##### `waitForAuth`: bool

If `true`, the page contents aren&rsquo;t shown until we know if the user is
authenticated or not.

#### Private Route Example

```javascript
import React from 'react';
import { Page } from '@spraoi/auth';

const Route = (
  <Page isPrivate renderLoading="Loading!" waitForAuth>
    {/* your page goes here... */}
  </Page>
);
```
