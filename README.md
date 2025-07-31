# Letip

A estratégia adotada para a requisição da cotação do dólar e euro foi somente fazer a requisição se não houver a informação já cacheada, assim evitando realizar múltiplas requisições para a API sempre que calcular o valor em reais de acordo com a moeda selecionada. 

Estratégias poderiam ter sido implementadas como por exemplo limpar esse cache a cada X tempo para pegar um valor atualizado da cotação.

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```
