<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "MyCard"
    }
</script>

<style scoped>
    .card {
        display: inline-block;
        box-sizing: border-box;
        border: 2px solid #EBEEF5;
        padding: 10px;
        background-color: white;
        margin: 5px;
        border-radius: 5px;
    }
</style>
