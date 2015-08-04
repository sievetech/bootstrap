# README

## Instalação

### Grunt e Node.js (via nvm)

```
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | zsh
$ nvm install 0.10 # Alguns pacotes dão problema se não for com essa versão do node
$ nvm alias default stable
$ npm install grunt-cli -g
$ npm install
```

### Hologram e Compass (via rvm)

```
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
$ curl -sSL https://get.rvm.io | zsh
$ echo 'source ~/.rvm/bin/rvm > /dev/null' >> ~/.zshrc
$ source ~/.rvm/bin/rvm
$ gem install compass
$ gem install hologram
```

### Skin do Hologram

```
$ git submodule update --init
```

## Workflow

Comandos grunt para agilizar o nosso trabalho
* grunt server: levanta o servidor
* grunt open:file: abre bootstrap do arquivo index.html no navegador padrão
* grunt open:local: abre o bootstrap do localhost no navegador padrão
* grunt open:ci: abre o bootstrap do ci no navegador padrão
* grunt build: builda o projeto (gera os stylesheets e a documentação)
* grunt watch: observa alterações nos docs ou nos scss e builda o projeto
* grunt work: server + open + build + watch


## Todo

* Indicador de campos obrigatórios
* Criar Desenvolvimento (idéia do Bootstrap e como montar componentes próprios)
* Fork no hologram-github-theme: suporte a javascript
* Fork no hologram-github-theme: link "back to the top"
* Bootstrap usando o bootstrap (hologram-sieve-theme)
* Task clean
* Task zip para envolver fontes
* Adicionar suporte de navegadores


## Roadmap

* MVP Interno
* Design harmônico
* Responsive Design
  * ver componentes necessários
* MVP Externo
  * bootstrap.sieve.com.br
  * index.md
  * hologram-sieve-theme
  * projeto piloto
* Animações
* Componentes
  * Modal
  * Dropdown
  * Checkboxes & Radios
  * Button groups
  * Progress bar
  * Breadcrumb
* Portal
* Tema Por Cliente
