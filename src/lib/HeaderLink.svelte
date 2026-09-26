<script>
  let {path, text, currentpath=""} = $props()
  let selected = ""
  if(currentpath == path){
    selected=' selected'
  }
</script>

<li class='pure-menu-item {selected}'>
  <a href='{path}' class='pure-menu-link{selected}'>{text}</a>
</li>