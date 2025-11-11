# Using OpenAI and OpenAI-Compatible TTS Endpoints

Read Aloud supports OpenAI TTS and any OpenAI-compatible text-to-speech API endpoints, allowing you to use various TTS providers with the same interface.

## Supported Providers

This feature works with:
- **OpenAI TTS** (official OpenAI API)
- **Open WebUI** (self-hosted with OpenAI-compatible endpoint)
- **LocalAI** (local OpenAI-compatible server)
- **Any other OpenAI-compatible TTS service**

## Configuration

### 1. Enable OpenAI Voices

1. Open Read Aloud options (click the extension icon, then click the gear icon)
2. Click "Custom Voices" in the left menu
3. Find the "OpenAI" section and click "Add"
4. Configure the following:

#### API URL
- For OpenAI: `https://api.openai.com/v1`
- For Open WebUI: `http://localhost:8080/api/v1` (or your server URL)
- For LocalAI: `http://localhost:8080/v1` (or your server URL)

#### API Key
- For OpenAI: Your OpenAI API key (required)
- For Open WebUI: Your Open WebUI API key (if authentication is enabled)
- For LocalAI: May not be required (leave empty if not needed)

#### Voice List
Configure the available voices in JSON format:

```json
[
  {"voice": "alloy", "lang": "en-US", "model": "tts-1"},
  {"voice": "echo", "lang": "en-US", "model": "tts-1"},
  {"voice": "fable", "lang": "en-US", "model": "tts-1"},
  {"voice": "onyx", "lang": "en-US", "model": "tts-1"},
  {"voice": "nova", "lang": "en-US", "model": "tts-1"},
  {"voice": "shimmer", "lang": "en-US", "model": "tts-1"}
]
```

For higher quality (OpenAI only), use `tts-1-hd`:
```json
[
  {"voice": "alloy", "lang": "en-US", "model": "tts-1-hd"},
  {"voice": "nova", "lang": "en-US", "model": "tts-1-hd"}
]
```

5. Click "Save"

### 2. Select Voice

After configuration:
1. Click the Read Aloud extension icon
2. Click the gear icon for settings
3. Select your preferred OpenAI voice from the dropdown

## Text Chunking Options

Read Aloud provides three chunking modes for OpenAI TTS, similar to Open WebUI:

### Accessing Chunking Settings

1. Open Read Aloud options
2. Click "Advanced Options" in the left menu
3. Find "OpenAI TTS Chunking Mode" section

### Chunking Modes

#### Split by Punctuation (Recommended)
- **Default mode**
- Splits text into sentences based on punctuation marks (., !, ?)
- Best balance between natural pauses and processing speed
- Matches Open WebUI's default behavior

#### Split by Paragraphs
- Splits text by paragraph breaks (double newlines)
- Creates longer audio chunks
- Good for texts with clear paragraph structure
- May result in longer processing time

#### No Chunking
- Sends entire text as one request
- Fastest for short texts
- Automatically falls back to sentence splitting for texts > 4000 characters
- May hit API limits for very long texts

## Browser Compatibility

This feature is compatible with:
- ✅ Chrome
- ✅ Firefox
- ✅ Edge (Chromium-based)
- ✅ Other Chromium-based browsers

## Troubleshooting

### Authentication Errors
- Verify your API key is correct
- For Open WebUI, ensure your API key has the necessary permissions

### No Audio Output
- Check that your endpoint URL is correct
- Verify the endpoint is accessible from your browser
- Check browser console for error messages

### Voice Not Available
- Ensure your voice list JSON is valid
- Verify the voice name matches what your TTS provider supports
- Check that the language code is correct

### Chunking Issues
- If text is cut off, try "No Chunking" mode
- If processing is slow, use "Split by Punctuation"
- For very long texts, "Split by Paragraphs" may work better

## Examples

### Open WebUI Configuration

```
API URL: http://localhost:8080/api/v1
API Key: your-openwebui-token
Voice List:
[
  {"voice": "alloy", "lang": "en-US", "model": "tts-1"},
  {"voice": "nova", "lang": "en-US", "model": "tts-1"}
]
```

### LocalAI Configuration

```
API URL: http://localhost:8080/v1
API Key: (leave empty)
Voice List:
[
  {"voice": "en-us-amy-low", "lang": "en-US", "model": "tts-1"}
]
```

## API Endpoint Specification

The extension uses the OpenAI-compatible `/audio/speech` endpoint:

```http
POST {API_URL}/audio/speech
Content-Type: application/json
Authorization: Bearer {API_KEY}

{
  "model": "tts-1",
  "input": "Text to convert to speech",
  "voice": "alloy",
  "response_format": "mp3"
}
```

Any TTS service that implements this endpoint format will work with Read Aloud.
