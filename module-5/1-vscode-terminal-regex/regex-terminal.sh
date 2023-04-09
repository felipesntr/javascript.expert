# a partir da pasta raiz 
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'

npm i -g ipt

# com o resultado faço o ipt
find . -name *.test.js -not -path '*node_modules**' | ipt

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules*' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e "1s/^/$CONTENT\\
/g" '{file}'

# muda tudo 

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules*' \
| xargs -I '{file}' sed -i "" -e "1s/^/$CONTENT\\
/g" '{file}'