<script setup lang="ts">
import { ref } from 'vue';

const selectedRole = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const emit = defineEmits(['close', 'submit']);

const closeModal = () => {
  emit('close');
};

const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <BaseModal
    width="3xl"
    title="Create User"
    @close-modal="closeModal"
    @confirm="onSubmit"
  >
    <form class="space-y-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
            placeholder="Enter full name"
          />
        </div>

        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
            placeholder="Enter email address"
          />
        </div>

        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
            placeholder="Enter phone number"
          />
        </div>

        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-1">User Role</label>
          <BaseSelect
            v-model="selectedRole"
            :options="roleOptions"
            aria-label="Select user role"
          >
            Choose a role to define user permissions
          </BaseSelect>
        </div>

        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
          <BaseSelect
            v-model="selectedStatus"
            :options="statusOptions"
            aria-label="Select account status"
          >
            Set the initial account status
          </BaseSelect>
        </div>
      </div>
    </form>
  </BaseModal>
</template>
