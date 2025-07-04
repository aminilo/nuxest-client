<script setup lang="ts">
import { ref } from 'vue'
import { usePropertyStore } from '@/stores/usePropertyStore'
import { useToast } from 'vue-toastification'
const toast = useToast()

const store = usePropertyStore()

const title = ref('')
const description = ref('')
const price = ref(100000)
const address = ref('')
const image = ref('https://via.placeholder.com/300')
const beds = ref(1)
const baths = ref(1)
const sqft = ref(50)
const phone = ref('123456789')
const lat = ref(35.6892) /* Example */
const lng = ref(51.3890) /* Example */

const handleSubmit = async () => {
  try {
    await store.createProperty({
      title: title.value,
      description: description.value,
      price: price.value,
      address: address.value,
      image: image.value,
      beds: beds.value,
      baths: baths.value,
      sqft: sqft.value,
      phone: phone.value,
      lat: lat.value,
      lng: lng.value
    })
    toast.success('Property created!')
    // Reset form
    title.value = ''
    description.value = ''
    price.value = 100000
    address.value = ''
    image.value = 'https://via.placeholder.com/300'
    beds.value = 1
    baths.value = 1
    sqft.value = 50
    phone.value = ''
    lat.value = 35.6892
    lng.value = 51.3890
  } catch (err: any) {
    toast.error(err.message || 'Failed to create property')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-lg mx-auto">
    <input v-model="title" type="text" placeholder="Title" class="input" required />
    <textarea v-model="description" placeholder="Description" class="input" />
    <input v-model.number="price" type="number" placeholder="Price" class="input" required />
    <input v-model="address" type="text" placeholder="Address" class="input" required />
    <input v-model="image" type="text" placeholder="Image URL" class="input" required />
    <input v-model.number="beds" type="number" placeholder="Beds" class="input" required />
    <input v-model.number="baths" type="number" placeholder="Baths" class="input" required />
    <input v-model.number="sqft" type="number" placeholder="Sqft" class="input" required />
    <input v-model="phone" type="text" placeholder="Phone (optional)" class="input" />
    <input v-model.number="lat" type="number" step="0.000001" placeholder="Latitude" class="input" required />
    <input v-model.number="lng" type="number" step="0.000001" placeholder="Longitude" class="input" required />

    <button type="submit" class="btn-primary">Create Property</button>
  </form>
</template>

<style scoped>
.input { @apply block w-full p-2 border rounded; }

.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700; }
</style>
