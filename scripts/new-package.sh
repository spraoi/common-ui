#!/usr/bin/env bash

set -e

while :; do
  read -p "name: " name

  [[ -d "packages/${name}" ]] && \
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
echo "package name: ${package_name}"
echo "description:  ${description}"
echo "version:      ${version}"
echo

read -p "is this okay? (y/n) " okay
[[ "$okay" != "y" ]] && echo "okay." && exit

mkdir -p "packages/${name}" && cd $!
mkdir __tests__

cat > index.js << EOL
// TODO: implement
EOL

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

echo "package created."
