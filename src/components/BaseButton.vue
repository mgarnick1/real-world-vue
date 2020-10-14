<template>
  <div class="align-btn">
    <button type="submit" class="btn btn-submit">
      <slot>Submit</slot>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.align-btn {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.btn {
  background-color: blue;
  color: white;
  min-width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
