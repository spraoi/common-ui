#!/usr/bin/env bash

set -e

while :; do
  read -p "name: " name

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
echo "package name: ${package_name}"
echo "description:  ${description}"
echo "version:      ${version}"
echo

read -p "is this okay? (y/n) " okay
[[ "$okay" != "y" ]] && echo "okay." && exit

mkdir -p "$package_location"
cd "$package_location"
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
