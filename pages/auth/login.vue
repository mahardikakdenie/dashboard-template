<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});
</script>

<template>
	<div>
		<h3 class="text-xl font-semibold mb-6">Masuk ke Akun Anda</h3>

		<form class="space-y-6">
			<div>
				<label
					for="email"
					class="block text-sm font-medium text-gray-700"
					>Email address</label
				>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
			</div>

			<div>
				<label
					for="password"
					class="block text-sm font-medium text-gray-700"
					>Password</label
				>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
					<label
						for="remember-me"
						class="ml-2 block text-sm text-gray-900"
						>Remember me</label
					>
				</div>

				<div class="text-sm">
					<a
						href="#"
						class="font-medium text-indigo-600 hover:text-indigo-500"
						>Forgot password?</a
					>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					@click="$router.push('/')">
					Sign in
				</button>
			</div>
		</form>

		<div class="mt-6 text-center">
			<p class="text-sm text-gray-600">
				Belum punya akun?
				<NuxtLink
					to="/"
					class="font-medium text-indigo-600 hover:text-indigo-500"
					>Daftar di sini</NuxtLink
				>
			</p>
		</div>
	</div>
</template>
