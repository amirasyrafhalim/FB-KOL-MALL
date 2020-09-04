<template>
  <div>
    <video
      autoplay
      :id="videoId"
      width="600"
      height="300"
      class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered"
      controls
    >
      <source :src="hlsSrc" type="application/x-mpegURL" />
    </video>
  </div>
</template>
<script>
export default {
  name: 'VideoPlayer',
  props: ['videoId', 'hlsSrc'],
}
</script>