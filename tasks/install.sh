#!/bin/bash

echo "*** Instalando Apps" &&

echo "** Instalando submodulos git... " &&

# Atualiza pacotes se já estiverem instalados, instala se não existir
git submodule update --init --quiet > /dev/null &&

# Listando pacotes instalados apenas para conferência
git submodule &&

echo "** Instalando pacotes npm... " &&

# Remove pacotes não usados
npm prune > /dev/null &&

# Instala pacotes npm se não existirem
npm install --cache-min 99999999 > /dev/null &&

# Listando pacotes instalados apenas para conferência
npm ls --depth=0
