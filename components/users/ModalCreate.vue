<script setup lang="ts">
const emit = defineEmits(['close', 'submit']);
const closeModal = () => {
    emit('close');
};

const onSubmit = () => { };
</script>

<template>
    <BaseModal width="3xl" title="Create User" @close-modal="closeModal" @confirm="onSubmit">
        <div>
            <form class="space-y-4">
                <div class="grid grid-cols-12 gap-4">
                    <div class="w-full col-span-12">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text"
                            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
                            placeholder="Masukkan data Nama Pengguna" />
                    </div>
                </div>
            </form>
        </div>
    </BaseModal>
</template>
