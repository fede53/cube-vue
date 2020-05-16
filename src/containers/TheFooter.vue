<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1 text-primary">Cube</span>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://blastness.com" target="_blank">Blastness</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
