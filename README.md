# lingq-to-anki

lingq-to-anki is a simple command-line utility for taking lesson data from LingQ - lesson text, saved vocabulary and notes - and generating a CSV file containing each sentence of the text together with its associated vocabulary and notes.

## Requirements

- Node.js
- Node Package Manager (NPM)

Run `npm install` to install dependencies.

## Usage

lingq-to-anki reads in three properties from the `config.json` file in the project root directory:

1. Your API key. See <https://www.lingq.com/en/accounts/apikey/>
2. The language code, e.g. `en` for English, `ko` for Korean, `sv` for Swedish, etc. This can be found in the URL when you are logged into LingQ.
3. The output path, including the filename, e.g. `./output/my_output_file.csv`

The content ID, e.g. `32892` should be passed as a command line argument. This can found in the URL when the lesson is open.

### Example usage

`npm run start 32892`

## Formatting for Anki

The default formatting is perfectly compatible with Anki, presuming at least two fields in your deck, e.g. Sentences and Vocabulary.

If you would like for the vocabulary field to be made slightly more readable by incorporating line breaks, as opposed to pipe ('|') delineation, you can switch to the `anki` branch which will format the output in this way. Usage remains the same.

## History

### Version 1.0.1 (May 3, 2020)

- Replaced all command line arguments except content ID with a config file.

### Version 1.0.0 (May 1, 2020)

- Basic CLI functionality. Outputs the file to CSV with two columns: 1) Sentences; 2) Vocabulary. The latter are separated/delineated using a pipe character ('|').
- A separate branch, `anki` formats the vocabulary text by adding line breaks to make the text more readable when reviewed using the Anki app.
