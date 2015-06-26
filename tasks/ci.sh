#!/bin/bash

# Setando variáveis senão dá erro de encoding no sass
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"

# Preparando o ambiente
source ./tasks/clean.sh &&
source ./tasks/install.sh &&

# Buildando o projeto
grunt build
