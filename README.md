![mockets.io](logo.png)
# mockets.io
mockets.io allows you to mock socket.io's sockets, so as to test them. This is a fast and easy solution, as it does not create an actual socket connection, but rather use simpler functions, to allow for fast and easy testing.

## Installation
mockets.io is available as an npm package.
```bash
// With npm
npm install mockets.io
```

## Usage
These tests assume that you have installed a testing library, such as [jest](https://github.com/facebook/jest) for instance.

For these tests, we'll assume we're in some kind of game website.
To play a game, players have to join a lobby, and listen to updates on that lobby.

You're handling your socket events in a facade, GameFacade.

### Rooms handling

Because you don't want to send updates to every players when the lobby is updated, you're likely to create a socket.io room and make your player's socket join the socket.io room.

```ts
describe('GameFacade', () => {
    let mocketServer: MocketServer;
    let mocketSocket: any;

    beforeEach(() => {
        // Reset server and socket to ensure clean tests
        mocketServer = new MocketServer();
        mocketSocket = mocketServer.createSocket();
    })

    test('GameFacade.joinLobby should make socket join socket.io room', () => {
        expect(mocketSocket.rooms.size).toBe(0);

        // Your own treatment function
        GameFacade.joinLobby(socket);

        expect(mocketSocket.rooms.size).toBe(1);
    })
});
```

### Events handling

Now, you might want to ensure that your sockets are emitting events as well as receiving them.

```ts
describe('GameFacade', () => {
    let mocketServer: MocketServer;
    let lobbyHostPlayer: any;
    let anotherPlayer: any;

    beforeEach(() => {
        // Reset server and socket to ensure clean tests
        mocketServer = new MocketServer();
        lobbyHostPlayer = mocketServer.createSocket();
        anotherPlayer = mocketServer.createSocket();
    })

    test('GameFacade.joinLobby should make joining socket emit update to other players', () => {
        expect(anotherPlayer.sentEvents.length).toBe(0);
        expect(lobbyHostPlayer.receivedEvents.length).toBe(0);

        // Your own treatment function
        GameFacade.joinLobby(socket);

        expect(anotherPlayer.sentEvents.length).toBe(1);
        expect(lobbyHostPlayer.receivedEvents.length).toBe(1);
    })
});
