# README

## Instalação

### Node.js (via nvm)

O nodejs é necessário para rodar o grunt (automatizar processos)
```
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | zsh
$ nvm install 0.10 # Alguns pacotes dão problema se não for com essa versão do node
$ nvm alias default stable
$ npm install grunt-cli -g
$ npm install
```

### Compass (via rvm)

O compass é utilizado para transformar os estilos em css
```
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
$ curl -sSL https://get.rvm.io | zsh
$ echo 'source ~/.rvm/bin/rvm > /dev/null' >> ~/.zshrc
$ source ~/.rvm/bin/rvm
$ gem install compass
$ gem install hologram
```

## Workflow

* grunt server: levanta o servidor
* grunt open:file: abre bootstrap do arquivo index.html no navegador padrão
* grunt open:local: abre o bootstrap do localhost no navegador padrão
* grunt open:ci: abre o bootstrap do ci no navegador padrão
* grunt build: builda o projeto (gera os stylesheets e a documentação)
* grunt watch: observa alterações nos docs ou nos scss e builda o projeto
* grunt work: server + open + build + watch
