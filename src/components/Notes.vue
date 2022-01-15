<template>
  <div class="page">
    <h1>Notes</h1>
    <div class="page">
      <p id="greeting">
        hello there<br />
        let's make some notes
      </p>
      <v-btn x-large elevation="0">New Note</v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page {
  grid-area: a;
}

#greeting {
  color: #999;
  font-size: 28px;
  display: block;
  text-align: center;
  margin: 25px;
}

.v-btn {
  border-radius: 0 0 4px 4px;
}
</style>
