<!-- components/LanguageSwitcher.vue atau pages.vue -->
<template>
  <nav class="bg-gray-50">
    <div class="flex flex-wrap items-center justify-between mx-auto px-4 py-5">
      <!-- Search Input (opsional) -->
      <InputFeature placeholder="Search" />

      <div class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
        <!-- Tombol Bahasa dengan Icon -->
        <button
          type="button"
          @click="toggleDropdown"
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer bg-gray-100 focus:outline-none"
        >
          <!-- Tampilkan Icon Berdasarkan Bahasa Saat Ini -->
          <IconsLangEn v-if="currentLocale === 'en'" class="me-2" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/800px-Flag_of_Indonesia.svg.png?20200822164827" v-else-if="currentLocale === 'id'" class="h-5 w-5 me-2" />
          <!-- Bisa tambahkan icon lain -->

          <!-- Tampilkan Nama Bahasa -->
          {{ localeName[currentLocale] }}
        </button>

        <!-- Dropdown Menu -->
        <div
          id="language-dropdown-menu"
          class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          :class="{ hidden: !isDropdownOpen }"
        >
          <ul class="py-2 font-medium">
            <li v-for="locale in availableLocales" :key="locale.code">
              <a
                href="#"
                @click.prevent="changeLocale(locale.code)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              >
                <div class="inline-flex items-center">
                  <IconsLangEn v-if="locale.code === 'en'" class="h-3.5 w-3.5 me-2" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/800px-Flag_of_Indonesia.svg.png?20200822164827" v-else-if="locale.code === 'id'" class="h-3.5 w-3.5 me-2" />
                  <!-- Flag SVG lain bisa tetap dipakai, atau ganti dengan komponen -->
                  <span>{{ locale.name }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          data-collapse-toggle="navbar-language"
          type="button"
          @click="toggleMobileMenu"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-language"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu (opsional) -->
      <div
        id="navbar-language"
        class="w-full md:block md:w-auto"
        :class="{ hidden: !isMobileMenuOpen }"
      >
        <!-- Konten mobile menu bisa ditambahkan di sini -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from '#imports'; // atau '@nuxtjs/i18n'

const { locale, setLocale } = useI18n();

const currentLocale = ref('en')

// Daftar bahasa yang tersedia
const availableLocales = [
  { code: 'en', name: 'English (US)' },
  { code: 'id', name: 'Bahasa Indonesia' },
];

// Mapping nama bahasa untuk ditampilkan di tombol utama
const localeName = {
  en: 'English (US)',
  id: 'Bahasa Indonesia',
};

// State untuk dropdown dan mobile menu
const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Fungsi toggle
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Fungsi ganti bahasa
const changeLocale = async (lang) => {
	console.log("lang :", lang);
	currentLocale.value = lang;
	
  await setLocale(lang);
  isDropdownOpen.value = false;
  isMobileMenuOpen.value = false;

  // Opsional: refresh jika perlu (untuk memperbarui seluruh halaman)
  // navigateTo(useRoute().path, { replace: true })
};

// Tutup dropdown saat klik di luar
// onClickOutside(
//   () => document.getElementById('language-dropdown-menu'),
//   () => {
//     isDropdownOpen.value = false;
//   }
// );
</script>

<style scoped>
/* Optional: agar dropdown tidak tertutup saat klik di dalam */
#language-dropdown-menu {
  position: absolute;
  right: 1rem;
  top: 10px;
}
</style>
