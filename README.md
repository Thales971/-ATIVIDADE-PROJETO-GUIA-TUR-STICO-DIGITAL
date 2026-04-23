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
npm run start
```

## Rodar no celular com Expo Go

1. Instale o app Expo Go no seu celular.
1. Garanta que computador e celular estejam na mesma rede Wi-Fi.
1. Rode:

```bash
npm run mobile
```

1. Escaneie o QR code exibido no terminal ou no navegador do Expo.

Se o celular não conectar pelo LAN, use o comando `npm run mobile` para forçar o modo tunnel.

## Observações sobre a API e imagens

- O app carrega `data/places.json` como fallback local se a API do OpenStreetMap/Nominatim falhar.
- A seleção das imagens foi ajustada para usar uma curadoria temática e reduzir repetições entre
  lugares.
- O projeto está usando `react-native-worklets@0.5.1`, que é a faixa compatível com o Expo SDK 54
  para manter o Drawer funcionando no Expo Go sem o erro de TurboModule.
- Se quiser trocar os dados, edite `data/places.json`.

## Como evoluir sem quebrar o app

- Para trocar os dados, edite `data/places.json`.
- Para mudar a navegacao, edite `App.js`.
- Para migrar para API, edite `data/placesRepository.js` e substitua a leitura do JSON por
  `fetch()`.
- Se adicionar novas dependencias, rode `npm install` para atualizar o lockfile.

## Observacao

O layout foi pensado para servir como base inicial do Figma e aceitar mudancas futuras com pouco
retrabalho.
