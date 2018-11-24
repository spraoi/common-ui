#!/usr/bin/env bash

set -e

read -p "name: " name
read -p "description: " description

location="packages/${name}"
package_name="@spraoi/${name}"
version="$(grep version lerna.json | cut -d\" -f4)"

echo
echo "package name: ${package_name}"
echo "package description: ${description}"
echo "package version: ${version}"
echo

read -p "is this okay? (y/n) " okay

[[ "$okay" != "y" ]] && echo "okay." && exit
[[ -d "$location" ]] && echo "package exists. bailing..." && exit 1

mkdir -p "$location"
cd "$location"

cat > index.js << EOL
// TODO: implement
EOL

mkdir __tests__

cat > __tests__/index.test.js << EOL
it('exists', () => expect(true).toEqual(true));
EOL

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
  }
}
EOL

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

echo "done."
