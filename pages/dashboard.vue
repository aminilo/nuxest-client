<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field } from 'vee-validate';
import { z } from 'zod';

definePageMeta({ middleware: ['auth'] });

const config = useRuntimeConfig();
const propertyStore = usePropertyStore();

const schema = toTypedSchema(
  z.object({
    title:       z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().nullable().optional(),
    price:       z.number({ invalid_type_error: 'Price must be a number' }).positive('Price must be positive'),
    address:     z.string().min(5, 'Address must be at least 5 characters'),
    beds:        z.number().int().positive('Must be a positive number'),
    baths:       z.number().int().positive('Must be a positive number'),
    sqft:        z.number().int().positive('Must be a positive number'),
    phone:       z.string().nullable().optional(),
    
    lat: z
      .union([
        z.number({ invalid_type_error: 'Latitude must be a number' })
          .min(-90, 'Latitude must be between -90 and 90')
          .max(90, 'Latitude must be between -90 and 90'),
        z.null(),
        z.undefined(),
      ])
      .optional(),

    lng: z
      .union([
        z.number({ invalid_type_error: 'Longitude must be a number' })
          .min(-180, 'Longitude must be between -180 and 180')
          .max(180, 'Longitude must be between -180 and 180'),
        z.null(),
        z.undefined(),
      ])
      .optional(),

    image: z.any().optional(),
  })
);

const isEditing    = ref(false);
const editId       = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl   = ref<string | null>(null);

function onImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  selectedFile.value = file;
  previewUrl.value   = URL.createObjectURL(file);
}

const EMPTY_VALUES = {
  title: '',
  description: '',
  price: 0,
  address: '',
  beds: 0,
  baths: 0,
  sqft: 0,
  phone: '',
  lat: undefined,
  lng: undefined,
  image: undefined
};

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: EMPTY_VALUES,
  validateOnBlur: true,
  validateOnChange: true
});

const onSubmit = handleSubmit(async (values) => {
  const payload: Record<string, any> = {
    title: values.title,
    description: values.description ?? undefined,
    price: values.price,
    address: values.address,
    beds: values.beds,
    baths: values.baths,
    sqft: values.sqft,
    phone: values.phone ?? undefined,
    lat: values.lat ?? undefined,
    lng: values.lng ?? undefined,
    image: selectedFile.value ?? undefined
  };

  if (isEditing.value && editId.value) {
    await propertyStore.saveProperty(editId.value, payload);
  } else { await propertyStore.saveProperty(null, payload); }

  resetForm({ values: EMPTY_VALUES });
  isEditing.value = false;
  editId.value = null;
  selectedFile.value = null;
  previewUrl.value = null;
});

function onEdit(prop: any) {
  resetForm({
    values: {
      ...prop,
      lat: prop.lat ?? undefined,
      lng: prop.lng ?? undefined
    }
  });
  isEditing.value = true;
  editId.value = prop.id;
  previewUrl.value = prop.image.startsWith('http') ? prop.image : `${config.public.apiBaseUrl}${prop.image}`;
}

async function onDelete(id: string) {
  if( confirm('Are you sure you want to delete this property?') ) {
    await propertyStore.deleteProperty(id);
  }
}

onMounted(() => propertyStore.fetchUserProperties());
</script>

<template>
  <div class="dashboard">

    <section class="dashboard-form">
      <h2 class="section-title">
        {{ isEditing ? 'Edit Property' : 'Create New Property' }}
      </h2>

      <form @submit.prevent="onSubmit" class="form-space">
        <Field name="title" v-slot="{ field, errorMessage }">
          <label for="title">Title</label>
          <input id="title" v-bind="field" class="input" />
          <p class="error">{{ errorMessage }}</p>
        </Field>

        <Field name="description" v-slot="{ field, errorMessage }">
          <label for="description">Description</label>
          <textarea id="description" v-bind="field" rows="3" class="textarea"></textarea>
          <p class="error">{{ errorMessage }}</p>
        </Field>

        <Field name="price" v-slot="{ field, errorMessage }">
          <label for="price">Price</label>
          <input id="price" type="number" v-bind="field" class="input" />
          <p class="error">{{ errorMessage }}</p>
        </Field>

        <Field name="address" v-slot="{ field, errorMessage }">
          <label for="address">Address</label>
          <input id="address" v-bind="field" class="input" />
          <p class="error">{{ errorMessage }}</p>
        </Field>

        <div class="triple-grid">
          <Field name="beds" v-slot="{ field, errorMessage }">
            <label for="beds">Beds</label>
            <input id="beds" type="number" v-bind="field" class="input" />
            <p class="error">{{ errorMessage }}</p>
          </Field>
          <Field name="baths" v-slot="{ field, errorMessage }">
            <label for="baths">Baths</label>
            <input id="baths" type="number" v-bind="field" class="input" />
            <p class="error">{{ errorMessage }}</p>
          </Field>
          <Field name="sqft" v-slot="{ field, errorMessage }">
            <label for="sqft">Sqft</label>
            <input id="sqft" type="number" v-bind="field" class="input" />
            <p class="error">{{ errorMessage }}</p>
          </Field>
        </div>

        <Field name="phone" v-slot="{ field, errorMessage }">
          <label for="phone">Phone</label>
          <input id="phone" v-bind="field" class="input" />
          <p class="error">{{ errorMessage }}</p>
        </Field>

        <!-- Latitude / Longitude side by side -->
        <div class="latlng-grid">
          <div class="lat-field">
            <Field name="lat" v-slot="{ field, errorMessage }">
              <label for="lat">Latitude</label>
              <input id="lat" type="number" v-bind="field" class="input" />
              <p class="error">{{ errorMessage }}</p>
            </Field>
          </div>
          <div class="lng-field">
            <Field name="lng" v-slot="{ field, errorMessage }">
              <label for="lng">Longitude</label>
              <input id="lng" type="number" v-bind="field" class="input" />
              <p class="error">{{ errorMessage }}</p>
            </Field>
          </div>
        </div>

        <!-- File input + preview -->
        <div class="file-group">
          <label for="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="onImageChange"
            class="file-input"
          />
          <div v-if="previewUrl" class="preview-wrapper">
            <img :src="previewUrl" alt="Preview" class="preview-img" />
          </div>
        </div>

        <button type="submit" class="btn-primary">
          {{ isEditing ? 'Update Property' : 'Create Property' }}
        </button>
      </form>
    </section>

    <section class="dashboard-list">
      <h2 class="section-title">Your Properties</h2>

      <div v-if="propertyStore.properties.length">
        <div
          v-for="p in propertyStore.properties"
          :key="p.id"
          class="property-card"
        >
          <img
            :src="
              p.image.startsWith('http')
                ? p.image
                : `${config.public.apiBaseUrl}${p.image}`
            "
            alt="Property image"
            class="card-image"
          />
          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-address">{{ p.address }}</p>
          <p class="card-price">${{ p.price }}</p>

          <div class="action-buttons">
            <button @click="onEdit(p)" class="btn-secondary">Edit</button>
            <button @click="onDelete(p.id)" class="btn-danger">Delete</button>
          </div>
        </div>
      </div>
      <div v-else class="empty-text">
        You haven't listed any properties yet.
      </div>
    </section>

  </div>
</template>

<style scoped>
.dashboard { @apply grid grid-cols-1 md:grid-cols-2 gap-8 p-6; }

.dashboard-form { @apply bg-light-soft dark:bg-dark-soft p-6 rounded-2xl shadow opacity-90; }

.section-title { @apply text-xl font-bold mb-4; }

.form-space { @apply space-y-4; }

.input { @apply w-full px-4 py-2 border rounded-md bg-transparent focus:ring-2 ring-amber-500; }

.textarea { @apply w-full px-4 py-2 border rounded-md bg-transparent focus:ring-2 ring-amber-500 resize-y; }

.triple-grid { @apply grid grid-cols-3 gap-4; }

.latlng-grid { @apply grid grid-cols-2 gap-4; }

.lat-field, .lng-field {  @apply flex flex-col; }

.file-group { @apply flex flex-col; }

.file-input { @apply file:py-1 file:px-4 file:bg-amber-500 file:text-white rounded cursor-pointer; }

.preview-wrapper { @apply mt-2; }

.preview-img { @apply h-40 w-full object-cover rounded-xl shadow-md; }

.btn-primary { @apply w-full bg-blue-600 text-white py-2 rounded-lg; }

.dashboard-list { @apply bg-light-soft dark:bg-dark-soft p-6 rounded-2xl shadow opacity-90; }

.property-card { @apply border p-4 rounded-lg mb-4 bg-white dark:bg-dark-soft; }

.card-image { @apply h-32 w-full object-cover rounded; }

.card-title { @apply mt-2 font-bold; }

.card-address { @apply text-gray-400; }

.card-price { @apply text-green-600 font-bold; }

.action-buttons {  @apply mt-2 flex gap-2; }

.btn-secondary { @apply bg-yellow-400 text-black py-1 px-3 rounded-md; }

.btn-danger { @apply bg-red-500 text-white py-1 px-3 rounded-md; }

.empty-text { @apply text-gray-600; }

.error { @apply text-red-500 text-sm mt-1; }
</style>
