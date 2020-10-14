<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard />
    <BaseIcon name="activity" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
export default {
  name: 'EventList',
  components: { EventCard },
};
</script>

<style></style>
