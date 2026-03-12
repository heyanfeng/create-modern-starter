<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <h1 class="text-4xl font-bold mb-4">Vite + Vue + TS + Tailwind</h1>
    <div class="card p-6 bg-white rounded-lg shadow-md">
      <button 
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition" 
        @click="count++"
      >
        count is {{ count }}
      </button>
      <p class="mt-4 text-gray-600">
        Edit <code>src/App.vue</code> and save to test HMR
      </p>
    </div>
  </div>
</template>
