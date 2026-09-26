<script>
  let {text, time}=$props()
</script>

<time-item>
  {text}
  {#if time != null}
  <span>{time} minutes</span>
  {/if}
</time-item>