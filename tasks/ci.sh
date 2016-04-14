#!/bin/bash

# Preparando o ambiente
source ./tasks/clean.sh &&
source ./tasks/install.sh &&

# Buildando o projeto
grunt build
