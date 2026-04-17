# Guia Turistico Digital

App mobile feito com Expo + React Native para listar pontos turisticos e restaurantes de uma cidade.

## Estrutura

- `App.js`: centraliza a navegacao, tema e providers.
- `src/screens/`: telas separadas do app.
- `data/places.json`: dados locais usados na lista.
- `data/placesRepository.js`: camada pequena que pode virar fetch de API depois.
- `src/screens/WelcomeScreen.js`: entrada visual do beta com termos resumidos.

## Instalar

```bash
npm install
```

## Rodar

```bash
npx expo start
```

## Como evoluir sem quebrar o app

- Para trocar os dados, edite `data/places.json`.
- Para mudar a navegacao, edite `App.js`.
- Para migrar para API, edite `data/placesRepository.js` e substitua a leitura do JSON por
  `fetch()`.
- Se adicionar novas dependencias, rode `npm install` para atualizar o lockfile.

## Observacao

O layout foi pensado para servir como base inicial do Figma e aceitar mudancas futuras com pouco
retrabalho.
