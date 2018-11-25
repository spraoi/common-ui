#!/usr/bin/env bash

set -e

while :; do
  read -p "is this a react component? (y/n): " is_react_component
  [[ -z "$(grep -E '(y|n)' <<< is_react_component)" ]] && echo "invalid response." && continue
  [[ "$is_react_component" == "n" ]] && break
  read -p "component name: " component_name
  break
done

while :; do
  read -p "package name: " name

  package_location="packages/${name}"

  [[ -d "$package_location" ]] && \
    echo "package already exists." && \
    continue

  [[ -z "$(grep -E '^[a-z-]+$' <<< "$name")" ]] && \
    echo "invalid name. only lowercase letters and hyphens are allowed." && \
    continue

  break
done

read -p "description: " description

package_name="@spraoi/${name}"
version="$(grep version lerna.json | cut -d\" -f4)"

echo
[[ "$is_react_component" == "y" ]] && echo "component name: ${component_name}"
echo "package name:   ${package_name}"
echo "description:    ${description}"
echo "location:       ${package_location}"
echo "version:        ${version}"
echo

read -p "is this okay? (y/n) " okay
[[ "$okay" != "y" ]] && echo "okay." && exit

mkdir -p "$package_location"
cd "$package_location"
mkdir __tests__

##
# index.js
##

if [[ "$is_react_component" == "y" ]]; then
  cat > index.js << EOL
import React from 'react';

const ${component_name} = () => <div>${component_name} component</div>;

export default ${component_name};
EOL
else
  cat > index.js << EOL
// TODO
EOL
fi

##
# __tests__/index.test.js
##

if [[ "$is_react_component" == "y" ]]; then
  cat > __tests__/index.test.js << EOL
import React from 'react';
import ReactDOM from 'react-dom';
import ${component_name} from '..';

describe('FileUpload component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<${component_name} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
EOL
else
  cat > __tests__/index.test.js << EOL
it('needs tests', () => expect(true).toEqual(true));
EOL
fi

##
# package.json
##

cat > package.json << EOL
{
  "name": "${package_name}",
  "description": "${description}",
  "version": "${version}",
  "license": "MIT",
  "homepage": "https://github.com/spraoi/common-ui/tree/master/packages/${name}",
  "repository": {
    "type": "git",
    "url": "https://github.com/spraoi/common-ui.git"
  },
  "publishConfig": {
    "access": "public"
  }$([[ "$is_react_component" == "y" ]] && echo ,)
EOL

if [[ "$is_react_component" == "y" ]]; then
  cat >> package.json << EOL
  "peerDependencies": {
    "prop-types": "*",
    "react": "*",
    "react-dom": "*"
  }
EOL
fi

cat >> package.json << EOL
}
EOL

##
# README.md
##

cat > README.md << EOL
# ${package_name}

> ${description}

## Installation

\`\`\`bash
yarn add ${package_name}
\`\`\`

## Usage

TODO
EOL

##
# LICENSE
##

cat > LICENSE << EOL
The MIT License

Copyright (c) $(date +'%Y') Spraoi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
EOL

echo "package created."
