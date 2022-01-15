<template>
  <div class="page">
    <h1>Todos</h1>
    <div>
      <p id="greeting">your todos will appear there</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.page {
  grid-area: b;
}

#greeting {
  color: #999;
  font-size: 28px;
  display: block;
  text-align: center;
  margin: 25px;
}
</style>
