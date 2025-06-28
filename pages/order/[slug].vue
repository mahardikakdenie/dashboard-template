<template>
    <div>
        {{ $route?.params?.slug }}
    </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    {
      property: 'og:image',
      content: 'https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/pos-product-01.png '
    },
    {
      name: 'twitter:image',
      content: 'https://dreamspos.dreamstechnologies.com/html/template/assets/img/products/pos-product-01.png '
    }
  ]
});
</script>
