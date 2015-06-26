#!/bin/bash

# Remove pacotes não usados
npm prune > /dev/null &&

# Instala pacotes npm se não existirem
npm install --cache-min 99999999 > /dev/null &&

# Listando pacotes instalados apenas para conferência
npm ls --depth=0
