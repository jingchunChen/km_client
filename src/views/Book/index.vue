<template>
 <div class="book">
  <iframe src="/pdf/web/viewer.html" height="100%" width="100%"></iframe>
 </div>
</template>

<script>
    export default {
        name: "Book",
        mounted() {
            console.log(222)
        }
    }
</script>

<style scoped lang="less">
    .book {
        height: calc( 100vh - 30px);
    }
</style>
