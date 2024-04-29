# My Backend Project

This is a backend project built using [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/).

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

## Usage

This project provides APIs for managing notes data.

## API Documentation

- GET /notes: Get all notes.
- Get /notes/note/:id : Get one note.
- POST /notes: Create new note.
- PATCH /notes : Update note.
- DELETE /notes : Delete note.

## Configuration

Environment variables:

- PORT: Port number for the server (4001).
- MONGO_URI : mongodb+srv://louaibaghdadi27:JagRWyX8p2zfBb5y@cluster0.uitllam.mongodb.net/
  -FRONT_END_PATH : number for the front Port (3000)

## Test

- test Get Notes : NODE_OPTIONS=--experimental-vm-modules npx jest GetNotes.test.js

- test Create Notes : NODE_OPTIONS=--experimental-vm-modules npx jest CreateNote.test.js

- test Update Note : ---

- test Delete Note :
  NODE_OPTIONS=--experimental-vm-modules npx jest DeleteNote.test.js

## Contribution

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
