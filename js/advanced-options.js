
Promise.all([getSettings(), domReady()]).then(([settings]) => {
  $("button.close")
    .show()
    .click(() => history.back())

  $("#fix-bt-silence-gap")
    .prop("checked", settings.fixBtSilenceGap)
    .change(function() {
      updateSettings({fixBtSilenceGap: this.checked})
        .catch(console.error)
    })

  // OpenAI Chunking Mode
  const chunkingMode = settings.openaiChunkingMode || "punctuation"
  $(`input[name="openai-chunking"][value="${chunkingMode}"]`).prop("checked", true)
  
  $('input[name="openai-chunking"]').change(function() {
    updateSettings({openaiChunkingMode: this.value})
      .catch(console.error)
  })
})
