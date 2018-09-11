This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Run the App

install [yarn](https://yarnpkg.com/en/docs/install#debian-stable) globally 

```
git clone https://github.com/AmirHMousavi/reactjs-battleship.git
cd reactjs-battleship
yarn install
yarn start
```

### for testing

```
yarn test
```

to see the coverage

```
yarn test:coverage
```

to see the test coverage in `HTML` format

```
yarn open:coverage
```

- notes: the Store state is persisted at localStorage. during development initing the game for each refresh was a pain :)
- not all the components are tested. just a sample of each functionality like snapshot, simulate, test local state
